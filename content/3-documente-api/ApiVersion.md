+++
date = '2025-09-21T23:45:12-04:00'
draft = false
title = 'Versionnement des API RESTful'
weight = 40
+++


## 🧠 Pourquoi versionner une API REST?

Le **versionnage** permet d’assurer la stabilité et la compatibilité des applications clientes lorsqu’une API évolue :

* Ajouter de nouvelles fonctionnalités sans casser l’existant
* Supprimer ou modifier un champ ou une structure sans impacter les clients existants
* Faciliter les migrations progressives vers une nouvelle version


## 🎯 Bonnes pratiques générales

| Pratique recommandée                              | Description                                 |
| ------------------------------------------------- | ------------------------------------------- |
| 📌 Commencer à versionner dès la première version | Anticiper les évolutions futures            |
| 💡 Versionner l’API et non les ressources         | Ex: `/v1/users`, pas `/users/v1`            |
| ✅ Utiliser des numéros de version simples         | `v1`, `v2`, etc.                            |
| 🔒 Maintenir plusieurs versions en parallèle      | Jusqu’à ce que tous les clients aient migré |
| 📚 Documenter chaque version séparément           | Swagger ou Postman par version              |


## 🛠️ Méthodes de versionnement

| Méthode               | Exemple                                 | Avantages                      | Inconvénients                                |
| --------------------- | --------------------------------------- | ------------------------------ | -------------------------------------------- |
| **Dans l’URL**        | `GET /api/v1/users`                     | Facile à gérer et à comprendre | Nécessite de dupliquer les routes            |
| **Dans l’en-tête**    | `Accept: application/vnd.myapi.v1+json` | Très flexible et propre        | Moins visible, plus complexe à implémenter   |
| **Dans un paramètre** | `GET /api/users?version=1`              | Simple à tester                | Non recommandé pour les API REST officielles |

{{%notice style="tip" title="🧩 Recommandation"%}}
Versionner **dans l’URL** pour les APIs REST publiques et documentées.
{{%/notice%}}
