+++
draft = false
title = "📘 Gestion et évolution d'une API"
weight = 31
+++


## 1. Compatibilité du contrat

Une modification est généralement **compatible** si les consommateurs existants peuvent continuer à fonctionner.

Exemples souvent compatibles :

- ajouter un endpoint;
- ajouter un paramètre facultatif;
- ajouter une propriété facultative à une réponse;
- corriger la documentation sans modifier le contrat.

Exemples de ruptures possibles :

- renommer ou supprimer une propriété;
- changer le type d'une valeur;
- modifier le sens d'un code de statut;
- rendre obligatoire un paramètre auparavant facultatif;
- supprimer ou renommer un endpoint.

### Exemple de rupture

Version initiale :

```json
{
  "area": 2500
}
```

Nouvelle version incompatible :

```json
{
  "area": "2500 m²"
}
```

Le type est passé de `number` à `string`, ce qui peut briser les calculs des clients.

Une évolution plus sûre serait :

```json
{
  "area": 2500,
  "areaUnit": "m2"
}
```


## 2. Versionnement

Le versionnement permet de maintenir plusieurs contrats lorsqu'une évolution incompatible est nécessaire.

Exemple par URI :

```http
/api/v1/buildings
/api/v2/buildings
```

On ne crée pas une nouvelle version pour chaque modification. Une nouvelle version devient pertinente lorsqu'on introduit une rupture de contrat qui ne peut pas être évitée.

### Versionnement dans NestJS

```ts
import { VersioningType } from '@nestjs/common';

app.setGlobalPrefix('api');
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});
```

Contrôleur versionné :

```ts
@Controller({
  path: 'buildings',
  version: '1',
})
export class BuildingsController {}
```

La route obtenue est :

```http
/api/v1/buildings
```

## 3. Dépréciation

Déprécier signifie annoncer qu'une version ou une fonctionnalité reste temporairement disponible, mais qu'elle sera retirée.

Une dépréciation de qualité devrait préciser :

- ce qui est déprécié;
- la solution de remplacement;
- la date prévue du retrait;
- les changements nécessaires pour migrer;
- la période de transition.

Exemple de communication :

```text
La version v1 de GET /buildings sera retirée le 30 juin 2027.
On doit migrer vers GET /api/v2/buildings avant cette date.
```

Une route ne devrait pas disparaître sans préavis lorsqu'elle est utilisée par des consommateurs externes.


## 2.4 Cycle de vie simplifié

```text
Concevoir → implémenter → tester → publier → observer → faire évoluer → déprécier → retirer
```

La gestion d'une API ne se termine pas au moment où son code est déployé.
