+++
weight = 82
draft = false
title = '📘 Base de données document : MongoDB'
+++


## Introduction

MongoDB est une **base de données NoSQL orientée document**, écrite en C++, largement utilisée dans les applications modernes en raison de sa flexibilité et de sa capacité à traiter de grandes quantités de données semi-structurées. 

Sa flexibilité vient du fait qu’elle est libre de schéma, le schéma est seulement une option. Elle ne dispose pas de DDL (Data definition language).

Elle permet d’utiliser diverses API (drivers) avec plusieurs langages de programmation
JavaScript, Python, Ruby, Perl, Java, Scala, C##, C++, Haskell, Erlang

## 1. Modèle de données

MongoDB stocke les données sous forme de **documents**. Un document est une unité de données autonome généralement représentée en format **JSON** ou **BSON** (Binary JSON). Contrairement aux bases de données relationnelles, MongoDB ne nécessite pas un schéma rigide, ce qui permet d'ajouter, supprimer ou modifier des champs à la volée, rendant la base très flexible.

### Exemple d'un document MongoDB (au format JSON) :

```json
{
  "_id": "12345",
  "name": "Alice",
  "email": "alice@example.com",
  "age": 25,
  "orders": [
    {
      "product_id": "p123",
      "quantity": 2
    },
    {
      "product_id": "p456",
      "quantity": 1
    }
  ]
}
```

- **_id** : Clé primaire unique (générée automatiquement par MongoDB si non spécifiée).
- **Document** : Peut contenir des champs imbriqués (comme le tableau "orders").

| **RDBMS** | **MongoDB** |
| --- | --- |
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Index | Index |
| Join | EmbeddedDocument |
| ForeignKey | Reference |
| Partition | Shard |

## 2. Principales fonctionnalités de MongoDB

### a. **Flexibilité du schéma**

MongoDB est un système **"schema-less"** ou **flexible schema**. Cela signifie que :

- Les documents d'une même collection (équivalent d'une table en SQL) peuvent avoir des structures différentes.
- Vous pouvez modifier la structure des documents sans impact sur les autres documents de la collection, ce qui permet d'ajouter ou de supprimer des champs selon les besoins.

### b. **Scalabilité horizontale**

MongoDB est conçu pour fonctionner sur des systèmes distribués. Il prend en charge le **sharding**, une technique qui permet de répartir les données sur plusieurs serveurs pour améliorer la scalabilité. Cela signifie que MongoDB peut gérer de très grandes bases de données tout en maintenant une haute disponibilité.

### c. **Indexation**

MongoDB supporte plusieurs types d'index pour optimiser les performances des requêtes :

- **Index simple** : Créé sur un seul champ pour accélérer la recherche.
- **Index composé** : Créé sur plusieurs champs pour optimiser les recherches plus complexes.
- **Index textuel** : Utilisé pour effectuer des recherches en texte intégral.

### d. **Requêtes avancées et agrégations**

MongoDB offre une syntaxe puissante pour écrire des requêtes complexes :

- **Opérateurs de comparaison** (`$gt`, `$lt`, `$eq`, etc.) pour filtrer les documents.
- **Agrégation** : MongoDB propose un framework d'agrégation qui permet d’effectuer des transformations et des opérations complexes (somme, moyenne, groupements) sur les documents. C'est similaire aux opérations `GROUP BY` et `HAVING` des bases relationnelles.

Exemple d'une requête d'agrégation pour calculer le nombre total de produits commandés par chaque utilisateur :

```json
db.orders.aggregate([
  { "$group": { "_id": "$customer_id", "totalQuantity": { "$sum": "$quantity" } } }
])
```

### e. **Réplicas et haute disponibilité**

MongoDB prend en charge la **réplication** via des **Replica Sets**. Un Replica Set est un groupe de serveurs MongoDB où :

- Un serveur est le **primaire** (gère les écritures).
- Les autres sont des **secondaires** (répliques du primaire pour assurer la redondance des données).

<aside>
ℹ️

En cas de défaillance du serveur primaire, MongoDB effectue automatiquement une élection pour promouvoir un secondaire au statut de primaire, assurant ainsi une haute disponibilité.

</aside>

## 3. Utilisation des bases de données orientées document

