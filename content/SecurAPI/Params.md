+++
date = '2025-09-22T00:04:44-04:00'
draft = false
title = '📘 Les paramètres de configuration et gestion de sessions'
weight = 52
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


### 1. Ajouter la prise en charge des paramètres de configuration

Les paramètres de configuration sont essentiels pour gérer les variables qui changent en fonction de l'environnement, comme les ports, les URL de base de données, etc. Nous allons utiliser le package `dotenv` pour charger les variables d'environnement à partir d'un fichier `.env`.

### 1.1 Installer `dotenv`

Installez [`dotenv`](https://www.npmjs.com/package/dotenv) en utilisant npm :

```bash
npm install dotenv
```
Une autre librairie permet de bien gérer les configurations des environnements est : `config`

```bash
npm i config
npm i --save-dev @types/config
``` 

### 1.2 Créer un fichier `.env`

Créez un fichier `.env` à la racine de votre projet avec le contenu suivant :

```
PORT=3000
SESSION_SECRET=votre_secret_pour_les_sessions
JWT_SECRET=votre_secret_jwt
DATABASE_URL=mongodb://localhost:27017/appdb
NODE_ENV=development
LOG_LEVEL=debug
```

Exemple `.env.production`
```
PORT=80
NODE_ENV=production
DB_URI=mongodb+srv://admin:***@cluster.mongodb.net/myapp
JWT_SECRET=${PROD_SECRET}
LOG_LEVEL=error
```

Ou avec la librairie `config` :
- Créer un dossier `config` à la racine de votre projet (pas dans src).
- Ajouter un fichier `default.json` (contient les valeurs par défaut des variables d'environnemnt et qui vont être utilisées si la valeur dans le fichier d'un environnement est absente).
- Ajouter un fichier `development.json`. 
- Ajouter un fichier `production.json`. 

> Il faut noter que cette librairie supporte d'autres format de fichiers tel que yaml, toml et xml. Évitez les .ts car ça cause des conflits avec d'autres librairies de tests.

### 2. Chargement et gestion des paramètres de configuration

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

### 2.1 Configuration du fichier `config.ts`

```tsx
// src/config/config.ts
import dotenv from 'dotenv';

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'secret_par_defaut_pour_le_jwt',
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/defaultdb',
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
};
```

### 3. Utilisation des paramètres de configuration dans l'application

Une fois les configurations centralisées, vous pouvez les utiliser dans tout le projet en important le fichier `config.ts`.

### 3.1 Exemple d'utilisation dans `app.ts`

```tsx
import express from 'express';
import { config } from './config/config';
import session from 'express-session';

const app = express();

// Middleware de session avec la clé secrète provenant des variables de configuration
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.isProduction, // Les cookies sécurisés ne sont activés qu'en production
  }
}));

// Point de départ de l'application
app.get('/', (req, res) => {
  res.send('Hello, Express avec TypeScript et Configuration!');
});

// Exporter l'application
export default app;
```

### 1.3 Charger les variables d'environnement

Modifiez votre fichier `index.js` pour charger les variables d'environnement en utilisant `dotenv` :

```jsx
require('dotenv').config();

const express = require('express');
const app = express();

// Utilisation des variables d'environnement
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Servir des fichiers statiques
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur Express!');
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Bonjour, ${name}!`);
});

app.get('/info', (req, res) => {
  res.json({
    version: '1.0.0',
    environment: nodeEnv,
    description: 'Ceci est un serveur simple utilisant Express.js',
  });
});

