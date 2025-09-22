+++
date = '2025-09-21T22:33:46-04:00'
draft = false
title = 'DocAPI'
weight = 71
+++


## 🛠️ Outils de documentation et de test d'API
Les outils les plus utilisés pour documenter, tester et maintenir une API RESTful sont présentés dans le tableau ci-dessous. Chacun a un rôle spécifique dans le cycle de vie de développement, et ils peuvent être combinés pour offrir une documentation professionnelle, interactive et maintenable :

| Outil                 | Utilisation                                                                                                                                                                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Swagger (OpenAPI)** | Crée une **documentation interactive** conforme à la spécification OpenAPI. Permet de décrire les endpoints, les paramètres, les types de données, les réponses attendues et les erreurs. Peut être utilisé avec Swagger UI pour une interface web conviviale.                                             |
| **Postman**           | Permet d’**exécuter manuellement des requêtes API** pour les tester. On peut y créer des **collections** organisées par fonctionnalité, documenter chaque appel, définir des variables d’environnement (URL, token, etc.) et **exporter la collection** pour la partager avec une équipe ou les étudiants. |
| **Redoc**             | Génère une **documentation statique élégante** à partir d’un fichier `swagger.yaml` ou `swagger.json`. Il s’agit d’un outil de présentation visuelle pour les specs OpenAPI. Utile pour publier une documentation HTML autonome.                                                                           |
| **Typedoc**           | Outil de **génération automatique de documentation** pour les projets en TypeScript. Il parcourt les annotations de types et les commentaires JSDoc pour générer des pages HTML ou Markdown décrivant les classes, fonctions, interfaces, etc.                                                             |
| **JsDoc**             | Permet de **documenter directement dans le code source JavaScript ou TypeScript** avec des commentaires structurés (`/** */`). Couplé à un générateur (comme `jsdoc` CLI ou des plugins IDE), il peut produire une doc navigable décrivant les méthodes, paramètres, et classes.                           |


## Utilisation en pratique 

Voici le flux de travail conseillé :

1. Définir les specs avec Swagger (OpenAPI)
- Créez un fichier swagger.yaml décrivant toutes les routes, les types de données, les schémas, etc.
- Utilisez Swagger UI pour le rendre consultable via un navigateur.

2. Tester et enrichir les requêtes avec Postman
- Importez vos specs OpenAPI dans Postman.
- Ajoutez des exemples de corps de requête, des tests automatiques (ex : vérification du code HTTP), et des jeux de données.

3. Générer la documentation statique avec Redoc
- Compilez le fichier OpenAPI avec Redoc pour produire un site statique HTML facile à héberger.

4. Documenter le code métier avec JsDoc ou Typedoc
- Annoter les fonctions, classes, types de données directement dans le code.
- Générer la documentation automatiquement à chaque build ou en CI/CD.

