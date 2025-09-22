+++
date = '2025-09-21T23:52:40-04:00'
draft = false
title = '🧪 Laboratoire : Documentation Swagger et versionnement'
weight = 74
+++

## 🧪 Exercice pratique
### Objectifs :

* Documenter l'API
* Créer deux versions d’une route `/users`
* Modifier la structure retournée entre v1 et v2
* Documenter les deux versions dans Swagger
* Tester avec Postman

### Exercice 1 :
- Importer votre fichier swagger dans [Swagger Editor](https://editor.swagger.io/)
- Tester la génération de documentation
- Utiliser Postman pour tester les routes /users, /login, /orders
- Ajouter un token JWT manuellement dans les headers (Authorization: Bearer <token>)
- Créer d'autres routes (PUT, DELETE) si elles n'existent pas, les documenter et les tester



### Exercice 2 :

* `v1` → retourne `[ { id, username } ]`
* `v2` → retourne `[ { id, username, email, role } ]`

![Vesionning API](/420-514/images/versionnement_API.png)
