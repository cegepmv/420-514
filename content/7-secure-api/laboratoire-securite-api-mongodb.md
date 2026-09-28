+++
draft = true
title = '🧪 Laboratoire : Sécuriser energy-api et MongoDB'
weight = 82
+++


## Contexte

L’API `energy-api` permet maintenant de gérer des bâtiments et des locaux enregistrés dans MongoDB. Elle valide déjà une partie des données reçues et retourne des erreurs structurées.

Une API accessible sur un réseau ne peut toutefois pas considérer tous ses clients comme fiables. Il faut maintenant limiter sa surface d’attaque, contrôler l’identité des appelants, vérifier leurs permissions et empêcher qu’une requête HTTP soit transformée en requête MongoDB dangereuse.

Dans ce laboratoire, on fera évoluer l’application sans modifier inutilement son contrat métier. Les contrôles ajoutés devront être centralisés, configurables et cohérents avec l’architecture NestJS existante.

> Ce laboratoire donne des orientations et des critères de vérification. Il ne fournit pas une solution à recopier. On doit justifier les choix de sécurité et s’appuyer sur la documentation officielle lorsque nécessaire.


## Objectif principal

Sécuriser les ressources `buildings` et `rooms` d’`energy-api` au moyen d’une défense en profondeur couvrant :

- la configuration et les secrets;
- les entrées HTTP;
- les requêtes MongoDB;
- l’authentification;
- l’autorisation;
- la limitation des abus;
- les erreurs et la journalisation.

## Durée prévue

Deux blocs pratiques totalisant environ **5 à 6 heures**.

| Bloc | Travail principal |
|---|---|
| Bloc 1 | Configuration, surface HTTP, validation, requêtes MongoDB et authentification |
| Bloc 2 | Autorisation, limitation, erreurs, journalisation, MongoDB et documentation |

Certaines améliorations sont proposées en prolongement et ne font pas partie du travail obligatoire. Si un seul bloc de 3 heures est disponible, les étapes 0 à 5 constituent le noyau de la séance et les étapes suivantes doivent être terminées en travail personnel ou dans une seconde activité.

## Préalables

Avant de commencer, le projet devrait déjà contenir :

- une application NestJS fonctionnelle;
- les modules `buildings` et `rooms`;
- une connexion à MongoDB avec Mongoose;
- des DTO de création et de mise à jour;
- un `ValidationPipe` global;
- une documentation OpenAPI/Swagger;
- une gestion globale des erreurs avec un format inspiré de Problem Details.



## Scénario d’accès retenu

Pour ce laboratoire, on considère trois rôles applicatifs.

| Rôle | Responsabilités |
|---|---|
| `reader` | Consulter les bâtiments et les locaux autorisés |
| `operator` | Consulter, créer et modifier les bâtiments et les locaux |
| `admin` | Réaliser toutes les opérations, y compris les suppressions |

La matrice précédente constitue une exigence minimale. On peut utiliser des permissions plus précises à condition de conserver un comportement équivalent et de documenter la décision.

> Les rôles de l’application ne sont pas les rôles MongoDB. Un utilisateur de l’API et un compte de connexion à la base de données représentent deux identités différentes.



## Étape 0 : Préparer le travail

### Courte explication

Une modification de sécurité touche plusieurs parties de l’application. Elle doit pouvoir être révisée et testée indépendamment avant d’être intégrée à la branche de fonctionnalité.

### Travail à réaliser

1. Mettre à jour la branche `feature` associée à l’issue parente.
2. Créer la branche de travail correspondant à la sous-issue de sécurité.
3. Vérifier l’état initial du projet :
   - compilation;
   - lint;
   - connexion à MongoDB;
   - consultation des bâtiments et des locaux;
   - création et modification d’une ressource valide.
4. Identifier les routes actuellement publiques et les opérations MongoDB qui utilisent des données provenant du client.

### PR attendue

Ajouter à la pull request un court tableau indiquant :

| Élément observé | Risque possible | Contrôle prévu |
|---|---|---|
| Exemple : filtre de recherche | Injection NoSQL | Liste blanche des filtres |

Le tableau doit contenir au moins **trois risques propres au projet**.


## Étape 1 : Protéger les secrets et la configuration

### Courte explication

