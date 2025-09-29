+++
draft = false
weight = 83
title = 'La modélisation des données dans MongoDB'
+++


La modélisation des données pour une base de données non-relationnelle comme MongoDB nécessite une approche différente de celle des bases de données relationnelles (comme MariaDB, MySQL, PostgreSQL, etc.). Au lieu de normaliser les données et de créer des relations strictes entre les tables, la modélisation dans MongoDB repose souvent sur la **dénormalisation** et l'**imbriquement de documents**.

Voici les principes clés pour modéliser efficacement des données et leurs relations dans MongoDB :

### 1. **Comprendre les besoins de l'application**

La modélisation dans MongoDB est souvent pilotée par la façon dont l'application accède aux données. Il est essentiel de connaître les schémas d'accès, les types de requêtes et la fréquence de lecture/écriture des données pour décider du meilleur modèle.

Par exemple, si vous avez une application qui accède fréquemment à des objets associés, vous pourriez envisager d'imbriquer ces objets dans le même document.

### 2. **Choisir entre documents imbriqués et références**

- **Imbrication de documents** : Vous incluez des sous-documents directement à l'intérieur d'un document parent. Cela fonctionne bien lorsque les sous-documents sont étroitement liés au document parent et ne sont pas souvent modifiés indépendamment. Cela permet de minimiser les opérations de lecture en regroupant toutes les informations nécessaires en un seul document.
    
    **Exemple** : Dans une application de gestion de commandes, vous pouvez imbriquer les informations des produits dans le document commande.
    
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

Avantages :

* Plus rapide à lire (tout est dans un seul document).
* Bon pour les sous-documents fortement liés (commandes d’un utilisateur).

Inconvénients :

* Taille de document limitée (~16MB).
* Moins flexible si les sous-documents doivent être manipulés séparément.


    
- **Références (liens)** : Dans certains cas, lorsque les données doivent être partagées ou modifiées indépendamment (par exemple, des données qui apparaissent dans plusieurs documents), il peut être judicieux d'utiliser des références. MongoDB ne supporte pas directement les jointures comme dans SQL, mais vous pouvez gérer des relations en utilisant des références.
    
    **Exemple** : Une relation entre un client et ses commandes.
    document séparé pour `orders`

```json
{
  "_id": "12345",
  "name": "Alice",
  "email": "alice@example.com",
  "orders": ["o001", "o002"]
}
```

Et dans la collection `orders` :

```json
{
  "_id": "o001",
  "user_id": "12345",
  "product_id": "p123",
  "quantity": 2
}
```
    
    Ici, vous pouvez stocker les commandes dans un document séparé et y référencer les commandes par leur ID.
    

### 3. **Dénormalisation pour optimiser les performances**

Contrairement aux bases de données relationnelles, la dénormalisation est souvent une bonne pratique dans MongoDB. Cela signifie que vous pouvez répéter des données dans différents documents pour éviter des jointures coûteuses lors de la récupération des données.

**Exemple** : Répéter les informations des clients directement dans les documents de commande pour éviter une deuxième recherche lors de la récupération des commandes.

```json
{
  "_id": 1,
  "client": {
    "client_id": 101,
    "nom": "Client 1"
  },
  "date_commande": "2024-10-10",
  "produits": [...]
}
```

Cela permet d’améliorer les performances de lecture, mais nécessite une gestion plus rigoureuse lors de la mise à jour des données, car les informations peuvent être dupliquées dans plusieurs documents.

### 4. **Approche par agrégat**

MongoDB fonctionne mieux avec des **agrégats**, c'est-à-dire des ensembles de données regroupées dans un seul document. L'idée est de modéliser les données de manière à stocker autant d'informations connexes que possible dans un seul document. Cela évite de nombreuses lectures et écritures séparées, en particulier pour les grandes applications.

Un agrégat peut contenir les données principales et leurs sous-collections (comme les commandes avec leurs produits).

### 5. **Utilisation des schémas flexibles**

MongoDB est une base de données sans schéma strict, ce qui signifie que chaque document peut avoir une structure légèrement différente. Vous pouvez profiter de cette flexibilité pour évoluer rapidement. Toutefois, il est recommandé d'imposer une certaine cohérence au niveau de la structure des documents via des validations (par exemple, via des schémas JSON) pour éviter des incohérences trop grandes.

