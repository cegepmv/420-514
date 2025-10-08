+++
date = '2025-10-08T00:22:38-04:00'
draft = true
title = 'Configuration d’un serveur de test avec Node.js'
+++

Pour configurer un **serveur de test** avec **Node.js**, vous pouvez mettre en place un environnement de test séparé avec des configurations et des outils dédiés aux tests.

### Étapes pour configurer un serveur de test en Node.js

1. **Organisation des Environnements** : Utilisez des fichiers de configuration pour séparer les paramètres de test et de production.
2. **Configuration de l’application** : Modifiez les paramètres en fonction de l'environnement.
3. **Utilisation d’outils de tests** : Employez des outils de test comme **Mocha**, **Chai**, et **Supertest** pour automatiser les tests.

### Étape 1 : Organisation des environnements avec un fichier `.env`

Les environnements sont souvent définis dans un fichier `.env` pour isoler les paramètres de configuration.

1. **Installer dotenv** pour lire les variables d'environnement :
    
    ```bash
    npm install dotenv
    ```
    
2. **Créer deux fichiers .env** pour les environnements de **test** et **production**.
    - **Fichier `.env.test`** :
        
        ```
        NODE_ENV=test
        PORT=4000
        DB_CONNECTION_STRING=mongodb://localhost:27017/testdb
        JWT_SECRET=mytestsecret
        ```
        
    - **Fichier `.env.production`** :
        
        ```
        NODE_ENV=production
        PORT=3000
        DB_CONNECTION_STRING=mongodb://localhost:27017/proddb
        JWT_SECRET=myproductionsecret
        ```
        
3. **Configurer dotenv dans votre application** pour lire les fichiers `.env` en fonction de l'environnement :
    
    ```jsx
    // src/app.js
    require('dotenv').config({
      path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.production'
    });
    
    const express = require('express');
    const app = express();
    
    app.get('/', (req, res) => {
      res.send('Hello, this is the ' + process.env.NODE_ENV + ' environment!');
    });
    
    module.exports = app;
    ```
    
4. **Démarrer l'application** :
    - Pour le mode production :
        
        ```bash
        NODE_ENV=production node src/app.js
        ```
        
    - Pour le mode test :
        
        ```bash
        NODE_ENV=test node src/app.js
        ```
        

### Étape 2 : Définir les scripts de tests

1. **Installer les dépendances de tests** pour Node.js :
    
    ```bash
    npm install --save-dev mocha chai supertest
    ```
    
2. **Configurer le script de test dans `package.json`** :
Ajoutez un script pour lancer les tests dans le fichier `package.json` :
    
    ```json
    "scripts": {
      "start": "node src/app.js",
      "test": "NODE_ENV=test mocha src/tests --exit"
    }
    ```
    

### Étape 3 : Créer un test d’intégration pour le serveur de test

1. **Créer un fichier de test** dans `src/tests/app.test.js` pour vérifier si le serveur fonctionne correctement dans l’environnement de test.
    
    ```jsx
    const chai = require('chai');
    const chaiHttp = require('chai-http');
    const app = require('../app');
    const expect = chai.expect;
    
    chai.use(chaiHttp);
    
    describe('GET /', () => {
      it('should return 200 in test environment', (done) => {
        chai.request(app)
          .get('/')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.text).to.equal('Hello, this is the test environment!');
            done();
          });
      });
    });
    ```
    
2. **Lancer les tests** :
    
    ```bash
    npm test
    ```
    
    Le serveur de test démarre dans l'environnement `test`, et les variables spécifiques à cet environnement sont utilisées.
    

### Étape 4 : Utilisation d’une base de données de test

Pour un serveur de test, il est recommandé d'utiliser une **base de données séparée** des données de production. Avec MongoDB, par exemple, vous pouvez utiliser une base de données dédiée pour les tests en configurant la variable `DB_CONNECTION_STRING` dans `.env.test`.

Exemple d’initialisation de la base de données dans `app.js` :

```jsx
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connecté à la base de données de test'))
.catch((err) => console.error('Erreur de connexion à la base de données de test', err));
```

### Résumé

1. **Environnements de configuration** : Utilisez des fichiers `.env` pour isoler les paramètres de test et de production.
2. **Scripts de tests** : Configurez un script dans `package.json` pour lancer les tests dans l’environnement de test.
3. **Tests automatisés** : Utilisez **Jest ou**  **Mocha**, **Chai**, et **Supertest** pour valider le comportement du serveur.
4. **Base de données de test** : Utilisez une base de données dédiée pour les tests pour éviter d'altérer les données de production.