Un secret est une valeur qui permet d’accéder à une ressource ou de prouver une identité. L’URI MongoDB, la clé de signature des jetons et les mots de passe ne doivent pas être inscrits dans le code source.

La configuration doit aussi être vérifiée au démarrage. Une application ne devrait pas démarrer avec une clé absente, trop faible ou une URI invalide.

### Travail à réaliser

1. Recenser les valeurs de configuration nécessaires à l’application.
2. Déplacer toute valeur sensible vers les variables d’environnement.
3. Vérifier que `.env` est ignoré par Git.
4. Compléter `.env.example` avec les noms des variables, sans valeur sensible réelle.
5. Mettre en place une validation de la configuration au démarrage.
6. Faire échouer explicitement le démarrage lorsqu’une variable obligatoire est absente ou invalide.

### Variables minimales à considérer

- URI de connexion à MongoDB;
- port de l’application;
- secret ou clé de signature des jetons;
- durée de validité du jeton;
- origines autorisées par CORS;
- environnement d’exécution.

### Contraintes

- Aucun secret réel ne doit apparaître dans Git, Swagger, les captures ou la pull request.
- Les environnements de développement et de production ne doivent pas partager leurs secrets.
- Une valeur par défaut ne doit pas masquer l’absence d’un secret obligatoire.

### Vérification

- [ ] L’application démarre avec une configuration valide.
- [ ] L’application refuse de démarrer lorsqu’un secret obligatoire est absent.
- [ ] `.env.example` permet de comprendre la configuration attendue.
- [ ] `git status` ne montre aucun fichier contenant les secrets réels.


## Étape 2 — Réduire la surface HTTP

### Courte explication

La surface HTTP comprend les routes, les méthodes, les en-têtes, les origines et la quantité de données acceptées. Réduire cette surface diminue les possibilités d’abus, mais ne remplace pas l’authentification.

### Travail à réaliser

1. Ajouter le middleware recommandé par NestJS pour configurer les en-têtes HTTP de sécurité.
2. Configurer CORS avec une liste d’origines autorisées provenant de la configuration.
3. Limiter les méthodes et les en-têtes permis à ce qui est réellement nécessaire.
4. Définir une taille maximale raisonnable pour le corps JSON.
5. Vérifier que la documentation Swagger n’est pas automatiquement exposée dans tous les environnements.

### Orientations

- Le paquet `helmet` permet d’ajouter plusieurs en-têtes défensifs.
- CORS est appliqué par les navigateurs; il ne remplace aucun contrôle d’accès.
- Une limite de corps doit correspondre aux données réellement attendues par `energy-api`.
- Swagger peut rester accessible en développement. En production, son exposition doit résulter d’une décision explicite.

### Vérification

- [ ] Une origine non autorisée ne reçoit pas les permissions CORS attendues par un navigateur.
- [ ] Une requête normale provenant de l’origine autorisée fonctionne.
- [ ] Un corps anormalement volumineux est rejeté.
- [ ] Les en-têtes de sécurité sont présents dans la réponse.
- [ ] Le comportement de Swagger dépend de l’environnement.



## Étape 3 — Renforcer la frontière de validation

### Courte explication

La validation empêche une donnée mal formée d’atteindre la logique métier. Elle permet également d’éviter l’**affectation de masse**, c’est-à-dire la modification de propriétés que le client ne devrait pas contrôler.

### Travail à réaliser

1. Vérifier la configuration du `ValidationPipe` global.
2. Faire rejeter les propriétés qui ne sont pas prévues par les DTO.
3. Vérifier que les DTO d’entrée ne contiennent pas de propriétés gérées par le serveur.
4. Valider les identifiants MongoDB reçus dans les paramètres de route.
5. Valider et borner la pagination.
6. Définir explicitement les champs de filtre et de tri acceptés.

### Propriétés à protéger

Le client ne devrait pas pouvoir choisir directement des valeurs telles que :

- `_id`;
- `createdAt`;
- `updatedAt`;
- `role`;
- toute propriété interne d’audit ou de sécurité.

### Orientations

- Examiner `whitelist`, `forbidNonWhitelisted` et `transform` dans le `ValidationPipe`.
- Utiliser des DTO distincts pour le corps, les paramètres et les chaînes de requête.
- Imposer une valeur maximale à `limit`.
- Une chaîne conforme au format `ObjectId` ne prouve pas que l’objet existe ni que l’utilisateur peut y accéder.