### 6. **Modéliser pour les requêtes fréquemment utilisées**

Concevez vos documents de façon à minimiser le nombre d'opérations nécessaires pour satisfaire les requêtes fréquentes. Par exemple, si une requête nécessite toujours d'accéder aux produits associés à une commande, ces produits devraient être imbriqués dans le document commande pour éviter de multiples lectures.

| Objectif                                   | Requête MongoDB                                                                                          |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Trouver un utilisateur par email           | `db.users.find({ email: "alice@example.com" })`                                                          |
| Rechercher un produit commandé             | `db.users.find({ "orders.product_id": "p123" })`                                                         |
| Modifier la quantité d’un produit commandé | `db.users.updateOne({ _id: "12345", "orders.product_id": "p123" }, { $set: { "orders.$.quantity": 5 }})` |
| Supprimer une commande                     | `db.users.updateOne({ _id: "12345" }, { $pull: { orders: { product_id: "p456" } } })`                    |
| Ajouter une commande                       | `db.users.updateOne({ _id: "12345" }, { $push: { orders: { product_id: "p789", quantity: 3 } } })`       |


Requête d'importation

```bash
mongoimport --db ecommerce --collection users --file db.json --jsonArray
```


### 7. **Indexation**

Assurez-vous de bien utiliser les **index** pour améliorer les performances des recherches. Vous pouvez créer des index sur des champs souvent utilisés dans les filtres, les tris, ou les requêtes, mais attention à l'impact des index sur la performance des écritures (insertion, mise à jour).

Créer un index sur l’email pour améliorer les performances :

```js
db.users.createIndex({ email: 1 }, { unique: true })
```

## 9. 📂 Exemple de fichier `db.json`

```json
[
  {
    "_id": "12345",
    "name": "Alice",
    "email": "alice@example.com",
    "age": 25,
    "orders": [
      { "product_id": "p123", "quantity": 2 },
      { "product_id": "p456", "quantity": 1 }
    ]
  },
  {
    "_id": "67890",
    "name": "Bob",
    "email": "bob@example.com",
    "age": 30,
    "orders": []
  }
]
```

#### Exemples concrets :

#### **Imbrication des informations imbriquées (relation un-à-plusieurs)**

**Exemple** : Un article de blog avec des commentaires imbriqués.

```json
{
  "_id": 1,
  "titre": "Mon premier blog",
  "contenu": "Voici le contenu de l'article...",
  "commentaires": [
    {
      "auteur": "Utilisateur 1",
      "texte": "Super article !",
      "date": "2024-10-12"
    },
    {
      "auteur": "Utilisateur 2",
      "texte": "Merci pour les infos.",
      "date": "2024-10-13"
    }
  ]
}
```

#### **Utilisation de références pour une relation plusieurs-à-plusieurs**

**Exemple** : Une application de gestion de cours où plusieurs étudiants sont inscrits à plusieurs cours.

```json
// Document d'un cours
{
  "_id": 101,
  "nom": "Mathématiques",
  "etudiants": [201, 202, 203]
}

// Document d'un étudiant
{
  "_id": 201,
  "nom": "Jean Dupont",
  "cours_inscrits": [101, 102]
}
```
### 8. Validation avec JSON Schema

Exemple de validation de collection :

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": ["name", "email", "age", "orders"],
    "properties": {
      "name": { "bsonType": "string" },
      "email": { "bsonType": "string", "pattern": "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$" },
      "age": { "bsonType": "int", "minimum": 18 },
      "orders": {
        "bsonType": "array",
        "items": {
          "bsonType": "object",
          "required": ["product_id", "quantity"],
          "properties": {
            "product_id": { "bsonType": "string" },
            "quantity": { "bsonType": "int", "minimum": 1 }
          }
        }
      }
    }
  }
}
```

### Conclusion

La modélisation dans MongoDB privilégie la flexibilité et l'optimisation des performances pour les lectures, souvent au détriment de la normalisation stricte des données. Les décisions de modélisation doivent être prises en fonction des besoins de l'application, des schémas d'accès et de la fréquence des opérations. Il est également important de maintenir un bon équilibre entre l'imbrication des documents et l'utilisation de références en fonction des cas d'utilisation et des performances recherchées.