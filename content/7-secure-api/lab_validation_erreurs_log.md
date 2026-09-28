+++
draft = false
title = "🧪 Laboratoire : Gestion centralisée des erreurs"
weight = 81
+++

Dans les laboratoires précédents, on a ajouté des routes, des DTO et des opérations CRUD. Lorsqu’une erreur survient, le contrôleur ne construit toutefois pas lui-même la réponse HTTP. NestJS fait circuler la requête dans plusieurs composants spécialisés.

Cette section introduit ces composants et permet d’ajouter une gestion cohérente des erreurs à `energy-api`.

## 1. Comprendre le cycle d’une requête

Une requête ne passe pas directement du client au contrôleur. NestJS exécute plusieurs étapes avant de retourner une réponse.

```text
Client HTTP
    ↓
Middleware
    ↓
Intercepteur — avant le contrôleur
    ↓
Pipe de transformation et de validation
    ↓
Contrôleur
    ↓
Service
    ↓
Intercepteur — après le contrôleur
    ↓
Réponse HTTP
```

Lorsqu’une exception est lancée dans un pipe, un contrôleur ou un service, un filtre d’exception peut la transformer en réponse HTTP.

```text
Pipe, contrôleur ou service
    ↓
Exception
    ↓
Filtre d’exception
    ↓
Réponse HTTP d’erreur
```

Chaque composant possède une responsabilité différente.

| Composant | Explication courte | Exemple d’utilisation |
|---|---|---|
| Middleware | Code exécuté tôt, avant le contrôleur | journaliser la méthode et l’URL |
| Pipe | Transforme ou valide une valeur reçue | vérifier un DTO |
| Intercepteur | Entoure l’exécution du contrôleur | mesurer la durée |
| Exception | Objet qui signale qu’une opération ne peut pas continuer | bâtiment introuvable |
| Filtre d’exception | Convertit une exception en réponse HTTP | produire un JSON d’erreur uniforme |

> Dans cette section, on ne travaille pas encore avec les guards. Ils seront utilisés plus tard pour l’authentification et l’autorisation.


## 2. Les exceptions HTTP de NestJS

### Qu’est-ce qu’une exception?

Une exception signale qu’une opération ne peut pas se terminer normalement. L’instruction `throw` interrompt l’exécution courante et transmet l’erreur à NestJS.

```ts
throw new NotFoundException('Bâtiment introuvable.');
```

NestJS reconnaît ses exceptions HTTP et leur associe un statut.

| Exception | Statut HTTP | Utilisation |
|---|---:|---|
| `BadRequestException` | `400` | données ou requête invalides |
| `UnauthorizedException` | `401` | authentification requise |
| `ForbiddenException` | `403` | action interdite |
| `NotFoundException` | `404` | ressource inexistante |
| `ConflictException` | `409` | conflit avec l’état actuel |
| `UnsupportedMediaTypeException` | `415` | format du corps non pris en charge |
| `InternalServerErrorException` | `500` | erreur interne contrôlée |

Pour le laboratoire 2, on utilise surtout :

- `BadRequestException`, généralement lancée par la validation;
- `NotFoundException`, lancée lorsqu’une ressource n’existe pas;
- `ConflictException`, lancée lorsqu’une règle empêche la création ou la modification.

### Lancer une exception dans le service

Le service connaît les données et les règles métier. Il est donc responsable de détecter qu’un bâtiment n’existe pas.

Dans `buildings.service.ts` :

```ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class BuildingsService {
  // Collection en mémoire et autres méthodes...

  findOne(id: string): Building {
    const building = this.buildings.find(
      (item) => item.id === id,
    );

    if (!building) {
      throw new NotFoundException(
        `Le bâtiment ${id} est introuvable.`,
      );
    }

    return building;
  }

  create(dto: CreateBuildingDto): Building {
    const nameAlreadyExists = this.buildings.some(
      (item) =>
        item.name.toLowerCase() === dto.name.toLowerCase(),
    );

    if (nameAlreadyExists) {
      throw new ConflictException(
        `Un bâtiment nommé ${dto.name} existe déjà.`,
      );
    }

    const building: Building = {
      id: randomUUID(),
      ...dto,
    };

    this.buildings.push(building);
    return building;
  }
}
```

