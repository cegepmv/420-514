+++
draft = false
title = '📘 Requêtes HTTP'
weight = 31
+++

## **Le protocole HTTP**

HTTP (HyperText Transfer Protocol) est le protocole qui permet d’échanger des données sur le Web.

Il fonctionne selon un modèle client-serveur : c’est toujours le client (navigateur) qui envoie une requête, et le serveur qui répond.

HTTP est utilisé pour récupérer différentes ressources :
- documents HTML,
- feuilles de style (CSS),
- images, vidéos, scripts, etc.

Un document web complet est construit en combinant tous ces sous-documents envoyés par le serveur.

---

## **Parties d'une Requête HTTP**

![Parties de requête HTTP](/420-514/images/parties_http_req.svg)

- **URL (Uniform Resource Locator)**: L'adresse de la ressource demandée.
    - **Exemple**: `https://api.example.com/users/123`
    - Cette URL accède à la ressource utilisateur avec l'ID 123.
- **Méthode HTTP**: Le verbe HTTP utilisé pour la requête (GET, POST, etc.).

- **En-têtes (Headers)**: Informations supplémentaires sur la requête.

- **Corps (Body)**: Contenu de la requête (souvent utilisé avec POST et PUT).
    - **Exemple**:
        
        ```json
        {
          "username": "johndoe",
          "email": "john@example.com"
        }
        ```
        
    - Le corps contient les données envoyées au serveur pour créer ou mettre à jour une ressource.


### 1. URL
Le chemin de la ressource à extraire correspond à l’URL simplifiée de la ressource, dont on a retiré les éléments déjà implicites dans le contexte, comme le protocole (http://), le nom de domaine (ex. .mozilla.org) ou encore le port TCP par défaut (ex. 80).


### 2. Méthodes HTTP (GET, POST, PUT, DELETE)
Une méthode HTTP est une instruction envoyée par le client au serveur pour préciser l’action à effectuer sur une ressource.
Le plus souvent, il s’agit d’un verbe comme GET (récupérer une ressource) ou POST (envoyer des données, par exemple le contenu d’un formulaire).
Il existe aussi d’autres méthodes comme OPTIONS ou HEAD, qui permettent d’effectuer des opérations spécifiques selon le contexte.
    - **Exemple**: `POST /users HTTP/1.1`
    - Cette méthode indique que la requête envoie des données pour créer un nouvel utilisateur.


### 3. En-têtes (Headers)
Ce sont des **paires clé-valeur** qui fournissent des informations supplémentaires sur la requête.

* **Obligatoires** : `Host` (nom du serveur).
* **Optionnels** : `User-Agent`, `Content-Type`, `Accept`, `Authorization`, etc.

👉 **Exemple** :

```
Host: www.exemple.com
User-Agent: Mozilla/5.0
Accept: text/html
```
Les en-têtes optionnels servent à transmettre des informations complémentaires destinées au serveur, afin de préciser ou d’adapter le traitement de la requête.

👉 **Exemple**:
    
    ```
    Content-Type: application/json
    Authorization: Bearer your-token-here
    ```
    
- Sachant que : `Content-Type` indique que le corps de la requête est en format JSON. `Authorization` envoie un token d'authentification.

#### Exemples d'entêtes :
| En-tête             | Exemple                               | Rôle                                                                    |
| ------------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| **Host**            | `Host: www.exemple.com`               | Indique le nom de domaine du serveur demandé (obligatoire en HTTP/1.1). |
| **User-Agent**      | `User-Agent: Mozilla/5.0`             | Fournit des infos sur le client (navigateur, OS, version).              |
| **Accept**          | `Accept: text/html, application/json` | Indique les formats de réponse que le client peut accepter.             |
| **Content-Type**    | `Content-Type: application/json`      | Spécifie le format des données envoyées au serveur.                     |
| **Content-Length**  | `Content-Length: 256`                 | Taille du corps de la requête (en octets).                              |
| **Authorization**   | `Authorization: Bearer <token>`       | Transmet un jeton ou identifiant pour authentifier le client.           |
| **Cookie**          | `Cookie: sessionId=xyz`               | Envoie des données de session ou de suivi au serveur.                   |
| **Cache-Control**   | `Cache-Control: no-cache`             | Indique comment gérer la mise en cache des ressources.                  |
| **Referer**         | `Referer: https://google.com`         | Indique la page d’où vient la requête.                                  |
| **Accept-Language** | `Accept-Language: fr-FR`              | Spécifie la langue préférée du client.                                  |

#### Filtres d'Origines des Requêtes (CORS)

- **CORS (Cross-Origin Resource Sharing)** : Un mécanisme qui permet au serveur de spécifier quelles origines (domaines) peuvent accéder à ses ressources.
- **Exemple**: Si une application JavaScript sur `https://frontend.example.com` veut faire une requête vers `https://api.example.com`, mais que CORS n'est pas configuré, le navigateur bloquera la requête.
- **Solution avec CORS**: Le serveur `https://api.example.com` peut configurer CORS pour autoriser les requêtes provenant de `https://frontend.example.com` :
    
    ```jsx
    const cors = require('cors');
    app.use(cors({ origin: '<https://frontend.example.com>' }));
    ```
    
    On peut aussi spécifier les méthodes qui sont autorisées sur cette route et headers qu’on peut ajouter à notre requête :
    
    ```jsx
    const express = require('express');
    const cors = require('cors');
    
    const app = express();
    app.use(cors({
      origin: ['http://example.com', 'https://api.example.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    ```

### 4. Corps
Sert à transmettre des données au serveur (ex. formulaire HTML, JSON, fichier).

Présent uniquement dans certaines méthodes (ex. POST, PUT).


#### Exemple :
```makefile
POST /api/users HTTP/1.1
Host: api.exemple.com
Content-Type: application/json
Content-Length: 45

{
  "nom": "Alice",
  "email": "alice@mail.com"
}
```

---

## **Formats de Données : JSON et XML**

### **JSON (JavaScript Object Notation)** : 
Un format de données léger, facile à lire pour les humains et à analyser par les machines.
- **Exemple** :
    
    ```json
    {
        "name": "John Doe",
        "age": 30,
        "city": "New York"
    }
    ```
    
- **Utilisation**: JSON est couramment utilisé pour les API RESTful, où les données sont échangées entre le client et le serveur sous forme de paires clé-valeur.
### **XML (eXtensible Markup Language)** : 
Un format de données structuré utilisant des balises, similaire au HTML.
- **Exemple** :
    
    ```xml
    <person>
        <name>John Doe</name>
        <age>30</age>
        <city>New York</city>
    </person>
    ```
    
- **Utilisation**: XML est utilisé dans des systèmes plus anciens ou pour des échanges de données dans des environnements nécessitant un balisage strict, comme les services SOAP.
