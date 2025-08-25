+++
draft = false
title = 'Requêtes HTTP'
weight = 31
+++


### **Parties d'une Requête HTTP**

- **URL (Uniform Resource Locator)**: L'adresse de la ressource demandée.
    - **Exemple**: `https://api.example.com/users/123`
    - Cette URL accède à la ressource utilisateur avec l'ID 123.
- **Méthode HTTP**: Le verbe HTTP utilisé pour la requête (GET, POST, etc.).
    - **Exemple**: `POST /users HTTP/1.1`
    - Cette méthode indique que la requête envoie des données pour créer un nouvel utilisateur.
- **En-têtes (Headers)**: Informations supplémentaires sur la requête.
    - **Exemple**:
        
        ```
        Content-Type: application/json
        Authorization: Bearer your-token-here
        ```
        
    - Sachant que : `Content-Type` indique que le corps de la requête est en format JSON. `Authorization` envoie un token d'authentification.
- **Corps (Body)**: Contenu de la requête (souvent utilisé avec POST et PUT).
    - **Exemple**:
        
        ```json
        {
          "username": "johndoe",
          "email": "john@example.com"
        }
        ```
        
    - Le corps contient les données envoyées au serveur pour créer ou mettre à jour une ressource.