Le contrôleur ne doit pas répéter la recherche ni entourer chaque appel d’un `try/catch`.

```ts
@Get(':id')
findOne(@Param('id') id: string): Building {
  return this.buildingsService.findOne(id);
}
```

Si `findOne()` lance une exception, NestJS interrompt l’appel et produit la réponse d’erreur.



## 3. Le pipe de validation

### Qu’est-ce qu’un pipe?

Un pipe examine une valeur avant qu’elle arrive à la méthode du contrôleur. Il peut :

- transformer la valeur;
- accepter la valeur;
- refuser la valeur en lançant une exception.

`ValidationPipe` utilise les règles inscrites dans les DTO avec `class-validator`.

Dans `main.ts` :

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

Signification des options :

| Option | Effet |
|---|---|
| `whitelist` | retire les propriétés qui ne sont pas déclarées dans le DTO |
| `forbidNonWhitelisted` | refuse plutôt la requête si elle contient une propriété inconnue |
| `transform` | transforme les données reçues vers le type attendu lorsque cela est possible |

Exemple de DTO :

```ts
export class CreateBuildingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsInt()
  yearBuilt: number;
}
```

Si `yearBuilt` n’est pas un entier, `ValidationPipe` lance automatiquement une `BadRequestException`. Cette exception correspond au statut `400`.



## 4. Le filtre d’exception intégré

### Qu’est-ce qu’un filtre d’exception?

Un filtre d’exception reçoit une exception et construit la réponse HTTP correspondante.

NestJS possède déjà un filtre intégré. C’est pourquoi ce code suffit :

```ts
throw new NotFoundException('Bâtiment introuvable.');
```

Sans ajouter de filtre personnalisé, NestJS produit déjà une réponse semblable à :

```json
{
  "message": "Bâtiment introuvable.",
  "error": "Not Found",
  "statusCode": 404
}
```

On ajoute un filtre personnalisé seulement lorsqu’on veut imposer un format commun, par exemple avec la date et le chemin de la requête.



## 5. Créer un filtre d’exception personnalisé

Créer le fichier :

```text
src/common/filters/http-exception.filter.ts
```

Ajouter :

```ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';

interface HttpErrorBody {
  message?: string | string[];
  error?: string;
}

@Catch(HttpException)
export class HttpExceptionFilter
  implements ExceptionFilter<HttpException>
{
  catch(
    exception: HttpException,
    host: ArgumentsHost,
  ): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string | string[] = exception.message;
    let error = exception.name;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else {
      const body = exceptionResponse as HttpErrorBody;
      message = body.message ?? message;
      error = body.error ?? error;
    }

    response.status(statusCode).json({
      statusCode,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
    });
  }
}
```

### Comprendre le code

| Élément | Rôle |
|---|---|
| `@Catch(HttpException)` | indique que le filtre traite les exceptions HTTP |
| `ArgumentsHost` | donne accès au contexte d’exécution |
| `switchToHttp()` | sélectionne le contexte HTTP |
| `getRequest()` | donne accès à la requête reçue |
| `getResponse()` | donne accès à la réponse à produire |
| `getStatus()` | retourne le statut contenu dans l’exception |
| `getResponse()` | retourne le message ou l’objet d’erreur de l’exception |

Le filtre accepte un message simple ou une liste de messages. Une liste est notamment produite par `ValidationPipe` lorsque plusieurs propriétés sont invalides.

### Enregistrer le filtre globalement

Dans `main.ts` :

```ts
app.useGlobalFilters(new HttpExceptionFilter());
```

Ajouter l’import :

```ts
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
```

Le filtre est global : il s’applique aux exceptions HTTP lancées par tous les modules.

> Ce filtre intercepte uniquement les instances de `HttpException`. Les erreurs de programmation inattendues restent prises en charge par le mécanisme interne de NestJS et retournent `500 Internal Server Error` sans révéler la pile d’exécution au client.



## 6. Créer un middleware de journalisation

### Qu’est-ce qu’un middleware?

Un middleware est exécuté tôt dans le cycle de la requête, avant le contrôleur. Il peut consulter ou modifier la requête, terminer la réponse ou transmettre le contrôle avec `next()`.

