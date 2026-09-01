+++
date = '2025-09-21T23:52:40-04:00'
draft = false
title = '🧪 Laboratoire : Documentation Swagger et versionnement'
weight = 74
+++

## Ajouter Swagger à NestJS

### 1. Installer le module

Dans <code>energy-api</code> :

    npm install @nestjs/swagger

On doit choisir une version compatible avec la version majeure de NestJS utilisée par le projet.
Pour notre projet c'est la version 11 donc :
```bash
npm install @nestjs/swagger@^11.4.7
```

### 2. Séparer la configuration

Pour éviter d’alourdir <code>main.ts</code>, on peut créer :

    src/configure-swagger.ts

Cette fonction reçoit l’application NestJS et configure le document.

Exemple :

```ts
    import { INestApplication } from '@nestjs/common';
    import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

    export function configureSwagger(app: INestApplication): void {
      const config = new DocumentBuilder()
        .setTitle('Energy API')
        .setDescription(
          'API REST de gestion de données énergétiques pour des bâtiments.',
        )
        .setVersion('1.0.0')
        .addTag('Buildings', 'Gestion des bâtiments')
        .addTag('Rooms', 'Gestion des locaux')
        .addTag('Health', 'État du service')
        .build();

      const documentFactory = () =>
        SwaggerModule.createDocument(app, config);

      SwaggerModule.setup('docs', app, documentFactory, {
        jsonDocumentUrl: 'docs/openapi.json',
        customSiteTitle: 'Energy API — Documentation',
      });
    }
```

### 3. Appeler la configuration

Dans <code>main.ts</code>, l’ordre recommandé est :

1. créer l’application;
2. configurer le préfixe, le versionnement et la validation;
3. configurer Swagger;
4. démarrer le serveur.

```ts
    const app = await NestFactory.create(AppModule);
    configureApp(app);
    configureSwagger(app);
    await app.listen(...);

```

L’ordre est important pour que les chemins générés correspondent au préfixe et au versionnement.

### 4. Accéder aux résultats

Avec cette configuration :

| Ressource | Adresse locale |
|---|---|
| Swagger UI | <code>http://localhost:3000/docs</code> |
| Document JSON | <code>http://localhost:3000/docs/openapi.json</code> |
| API | <code>http://localhost:3000/api/v1</code> |

Il est préférable de ne pas installer Swagger UI sous <code>/api</code>, car ce chemin est déjà le préfixe fonctionnel de l’API.

---

## 5. Documenter les DTO

TypeScript efface une partie de l’information de type lors de l’exécution. Le module Swagger ne peut donc pas toujours déduire seul les schémas complets.

### 5.1 <code>@ApiProperty()</code>

Exemple adapté au DTO de création :

```ts
    @ApiProperty({
      description: 'Nom public et unique du bâtiment',
      example: 'Pavillon principal',
      maxLength: 100,
    })
    name!: string;
```

Pour une propriété numérique :

```ts
    @ApiProperty({
      description: 'Année de construction',
      example: 1965,
      minimum: 1800,
      maximum: 2026,
    })
    yearBuilt!: number;
```

### 5.2 Validation et documentation

Les décorateurs de validation contrôlent l’exécution. Les décorateurs Swagger décrivent le contrat.

```ts
    @ApiProperty({ example: 'Pavillon principal', maxLength: 100 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;
```

On doit garder ces deux dimensions cohérentes.

### 5.3 Modification partielle

Pour préserver correctement les métadonnées Swagger, utiliser les types mappés provenant de <code>@nestjs/swagger</code> dans les DTO documentés :

```ts
    import { PartialType } from '@nestjs/swagger';

    export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {}
```

Cette utilisation évite de perdre des métadonnées utiles dans le schéma généré.

### 5.4 DTO de réponse

Une interface TypeScript n’existe plus à l’exécution. Elle ne produit donc pas automatiquement un schéma OpenAPI.

Pour documenter les réponses, on privilégie une classe :

```ts
    export class BuildingResponseDto {
      @ApiProperty({ format: 'uuid' })
      id!: string;

      @ApiProperty({ example: 'Pavillon principal' })
      name!: string;

      @ApiProperty({ example: '7000, rue Marie-Victorin' })
      address!: string;

      @ApiProperty({ example: 1965 })
      yearBuilt!: number;
    }
```

Cette classe décrit le contrat de sortie; elle ne doit pas nécessairement contenir de logique.



## 6. Documenter les contrôleurs

### 6.1 Regrouper avec <code>@ApiTags()</code>

```ts
    @ApiTags('Buildings')
    @Controller({ path: 'buildings', version: '1' })
    export class BuildingsController {}
```

### 6.2 Décrire une opération

```ts
    @ApiOperation({
      summary: 'Créer un bâtiment',
      description: 'Ajoute un bâtiment à la collection courante.',
    })
```

Le résumé doit être court et distinct. La description ajoute seulement l’information utile au consommateur.

### 6.3 Documenter un paramètre

```ts
    @ApiParam({
      name: 'id',
      description: 'Identifiant UUID du bâtiment',
      format: 'uuid',
    })
```

Le nom doit correspondre exactement au paramètre de la route.

### 6.4 Documenter une réponse de succès

```ts
    @ApiCreatedResponse({
      description: 'Bâtiment créé.',
      type: BuildingResponseDto,
      headers: {
        Location: {
          description: 'URI de la nouvelle ressource',
          schema: { type: 'string' },
        },
      },
    })
```

Les décorateurs spécialisés rendent l’intention plus claire :

- <code>@ApiOkResponse()</code>;
- <code>@ApiCreatedResponse()</code>;
- <code>@ApiNoContentResponse()</code>;
- <code>@ApiBadRequestResponse()</code>;
- <code>@ApiNotFoundResponse()</code>;
- <code>@ApiConflictResponse()</code>.

### 6.5 Éviter la surcharge

On ne doit pas ajouter des décorateurs qui répètent sans valeur :

- le nom exact de la méthode;
- une description vague;
- un statut impossible;
- un exemple différent du DTO.

La qualité de la documentation est plus importante que le nombre d’annotations.



## 7. Documenter Problem Details

Créer une classe représentant le contrat d’erreur :

```ts
    export class ProblemDetailsDto {
      @ApiProperty({ example: 'about:blank' })
      type!: string;

      @ApiProperty({ example: 'Bad Request' })
      title!: string;

      @ApiProperty({ example: 400 })
      status!: number;

      @ApiProperty({
        example: 'La requête contient des données invalides.',
      })
      detail!: string;

      @ApiProperty({ example: '/api/v1/buildings' })
      instance!: string;

      @ApiPropertyOptional({
        type: [String],
        example: ['Le nom est obligatoire.'],
      })
      errors?: string[];
    }
```

Dans le contrôleur :

```ts
    @ApiBadRequestResponse({
      description: 'Données invalides.',
      type: ProblemDetailsDto,
    })
```

Cependant, le décorateur spécialisé ne précise pas toujours le type de média. On peut utiliser <code>@ApiResponse()</code> avec un contenu explicite lorsqu’on doit garantir <code>application/problem+json</code>.

### 7.1 Réduire la répétition

Si plusieurs contrôleurs utilisent exactement les mêmes erreurs, on peut créer des décorateurs composés avec <code>applyDecorators()</code>.

Cette abstraction doit être introduite après avoir compris les annotations individuelles. Une abstraction trop précoce rend la documentation difficile à lire et à modifier.