### Vérification

Envoyer une requête de modification contenant une propriété inexistante et une propriété protégée. La requête doit être rejetée et aucune de ces propriétés ne doit être enregistrée dans MongoDB.


## Étape 4 — Sécuriser les requêtes MongoDB

### Courte explication

MongoDB exprime ses requêtes à l’aide d’objets et d’opérateurs. Si un objet contrôlé par le client est transmis directement à `find`, `update` ou `aggregate`, le client peut influencer le langage de requête plutôt que fournir seulement une valeur.

### Travail à réaliser

1. Rechercher les appels Mongoose qui reçoivent directement :
   - le corps HTTP;
   - les paramètres de route;
   - la chaîne de requête.
2. Remplacer les constructions dangereuses par des filtres et mises à jour construits explicitement.
3. Autoriser seulement les propriétés de recherche et de tri prévues par le contrat d’API.
4. Refuser les objets ou opérateurs inattendus dans les paramètres de recherche.
5. Vérifier que les validateurs Mongoose sont exécutés pendant les mises à jour.
6. Conserver les index uniques nécessaires aux règles d’intégrité.

### Code à rechercher

Les formes suivantes doivent déclencher une révision :

```ts
model.find(req.query);
model.find(body);
model.findByIdAndUpdate(id, req.body);
model.aggregate(body.pipeline);
```

On ne doit pas simplement copier ces exemples : rechercher les équivalents dans l’architecture réelle du projet.

### Orientations

- Construire un nouvel objet filtre à partir d’une liste blanche.
- Convertir et valider chaque valeur avant de l’ajouter au filtre.
- Séparer le DTO de recherche du DTO de création.
- Ne jamais accepter un pipeline d’agrégation complet provenant du client.
- Les protections de Mongoose peuvent compléter la liste blanche, mais ne la remplacent pas.

### Vérification

Tester au minimum :

- un filtre autorisé;
- un champ de filtre inconnu;
- une valeur contenant une structure inattendue;
- un champ de tri interdit;
- une mise à jour contenant une propriété non modifiable.


## Étape 5 — Ajouter l’authentification

### Courte explication

L’authentification permet à l’API d’établir l’identité de l’appelant. Pour ce laboratoire, on utilisera un jeton d’accès signé présenté dans l’en-tête `Authorization`.

Le jeton sert à transporter une preuve d’identité. Il ne doit pas contenir de mot de passe ou d’information secrète.

### Travail à réaliser

1. Créer un module d’authentification cohérent avec l’organisation du projet.
2. Prévoir un modèle minimal d’utilisateur comprenant :
   - une identité stable;
   - un identifiant de connexion unique;
   - un mot de passe haché;
   - un rôle autorisé.
3. Préparer au moins trois comptes de démonstration correspondant aux rôles retenus.
4. Implémenter une opération de connexion qui :
   - reçoit des données validées;
   - vérifie le mot de passe haché;
   - retourne un jeton d’accès de courte durée;
   - produit le même message d’échec que l’utilisateur existe ou non.
5. Créer un guard qui valide le jeton avant l’accès aux routes privées.
6. Protéger par défaut les routes de bâtiments et de locaux.
7. Documenter dans Swagger le mécanisme Bearer attendu.

### Contraintes

- Aucun mot de passe en clair ne doit être stocké dans MongoDB.
- Le hachage doit utiliser une fonction destinée aux mots de passe.
- La clé de signature doit provenir de la configuration.
- Le jeton doit expirer.
- Le guard doit refuser un jeton absent, invalide ou expiré.
- Une route publique doit être désignée explicitement plutôt que laissée publique par oubli.


### Vérification

- [ ] Une connexion valide retourne un jeton sans mot de passe.
- [ ] Une connexion invalide retourne `401` avec un message générique.
- [ ] Une route privée sans jeton retourne `401`.
- [ ] Un jeton invalide ou expiré retourne `401`.
- [ ] Un jeton valide permet d’atteindre une route privée.



## Étape 6 — Ajouter l’autorisation

### Courte explication

L’authentification indique qui effectue la requête. L’autorisation détermine ce que cette identité a le droit de faire.

Une vérification de rôle protège une fonction. Une vérification au niveau de l’objet protège une ressource précise. Selon les données disponibles dans le projet, on doit au minimum implémenter la vérification par rôle et préparer l’architecture pour une restriction par bâtiment.