MongoDB est optimisé pour les cas d'utilisation où la flexibilité et la rapidité d'exécution sont prioritaires. Il est particulièrement adapté aux applications suivantes :

- **Applications web et mobiles** : MongoDB est souvent utilisé dans les applications web en raison de sa capacité à stocker des données non structurées, telles que des profils d'utilisateurs, des sessions ou des messages.
- **Systèmes de gestion de contenu (CMS)** : Le stockage des documents dans MongoDB s'adapte parfaitement aux systèmes de gestion de contenu où la structure des données peut varier.
- **Big Data et Analytics** : Avec son framework d'agrégation et sa capacité à gérer des volumes de données massifs via le sharding, MongoDB est souvent utilisé dans les projets de Big Data.
- **IoT (Internet des Objets)** : MongoDB est utilisé pour stocker des flux de données en temps réel issus des capteurs IoT, car il peut gérer de grandes quantités de données hétérogènes.

![MongoDB use cases](/420-514/images/MongoDB_useCases.png)

## 4. Avantages de MongoDB

- **Flexibilité** : Le schéma flexible de MongoDB permet d'adapter rapidement la structure des données en fonction des besoins des applications.
- **Scalabilité** : Avec le sharding et la réplication, MongoDB peut facilement évoluer horizontalement pour gérer des volumes importants de données et de trafic.
- **Performance** : MongoDB est conçu pour les applications qui nécessitent des lectures et des écritures rapides.
- **Compatibilité avec JSON** : Le stockage des documents au format JSON/BSON permet une intégration fluide avec des API REST et d'autres services modernes.

## 5. Limites de MongoDB

- **Transactions ACID limitées** : Bien que MongoDB ait ajouté le support des transactions multi-documents depuis la version 4.0, ces transactions ne sont pas aussi robustes ou performantes que celles des bases de données relationnelles.
- **Gestion des relations** : MongoDB n'est pas optimisé pour les relations complexes entre les données comme les jointures entre tables dans les bases SQL. Il est souvent préférable de dénormaliser les données dans MongoDB, ce qui peut entraîner une redondance.
- **Utilisation intensive de la mémoire** : MongoDB utilise beaucoup de mémoire pour garantir des lectures et écritures rapides, ce qui peut poser problème pour des projets avec des contraintes strictes en termes de ressources.

## 6. Comparaison MongoDB vs Bases Relationnelles

| Caractéristique | MongoDB | Bases de données relationnelles (SQL) |
| --- | --- | --- |
| Modèle de données | Documents (JSON/BSON) | Tables et lignes (relations) |
| Flexibilité du schéma | Schéma flexible | Schéma rigide |
| Scalabilité | Scalabilité horizontale avec le sharding | Scalabilité verticale ou partitionnement |
| Transactions | Transactions limitées | Transactions ACID robustes |
| Requêtes | Syntaxe riche, framework d'agrégation | SQL standard pour des requêtes complexes |
| Performances | Optimisé pour les lectures et écritures rapides | Peut être plus lent pour les gros volumes |
| Relations entre les données | Pas de jointures complexes, relations imbriquées | Requêtes multi-tables, jointures complexes |

## Conclusion

MongoDB est une base de données puissante et flexible, particulièrement bien adaptée aux applications nécessitant une gestion de données semi-structurées ou en évolution rapide. Grâce à son modèle orienté document et à ses capacités de scalabilité, il est devenu un choix populaire pour les développeurs d'applications web, mobiles, et de big data. Toutefois, il convient de bien comprendre ses limites, notamment en termes de transactions et de gestion des relations, pour l’utiliser efficacement dans les projets adaptés.

## Ressources

### Ressource pour découvrir MongoDB

[MongoDB: La Developer Data Platform](https://www.mongodb.com/fr-fr)

[Install MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/##std-label-install-mdb-community-edition)

[Document Database - NoSQL](https://www.mongodb.com/resources/basics/databases/document-databases)

### Ressources pour apprendre MongoDB

- [https://www.mongodb.com/docs/manual/crud/](https://www.mongodb.com/docs/manual/crud/)
- [https://www.mongodb.com/docs/manual/aggregation/](https://www.mongodb.com/docs/manual/aggregation/)
- [https://www.mongodb.com/docs/guides/](https://www.mongodb.com/docs/guides/)