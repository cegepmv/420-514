+++
draft = false
title = "🧪 Laboratoire : Appliquer le design d'API sur energy-api"
weight = 32
+++

Ce laboratoire poursuit le développement de `energy-api`. On ne cherche plus seulement à faire fonctionner un endpoint : on cherche à construire une API **compréhensible, cohérente et prévisible** pour ses consommateurs.

## Étape 1 : Formaliser les conventions

Dans le `README.md`, ajouter une section précisant :

- le préfixe `/api`;
- la version `v1`;
- les noms anglais au pluriel;
- le `kebab-case` dans les chemins;
- le `camelCase` dans les objets JSON;
- les dates ISO 8601 en UTC;
- JSON comme format principal.

## Étape 2 : Activer la version 1

Dans `main.ts` :

```ts
import { VersioningType } from '@nestjs/common';

app.setGlobalPrefix('api');
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});
```

## Étape 3 : Concevoir les routes

Concevoir au minimum :

```http
GET  /api/v1/buildings
GET  /api/v1/buildings/:id
POST /api/v1/buildings
```

## Étape 4 : Définir les données échangées

Corps de création :

```json
{
  "name": "Pavillon principal",
  "city": "Montréal"
}
```

Réponse de création :

```json
{
  "id": "bld-001",
  "name": "Pavillon principal",
  "city": "Montréal",
  "createdAt": "2026-08-26T14:30:00Z"
}
```

## Étape 5 : Tester le contrat

Pour chaque endpoint, vérifier :

- la méthode;
- l'URL;
- les en-têtes;
- le corps envoyé;
- le code de statut;
- le corps retourné;
- le comportement avec un identifiant inexistant.

