+++
date = '2025-09-21T22:19:32-04:00'
draft = true
title = 'Swagger / OpenApi'
weight = 72
+++


# 1. Pourquoi documenter une API?

Une API est utilisée par d’autres logiciels, équipes ou services. Son code source ne constitue pas un contrat suffisant pour ses consommateurs.

Une documentation d’API doit répondre à des questions concrètes :

- quelle URL doit-on appeler?
- quelle méthode HTTP doit-on employer?
- quelles données doit-on envoyer?
- quels champs sont obligatoires?
- quelle réponse reçoit-on?
- quelles erreurs peuvent survenir?
- quelle version du contrat utilise-t-on?

## 1.1 Le contrat d’API

Le contrat décrit les échanges observables entre un fournisseur et ses consommateurs.

| Élément | Exemple dans <code>energy-api</code> |
|---|---|
| Ressource | Bâtiment |
| Méthode | <code>POST</code> |
| Chemin | <code>/api/v1/buildings</code> |
| Format d’entrée | <code>application/json</code> |
| Schéma d’entrée | <code>CreateBuildingDto</code> |
| Succès | <code>201 Created</code> |
| En-tête | <code>Location</code> |
| Erreurs | <code>400</code>, <code>409</code>, <code>415</code> |
| Format d’erreur | <code>application/problem+json</code> |

Le contrat ne décrit pas la manière dont les données sont conservées. Un client ne devrait pas avoir besoin de savoir si l’API utilise un tableau en mémoire ou MongoDB.

## 1.2 Conséquences d’une documentation insuffisante

- interprétations différentes du même endpoint;
- requêtes invalides répétées;
- intégrations plus lentes;
- dépendance envers les développeurs de l’API;
- tests incomplets;
- changements incompatibles non détectés;
- exemples qui divergent du code.


# 2. OpenAPI et Swagger

Les termes sont liés, mais ils ne désignent pas exactement la même chose.

| Terme | Rôle |
|---|---|
| OpenAPI Specification | Standard décrivant la structure d’une API HTTP |
| Document OpenAPI | Fichier JSON ou YAML conforme à ce standard |
| Swagger UI | Interface Web qui affiche et permet d’essayer le document |
| <code>@nestjs/swagger</code> | Module NestJS qui génère le document et expose Swagger UI |
| Swagger Editor | Outil permettant d’écrire et de prévisualiser une spécification |

## 2.1 Une distinction essentielle

OpenAPI est le contrat lisible par les outils. Swagger UI est seulement une représentation interactive de ce contrat.

Une API peut donc :

- publier un document OpenAPI sans Swagger UI;
- afficher Swagger UI à partir d’un document généré;
- utiliser la spécification pour générer un client, effectuer des tests ou valider des changements.

## 2.2 Ce qu’OpenAPI ne fait pas

Une spécification ne garantit pas automatiquement que :

- l’implémentation respecte réellement le contrat;
- les exemples sont exacts;
- les règles métier sont complètes;
- l’API est sécurisée;
- les tests sont suffisants.

La documentation doit être vérifiée avec le code et les tests.



# 3. Deux approches de conception

## 3.1 Design first

On écrit d’abord le contrat OpenAPI, puis on implémente l’API.

Avantages :

- discussions possibles avant le développement;
- contrat utilisable par plusieurs équipes;
- génération de simulations et de clients;
- décisions centrées sur les consommateurs.

Limites :

- risque que le code et le document divergent;
- apprentissage plus exigeant du format OpenAPI;
- mise à jour manuelle nécessaire sans automatisation.

## 3.2 Code first

On écrit l’application et ses métadonnées, puis on génère OpenAPI à partir du code.

Avantages :

- intégration naturelle avec NestJS;
- moins de duplication;
- documentation proche des contrôleurs et DTO;
- génération répétable.

Limites :

- le contrat peut refléter des décisions techniques plutôt que les besoins;
- les informations non déductibles doivent être ajoutées;
- un décorateur oublié produit une documentation incomplète.

## 3.3 Approche retenue pour <code>energy-api</code>

On utilise une approche hybride :

1. on décide le contrat REST avant l’implémentation;
2. on l’implémente avec NestJS;
3. on ajoute les métadonnées Swagger au code;
4. on génère la spécification;
5. on la compare aux tests E2E et à la documentation publique.


# 4. Structure d’un document OpenAPI

Un document OpenAPI contient plusieurs sections principales.

    openapi: 3.0.0
    info:
      title: Energy API
      version: 1.0.0
    servers: []
    tags: []
    paths: {}
    components:
      schemas: {}

## 4.1 <code>openapi</code>

Cette propriété indique la version de la spécification utilisée. Elle ne représente pas la version fonctionnelle de l’API.

## 4.2 <code>info</code>

Elle présente le produit :

- titre;
- description;
- version du contrat;
- licence;
- coordonnées de contact, si pertinentes.

## 4.3 <code>servers</code>

Cette section décrit les adresses possibles :

- environnement local;
- environnement de test;
- environnement de production.

On évite de publier une adresse interne ou confidentielle.

## 4.4 <code>tags</code>

Les tags regroupent les opérations par domaine :

- Health;
- Buildings;
- Rooms.

Un tag ne représente pas nécessairement un module technique. Il doit aider le consommateur à naviguer dans le contrat.

## 4.5 <code>paths</code>

Cette section décrit les chemins et leurs opérations.

Pour chaque opération, on peut préciser :

