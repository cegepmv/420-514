+++
date = '2025-09-22T00:04:44-04:00'
draft = true
title = 'Les paramètres de configuration et gestion de sessions'
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

### 2. Chargement et gestion des paramètres de configuration

Pour centraliser la gestion des configurations, vous pouvez créer un fichier dédié, comme `config.ts`. Ce fichier récupérera les variables d'environnement et fournira des valeurs par défaut si nécessaire.

### 2.1 Configuration du fichier `config.ts`

```tsx
// src/config/config.ts
import dotenv from 'dotenv';

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'secret_par_defaut_pour_les_sessions',
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

### 2. Intégrer un système de gestion des sessions

#### Différence entre Session et JWT

| Fonctionnalité      | Session (stateful)                | JWT (stateless)                   |
| ------------------- | --------------------------------- | --------------------------------- |
| Stockage de l’état  | Côté serveur (en mémoire, Redis…) | Côté client (dans le token)       |
| Performances        | Moins scalable                    | Très scalable                     |
| Invalidation        | Facile (supprimer session)        | Complexe (expire ou blacklist)    |
| Sécurité du contenu | Serveur contrôle tout             | Risque de fuite de secret / token |

> On préfère souvent JWT pour les APIs REST mais les sessions sont très utiles pour des interfaces Web sécurisées ou hybrides.

Pour suivre les utilisateurs, nous allons utiliser `express-session`, un middleware qui permet de gérer les sessions. Cela vous permet de stocker des données par utilisateur et de les retrouver à chaque requête.

### **Mécanisme de gestion des sessions**

- **Session côté serveur** : La session est stockée côté serveur (par exemple en mémoire, en base de données ou dans un magasin comme Redis) et une clé de session est envoyée au client via un cookie. À chaque requête suivante, ce cookie est renvoyé pour identifier l'utilisateur.
- **Session côté client** : La session peut être gérée entièrement côté client (par exemple avec des tokens JWT), mais cette méthode diffère du mécanisme classique basé sur les sessions.

### 2.1 Installer `express-session`

Installez le package `express-session` :

```bash
npm install express-session
```

### 2.2 Configurer le middleware de session

Modifiez votre fichier `index.js` pour configurer et utiliser `express-session` :

```jsx
import session from 'express-session';

app.use(session({
  secret: process.env.SESSION_SECRET || 'ultraSecretKey123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 30 // 30 minutes
  }
}));
```

- **`resave`** : Indique si la session doit être sauvegardée dans le magasin même si elle n’a pas été modifiée durant la requête. La valeur par défaut est `false`.
- **`saveUninitialized`** : Définit si une session non initialisée doit être sauvegardée. Une session est non initialisée quand elle est nouvelle mais n'a pas été modifiée. Par défaut, c'est `true`, mais il est souvent préférable de le mettre à `false` pour éviter de sauvegarder des sessions vides.
- **`cookie`** : Configuration des cookies qui stockent l'ID de session. Cela peut inclure :
    - **`secure`** : Indique si le cookie doit être envoyé uniquement sur des connexions HTTPS. En production, il doit être activé pour des raisons de sécurité.
    - **`maxAge`** : Durée de vie du cookie avant son expiration. Par exemple, pour une durée de 30 minutes :
        
        ```jsx
        cookie: { maxAge: 1800000 }
        ```
        
- **`rolling`** : Si défini à `true`, le cookie de session est renvoyé à chaque requête, ce qui permet de prolonger la durée de vie de la session.

### 2.3 Création de session après login
```ts
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validation fictive
  if (username === 'admin' && password === '1234') {
    req.session.user = { username };
    res.send('Connexion réussie');
  } else {
    res.status(401).send('Identifiants invalides');
  }
});
```

### 2.4 Utiliser les sessions

Vous pouvez maintenant utiliser les sessions pour stocker et récupérer des informations par utilisateur. 
Middleware de protection :
```jsx
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  return res.status(401).send('Authentification requise');
}

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send(`Bienvenue ${req.session.user.username}`);
});

```

Déconnexion :

```jsx
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send('Erreur déconnexion');
    res.clearCookie('connect.sid');
    res.send('Déconnecté');
  });
});
```

### 2.5. **Stockage des sessions**

Le stockage des sessions peut être fait en mémoire, mais cela n'est pas adapté à des applications à grande échelle. Il est préférable d'utiliser un magasin de sessions persistant comme :

- **Redis** : Un système de stockage en mémoire rapide.
- **MongoDB** : Utilisé avec des bibliothèques comme `connect-mongo`.
- **Memcached** : Pour des sessions distribuées.

Exemple avec Redis :

```jsx
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'mySuperSecretKey',
    resave: false,
    saveUninitialized: false
}));
```

### 2.6. **Sécurité des sessions**

- **Utilisation de HTTPS** : Les cookies de session doivent être transmis uniquement via des connexions HTTPS pour éviter qu'ils ne soient interceptés.
- **`httpOnly` cookie** : Définit si le cookie est accessible uniquement via le protocole HTTP(S) et non via des scripts JavaScript du côté client.
- **Expiration des sessions** : Une session doit expirer après un certain temps d'inactivité pour des raisons de sécurité. C'est généralement géré par le paramètre `maxAge` du cookie.
- **Protection contre les attaques CSRF et XSS** : Intégrer des protections contre les attaques Cross-Site Request Forgery (CSRF) et Cross-Site Scripting (XSS) est essentiel pour éviter la manipulation des sessions.

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
