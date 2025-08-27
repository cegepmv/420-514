+++
draft = false
title = 'Laboratoire : Gestion des Erreurs et Logging'
weight = 24
+++


### Partie 1 : Ajouter des Middlewares pour la Gestion des Erreurs et le Logging

1. **Ajouter un Middleware de Logging**
    - Créez un middleware qui enregistre chaque requête reçue par le serveur.
    - Implémentez le code suivant au début de votre fichier `index.js` :
    
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
    
2. **Ajouter un Middleware de Gestion des Erreurs**
    - Créez un middleware pour intercepter les erreurs et envoyer une réponse appropriée.
    - Placez ce middleware à la fin de toutes vos routes dans `index.js` :
    
    ```jsx
    // Middleware de gestion des erreurs
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Une erreur est survenue!');
    });
    ```
    

### Partie 2 : Servir des Fichiers Statiques

1. **Créer un Dossier `public`**
    - Créez un dossier `public` à la racine de votre projet avec la commande suivante :
    
    ```bash
    mkdir public
    ```
    
2. **Ajouter un Fichier HTML dans le Dossier `public`**
    - Créez un fichier `index.html` dans le dossier `public` avec le contenu suivant :
    
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
    
3. **Configurer Express pour Servir les Fichiers Statiques**
    - Ajoutez le code suivant dans votre fichier `index.js` pour permettre à Express de servir les fichiers du dossier `public` :
    
    ```jsx
    // Servir des fichiers statiques
    app.use(express.static('public'));
    ```
    

### Partie 3 : Utiliser la Librairie de Journalisation `Winston`

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
    

### Partie 4 : Tester les Améliorations

1. **Test du Middleware de Logging**
    - Lancez votre serveur avec `node index.js`.
    - Accédez à différentes routes (par exemple, `/` ou `/info`) et vérifiez que les requêtes sont enregistrées dans le terminal et dans le fichier `logs/app.log`.
2. **Test du Middleware de Gestion des Erreurs**
    - Créez une route qui lève une exception pour simuler une erreur :
        
        ```jsx
        app.get('/cause-error', (req, res) => {
          throw new Error('Erreur simulée!');
        });
        ```
        
    - Accédez à cette route via `GET <http://localhost:3000/cause-error`> et observez le message d'erreur personnalisé.
3. **Test de la Servitude des Fichiers Statiques**
    - Accédez à `http://localhost:3000/` dans votre navigateur pour voir la page HTML servie par Express.

### Partie 5 : Fichier `index.js` Complet

Voici un exemple complet après l'ajout des middlewares et Winston :

```jsx
const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;

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
  logger.error(err.stack);
  res.status(500).send('Une erreur est survenue!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});
```

### Résultats Attendus

1. **Logging**: Toutes les requêtes HTTP seront enregistrées dans la console et dans le fichier `logs/app.log`.
2. **Gestion des Erreurs**: En cas d'erreur, un message d'erreur approprié sera affiché, et les détails seront enregistrés dans les logs.
3. **Servitude de Fichiers Statiques**: La page HTML située dans le dossier `public` sera servie par Express lorsque l'on accède à l'URL racine du serveur.