- résumé et description;
- identifiant stable de l’opération;
- paramètres;
- corps de la requête;
- réponses;
- formats;
- sécurité;
- dépréciation.

## 4.6 <code>components.schemas</code>

Les schémas représentent les données réutilisables :

- requête de création;
- requête de modification;
- bâtiment retourné;
- local retourné;
- document Problem Details.

La réutilisation évite de recopier la même définition dans chaque endpoint.



# 5. Décrire une opération HTTP

Prenons la création d’un bâtiment.

## 5.1 Informations nécessaires

| Élément | Valeur attendue |
|---|---|
| Méthode | <code>POST</code> |
| Chemin | <code>/api/v1/buildings</code> |
| Tag | Buildings |
| Corps | <code>CreateBuildingDto</code> |
| Format | <code>application/json</code> |
| Succès | <code>201 Created</code> |
| En-tête | <code>Location</code> |
| Erreurs | <code>400</code>, <code>409</code>, <code>415</code> |

## 5.2 Paramètres

OpenAPI distingue principalement :

| Emplacement | Exemple |
|---|---|
| <code>path</code> | <code>buildingId</code> dans l’URL |
| <code>query</code> | filtre, tri ou pagination |
| <code>header</code> | en-tête personnalisé |
| <code>cookie</code> | valeur transportée par un cookie |

Un paramètre de chemin est toujours obligatoire.

## 5.3 Corps de requête

Le corps précise :

- le type de média;
- le schéma;
- son caractère obligatoire;
- des exemples représentatifs.

Le corps ne doit pas inclure une propriété générée par le serveur, comme l’identifiant d’une nouvelle ressource.

## 5.4 Réponses

Chaque opération doit documenter :

- au moins une réponse de succès;
- les erreurs raisonnablement prévisibles;
- le schéma du corps;
- les en-têtes importants;
- le type de média.

Documenter seulement <code>200</code> n’est pas suffisant si l’implémentation peut produire <code>404</code> ou <code>409</code>.



# 6. Swagger UI comme outil d’exploration

Swagger UI permet :

- de parcourir les ressources;
- de consulter les schémas;
- d’entrer des paramètres;
- d’envoyer des requêtes;
- de voir les réponses;
- de télécharger ou consulter la spécification.

## 6.1 Limites de « Try it out »

Une requête réussie dans Swagger UI ne remplace pas :

- les tests unitaires;
- les tests E2E;
- les tests de sécurité;
- la validation du contrat;
- les essais automatisés de non-régression.

Swagger UI est surtout un outil d’exploration et de démonstration.

## 6.2 Scénarios de démonstration

1. consulter la collection vide;
2. créer un bâtiment;
3. récupérer l’identifiant;
4. consulter le bâtiment;
5. envoyer un DTO invalide;
6. créer un doublon;
7. consulter une ressource absente;
8. supprimer la ressource.

On compare ensuite les résultats observés aux réponses documentées.



# 7. Maintenir la documentation

## 7.1 Source de vérité

Dans une approche code first :

- les contrôleurs décrivent les opérations;
- les DTO décrivent les schémas;
- la configuration décrit les métadonnées générales;
- les tests vérifient le comportement;
- le document OpenAPI est généré.

Le fichier généré ne devrait pas être modifié manuellement, car il sera écrasé à la prochaine génération.

## 7.2 Vérifications en intégration continue

Une équipe peut :

- générer le document OpenAPI;
- vérifier qu’il est valide;
- comparer la nouvelle version à la précédente;
- détecter les changements incompatibles;
- publier la documentation avec la version déployée.

## 7.3 Changements incompatibles

Exemples :

- supprimer un endpoint;
- renommer une propriété;
- rendre un champ facultatif obligatoire;
- retirer une valeur d’un enum;
- modifier un type;
- supprimer une réponse encore utilisée.

Un changement de documentation peut donc révéler un changement de contrat exigeant une nouvelle version de l’API.



# 8. Bonnes pratiques pour un projet public

- fournir un titre, une description et une version significatifs;
- séparer l’URL de documentation du préfixe de l’API;
- documenter les succès et les erreurs;
- utiliser des exemples réalistes et anonymes;
- éviter les adresses internes et les secrets;
- décrire les unités et les formats;
- donner des <code>operationId</code> stables si des clients sont générés;
- éviter d’exposer Swagger UI en production sans décision explicite;
- conserver le document JSON accessible aux outils lorsque cela est utile;
- vérifier la correspondance avec les tests E2E.

## 8.1 Swagger UI en production

Plusieurs stratégies sont possibles :

| Stratégie | Usage |
|---|---|
| UI publique | API destinée aux développeurs externes |
| UI protégée | Documentation réservée à des partenaires |
| UI désactivée, JSON publié | Contrat consommé par des outils |
| Documentation séparée | Portail développeur indépendant |

La présence de Swagger UI en développement ne signifie pas qu’elle doit être exposée automatiquement dans tous les environnements.


## Activité en classe : 

### Étude d’une opération incomplète

On fournit une opération documentée seulement comme suit :

    POST /api/v1/buildings
    Réponse : 200

En équipe, déterminer tout ce qui manque pour qu’un consommateur puisse l’utiliser correctement.


[Exemple de Swagger Editor](https://editor-next.swagger.io/?_gl=1*1wb8ror*_gcl_au*NDE5NTE0ODQ4LjE3NTg1MTEwNTU.)
