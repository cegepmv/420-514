+++
draft = false
weight = 84
title = '🧪 Laboratoire : MongoDB avec Atlas et Compass'
+++


### Étape 1 : Installation de MongoDB

### a. Installer MongoDB sur Windows :

1. Allez sur le site officiel de [MongoDB](https://www.mongodb.com/try/download/community) et téléchargez la version communautaire de MongoDB.
2. Suivez les instructions de l'installateur pour installer MongoDB sur votre machine.
3. MongoDB s'exécute comme un service sous Windows, donc après l'installation, le service MongoDB devrait démarrer automatiquement.

### b. Installer MongoDB sur Linux :

1. Pour installer MongoDB sur Ubuntu :
    
    ```bash
    sudo apt update
    sudo apt install -y mongodb
    ```
    
2. Démarrez le service MongoDB :
    
    ```bash
    sudo systemctl start mongodb
    ```
    
3. Vérifiez que MongoDB fonctionne :
    
    ```bash
    sudo systemctl status mongodb
    ```
    

### c. Installer MongoDB sur macOS :

1. Utilisez **Homebrew** pour installer MongoDB :
    
    ```bash
    brew tap mongodb/brew
    brew install mongodb-community@6.0
    ```
    
2. Démarrez MongoDB :
    
    ```bash
    brew services start mongodb-community@6.0
    ```
    

### Étape 2 : Démarrer MongoDB et le shell Mongo

MongoDB inclut un shell appelé **mongosh**, qui permet d'interagir avec la base de données via des commandes.

- Pour ouvrir le shell Mongo, tapez simplement `mongosh` dans votre terminal ou invite de commande.
- Vous devriez voir une invite comme celle-ci :
    
    ```bash
    > mongosh
    ```
    

Dans notre cas on va utiliser MongoDB Compass avec MongoDB Atlas pour créer le cluster pour stocker nos bases de données.

Aller sur le lien suivant et créer un compte avec **Google** ou Github :

[Load Data into Atlas](https://www.mongodb.com/library/load/load-data-atlas?lb-mode=overlay)

## Créer votre premier Cluster :

![Capture d’écran 2024-10-11 013457.png](/420-514/images/Capture_dcran_2024-10-11_013457.png)

Choisissez l’option gratuite avec n’importe quel des 3 fournisseurs proposés :

![Capture d’écran 2024-10-11 013648.png](/420-514/images/Capture_dcran_2024-10-11_013648.png)

Donner un nom d’utilisateur et un mot de passe pour pouvoir se connecter à votre Cluster : 

[Set Up MongoDB Atlas](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-set-up-mongodb-atlas)

![Capture d’écran 2024-10-11 014303.png](/420-514/images/Capture_dcran_2024-10-11_014303.png)

Vous pouvez choisir la méthode de connection souhaitée. Nous allons choisir la connection avec Compass :

![Capture d’écran 2024-10-11 014649.png](/420-514/images/Capture_dcran_2024-10-11_014649.png)

Vous pouvez vous connecter à votre cluster dans compass avec l’URI suivant (en remplaçant les informations entre <>):

```jsx
mongodb+srv://<user>:<db_password>@<cluster-name>.o4pdb.mongodb.net/
```

![Capture d’écran 2024-10-11 015139.png](/420-514/images/Capture_dcran_2024-10-11_015139.png)

Mettez votre mot de passe dans le placeholder correspondant.

Une fois connecté, vous pouvez voir les bases de données contenant dans votre cluster : 

![Capture d’écran 2024-10-11 015313.png](/420-514/images/Capture_dcran_2024-10-11_015313.png)

### Étape 3 : Créer une base de données et une collection

Dans MongoDB, les bases de données contiennent des **collections** (équivalent des tables dans une base de données relationnelle), et les collections contiennent des **documents**.

1. **Créer une base de données** :
Dans MongoDB, pour créer une base de données, il suffit de la sélectionner et elle sera créée automatiquement lorsqu'on y insère des données :
    
    ```bash
    use ma_base_de_donnees
    ```
    
2. **Créer une collection** :
Les collections sont créées lors de l'insertion d'un document. Par exemple :
    
    ```bash
    db.createCollection("utilisateurs")
    ```
    
    ![Capture d’écran 2024-10-11 124607.png](/420-514/images/Capture_dcran_2024-10-11_124607.png)
    

### Étape 4 : Insérer des documents dans une collection

Les documents sont insérés sous forme d'objets JSON. Voici comment ajouter un utilisateur dans la collection "utilisateurs" :

```bash
db.utilisateurs.insertOne({
  "nom": "Alice",
  "age": 25,
  "email": "alice@example.com"
})
```

Vous pouvez également insérer plusieurs documents à la fois en utilisant `insertMany` :

```bash
db.utilisateurs.insertMany([
  { "nom": "Bob", "age": 30, "email": "bob@example.com" },
  { "nom": "Charlie", "age": 22, "email": "charlie@example.com" }
])
```

### Étape 5 : Rechercher des documents

Pour récupérer des documents, utilisez la commande `find` :

1. **Rechercher tous les documents** :
    
    ```bash
    db.utilisateurs.find()
    ```
    
2. **Rechercher des documents spécifiques** :
Pour rechercher un utilisateur avec le nom "Alice" :
    
    ```bash
    db.utilisateurs.find({ "nom": "Alice" })
    ```
    
3. **Rechercher avec des conditions** :
Par exemple, pour rechercher les utilisateurs de plus de 25 ans :
    
    ```bash
    db.utilisateurs.find({ "age": { "$gt": 25 } })
    ```
    

### Étape 6 : Mettre à jour des documents

MongoDB vous permet de mettre à jour des documents existants avec la commande `updateOne` ou `updateMany`.

1. **Mettre à jour un document** :
Pour modifier l'âge de "Alice" :
    
    ```bash
    db.utilisateurs.updateOne(
      { "nom": "Alice" },
      { "$set": { "age": 26 } }
    )
    ```
    
2. **Mettre à jour plusieurs documents** :
Pour augmenter l'âge de tous les utilisateurs de 2 ans :
    
    ```bash
    db.utilisateurs.updateMany(
      {},
      { "$inc": { "age": 2 } }
    )
    ```
    

### Étape 7 : Supprimer des documents

Pour supprimer des documents, utilisez `deleteOne` ou `deleteMany` :

1. **Supprimer un document spécifique** :
Pour supprimer l'utilisateur "Charlie" :
    
    ```bash
    db.utilisateurs.deleteOne({ "nom": "Charlie" })
    ```
    
2. **Supprimer plusieurs documents** :
Pour supprimer tous les utilisateurs de plus de 30 ans :
    
    ```bash
    db.utilisateurs.deleteMany({ "age": { "$gt": 30 } })
    ```
    

### Étape 8 : Indexation

MongoDB permet d'indexer des champs pour améliorer les performances des requêtes. Voici comment créer un index sur le champ "nom" :

```bash
db.utilisateurs.createIndex({ "nom": 1 })
```

Vous pouvez également créer des **index composites** sur plusieurs champs, par exemple sur "nom" et "email" :

```bash
db.utilisateurs.createIndex({ "nom": 1, "email": 1 })
```

## Validation du schéma :

- Ajouter un shéma de validation :

![image.png](/420-514/images/image.png)

![image.png](/420-514/images/image%201.png)

![image.png](/420-514/images/image%202.png)

Les documents qui ne respectent pas le schéma je fais find pour les sélectionner puis Delete pour les supprimer

![image.png](/420-514/images/image%203.png)

Ou mettre une valeur par défaut : 

![image.png](/420-514/images/image%204.png)

### Étape 9 : Utiliser l'agrégation

L'agrégation permet de réaliser des opérations complexes sur les données, comme des groupements, des tris, et des filtres avancés.

1. **Exemple de pipeline d'agrégation** :
Pour calculer l'âge moyen des utilisateurs :
    
    ```bash
    db.utilisateurs.aggregate([
      { "$group": { "_id": null, "ageMoyen": { "$avg": "$age" } } }
    ])
    ```
    
2. **Pipeline plus complexe** :
Calculer le nombre d'utilisateurs par tranche d'âge :
    
    ```bash
    db.utilisateurs.aggregate([
      { "$bucket": {
        "groupBy": "$age",
        "boundaries": [ 20, 30, 40, 50 ],
        "default": "50+",
        "output": { "nombre": { "$sum": 1 } }
      }}
    ])
    ```
    

### Étape 10 : Sauvegarde et restauration de données

MongoDB offre des outils pour sauvegarder et restaurer des données.

1. **Sauvegarde** :
Utilisez la commande `mongodump` pour sauvegarder une base de données :
    
    ```bash
    mongodump --db ma_base_de_donnees --out /path/to/backup
    ```
    
2. **Restauration** :
Utilisez `mongorestore` pour restaurer les données :
    
    ```bash
    mongorestore /path/to/backup
    ```
    

### Étape 11 : Accéder à MongoDB via une application Node.js

MongoDB peut être utilisé avec diverses applications, dont **Node.js**. Voici un exemple d'intégration avec Node.js :

1. Installez le driver MongoDB pour Node.js :
    
    ```bash
    npm install mongodb
    ```
    
2. Créez une connexion dans votre fichier JavaScript :
    
    ```jsx
    const { MongoClient } = require('mongodb');
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    
    async function run() {
      try {
        await client.connect();
        const database = client.db('ma_base_de_donnees');
        const utilisateurs = database.collection('utilisateurs');
    
        const nouvelUtilisateur = { nom: "John", age: 28, email: "john@example.com" };
        const resultat = await utilisateurs.insertOne(nouvelUtilisateur);
        console.log(`Nouveau document inséré avec l'ID ${resultat.insertedId}`);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
    ```
    

[Exemples de requêtes, recherche et tri ](https://www.notion.so/Exemples-de-requ-tes-recherche-et-tri-11c45eb1bdf88046bacfffb12628dab8?pvs=21)
