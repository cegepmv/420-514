+++
date = '2025-09-22T00:04:44-04:00'
draft = false
title = '📘 Les paramètres de configuration et gestion de sessions'
weight = 100
+++

La prise en charge des paramètres de configuration pour personnaliser l'application en fonction des environnements (développement, production).

Les fichiers de configuration permettent de :
- Séparer la logique métier de la configuration
- Paramétrer l’environnement (développement, production, test)
- Faciliter le déploiement automatisé
- Standardiser les outils utilisés dans le projet

## Exemples de types de configuration
| Outil / Fichier | Utilité principale                                      |
| --------------- | ------------------------------------------------------- |
| `package.json`  | Gère les dépendances, scripts de build/test/lint        |
| `tsconfig.json` | Configure le compilateur TypeScript                     |
| `.env`          | Stocke les variables d’environnement (port, clés, etc.) |
| `.gitignore`    | Ignore des fichiers lors du versionnement Git           |
| `nodemon.json`  | Hot reload pour dev                                     |
| `swagger.json`  | Génère la documentation de l’API                        |

## 1. Gestion des environnements multiples

Dans les environnements réels, vous devrez gérer différents paramètres de configuration pour différents environnements (développement, production, test). Pour ce faire, vous pouvez utiliser des fichiers `.env` spécifiques à chaque environnement, ou ajouter une logique pour gérer différents environnements dans votre fichier de configuration.

| Environnement     | Objectif principal                             |
| ----------------- | ---------------------------------------------- |
| **Développement** | Itération rapide, logs détaillés, hot reload   |
| **Test**          | Automatiser les tests (unitaires, intégration) |
| **Staging**       | Pré-production, environnement miroir du prod   |
| **Production**    | Environnement final, sécurisé, optimisé        |


### Fichiers `.env` pour différents environnements
- `.env`                  (fallback ou local)
- `.env.development`      (pour les devs)
- `.env.production`       (pour la production)
- `.env.test`             (pour les tests)


## 2. Ajouter la prise en charge des paramètres de configuration

Les paramètres de configuration sont essentiels pour gérer les variables qui changent en fonction de l'environnement, comme les ports, les URL de base de données, etc. Nous allons utiliser le package `config` pour charger les variables d'environnement à partir d'un fichier `.env`.

### 2.1 Installer les dépendances nécessaires

Installez le module ``@nestjs/config``:

```bash
npm install `@nestjs/config`
```
### 2.2 Créer un fichier `.env`
Créez un fichier `.env` à la racine de votre projet pour stocker les variables d'environnement.

**Exemple de fichier `.env` :**

```bash
# Port de l'application
PORT=3000

# URL de la base de données
DATABASE_URL=mongodb://localhost:27017/energy-api

# Clé secrète pour JWT
JWT_SECRET=supersecretkey

# Environnement (dev, prod, test)
NODE_ENV=development

LOG_LEVEL=debug
```

**Exemple `.env.production`**

```shell
PORT=80
NODE_ENV=production
DB_URI=mongodb+srv://admin:***@cluster.mongodb.net/energy-api
JWT_SECRET=${PROD_SECRET}
LOG_LEVEL=error
```

#### Organisation des fichiers de configuration dans le dossier `config` :
- Créer un dossier `config` à la racine de votre projet (pas dans src).
- Ajouter un fichier `default.json` (contient les valeurs par défaut des variables d'environnemnt et qui vont être utilisées si la valeur dans le fichier d'un environnement est absente).
- Ajouter un fichier `development.json`. 
- Ajouter un fichier `production.json`. 

> Il faut noter que cette librairie supporte d'autres format de fichiers tel que yaml, toml et xml. Évitez les .ts car ça cause des conflits avec d'autres librairies de tests.

### 2.3 Configurer le module `@nestjs/config`
Ajoutez le module ConfigModule dans votre fichier `app.module.ts` pour charger les variables d'environnement.

**Exemple de `app.module.ts` :**
```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permet d'utiliser les variables globalement dans toute l'application
      envFilePath: `.env`, // Chemin vers le fichier .env
    }),
  ],
})
export class AppModule {}
```

### 2.4 Accéder aux variables d'environnement
Utilisez le service ConfigService pour accéder aux variables d'environnement dans vos services, contrôleurs ou modules.

**Exemple dans un service (`example.service.ts`) :**

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExampleService {
  constructor(private readonly configService: ConfigService) {}

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL'); // Récupère la variable DATABASE_URL
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET'); // Récupère la variable JWT_SECRET
  }
}
```

### 2.5 Ajouter des schémas de validation
Pour éviter les erreurs dues à des variables d'environnement manquantes ou mal configurées, utilisez Joi pour valider les variables d'environnement.

**Installer Joi :**

```shell
npm install joi
```
**Exemple de validation dans app.module.ts :**

```ts
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000), // Définit une valeur par défaut
        DATABASE_URL: Joi.string().required(), // Rend cette variable obligatoire
        JWT_SECRET: Joi.string().required(),
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
      }),
    }),
  ],
})
export class AppModule {}
```

### 2.6 Utiliser des fichiers de configuration spécifiques à l'environnement
Pour gérer plusieurs environnements (développement, production, test), vous pouvez utiliser des fichiers `.env` spécifiques.

**Exemple de structure de fichiers :**

```
.env.development
.env.production
.env.test
```

**Exemple de configuration dans app.module.ts :**

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Charge le fichier en fonction de NODE_ENV
    }),
  ],
})
export class AppModule {}
```