// Route pour simuler une erreur
app.get('/cause-error', (req, res) => {
  throw new Error('Erreur simulée!');
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose s\'est mal passé!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port} en mode ${nodeEnv}`);
});
```

### 2. Stocker des informations sensibles

Les informations sensibles tel que les mots de passes et les secrets ne devraient pas être stockées directement dans le fichier de configuration.
Une des façons les plus simples pour faire ça c'est de créer une variable d'environnement de la valeur sensible par ligne de commande. Exemple : 

ou 
```bash
export sell_app_jwt_secret=Abc1234
``` 

Dans le dossier config créer un fichier avec le nom suivant `custom-environment-variables.json`. Dans ce fichier on va définir une correspondance entre les paramètres de configurations et les variables d'environnement.

Exemple :

```json
{
  "jwtSecret": "sell_app_jwt_secret"
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
export sell_app_jwt_secret=Abc1234
``` 
Quand vous relancer votre serveur l'affichage précédent donnera :
```bash
Abc123
```
Ce qui va écraser la valeur de la variable définie dans le fichier default.json.
### 3. Fichier `index.js` exemple

Voici à quoi ressemble le fichier `index.js` après avoir ajouté toutes ces fonctionnalités :

```jsx
require('dotenv').config();

const express = require('express');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

// Middleware de session
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: nodeEnv === 'production' }
}));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Servir des fichiers statiques
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur Express!');
});

app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Bonjour, ${name}!`);
});

app.get('/info', (req, res) => {
  res.json({
    version: '1.0.0',
    environment: nodeEnv,
    description: 'Ceci est un serveur simple utilisant Express.js',
  });
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send(`Bienvenue ${req.session.user.username}`);
});


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port} en mode ${nodeEnv}`);
});
```

### 4. Gestion des environnements multiples

Dans les environnements réels, vous devrez gérer différents paramètres de configuration pour différents environnements (développement, production, test). Pour ce faire, vous pouvez utiliser des fichiers `.env` spécifiques à chaque environnement, ou ajouter une logique pour gérer différents environnements dans votre fichier de configuration.

| Environnement     | Objectif principal                             |
| ----------------- | ---------------------------------------------- |
| **Développement** | Itération rapide, logs détaillés, hot reload   |
| **Test**          | Automatiser les tests (unitaires, intégration) |
| **Staging**       | Pré-production, environnement miroir du prod   |
| **Production**    | Environnement final, sécurisé, optimisé        |


### 4.1 Fichiers `.env` pour différents environnements
- `.env`                  (fallback ou local)
- `.env.development`      (pour les devs)
- `.env.production`       (pour la production)
- `.env.test`             (pour les tests)

Vous pouvez adapter le chargement des fichiers `.env` en fonction de l'environnement :

```tsx
// src/config/config.ts
import * as dotenv from 'dotenv';
import * as path from 'path';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, '..', envFile) });

export const config = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  logLevel: process.env.LOG_LEVEL || 'info'
};
```

### 4.2 Gestion dynamique des configurations

Si vous devez avoir une gestion plus fine des environnements, vous pouvez aussi définir des configurations spécifiques dans `config.ts` en fonction de l'environnement.

```tsx
// src/config/config.ts
import dotenv from 'dotenv';

dotenv.config();

const development = {
  port: process.env.PORT || 3000,
  sessionSecret: 'dev_secret',
  jwtSecret: 'dev_jwt_secret',
  databaseUrl: 'mongodb://localhost:27017/devdb',
};

const production = {
  port: process.env.PORT || 80,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
};

const config = process.env.NODE_ENV === 'production' ? production : development;

export { config };
```

### 5. Sécurisation des variables de configuration

Il est essentiel de **ne jamais** inclure des informations sensibles (comme les clés secrètes, les mots de passe, etc.) dans votre code source versionné. Assurez-vous que le fichier `.env` est inclus dans le fichier `.gitignore` pour éviter qu'il soit commité.

Exemple de fichier `.gitignore` :

```
# Ignorer les fichiers d'environnement
.env
.env.dev
.env.production
.env.test
```

### 6. Bonnes pratiques

- **Définitions Claires** : Utilisez un fichier `config.ts` centralisé pour toutes les configurations, avec des valeurs par défaut si nécessaire.
- **Utilisation de Variables d'Environnement** : Utilisez `dotenv` pour charger les variables d'environnement depuis un fichier `.env`.
- **Sécurisation** : Assurez-vous que les fichiers `.env` ne sont pas versionnés (ajoutez-les à `.gitignore`).
- **Isolation des Environnements** : Créez des fichiers `.env` séparés pour différents environnements (développement, production, test).
- **Paramètres Adaptés à l'Environnement** : Chargez des configurations spécifiques en fonction de l'environnement d'exécution (`NODE_ENV`).
