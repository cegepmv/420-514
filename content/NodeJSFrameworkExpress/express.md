+++
draft = false
title = 'Express'
weight = 22
+++


## Introduction à Express

**Express** est un framework web minimaliste pour Node.js, permettant de créer des applications web robustes et modulaires. Il facilite la gestion des routes, le rendu de vues dynamiques, et l'intégration de middlewares pour diverses tâches comme les sessions ou l'authentification.

### Exemple d'Express

```jsx
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Application à l'écoute sur le port ${port}!`);
});
```

![Exepmle simple de Serveur Node](/420-514/images/simpleNodeServer.png)

Source : [https://app.pluralsight.com/library/courses/nodejs-express-foundations/description](https://app.pluralsight.com/library/courses/nodejs-express-foundations/description)

## Middleware et Gestion des Erreurs

Les middlewares sont des fonctions intermédiaires dans le traitement des requêtes. Ils sont essentiels pour gérer les fichiers statiques, les sessions, les erreurs, etc.

![Middleware](/420-514/images/Middleware.png)

Source : [https://app.pluralsight.com/library/courses/nodejs-express-foundations/description](https://app.pluralsight.com/library/courses/nodejs-express-foundations/description)

```jsx
const express = require("express");
const app = express();

let middlewareFunction = (req, res, next) => {
  // Logique du middleware
  next();
};

app.use(middlewareFunction);
app.listen(3000);
```

Un **middleware** dans Node.js est une fonction qui a accès à l'objet de requête (`req`), l'objet de réponse (`res`), et à la fonction `next()` dans le cycle de traitement des requêtes HTTP.

Les middlewares permettent de modifier, d'analyser, d'intercepter ou de répondre aux requêtes avant qu'elles n'atteignent les routes finales. Ils sont très utiles pour ajouter des fonctionnalités transversales (comme l'authentification, la gestion des erreurs, le logging, etc.) sans modifier chaque route de l'application.

### Fonctionnement d'un middleware :

Un middleware est une fonction qui peut faire les choses suivantes :

1. **Exécuter du code**.
2. **Modifier l'objet de requête (`req`) ou de réponse (`res`)**.
3. **Terminer le cycle de la requête/réponse** (par exemple en renvoyant une réponse au client).
4. **Appeler la fonction `next()`** pour passer la main au middleware suivant dans la chaîne.

### Exemple de middleware simple :

Voici un exemple basique d'un middleware dans Express :

```jsx
app.use((req, res, next) => {
  console.log('Middleware exécuté pour chaque requête');
  next(); // Passe la main au middleware ou à la route suivante
});

```

Dans cet exemple :

- Ce middleware s'exécutera pour **toutes les requêtes** reçues par l'application.
- Il affiche un message dans la console et appelle `next()` pour permettre à Express de continuer avec les middlewares suivants ou les routes définies.

### Types de middlewares dans Express :

1. **Middlewares d'application** :
    - Ces middlewares sont associés à l'instance de l'application (`app`) et s'exécutent pour toutes les routes ou pour des routes spécifiques.
    - Exemple :
        
        ```jsx
        app.use((req, res, next) => {
          console.log('Ceci est un middleware d\\'application');
          next();
        });
        
        ```
        
2. **Middlewares spécifiques à une route** :
    - Ils s'appliquent à une ou plusieurs routes spécifiques.
    - Exemple :
        
        ```jsx
        app.get('/user', (req, res, next) => {
          console.log('Middleware pour la route /user');
          next();
        }, (req, res) => {
          res.send('Profil utilisateur');
        });
        
        ```
        
3. **Middlewares intégrés** :
    - Express fournit des middlewares intégrés comme `express.json()` ou `express.urlencoded()` pour parser les corps des requêtes.
    - Exemple :
        
        ```jsx
        app.use(express.json());
        ```
        
4. **Middlewares tiers** :
    - Vous pouvez installer des middlewares fournis par la communauté pour des tâches spécifiques, comme la gestion des sessions, la sécurité, etc.
    - Exemple : `morgan` pour le logging des requêtes HTTP.
        
        ```jsx
        const morgan = require('morgan');
        app.use(morgan('dev'));
        
        ```
        
5. **Middlewares de gestion des erreurs** :
    - Un middleware de gestion des erreurs prend quatre paramètres : `(err, req, res, next)` et est utilisé pour capturer les erreurs et renvoyer des réponses appropriées.
    - Exemple :
        
        ```jsx
        app.use((err, req, res, next) => {
          console.error(err.stack);
          res.status(500).send('Quelque chose s\'est mal passé !');
        });
        ```
        

## Pourquoi utiliser des middlewares ?

1. **Modularité** : Ils permettent d'ajouter des fonctionnalités réutilisables, comme la gestion des sessions, sans toucher à chaque route de l'application.
2. **Composabilité** : Les middlewares peuvent être chaînés pour créer un pipeline de traitement des requêtes.
3. **Réutilisabilité** : Vous pouvez créer des middlewares personnalisés qui peuvent être réutilisés à travers plusieurs routes ou applications.

## Utilisation des Bases de Données

Node.js prend en charge plusieurs bases de données comme MongoDB. Pour connecter votre application à une base de données, vous devez installer le pilote correspondant.

**Exemple MongoDB :**

```jsx
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/animals", (err, client) => {
  if (err) throw err;
  let db = client.db("animals");
  db.collection("mammals").find().toArray((err, result) => {
    if (err) throw err;
    console.log(result);
    client.close();
  });
});