### Travail à réaliser

1. Définir les rôles ou permissions à un emplacement centralisé.
2. Créer un mécanisme déclaratif permettant d’indiquer les permissions nécessaires à une route.
3. Créer un guard d’autorisation qui utilise l’identité authentifiée.
4. Appliquer la matrice suivante :

| Opération | `reader` | `operator` | `admin` |
|---|:---:|:---:|:---:|
| Consulter les bâtiments et locaux | Oui | Oui | Oui |
| Créer un bâtiment ou un local | Non | Oui | Oui |
| Modifier un bâtiment ou un local | Non | Oui | Oui |
| Supprimer un bâtiment ou un local | Non | Non | Oui |

5. S’assurer que l’application n’accepte jamais le rôle fourni par le corps d’une requête ordinaire.
6. Choisir et documenter la politique appliquée aux ressources auxquelles l’utilisateur n’a pas accès : `403` ou `404` masqué.

### Orientation pour l’autorisation par objet

Si le projet associe un utilisateur à une liste de bâtiments autorisés, intégrer cette contrainte dans la recherche MongoDB ou vérifier l’association avant de retourner la ressource.

Le simple fait de connaître l’identifiant d’un local ne doit pas donner accès au local.

### Vérification

- [ ] Le rôle `reader` peut consulter une collection.
- [ ] Le rôle `reader` reçoit `403` pour une modification.
- [ ] Le rôle `operator` peut créer et modifier une ressource.
- [ ] Le rôle `operator` reçoit `403` pour une suppression.
- [ ] Le rôle `admin` peut effectuer la suppression.
- [ ] Une ressource interdite suit la politique `403` ou `404` documentée.



## Étape 7 — Limiter les abus

### Courte explication

Même une requête valide et autorisée peut devenir abusive lorsqu’elle est répétée trop rapidement. Une limitation de débit protège les ressources de l’API et de MongoDB.

### Travail à réaliser

1. Ajouter le mécanisme de limitation recommandé pour NestJS.
2. Appliquer une limite globale raisonnable.
3. Prévoir une limite plus stricte pour l’opération de connexion.
4. Conserver une pagination obligatoire ou bornée sur les collections.
5. Retourner `429 Too Many Requests` lorsque la limite est dépassée.

### Orientations

- Le seuil doit être configurable et justifié.
- Une limite par adresse IP n’est pas toujours suffisante derrière un proxy.
- Vérifier la configuration du proxy de confiance avant de se fier à l’adresse du client.
- En production distribuée, un stockage partagé peut être nécessaire pour coordonner les compteurs.

### Vérification

Répéter suffisamment une requête sur la route de connexion pour observer une réponse `429`, puis vérifier qu’une requête normale reste utilisable après la période prévue.


## Étape 8 — Sécuriser les erreurs et les journaux

### Courte explication

Le client doit recevoir une erreur stable et compréhensible, mais ne doit pas recevoir la pile d’appel, la requête MongoDB ou le contenu interne d’une exception Mongoose.

Les détails techniques utiles au diagnostic doivent être placés dans les journaux du serveur, avec un identifiant permettant de relier la réponse à l’événement.

### Travail à réaliser

1. Vérifier le filtre global d’exceptions déjà présent.
2. Normaliser les erreurs de sécurité au format Problem Details utilisé par le projet.
3. Traiter au minimum :
   - données invalides : `400`;
   - authentification absente ou invalide : `401`;
   - permission insuffisante : `403`;
   - ressource absente ou masquée : `404`;
   - conflit d’unicité MongoDB : `409`;
   - limite dépassée : `429`;
   - erreur inattendue : `500` générique.
4. Ajouter ou conserver un identifiant de corrélation dans les erreurs et les journaux.
5. Journaliser les événements pertinents sans données sensibles.

### Événements à considérer

- échec d’authentification;
- refus d’autorisation;
- dépassement de limite;
- conflit d’intégrité;
- erreur MongoDB;
- action de suppression réussie.

### Informations interdites dans les journaux

- mot de passe;
- jeton complet;
- en-tête `Authorization`;
- URI MongoDB avec identifiants;
- clé de signature;
- corps complet contenant des données sensibles.

### Vérification

