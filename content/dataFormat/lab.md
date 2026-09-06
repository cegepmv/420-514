+++
title = '🧪 Activités et exercice de révision'
draft = false
weight = 51
+++


## Activité

Analyser :

~~~json
{
  "Building_ID": 90071992547409930,
  "building_name": "Pavillon principal",
  "created": "03/09/26",
  "consumption": 24.8,
  "rooms": null,
  "active": "true"
}
~~~

Questions :

1. L’identifiant risque-t-il de perdre de la précision?
2. Le nommage est-il cohérent?
3. La date est-elle non ambiguë?
4. Quelle est l’unité de consommation?
5. Pourquoi <code>rooms</code> pourrait-il être un tableau vide?
6. Pourquoi <code>active</code> devrait-il être un booléen?


## Application à Energy API

Pour <code>buildings</code> et <code>rooms</code> :

1. définir les représentations JSON;
2. identifier les propriétés générées par le serveur;
3. préciser les propriétés obligatoires;
4. choisir les formats de date et d’identifiant;
5. définir les unités;
6. décider le comportement de <code>null</code>;
7. écrire un exemple de création;
8. écrire une réponse de succès;
9. écrire une erreur Problem Details;
10. tester avec Postman ou <code>curl</code>.

### Décisions retenues

| Élément | Décision |
|---|---|
| Format d’entrée | <code>application/json</code> |
| Format de succès | <code>application/json</code> |
| Format d’erreur | <code>application/problem+json</code> |
| Nommage | <code>camelCase</code> |
| Identifiants | Chaînes UUID |
| Dates et heures | ISO 8601 avec fuseau |
| Collection vide | <code>[]</code> |
| Propriété inconnue | Rejetée |


## Questions de révision

1. Quelle différence existe-t-il entre propriété absente et <code>null</code>?
2. Quel en-tête décrit le corps envoyé?
3. Quelle différence existe-t-il entre sérialisation et désérialisation?
4. Pourquoi une date devient-elle une chaîne?
5. Quel en-tête décrit les formats souhaités?
6. Quelle différence existe-t-il entre <code>400</code> et <code>415</code>?
9. Pourquoi le contrat public doit-il être indépendant de la base de données?