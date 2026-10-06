+++
draft = false
title = '🧪 Laboratoire : Configuration d’un serveur de test avec Node.js'
weight = 102
+++

Pour configurer un **serveur de test** avec **NestJS**, vous pouvez tirer parti des fonctionnalités intégrées du framework et des outils dédiés aux tests.

### Étapes pour configurer un serveur de test en NestJS

1. **Organisation des Environnements** : Utilisez des fichiers de configuration pour séparer les paramètres de test et de production.
2. **Configuration de l’application** : Modifiez les paramètres en fonction de l'environnement avec le module `@nestjs/config`.
3. **Utilisation d’outils de tests** : Employez des outils comme **Jest** (intégré par défaut dans NestJS) et des bibliothèques comme **Supertest** pour tester les points de terminaison.


### Étape 1 : Organisation des environnements avec un fichier `.env`

1. Dans NestJS, vous pouvez utiliser le module `@nestjs/config` pour charger les variables d'environnement depuis un fichier `.env`. Installez-le si ce n'est pas déjà fait :

```bash
npm install @nestjs/config
```
2. **Créer deux fichiers .env** pour les environnements de **test** et **production**.
- **Fichier `.env.production`** :
      
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=mongodb://localhost:27017/proddb
JWT_SECRET=myproductionsecret
```
        
3. **Utiliser un fichier `.env.test`** : Créez un fichier `.env.test` pour définir des variables spécifiques à l'environnement de test. Par exemple :

```env
NODE_ENV=test
PORT=3001
DATABASE_URL=mongodb://localhost:27017/testdb
JWT_SECRET=mytestsecret
```

4. **Créer un fichier `.env`** à la racine de votre projet et ajoutez-y vos variables d'environnement :
```shell
NODE_ENV=test
DATABASE_URL=mongodb://localhost:27017/testdb
```

5. **Charger les variables d'environnement** : Utilisez un package comme `config` pour charger les variables d'environnement dans votre application. Ensuite, **configurez le module** dans votre application principale (AppModule) :

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables accessibles globalement
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Charger le fichier en fonction de l'environnement
    }),
  ],
})
export class AppModule {}
```

6. **Démarrer l'application** :
- Pour le mode production :

```bash
npm run start:prod
```

- Pour le mode test :

```bash
npm run start:test
```

Assurez-vous d'ajouter les scripts correspondants dans votre fichier `package.json` :

```json
"scripts": {
  "start": "node dist/main.js",
  "start:prod": "NODE_ENV=production node dist/main.js",
  "start:test": "NODE_ENV=test node dist/main.js"
}
```


### Étape 2 : Configuration de l’application pour les tests
Dans le fichier `test/app.e2e-spec.ts`, configurez un environnement de test spécifique. Par exemple :

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
```

### Étape 3 : Utilisation d’outils et des scripts de tests 

1. **Installer les dépendances nécessaires pour les tests** (Supertest est utile pour les tests d'intégration) :

```bash
npm install --save-dev supertest
```

2. **Configurer le script de test dans `package.json`** :  
Ajoutez un script pour lancer les tests dans le fichier `package.json` :

```json
"scripts": {
  "start": "node dist/main.js",
  "test": "jest",
  "test:e2e": "jest --config ./test/jest-e2e.json"
}
```

3. **Configurer Jest pour les tests de bout en bout** :  
Créez un fichier `jest-e2e.json` dans le dossier `test` (ou à la racine) avec le contenu suivant :

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "../",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "setupFilesAfterEnv": ["<rootDir>/test/setup.ts"],
  "moduleNameMapper": {
    "^src/(.*)$": "<rootDir>/src/$1"
  },
  "testEnvironment": "node"
}
```

4. **Créer un fichier de configuration pour les tests** :  
Ajoutez un fichier `test/setup.ts` pour configurer l'environnement de test si nécessaire. Par exemple :

```typescript
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
process.env.DATABASE_URL = configService.get<string>('DATABASE_URL_TEST');
```

Avec cette configuration, vous pouvez exécuter vos tests avec `npm run test` pour les tests unitaires et `npm run test:e2e` pour les tests de bout en bout.

NestJS utilise `Jest` comme framework de test par défaut. Vous pouvez également utiliser `Supertest` pour tester vos points de terminaison HTTP. Assurez-vous que `Jest` est configuré dans votre projet (ce qui est le cas par défaut dans les projets NestJS).

Pour exécuter les tests, utilisez la commande suivante :

```shell
npm run test:e2e
```

Cela exécutera les tests de bout en bout définis dans le dossier `test`.


### Étape 4 : Créer un test d’intégration pour le serveur de test

1. **Créer un fichier de test** : Ajoutez un fichier de test dans le dossier `test`. Par exemple, créez `test/app.e2e-spec.ts`.

2. **Écrire un test d’intégration** : Utilisez **Jest** et **Supertest** pour écrire un test simple. Voici un exemple :

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Devrait répondre avec un statut 200 sur la route principale', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});

3. **Exécuter les tests** : Lancez les tests avec la commande suivante :

```bash
npm run test:e2e
```

Assurez-vous que le script test:e2e est configuré dans votre package.json :

```json
"scripts": {
  "test:e2e": "jest --config ./test/jest-e2e.json"
}
```

### Étape 5 : Ajouter des tests supplémentaires

1. **Tester des routes spécifiques** : Ajoutez des tests pour d'autres points de terminaison de votre API. Par exemple :

```typescript
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('Test de l\'API /users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Devrait retourner une liste d\'utilisateurs', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  afterAll(async () => {
    await app.close();
  });
});
```

2. **Tester les erreurs** : Ajoutez des tests pour vérifier le comportement de votre application en cas d'erreurs (par exemple, une route inexistante ou une erreur serveur).

```ts
it('Devrait retourner une erreur 404 pour une route inexistante', async () => {
  await request(app.getHttpServer())
    .get('/non-existent-route')
    .expect(404);
});
```


### Étape 6 : Utilisation d’une base de données de test

Pour un serveur de test avec **NestJS**, il est recommandé d'utiliser une **base de données séparée** des données de production. Configurez la connexion à la base de données en utilisant le module `@nestjs/config` et un fichier `.env.test`.

1. **Configurer la variable d'environnement** :  
Ajoutez une variable `DB_CONNECTION_STRING` dans votre fichier `.env.test` :

```env
DB_CONNECTION_STRING=mongodb://localhost:27017/testdb
```

2. **Configurer le module de base de données dans `AppModule` :**
Utilisez le module `@nestjs/mongoose` (ou tout autre module de base de données) pour établir la connexion :

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Charge le fichier .env en fonction de l'environnement
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Récupère la chaîne de connexion depuis .env
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

3. **Exécuter l'application en mode test :**
Assurez-vous de définir `NODE_ENV=test` avant de démarrer l'application pour qu'elle utilise le fichier `.env.test` :

```shell
NODE_ENV=test npm run start
```
