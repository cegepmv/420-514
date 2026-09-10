+++
draft = false
weight = 83
title = '📘 La modélisation des données dans MongoDB'
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
  "_id": "sensor123",
  "location": "Building A - Room 101",
  "type": "temperature",
  "unit": "C",
  "readings": [
    {
      "timestamp": "2023-10-15T10:00:00Z",
      "value": 22.5
    },
    {
      "timestamp": "2023-10-15T11:00:00Z",
      "value": 23.0
    }
  ]
}
```

Avantages :

* Plus rapide à lire : Toutes les données d'un capteur sont regroupées dans un seul document.
* Bon pour les sous-documents fortement liés : Les relevés de données (readings) sont directement associés au capteur.

Inconvénients :

* Taille de document limitée (~16MB) : Peut poser problème si un capteur génère un grand volume de données.
* Moins flexible si les sous-documents doivent être manipulés séparément : Par exemple, si les relevés doivent être traités indépendamment.

    
- **Références (liens)** : Dans certains cas, lorsque les données doivent être partagées ou modifiées indépendamment (par exemple, des données qui apparaissent dans plusieurs documents), il peut être judicieux d'utiliser des références. MongoDB ne supporte pas directement les jointures comme dans SQL, mais vous pouvez gérer des relations en utilisant des références.
    
    **Exemple** : Une relation entre un bâtiment et ses capteurs.  

Document séparé pour `sensors` :

```json
{
  "_id": "buildingA",
  "name": "Building A",
  "location": "Downtown",
  "sensors": ["sensor123", "sensor124"]
}
```

Et dans la collection `sensors ` :

```json
{
  "_id": "sensor123",
  "building_id": "buildingA",
  "type": "temperature",
  "unit": "C",
  "readings": [
    {
      "timestamp": "2023-10-15T10:00:00Z",
      "value": 22.5
    }
  ]
}
```
    
    Ici, vous pouvez stocker les commandes dans un document séparé et y référencer les commandes par leur ID.
    

### 3. **Dénormalisation pour optimiser les performances**

Contrairement aux bases de données relationnelles, la dénormalisation est souvent une bonne pratique dans MongoDB. Cela signifie que vous pouvez répéter des données dans différents documents pour éviter des jointures coûteuses lors de la récupération des données.

**Exemple** : Répéter les informations des clients directement dans les documents de commande pour éviter une deuxième recherche lors de la récupération des commandes.

```json
{
  "_id": "sensor123",
  "building": {
    "building_id": "buildingA",
    "name": "Building A"
  },
  "type": "temperature",
  "unit": "C",
  "readings": [
    {
      "timestamp": "2023-10-15T10:00:00Z",
      "value": 22.5
    }
  ]
}
```

Cela permet d’améliorer les performances de lecture, mais nécessite une gestion plus rigoureuse lors de la mise à jour des données, car les informations (comme les détails du bâtiment) peuvent être dupliquées dans plusieurs documents.

### 4. **Approche par agrégat**


MongoDB fonctionne mieux avec des **agrégats**, c'est-à-dire des ensembles de données regroupées dans un seul document. L'idée est de modéliser les données de manière à stocker autant d'informations connexes que possible dans un seul document. Cela évite de nombreuses lectures et écritures séparées, en particulier pour les grandes applications comme `energy-api`ey donc éviter une deuxième recherche lors de la récupération des données des capteurs.

```json
{
  "_id": "sensor123",
  "building": {
    "building_id": "buildingA",
    "name": "Building A"
  },
  "type": "temperature",
  "unit": "C",
  "readings": [
    {
      "timestamp": "2023-10-15T10:00:00Z",
      "value": 22.5
    }
  ]
}
```

Cela permet d’améliorer les performances de lecture, mais nécessite une gestion plus rigoureuse lors de la mise à jour des données, car les informations (comme les détails du bâtiment) peuvent être dupliquées dans plusieurs documents.


Un agrégat peut contenir les données principales et leurs sous-collections (comme les capteurs avec leurs relevés).

**Exemple d'agrégat pour `energy-api` :**

```json
{
  "_id": "buildingA",
  "name": "Building A",
  "location": "Downtown",
  "sensors": [
    {
      "sensor_id": "sensor123",
      "type": "temperature",
      "unit": "C",
      "readings": [
        {
          "timestamp": "2023-10-15T10:00:00Z",
          "value": 22.5
        }
      ]
    },
    {
      "sensor_id": "sensor124",
      "type": "humidity",
      "unit": "%",
      "readings": [
        {
          "timestamp": "2023-10-15T10:00:00Z",
          "value": 60
        }
      ]
    }
  ]
}
```

Cette approche regroupe toutes les informations liées à un bâtiment et ses capteurs dans un seul document, ce qui est idéal pour des lectures rapides dans le contexte de `energy-api`.

### 5. **Utilisation des schémas flexibles**

MongoDB est une base de données sans schéma strict, ce qui signifie que chaque document peut avoir une structure légèrement différente. Vous pouvez profiter de cette flexibilité pour évoluer rapidement. Toutefois, il est recommandé d'imposer une certaine cohérence au niveau de la structure des documents via des validations (par exemple, via des schémas JSON) pour éviter des incohérences trop grandes.

### 6. **Modéliser pour les requêtes fréquemment utilisées**

Concevez vos documents de façon à minimiser le nombre d'opérations nécessaires pour satisfaire les requêtes fréquentes. Par exemple, si une requête nécessite toujours d'accéder aux produits associés à un capteur, ces relevés devraient être imbriqués dans le document capteur pour éviter de multiples lectures.

| Objectif                                   | Requête MongoDB                                                                                          |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Trouver un capteur par son ID              | `db.sensors.find({ _id: "sensor123" })`                                                                  |
| Rechercher un relevé spécifique            | `db.sensors.find({ "readings.timestamp": "2023-10-15T10:00:00Z" })`                                      |
| Modifier une valeur de relevé              | `db.sensors.updateOne({ _id: "sensor123", "readings.timestamp": "2023-10-15T10:00:00Z" }, { $set: { "readings.$.value": 25.0 }})` |
| Supprimer un relevé                        | `db.sensors.updateOne({ _id: "sensor123" }, { $pull: { readings: { timestamp: "2023-10-15T10:00:00Z" } } })` |
| Ajouter un relevé                          | `db.sensors.updateOne({ _id: "sensor123" }, { $push: { readings: { timestamp: "2023-10-15T12:00:00Z", value: 24.0 } } })` |

Requête d'importation

```bash
mongoimport --db energy-api --collection sensors --file sensors.json --jsonArray
```

### 7. **Indexation**

Assurez-vous de bien utiliser les **index** pour améliorer les performances des recherches. Vous pouvez créer des index sur des champs souvent utilisés dans les filtres, les tris, ou les requêtes, mais attention à l'impact des index sur la performance des écritures (insertion, mise à jour).

Créer un index sur l’email pour améliorer les performances :

```js
db.sensors.createIndex({ location: 1 });
db.sensors.createIndex({ "readings.timestamp": 1 });
```

Ces index permettent d'accélérer les recherches sur les capteurs et leurs relevés dans des bases de données volumineuses. 

## 9. 📂 Exemple de fichier `db.json`

```json
[
  {
    "_id": "sensor123",
    "location": "Building A - Room 101",
    "type": "temperature",
    "unit": "C",
    "readings": [
      { "timestamp": "2023-10-15T10:00:00Z", "value": 22.5 },
      { "timestamp": "2023-10-15T11:00:00Z", "value": 23.0 }
    ]
  },
  {
    "_id": "sensor124",
    "location": "Building A - Room 102",
    "type": "humidity",
    "unit": "%",
    "readings": [
      { "timestamp": "2023-10-15T10:00:00Z", "value": 60 }
    ]
  }
]
```

#### Exemples concrets :

#### **Imbrication des informations imbriquées (relation un-à-plusieurs)**

**Exemple** : Un capteur avec des relevés imbriqués.

```json
{
  "_id": "sensor123",
  "location": "Building A - Room 101",
  "type": "temperature",
  "unit": "C",
  "readings": [
    {
      "timestamp": "2023-10-15T10:00:00Z",
      "value": 22.5
    },
    {
      "timestamp": "2023-10-15T11:00:00Z",
      "value": 23.0
    }
  ]
}
```

#### **Utilisation de références pour une relation plusieurs-à-plusieurs**

**Exemple** : Une application de gestion énergétique où plusieurs capteurs sont associés à plusieurs bâtiments.

```json
// Document d'un bâtiment
{
  "_id": "buildingA",
  "name": "Building A",
  "location": "Downtown",
  "sensors": ["sensor123", "sensor124"]
}

