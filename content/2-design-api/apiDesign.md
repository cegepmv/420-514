+++
draft = false
title = "📘 Principes de design d'une API de qualité"
weight = 30
+++

## Une API est un contrat

Une API établit un contrat entre deux parties :

- le **producteur**, qui expose les fonctionnalités;
- le **consommateur**, qui utilise ces fonctionnalités.

Le contrat précise notamment :

- les méthodes HTTP disponibles;
- les chemins des ressources;
- les paramètres acceptés;
- le format du corps des requêtes;
- la structure des réponses;
- les codes de statut;
- les erreurs possibles.

Modifier ce contrat peut affecter toutes les applications qui utilisent l'API.

### Exemple de contrat

```http
POST /api/v1/buildings
Content-Type: application/json
Accept: application/json

{
  "name": "Pavillon principal",
  "city": "Montréal"
}
```

Réponse attendue :

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/buildings/bld-001

{
  "id": "bld-001",
  "name": "Pavillon principal",
  "city": "Montréal"
}
```

## Caractéristiques d'une API de qualité

| Caractéristique | Question à poser |
|---|---|
| Compréhensible | Peut-on deviner comment utiliser l'API? |
| Cohérente | Les mêmes conventions sont-elles utilisées partout? |
| Prévisible | Une opération semblable produit-elle une réponse semblable? |
| Évolutive | Peut-on ajouter des fonctionnalités sans briser les clients? |
| Observable | Peut-on comprendre les erreurs et diagnostiquer les problèmes? |
| Testable | Le contrat peut-il être vérifié automatiquement? |
| Documentée | Un consommateur connaît-il les routes et les données attendues? |

La qualité d'une API ne dépend donc pas seulement de son fonctionnement interne. Elle dépend aussi de l'expérience offerte aux consommateurs.


## Concevoir autour des ressources

Une API REST présente le domaine sous forme de **ressources**.

Dans `energy-api`, on peut identifier :

- `buildings` : les bâtiments;
- `sensors` : les capteurs;
- `measurements` : les mesures;
- `alerts` : les alertes.

Les chemins utilisent généralement des noms au pluriel :

```http
/api/v1/buildings
/api/v1/sensors
/api/v1/measurements
/api/v1/alerts
```

La méthode HTTP exprime l'action. Le chemin identifie la ressource.

## Nommage uniforme

Conventions retenues pour le cours :

- noms en anglais;
- noms de collections au pluriel;
- minuscules dans les chemins;
- `kebab-case` pour un nom composé;
- noms précis issus du domaine;
- verbes réservés aux méthodes HTTP.

Exemples :

```http
/api/v1/buildings
/api/v1/energy-measurements
/api/v1/measurement-types
```

On évite :

```http
/api/v1/data
/api/v1/get_measurements
/api/v1/EnergyMeasurements
```


## Méthodes HTTP et intention

| Méthode | Intention habituelle | Exemple |
|---|---|---|
| `GET` | Lire une collection ou une ressource | `GET /buildings` |
| `POST` | Créer une ressource | `POST /buildings` |
| `PUT` | Remplacer complètement une ressource | `PUT /buildings/bld-001` |
| `PATCH` | Modifier partiellement une ressource | `PATCH /buildings/bld-001` |
| `DELETE` | Supprimer une ressource | `DELETE /buildings/bld-001` |

Une méthode `GET` ne devrait pas modifier les données du serveur.

Exemple à éviter :

```http
GET /api/v1/deleteBuilding?id=bld-001
```

Exemple approprié :

```http
DELETE /api/v1/buildings/bld-001
```

Il faut donc faire la distinction entre les routes de collection et routes individuelles : 
Un identifiant placé dans le chemin indique normalement la ressource visée.


## Relations entre les ressources

Une sous-ressource peut exprimer une relation claire :

```http
GET /api/v1/buildings/bld-001/sensors
```

Cette route signifie : obtenir les capteurs associés au bâtiment `bld-001`.

On évite cependant les chemins trop profonds :

```http
/buildings/bld-001/floors/2/rooms/204/sensors/sen-9/measurements
```

Une route plus simple peut être préférable :

```http
GET /api/v1/measurements?sensorId=sen-9
```

## Paramètres de requête

Les paramètres de requête peuvent servir à :

- filtrer;
- trier;
- paginer;
- sélectionner une représentation.

### Filtrage

```http
GET /api/v1/buildings?city=Montréal
GET /api/v1/sensors?status=active
```

### Tri

```http
GET /api/v1/buildings?sort=name
GET /api/v1/measurements?sort=-recordedAt
```

Dans cet exemple, `-recordedAt` représente un tri décroissant.

### Pagination

```http
GET /api/v1/measurements?page=2&limit=50
```

Une convention doit être choisie et appliquée uniformément dans toute l'API.


## Codes de statut cohérents

| Situation | Code approprié |
|---|---:|
| Lecture réussie | `200 OK` |
| Création réussie | `201 Created` |
| Suppression réussie sans contenu | `204 No Content` |
| Requête ou données invalides | `400 Bad Request` |
| Authentification absente ou invalide | `401 Unauthorized` |
| Accès interdit | `403 Forbidden` |
| Ressource introuvable | `404 Not Found` |
| Conflit avec l'état actuel | `409 Conflict` |
| Erreur inattendue du serveur | `500 Internal Server Error` |

Une API ne devrait pas retourner systématiquement `200`, particulièrement lorsqu'une opération échoue.


## Une structure de réponse prévisible

Pour une ressource individuelle :

```json
{
  "id": "bld-001",
  "name": "Pavillon principal",
  "city": "Montréal"
}
```

Pour une collection paginée :

```json
{
  "items": [
    {
      "id": "bld-001",
      "name": "Pavillon principal",
      "city": "Montréal"
    }
  ],
  "page": 1,
  "limit": 20,
  "total": 1
}
```

Il n'existe pas une enveloppe universelle obligatoire. L'important est de choisir une structure utile et de l'appliquer de façon cohérente.


## Des erreurs exploitables

Une erreur doit être utile autant pour une personne que pour une application cliente.

Exemple :

```http
HTTP/1.1 404 Not Found
Content-Type: application/problem+json

{
  "type": "https://energy.example/problems/building-not-found",
  "title": "Bâtiment introuvable",
  "status": 404,
  "detail": "Aucun bâtiment ne possède l'identifiant bld-999.",
  "instance": "/api/v1/buildings/bld-999"
}
```

Cette structure s'inspire du format *Problem Details for HTTP APIs*. À ce stade, on cherche surtout à retenir qu'une erreur devrait contenir une structure stable et un message précis.

On évite :

```json
{
  "error": "Une erreur est survenue"
}
```