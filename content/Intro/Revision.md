+++
title = "📘 Révision API REST"
weight = 10
draft = false
+++


## Rappel API REST

Une API REST se doit d’être sans état Stateless. La communication entre le client et le serveur ne doit pas dépendre d’un quelconque contexte provenant du serveur. 

![Rest api design](/420-514/images/Rest_api_design.png)

Ainsi, chaque requête doit contenir l’ensemble des informations nécessaires à son traitement. Cela permet de traiter indifféremment les requêtes de plusieurs clients via de multiples instances de serveurs.
 
Pour chaque réponse renvoyée par l’API, un code doit être envoyé, ce code correspond à l’état de la requête et dépend de la réussite ou non de celle-ci. 



Les codes de statuts les plus courants que l’on retrouve généralement sur le Web sont :

| Code                      | Définition |
|---------------------------|------------|
| **200 OK** | Tout s'est bien passé |
| **201 Created** | La création de la ressource s'est bien passée (il n’est pas rare que les attributs de la nouvelle ressource soient aussi renvoyés dans la réponse. Dans ce cas, l’URL de cette ressource nouvellement créée est ajoutée via un Header Location) |
| **204 NO Content** | Même principe que pour la 201, mais cette fois-ci, le contenu de la ressource nouvellement créée ou modifiée n'est pas renvoyé en réponse |
| **304 Not modified** | Le contenu n'a pas été modifié depuis la dernière fois qu'elle a été mise en cache |
| **400 Bad request** | La demande n'a pas pu être traitée correctement |
| **401 Unauthorized** | L'authentification a échoué |
| **403 Forbidden** | L'accès à cette ressource n'est pas autorisé |
| **404 Not found** | La ressource n'existe pas |
| **500 Server error** | Le serveur a rencontré un problème |


###  **Verbes HTTP (GET, POST, PUT, DELETE)**

**GET**
- **Exemple**: Vous souhaitez afficher une liste d'articles sur un blog.
- **Requête GET**: `GET /articles HTTP/1.1`
- **Action**: Le serveur retourne une liste d'articles au format JSON.
- **Réponse**:
    
    ```json
    [
        { "id": 1, "title": "Article 1", "content": "Contenu de l'article 1" },
        { "id": 2, "title": "Article 2", "content": "Contenu de l'article 2" }
    ]
    ```
---        
**POST**
- **Exemple**: Un utilisateur soumet un formulaire pour créer un nouvel article.
- **Requête POST**: `POST /articles HTTP/1.1`
- **Corps de la requête**:
    
    ```json
    { "title": "Nouvel Article", "content": "Contenu du nouvel article" }
    ```
        
    - **Action**: Le serveur crée un nouvel article avec les données fournies.
    - **Réponse**: `201 Created` avec l'article créé en retour.
---
**PUT**
- **Exemple**: Un utilisateur souhaite mettre à jour un article existant.
- **Requête PUT**: `PUT /articles/1 HTTP/1.1`
- **Corps de la requête**:
    
    ```json
    { "title": "Article mis à jour", "content": "Contenu mis à jour" }
    ```
- **Action**: Le serveur met à jour l'article avec les nouvelles données
- **Réponse**: `200 OK` avec l'article mis à jour en retour.
---
**DELETE**

- **Exemple**: Un utilisateur souhaite supprimer un article.
- **Requête DELETE**: `DELETE /articles/1 HTTP/1.1`
- **Action**: Le serveur supprime l'article avec l'ID 1.
- **Réponse**: `204 No Content` (pas de contenu retourné, car la ressource a été supprimée).

#### **Requête préliminaire `OPTIONS`**

Pour certaines requêtes, le navigateur envoie automatiquement une requête
`OPTIONS` avant la requête réelle.

```http
OPTIONS /api/buildings HTTP/1.1
Origin: http://localhost:5173
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type
```

Cette requête permet au navigateur de vérifier si le serveur autorise :

- l’origine;
- la méthode;
- les en-têtes demandés.

> CORS est un mécanisme appliqué par les navigateurs. Il ne remplace ni
> l’authentification, ni l’autorisation, ni la validation des données.


## **Nommage des ressources d’une API REST**

Une ressource représente un élément du domaine, par exemple un bâtiment, un capteur ou une mesure.

### Principales conventions

* utiliser des **noms** plutôt que des verbes;
* utiliser le **pluriel**;
* employer des noms clairs et représentatifs du domaine;
* conserver une convention uniforme;
* utiliser le `kebab-case` pour les noms composés.

```
GET    /api/buildings
POST   /api/buildings
GET    /api/buildings/42
PATCH  /api/buildings/42
DELETE /api/buildings/42
```

On évite :

```
GET  /api/getBuildings
POST /api/createBuilding
```
![API Rest](/420-514/images/api/api_rest.png)

La méthode HTTP exprime l’action; le chemin identifie la ressource.

### Relations et filtres

Une sous-ressource exprime une relation :

```
GET /api/buildings/42/sensors
```

Les paramètres de requête servent à filtrer, trier ou paginer :

```
GET /api/buildings?city=Montreal
GET /api/measurements?page=2&limit=50
```

> **À retenir :** la méthode HTTP indique l’action et le chemin indique la ressource.