```

## Gestion du logging

Autre middlewares pour la gestion du logging, ainsi que pour servir des fichiers statiques comme des pages HTML avec Express.

### Ajouter des Middlewares pour le Logging

Les middlewares sont des fonctions qui ont accès à l'objet `request` (req), l'objet `response` (res) et à la fonction `next` dans le cycle de requête-réponse. Ils sont utiles pour intercepter et gérer des requêtes avant qu'elles ne parviennent aux routes définies.

### Ajouter un Middleware de Logging

Un middleware de logging peut enregistrer chaque requête reçue par le serveur. Ajoutez le code suivant au début de votre fichier `index.js` :

```jsx
const express = require('express');
const app = express();
const port = 3000;

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

### Servir des Fichiers Statiques

Pour servir des fichiers statiques comme des pages HTML, CSS, ou des images, Express offre une méthode simple. Créez un dossier `public` dans votre projet pour stocker ces fichiers.

#### Créer un Dossier `public`

1. **Créez le dossier `public`** à la racine de votre projet :
    
    ```bash
    mkdir public
    ```
    
2. **Ajoutez un fichier HTML dans le dossier `public`** :
    
    Créez un fichier `index.html` dans le dossier `public` avec le contenu suivant :
    
    ```html
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Page d'accueil</title>
    </head>
    <body>
        <h1>Bienvenue sur mon site!</h1>
        <p>Ceci est une page HTML servie par Express.</p>
    </body>
    </html>
    ```
    

#### Configurer Express pour Servir les Fichiers Statiques

Ajoutez le code suivant à votre `index.js` pour permettre à Express de servir les fichiers du dossier `public` :

```jsx
// Servir des fichiers statiques
app.use(express.static('public'));
```

#### Tester

1. **Testez le Middleware de Logging** : Lancez votre serveur avec `node index.js` et accédez à différentes routes (par exemple, `/` ou `/info`). Vous devriez voir les requêtes enregistrées dans le terminal.
2. **Testez le Middleware de Gestion des Erreurs** : Pour simuler une erreur, vous pouvez créer une route qui lève une exception :
    
    ```jsx
    app.get('/cause-error', (req, res) => {
      throw new Error('Erreur simulée!');
    });
    ```
    
    En accédant à cette route (`GET <http://localhost:3000/cause-error`>), vous verrez le message d'erreur personnalisé.
    
3. **Testez la Servitude des Fichiers Statiques** : Accédez à `http://localhost:3000/` dans votre navigateur. Vous devriez voir la page HTML créée dans `public/index.html`.

#### Le Fichier `index.js`

Voici le code final du fichier `index.js` :

