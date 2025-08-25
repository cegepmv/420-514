+++
date = '2025-08-24T21:03:09-04:00'
draft = true
title = 'Express'
+++


### Introduction à Express

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

### Middleware et Gestion des Erreurs

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
          res.status(500).send('Quelque chose s\\'est mal passé !');
        });
        ```
        

### Pourquoi utiliser des middlewares ?

1. **Modularité** : Ils permettent d'ajouter des fonctionnalités réutilisables, comme la gestion des sessions, sans toucher à chaque route de l'application.
2. **Composabilité** : Les middlewares peuvent être chaînés pour créer un pipeline de traitement des requêtes.
3. **Réutilisabilité** : Vous pouvez créer des middlewares personnalisés qui peuvent être réutilisés à travers plusieurs routes ou applications.

### Utilisation des Bases de Données

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

### Rendu des Vues

Express prend en charge plusieurs moteurs de rendu de templates pour générer des réponses HTML dynamiques.

**Exemple de rendu de vue :**

```jsx
app.get("/", (req, res) => {
  res.render("index", { title: "À propos des poules", message: "Elles sont où ?" });
});
```

---

## Liens utiles :

Formation : [https://app.pluralsight.com/library/courses/nodejs-express-foundations](https://app.pluralsight.com/library/courses/nodejs-express-foundations/description)