Dans ce laboratoire, le middleware sert uniquement à afficher la méthode HTTP et l’URL demandée.

Créer :

```text
src/common/middleware/request-logger.middleware.ts
```

Ajouter :

```ts
import {
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import type {
  NextFunction,
  Request,
  Response,
} from 'express';

@Injectable()
export class RequestLoggerMiddleware
  implements NestMiddleware
{
  private readonly logger = new Logger(
    RequestLoggerMiddleware.name,
  );

  use(
    request: Request,
    _response: Response,
    next: NextFunction,
  ): void {
    this.logger.log(
      `${request.method} ${request.originalUrl}`,
    );

    next();
  }
}
```

### Pourquoi `next()` est-il obligatoire?

`next()` transmet la requête au composant suivant. Sans cet appel, la requête reste bloquée et le contrôleur n’est jamais exécuté.

### Enregistrer le middleware

Modifier `AppModule` :

```ts
import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';

@Module({
  imports: [
    HealthModule,
    BuildingsModule,
    RoomsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*');
  }
}
```

Après une requête, le terminal devrait afficher une ligne semblable à :

```text
[RequestLoggerMiddleware] GET /api/v1/buildings
```

Le middleware ne choisit pas le code d’erreur. Il observe la requête avant que la logique métier soit exécutée.

### Utiliser la librairie de journalisation `Winston`

1. **Installer Winston**
    - Installez la librairie Winston en exécutant la commande suivante dans votre terminal :
    
    ```bash
    npm install winston
    ```
    
2. **Configurer Winston**
    - Ajoutez le code suivant dans votre fichier `index.js` pour configurer Winston et l'intégrer avec Express pour gérer les logs :
    
    ```jsx
    const winston = require('winston');
    
    // Configuration du logger avec Winston
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' })
      ]
    });
    
    // Middleware de logging utilisant Winston
    app.use((req, res, next) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });
    ```
    
Dans `configure-app.ts` ajouter la configuration du logger `winston` :

```ts
// Configuration du logger avec Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

// Middleware de logging utilisant Winston
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
```

**Résultat :** Toutes les requêtes HTTP seront enregistrées dans la console et dans le fichier `logs/app.log`.

## 7. Créer un intercepteur de durée

### Qu’est-ce qu’un intercepteur?

Un intercepteur entoure l’exécution du contrôleur. Il peut exécuter du code avant l’appel, puis observer la réponse ou l’erreur après l’appel.

Dans ce laboratoire, l’intercepteur mesure la durée totale du traitement.

Créer :

```text
src/common/interceptors/execution-time.interceptor.ts
```

Ajouter :

```ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ExecutionTimeInterceptor
  implements NestInterceptor
{
  private readonly logger = new Logger(
    ExecutionTimeInterceptor.name,
  );

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{
      method: string;
      originalUrl: string;
    }>();

    const startedAt = Date.now();

    return next.handle().pipe(
      finalize(() => {
        const duration = Date.now() - startedAt;

        this.logger.log(
          `${request.method} ${request.originalUrl} - ${duration} ms`,
        );
      }),
    );
  }
}
```

### Comprendre le code

| Élément | Rôle |
|---|---|
| `next.handle()` | déclenche l’exécution du contrôleur |
| `Observable` | représente le résultat asynchrone du traitement |
| `finalize()` | exécute du code à la fin, avec succès ou avec erreur |
| `ExecutionContext` | donne accès à la requête et à la route exécutée |

### Enregistrer l’intercepteur globalement

Dans `main.ts` :

```ts
app.useGlobalInterceptors(
  new ExecutionTimeInterceptor(),
);
```

Ajouter l’import :

```ts
import { ExecutionTimeInterceptor } from './common/interceptors/execution-time.interceptor';
```

Le terminal devrait ensuite afficher :

```text
[ExecutionTimeInterceptor] GET /api/v1/buildings - 3 ms
```

L’intercepteur observe le résultat, mais le filtre demeure responsable de construire la réponse d’erreur.


## 8. Configuration complète dans `main.ts`

Les trois éléments globaux doivent être enregistrés avant le démarrage du serveur.