// Document d'un capteur
{
  "_id": "sensor123",
  "type": "temperature",
  "unit": "C",
  "buildings": ["buildingA", "buildingB"],
  "readings": [
    {
      "timestamp": "2023-10-15T10:00:00Z",
      "value": 22.5
    }
  ]
}
```

Ces exemples montrent comment structurer les données dans energy-api pour gérer efficacement les relations entre bâtiments et capteurs. `

### 8. Validation avec JSON Schema

Exemple de validation de collection :

```json
{
  "bsonType": "object",
  "required": ["_id", "location", "type", "readings"],
  "properties": {
    "_id": {
      "bsonType": "string",
      "description": "Identifiant unique du capteur"
    },
    "location": {
      "bsonType": "string",
      "description": "Localisation du capteur"
    },
    "type": {
      "enum": ["temperature", "humidity", "pressure"],
      "description": "Type de capteur"
    },
    "readings": {
      "bsonType": "array",
      "items": {
        "bsonType": "object",
        "required": ["timestamp", "value"],
        "properties": {
          "timestamp": {
            "bsonType": "string",
            "description": "Horodatage du relevé"
          },
          "value": {
            "bsonType": "double",
            "description": "Valeur mesurée"
          }
        }
      }
    }
  }
}
```

### Conclusion

La modélisation dans MongoDB privilégie la flexibilité et l'optimisation des performances pour les lectures, souvent au détriment de la normalisation stricte des données. Les décisions de modélisation doivent être prises en fonction des besoins de l'application, des schémas d'accès et de la fréquence des opérations. Il est également important de maintenir un bon équilibre entre l'imbrication des documents et l'utilisation de références en fonction des cas d'utilisation et des performances recherchées.