### 2.7 Exemple complet avec utilisation
**Exemple de fichier .env.development :**

```shell
PORT=3000
DATABASE_URL=mongodb://localhost:27017/dev-db
JWT_SECRET=devsecretkey
NODE_ENV=development
```

**Exemple de fichier .env.production :**

```shell
PORT=8080
DATABASE_URL=mongodb://prod-db-host:27017/prod-db
JWT_SECRET=prodsecretkey
NODE_ENV=production
```
**Exemple d'utilisation dans un service :**

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}

  connectToDatabase() {
    const dbUrl = this.configService.get<string>('DATABASE_URL');
    console.log(`Connecting to database at ${dbUrl}`);
    // Ajoutez ici la logique pour connecter à la base de données
  }
}
```
### 2.8 Tester les configurations
1. **Lancer l'application en mode développement :**

```shell
NODE_ENV=development npm run start:dev
```

2. **Lancer l'application en mode production :**

```shell
NODE_ENV=production npm run start
```
3. **Vérifier les logs :** Assurez-vous que les bonnes variables d'environnement sont chargées en fonction de l'environnement.

### 2.9 Recommandations pour la production

1. **Ne pas inclure le fichier `.env` dans Git :** Ajoutez le fichier `.env` à votre `.gitignore` pour éviter de versionner des informations sensibles.

```shell
# .gitignore
.env
.env.*
```

2. **Utiliser un gestionnaire de secrets :** En production, utilisez un gestionnaire de secrets comme `AWS Secrets Manager`, `Azure Key Vault`, ou `HashiCorp Vault` pour stocker les variables sensibles.

3. **Limiter l'accès aux fichiers de configuration :** Assurez-vous que seuls les utilisateurs autorisés peuvent accéder aux fichiers `.env`.

### **Résumé des étapes**
1. Installez `@nestjs/config` pour gérer les variables d'environnement.
2. Créez un fichier `.env` pour stocker les variables.
3. Configurez le module `ConfigModule` dans app.module.ts.
4. Utilisez le service `ConfigService` pour accéder aux variables.
5. Ajoutez une validation avec `Joi` pour éviter les erreurs.
6. Gérez plusieurs environnements avec des fichiers `.env` spécifiques.
7. Testez les configurations en fonction de l'environnement.

Avec cette configuration, votre application NestJS est prête à gérer les paramètres de configuration de manière sécurisée et adaptée à différents environnements.


## 3. Chargement et gestion des paramètres de configuration

Pour centraliser la gestion des configurations, vous pouvez créer un fichier dédié, comme `config.ts`. Ce fichier récupérera les variables d'environnement et fournira des valeurs par défaut si nécessaire.


On peut changer la variable d'environnement `NODE_ENV` en exécutant la ligne de commande suivante :

```bash
export NODE_ENV=development
``` 
ou 
```bash
export NODE_ENV=production
``` 
pour changer l'environnenement à production.

on peut vérifier dans le fichier app.ts en affichant sa valeur : `console.log(`Environnement : ${app.get('env')}`);` (par défaut la valeur est `development`) ou en affichant la valeur de `process.env.NODE_ENV`.

## 4. Stocker des informations sensibles

Les informations sensibles tel que les mots de passes et les secrets ne devraient pas être stockées directement dans le fichier de configuration.
Une des façons les plus simples pour faire ça c'est de créer une variable d'environnement de la valeur sensible par ligne de commande. Exemple : 

ou 
```bash
export energy_api_jwt_secret=Abc1234
``` 

Dans le dossier config créer un fichier avec le nom suivant `custom-environment-variables.json`. Dans ce fichier on va définir une correspondance entre les paramètres de configurations et les variables d'environnement.

Exemple :

```json
{
  "jwtSecret": "energy_api_jwt_secret"
}
```
Enlever la clé `jwtSecret` de vos fichier d'environnement .json sauf default.

```ts
const key = 'jwtSecret';
console.log(config.has(key) ? config.get(key) : `la clé ${key} n'existe pas ou est mal chargée!`);
```

vous pouvez lancer votre serveur avant de définir une valeur à la clé secrète ce qui affichera : 
```bash
votre_secret_jwt
```
Définir la valeur de la variable en exécutant la ligne de commande :
```bash
export energy_api_jwt_secret=Abc1234
``` 
Quand vous relancer votre serveur l'affichage précédent donnera :
```bash
Abc123
```
Ce qui va écraser la valeur de la variable définie dans le fichier default.json.


## 5. Bonnes pratiques

- **Définitions Claires** : Utilisez un fichier `config.ts` centralisé pour toutes les configurations, avec des valeurs par défaut si nécessaire.
- **Utilisation de Variables d'Environnement** : Utilisez `config` pour charger les variables d'environnement depuis un fichier `.env`.
- **Sécurisation** : Assurez-vous que les fichiers `.env` ne sont pas versionnés (ajoutez-les à `.gitignore`).
- **Isolation des Environnements** : Créez des fichiers `.env` séparés pour différents environnements (développement, production, test).
- **Paramètres Adaptés à l'Environnement** : Chargez des configurations spécifiques en fonction de l'environnement d'exécution (`NODE_ENV`).
