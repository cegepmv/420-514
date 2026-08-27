+++
title = "Design et gestion d’une API"
weight = 3
pre = "2. "
draft = false
+++


Design d'API et bonnes pratiques en

{{< video src="https://www.youtube.com/watch?v=7QfswaV0re4" alt="Design d'API et bonnes pratiques en" controls="true" loop="false" />}}


Design d'API et bonnes pratiques fr

{{< video src="https://www.youtube.com/watch?v=pH7ZT9cOL0k" alt="Design d'API et bonnes pratiques fr" controls="true" loop="false" />}}


## Erreurs fréquentes

- placer les actions dans le chemin;
- mélanger singulier et pluriel;
- utiliser des conventions différentes selon les endpoints;
- retourner `200` pour toutes les situations;
- confondre `Content-Type` et `Accept`;
- envoyer un objet JavaScript sans `JSON.stringify()` avec `fetch`;
- appeler `JSON.stringify()` inutilement dans un contrôleur NestJS;
- confondre désérialisation et validation;
- changer une propriété sans évaluer l'impact sur les consommateurs;
- créer une nouvelle version pour une modification compatible mineure;
- supprimer une version sans période de transition.


## À retenir

1. Une API est un contrat entre un producteur et ses consommateurs.
2. La méthode HTTP exprime l'action; le chemin identifie la ressource.
3. La cohérence est plus importante qu'une convention isolée.
4. Les codes de statut doivent refléter le résultat réel.
5. Une rupture de contrat peut nécessiter une nouvelle version.
6. Une version dépréciée doit être annoncée et accompagnée d'un plan de migration.
7. JSON représente les données, tandis que HTTP transporte les messages.
8. `Content-Type` décrit le corps envoyé; `Accept` décrit le format souhaité.
9. Sérialiser transforme un objet en données transmissibles; désérialiser réalise l'opération inverse.
10. Un JSON syntaxiquement valide n'est pas nécessairement valide pour le domaine.


## Questions de vérification

1. Pourquoi considère-t-on une API comme un contrat?
2. Quel problème pose `POST /createBuilding`?
3. Quelle différence existe-t-il entre une route individuelle et un filtre?
4. Quel code devrait suivre la création réussie d'une ressource?
5. Quelle modification risque de briser un consommateur existant?
6. Quand une nouvelle version devient-elle pertinente?
7. Quelle différence existe-t-il entre `Content-Type` et `Accept`?
8. Pourquoi sépare-t-on une valeur numérique de son unité?
9. Pourquoi privilégier une date ISO 8601 avec un fuseau explicite?
10. Pourquoi la désérialisation ne remplace-t-elle pas la validation?


## Références

- [RFC 8259 — The JavaScript Object Notation Data Interchange Format](https://datatracker.ietf.org/doc/html/rfc8259)
- [RFC 9457 — Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/rfc9457/)
- [NestJS — Controllers](https://docs.nestjs.com/controllers)
- [NestJS — Serialization](https://docs.nestjs.com/techniques/serialization)
- [NestJS — Versioning](https://docs.nestjs.com/techniques/versioning)