Déclencher volontairement un conflit d’unicité et une erreur d’autorisation. La réponse HTTP ne doit contenir ni pile d’appel, ni chemin local, ni message interne de MongoDB. Le journal doit permettre de retrouver l’événement à l’aide de l’identifiant de corrélation.


## Étape 9 — Appliquer le moindre privilège dans MongoDB

### Courte explication

Le compte utilisé par l’application ne devrait posséder que les droits nécessaires à son fonctionnement. Si l’API est compromise, les possibilités de l’attaquant restent alors limitées.

### Travail à réaliser

1. Vérifier le compte MongoDB actuellement utilisé par l’application.
2. Utiliser un compte propre à `energy-api`.
3. Limiter ce compte à la base et aux opérations nécessaires.
4. Vérifier que le compte n’est pas administrateur du cluster.
5. Restreindre les adresses réseau autorisées à accéder à MongoDB.
6. Utiliser une connexion chiffrée lorsque MongoDB est accessible par le réseau.
7. Documenter la différence entre :
   - le compte administrateur;
   - le compte de l’application;
   - les utilisateurs de l’API.

### Contraintes

- On ne remet aucun mot de passe ou URI réelle dans la documentation.
- On ne modifie pas les comptes d’un environnement partagé sans autorisation.
- Si les permissions du serveur MongoDB sont gérées par le technicien, documenter précisément la demande à lui transmettre.

### Doc attendue

Ajouter au README une courte section décrivant :

- le rôle attendu du compte MongoDB de l’application;
- les variables de configuration nécessaires;
- les restrictions réseau attendues;
- la procédure de rotation d’un secret compromis.



## Étape 10 — Mettre à jour OpenAPI et le README

### Courte explication

La documentation fait partie de la sécurité. Elle permet de connaître les routes exposées, les contrôles attendus et les erreurs possibles. Une route oubliée dans l’inventaire peut demeurer vulnérable longtemps.

### Travail à réaliser

1. Ajouter le schéma d’authentification Bearer à OpenAPI.
2. Indiquer les routes protégées.
3. Documenter les réponses de sécurité pertinentes.
4. Réutiliser le schéma Problem Details centralisé.
5. Vérifier qu’aucun secret ni exemple réel de jeton n’apparaît dans Swagger.
6. Ajouter au README :
   - les exigences de configuration;
   - la façon de créer ou charger les comptes de démonstration;
   - le démarrage sécuritaire en développement;
   - les principales protections implantées;
   - les limites connues.

### Vérification

Swagger doit permettre de fournir temporairement un jeton Bearer et d’appeler une route protégée, sans inscrire ce jeton dans le dépôt.



## Campagne de vérification manuelle

Exécuter la campagne suivante avec Postman, Bruno, Insomnia ou un autre client HTTP. Conserver les résultats utiles à la pull request sans exposer de secret.

| Nº | Situation | Résultat attendu |
|---:|---|---|
| 1 | Consulter une route privée sans jeton | `401` |
| 2 | Utiliser un jeton invalide ou expiré | `401` |
| 3 | Se connecter avec des identifiants invalides | `401` et message générique |
| 4 | Consulter avec le rôle `reader` | Succès |
| 5 | Modifier avec le rôle `reader` | `403` |
| 6 | Modifier avec le rôle `operator` | Succès |
| 7 | Supprimer avec le rôle `operator` | `403` |
| 8 | Supprimer avec le rôle `admin` | Succès |
| 9 | Envoyer une propriété inconnue | `400` |
| 10 | Envoyer un identifiant MongoDB invalide | `400` |
| 11 | Demander une ressource inexistante | `404` |
| 12 | Provoquer un conflit d’unicité | `409` |
| 13 | Envoyer un filtre ou tri non autorisé | `400` |
| 14 | Dépasser la limite de requêtes | `429` |
| 15 | Déclencher une erreur inattendue en développement contrôlé | `500` sans détail interne côté client |

> Un test réussi ne se limite pas au statut HTTP. Vérifier également le corps Problem Details, l’absence d’information sensible et l’état final de MongoDB.


## Livrables

La pull request doit contenir :

- le code des contrôles de sécurité;
- les DTO et mécanismes transversaux ajoutés;
- `.env.example` mis à jour;
- la documentation OpenAPI mise à jour;
- le README mis à jour;
- le tableau initial des risques;
- le résultat synthétique de la campagne de vérification;
- une justification courte des décisions importantes.