```ts
import {
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ExecutionTimeInterceptor } from './common/interceptors/execution-time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(
    new ExecutionTimeInterceptor(),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  const port = Number(process.env.PORT);

  if (
    !Number.isInteger(port) ||
    port <= 0 ||
    port > 65535
  ) {
    throw new Error(
      'La variable PORT doit contenir un port valide.',
    );
  }

  await app.listen(port);
}

void bootstrap();
```

Le middleware n’apparaît pas dans `main.ts`, puisqu’il est associé aux routes dans `AppModule` avec `MiddlewareConsumer`.



## 9. Vérifier le comportement

Démarrer l’API :

```bash
PORT=3000 npm run start:dev
```

### Cas 1 : Requête valide

```bash
curl -i http://localhost:3000/api/v1/buildings
```

Résultat attendu :

```text
HTTP/1.1 200 OK
```

Le terminal affiche la requête et sa durée.

### Cas 2 : Identifiant inexistant

```bash
curl -i http://localhost:3000/api/v1/buildings/inconnu
```

Résultat attendu :

```text
HTTP/1.1 404 Not Found
```

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Le bâtiment inconnu est introuvable.",
  "timestamp": "2026-08-28T12:00:00.000Z",
  "path": "/api/v1/buildings/inconnu"
}
```

La valeur exacte de `timestamp` sera différente.

### Cas 3 : Corps invalide

```bash
curl -i \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"","address":"Montréal","yearBuilt":"ancien"}' \
  http://localhost:3000/api/v1/buildings
```

Résultat attendu :

```text
HTTP/1.1 400 Bad Request
```

Le champ `message` contient la liste des règles non respectées.

### Cas 4 : Doublon

Créer deux fois un bâtiment portant le même nom.

Résultat attendu pour la deuxième requête :

```text
HTTP/1.1 409 Conflict
```

### Cas 5 : Erreur inattendue

Une exception qui n’est pas une `HttpException` est prise en charge par le filtre interne de NestJS.

Résultat attendu :

```text
HTTP/1.1 500 Internal Server Error
```

On ne doit pas ajouter volontairement une erreur permanente dans le code pour tester ce scénario. On peut le vérifier avec un test isolé ou avec une route temporaire retirée avant le commit.


## 10. Vérifier la qualité du projet

```bash
npm run build
npm run lint
npm run test
npm run test:e2e
```

Les tests E2E devraient vérifier au minimum :

- `200` pour une collection de bâtiments;
- `201` pour une création valide;
- `400` pour un DTO invalide;
- `404` pour un identifiant inexistant;
- `409` pour un nom en double;
- `204` pour une suppression réussie;
- la présence de `statusCode`, `message`, `timestamp` et `path` dans une erreur HTTP.


## 11. Structure ajoutée au projet

```text
src/
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── interceptors/
│   │   └── execution-time.interceptor.ts
│   └── middleware/
│       └── request-logger.middleware.ts
├── buildings/
├── rooms/
├── app.module.ts
└── main.ts
```

Le dossier `common` contient les composants techniques utilisés par plusieurs fonctionnalités. Les règles propres aux bâtiments demeurent dans le module `buildings`.



## 12. Questions de compréhension

1. Pourquoi lance-t-on `NotFoundException` dans le service plutôt que dans le middleware?
2. Quelle est la différence entre `ValidationPipe` et un filtre d’exception?
3. Pourquoi le middleware doit-il appeler `next()`?
4. Pourquoi utilise-t-on `finalize()` dans l’intercepteur?
5. Quel composant construit le JSON d’erreur uniforme?
6. Pourquoi évite-t-on les `try/catch` dans chaque contrôleur?
7. Quel mécanisme existait déjà avant la création du filtre personnalisé?

### Réponses synthèses

1. Le service connaît les données et les règles de la fonctionnalité.
2. Le pipe détecte les données invalides; le filtre transforme l’exception en réponse HTTP.
3. Pour transmettre la requête au composant suivant.
4. Pour exécuter la journalisation à la fin, que l’opération réussisse ou échoue.
5. Le filtre d’exception personnalisé.
6. La gestion centralisée évite la duplication et produit des réponses cohérentes.
7. Le filtre d’exception intégré de NestJS.