```jsx
const express = require('express');
const app = express();
const port = 3000;

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Servir des fichiers statiques
app.use(express.static('public'));

// Route de base
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur Express!');
});

// Route pour afficher un message personnalisé
app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Bonjour, ${name}!`);
});

// Route qui renvoie les informations sur le serveur
app.get('/info', (req, res) => {
  res.json({
    version: '1.0.0',
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
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});

```

---

## Utiliser la librairie de Journalisation `Winston`

Winston est une bibliothèque de journalisation (logging) populaire pour Node.js. Elle permet aux développeurs de capturer, formater, et gérer des logs dans différentes sorties (fichiers, console, bases de données, etc.). Winston est flexible et extensible, ce qui en fait un choix idéal pour les projets nécessitant une gestion fine des logs, notamment pour le débogage, la surveillance et le suivi des événements.

### Principales Fonctionnalités de Winston

- **Multiples Transports** : Winston peut envoyer des logs vers différents supports appelés "transports" (fichiers, bases de données, systèmes de journalisation distants, etc.).
- **Niveaux de Log** : Il prend en charge différents niveaux de log (ex: error, warn, info, debug) pour filtrer et gérer les logs en fonction de leur importance.
    
![Source : https://app.pluralsight.com/library/courses/nodejs-express-foundations/description](/420-514/images/Winston.png)

Source : [app.pluralsight.com/](https://app.pluralsight.com/library/courses/nodejs-express-foundations/description)
    
- **Formats de Log** : Winston permet de formater les messages de log en JSON, en texte, ou en tout autre format personnalisé.
- **Configuration Flexible** : Il est possible de configurer plusieurs loggers, chacun avec ses propres niveaux de log, formats et transports.

### Installation de Winston

Pour installer Winston dans votre projet Node.js, utilisez la commande suivante :

```bash
npm install winston
```

### Exemple d'Utilisation de Winston

Voici un exemple simple d'utilisation de Winston pour configurer un logger qui envoie les logs à la console et à un fichier.

```jsx
const winston = require('winston');

// Configuration du logger
const logger = winston.createLogger({
  // Le niveau minimum de log est défini à info. 
  // Cela signifie que tous les logs de niveau info et plus élevés (ex: warn, error) seront capturés.
  level: 'info', // Niveau minimum de log (info, warn, error, etc.)
  // Les logs sont formatés en JSON et incluent un timestamp pour chaque message.
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Format des logs en JSON
  ),
  // Le logger est configuré avec deux transports : la console et un fichier app.log
  transports: [
    new winston.transports.Console(), // Log vers la console
    new winston.transports.File({ filename: 'logs/app.log' }) // Log vers un fichier
  ]
});

// Exemple de logs
logger.info('L\'application a démarré');
logger.warn('Attention, ceci est un avertissement');
logger.error('Une erreur est survenue');

```

Exemple du code complet :

```jsx
import express from 'express'
import { join } from 'node:path'
import { createLogger, format, transports } from 'winston'

const app = express()

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log' })
  ]
})

const logAll = function(request, response, next) {
  logger.info(`L'application a démarré : ${request.url}`)
	logger.warn('Attention, ceci est un avertissement');
	logger.error('Une erreur est survenue');
  next()
}

app.use(express.json())
app.use(express.static(join(process.cwd(), 'src', 'public')))
app.use(logAll)
```

### Utilisations :

1. **Débogage** : Winston est souvent utilisé pour capturer des erreurs et des messages de débogage pendant le développement.
2. **Surveillance en Production** : En production, Winston permet de centraliser les logs pour surveiller le bon fonctionnement de l'application et diagnostiquer les problèmes.
3. **Audit et Traçabilité** : Winston peut être configuré pour capturer des logs spécifiques pour l'audit, la sécurité ou la traçabilité des événements critiques.

---

## Liens utiles :

Formation : [https://app.pluralsight.com/library/courses/nodejs-express-foundations](https://app.pluralsight.com/library/courses/nodejs-express-foundations/description)

Article : [Guide Winston](https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/)

Documentation : [Github Winston](https://github.com/winstonjs/winston)