Les fichiers contenant les secrets réels ne doivent jamais être remis.



## Contenu attendu de la pull request

### Description

La description doit expliquer :

- la menace ou le risque traité;
- les contrôles ajoutés;
- les routes concernées;
- les variables de configuration ajoutées;
- les vérifications effectuées;
- les limites ou travaux futurs.

### Vérifications techniques

Avant de demander une révision :

```bash
npm run lint
npm run build
npm run test
```

Exécuter également les tests E2E si le projet en contient déjà. Le laboratoire n’impose pas de créer une suite automatisée complète, mais les tests existants ne doivent pas être désactivés pour faciliter l’intégration.

### Rappel Git

- La branche de tâche doit cibler la branche `feature` liée à l’issue parente.
- La pull request doit référencer la sous-issue correspondante.
- Aucun secret ne doit apparaître dans un commit, même s’il est retiré dans un commit ultérieur.

Si un secret a été commité, il faut le considérer comme compromis et le remplacer.



## Critères d’acceptation

### Configuration

- [ ] Les secrets sont externalisés et absents de Git.
- [ ] La configuration est validée au démarrage.
- [ ] `.env.example` est complet et sécuritaire.

### Surface HTTP

- [ ] Les en-têtes de sécurité sont configurés.
- [ ] CORS utilise une liste contrôlée.
- [ ] La taille des requêtes est limitée.
- [ ] Swagger est exposé selon l’environnement.

### Données et MongoDB

- [ ] Les propriétés inconnues sont rejetées.
- [ ] Les identifiants, filtres, tris et limites sont validés.
- [ ] Aucune structure du client n’est transmise directement à MongoDB.
- [ ] Les mises à jour exécutent les validateurs nécessaires.
- [ ] Les conflits d’unicité retournent `409`.
- [ ] Le compte MongoDB respecte le moindre privilège.

### Identité et accès

- [ ] Les mots de passe sont hachés.
- [ ] Les jetons sont signés, validés et temporaires.
- [ ] Les routes privées sont protégées par défaut.
- [ ] Les rôles respectent la matrice d’accès.
- [ ] Les ressources protégées vérifient l’autorisation nécessaire.

### Résilience et diagnostic

- [ ] La limitation de débit retourne `429`.
- [ ] Les erreurs respectent Problem Details.
- [ ] Aucune erreur ne divulgue de détail interne.
- [ ] Les journaux ne contiennent pas de secret.
- [ ] Un identifiant de corrélation permet de relier réponse et journal.

### Qualité professionnelle

- [ ] Le code respecte l’architecture modulaire de NestJS.
- [ ] Les responsabilités sont centralisées plutôt que dupliquées dans chaque contrôleur.
- [ ] Swagger et le README reflètent le comportement réel.
- [ ] Le lint, la compilation et les tests existants réussissent.
- [ ] La pull request est ciblée, lisible et sans modification étrangère au laboratoire.



## Pistes de réflexion

Répondre brièvement dans la pull request ou dans le compte rendu demandé :

1. Pourquoi la validation d’un DTO ne remplace-t-elle pas l’autorisation?
2. Pourquoi la clé de signature d’un JWT ne doit-elle pas être inscrite dans le code?
3. Quel risque apparaît lorsqu’on transmet `req.query` directement à Mongoose?
4. Pourquoi le rôle `admin` de l’application ne devrait-il pas être confondu avec un administrateur MongoDB?
5. Pourquoi un index unique demeure-t-il nécessaire malgré une vérification préalable?
6. Quelles données ont été volontairement exclues des journaux?
7. Quelle politique a été retenue entre `403` et `404` pour une ressource inaccessible, et pourquoi?


## Pour aller plus loin — facultatif

Après la remise obligatoire, on peut explorer :

- les jetons de rafraîchissement avec rotation;
- la révocation de sessions;
- l’authentification distincte des capteurs ou services;
- des permissions plus précises que les rôles;
- la protection CSRF si l’authentification utilise des cookies;
- le chiffrement de champs particulièrement sensibles;
- un stockage partagé pour la limitation de débit;
- des tests E2E automatisés pour la matrice d’autorisation;
- des alertes basées sur les échecs d’authentification et les réponses `403` ou `429`.

Ces éléments ne doivent être ajoutés que si les exigences obligatoires sont terminées et stables.
