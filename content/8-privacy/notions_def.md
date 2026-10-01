+++
draft = false
title = '📘 Lecture : Notions de base sur la vie privée et ses lois'
weight = 91
+++


## 1. Notions de base

### 1.1. Données personnelles « renseignement personnel » 

- **Définition** : Toute information permettant d’identifier directement ou indirectement une personne physique. Cela inclut le nom, l’adresse, l’e-mail, le numéro de téléphone, le numéro d’assurance sociale, les données biométriques (comme les empreintes digitales), l’adresse IP, les préférences en ligne, identifiant de connexion, données de localisation, combinaison de variables qui rendent quelqu’un reconnaissable, etc. ([Légis Québec][1])

### 1.2. **Consentement**

- **Définition** : Accord donné librement par une personne pour qu’une organisation puisse recueillir, utiliser ou partager ses données personnelles. Le consentement doit être clair, spécifique et éclairé.
- **Exemple** : Lorsqu’on s’inscrit à un service en ligne, on accepte souvent les "conditions d’utilisation" et la "politique de confidentialité". Cela signifie qu'on donne son consentement à l’utilisation de nos données par cette entreprise.

### 1.3. **Transparence**

- **Définition** : Obligation pour une organisation d’informer les individus de manière claire et accessible sur la manière dont elle collecte, utilise et partage leurs données personnelles.
- **Exemple** : Une politique de confidentialité détaillant les informations collectées, leur utilisation, et avec qui elles sont partagées assure la transparence.

### 1.4. **Droit à l’accès et droit de rectification**

- **Définition** : Les individus ont le droit de savoir quelles données une organisation détient sur eux et de demander des corrections si les données sont incorrectes.
- **Exemple** : On peut contacter une entreprise pour lui demander quelles informations elle détient sur soi, et exiger des corrections si nécessaire.

### 1.5. **Droit à l’oubli**

- **Définition** : Droit pour une personne de demander la suppression de ses données personnelles lorsque celles-ci ne sont plus nécessaires ou si la personne retire son consentement.
- **Exemple** : Une personne peut demander à un réseau social de supprimer ses informations et ses publications lorsqu’elle souhaite clôturer son compte.

### 1.6. **Notification de violation de données**

- **Définition** : Obligation légale pour une organisation d’informer les personnes concernées et les autorités compétentes en cas de fuite ou d’accès non autorisé aux données personnelles.
- **Exemple** : Si une entreprise subit un piratage informatique et que les données des utilisateurs sont volées, elle doit en informer ses utilisateurs dans les meilleurs délais.

### 1.7. **Protection des données dès la conception (ou Privacy by Design)**

- **Définition** : Principe selon lequel la protection des données doit être intégrée dès le début de la création de systèmes et processus de gestion des données, et non ajoutée par la suite.
- **Exemple** : Lors du développement d’une application, il faut inclure des mesures de sécurité (comme le chiffrement) dès les premières étapes pour protéger les données des utilisateurs.

### 1.8. **Responsabilité et imputabilité**

- **Définition** : Principe qui oblige les organisations à prouver leur conformité aux lois sur la vie privée et à prendre la responsabilité de la protection des données qu’elles traitent.
- **Exemple** : Une entreprise doit pouvoir démontrer qu’elle applique les bonnes pratiques en matière de gestion de la vie privée et qu’elle est prête à répondre aux questions des utilisateurs ou des autorités.


## 2. Principes communs des lois sur la vie privée

La plupart des lois modernes (Loi 25, LPRPDE/PIPEDA, RGPD, CCPA/CPRA…) reposent sur des principes très similaires. ([Termly][2])

On peut les résumer en **7 grands principes** :

1. **Licéité (légalité), équité, transparence** (lawfulness, fairness and transparency)

   * Avoir une base légale pour traiter les données (consentement, contrat, obligation légale, etc.).
   * Informer clairement les personnes, avec un langage compréhensible (politique de confidentialité, formulaires, bannières, etc.).

2. **Limitation des finalités**

   * Définir des objectifs précis et légitimes pour la collecte.
   * Ne pas réutiliser les données pour d’autres buts non compatibles, sauf nouveau fondement (ex. nouveau consentement).

3. **Minimisation des données**

   * Ne collecter **que ce qui est nécessaire** pour les objectifs déclarés, pas plus.

4. **Exactitude**

   * Garder les données à jour, corriger les erreurs lorsqu’on en est informé.

5. **Limitation de la conservation**

   * Ne pas garder les données plus longtemps que nécessaire.
   * Définir des durées de conservation et des méthodes d’archivage/suppression.

6. **Sécurité / confidentialité**

   * Mettre en place des mesures de sécurité adaptées à la sensibilité des données : contrôle d’accès, chiffrement, journalisation, sauvegardes, etc.

7. **Responsabilisation (accountability)**

   * Désigner un responsable.
   * Avoir des politiques écrites, des procédures, de la formation.
   * Être capable de **démontrer** qu’on respecte la loi.


## 3. Droits typiques des personnes concernées

Même si les détails diffèrent selon la loi, on retrouve généralement une série de droits similaires :

* **Droit d’être informé**

  * Savoir quelles données sont collectées, pourquoi, comment, pendant combien de temps et avec qui elles sont partagées.

* **Droit d’accès**

  * Obtenir une copie de ses renseignements personnels détenus par l’organisation.

* **Droit de rectification**

  * Faire corriger des données inexactes ou incomplètes.

* **Droit de retrait du consentement / d’opposition**

  * Retirer son consentement à certains usages, ou s’opposer à certains types de traitement (ex. marketing).

* **Droit à l’effacement / droit à l’oubli** (selon les lois)

  * Demander la suppression des données dans certaines conditions (ex. RGPD, CCPA/CPRA, certaines situations prévues par Loi 25).

* **Droit à la portabilité** (RGPD, Loi 25, etc.)

  * Obtenir ses données dans un format structuré et couramment utilisé, pour les réutiliser ou les transférer à un autre fournisseur.



## 4. Impacts concrets pour la gestion des données (en contexte d’études ou de projets)

Quand on conçoit un système ou un projet de données (application, tableau de bord, collecte de logs, entrepôt de données, etc.), il faut se poser au minimum les questions suivantes :

1. **Quelles données sont vraiment nécessaires ?**

   * Peut-on anonymiser ou pseudonymiser ?
   * Peut-on utiliser des identifiants techniques plutôt que des noms ?

2. **Pour quelles finalités ?**

   * Objectifs clairement définis (ex. support technique, analytique, personnalisation, conformité).
   * Éviter la collecte « au cas où ».

3. **Comment informer les personnes concernées ?**

   * Politique de confidentialité.
   * Clauses dans les formulaires ou les contrats.
   * Bannières ou avis pour certaines collectes (cookies, suivi, etc.).

4. **Comment sécuriser les données ?**

   * Contrôle d’accès (droits par rôle).
   * Chiffrement au repos et en transit selon la sensibilité.
   * Journalisation des accès et des modifications.

5. **Combien de temps conserver les données ?**

   * Définir des durées de conservation par type de données.
   * Planifier l’archivage ou la suppression.

6. **Comment gérer les droits des personnes ?**

   * Processus pour répondre aux demandes d’accès, de rectification, de suppression, de portabilité.
   * Documentation interne : qui fait quoi, dans quels délais ?

7. **Y a-t-il des transferts hors Québec / hors Canada ?**

   * Si oui, vérifier les exigences (ex. EFVP avant communication hors Québec, clauses contractuelles, niveau de protection adéquat, etc.).


## 5. Synthèse à retenir

* Les lois sur la vie privée visent à encadrer **toute manipulation de renseignements personnels** : collecte, utilisation, conservation, communication, destruction.
* Elles reposent partout sur les mêmes piliers :

  * **Transparence**
  * **Finalité**
  * **Minimisation**
  * **Sécurité**
  * **Durée de conservation limitée**
  * **Responsabilisation**
  * **Droits des personnes**
* Au Québec et au Canada, on se réfère principalement à :

  * **Loi 25** (modernisation des lois québécoises sur les renseignements personnels).
  * **LPRPDE / PIPEDA** au niveau fédéral.
* Les grands cadres internationaux comme le **RGPD** (Europe) et la **CCPA/CPRA** (Californie) influencent fortement les bonnes pratiques, surtout dès qu’on utilise des services en ligne ou qu’on traite des données de personnes situées ailleurs.


## Ressources

[1: Loi sur la protection des renseignements personnels dans ...](https://www.legisquebec.gouv.qc.ca/fr/document/lc/p-39.1?utm_source=chatgpt.com)

[2: Quels sont les 7 principes du RGPD?](https://termly.io/fr/faq/quels-sont-les-7-principes-du-rgpd/?utm_source=chatgpt.com)

[3: Principaux changements apportés par la Loi 25](https://www.cai.gouv.qc.ca/protection-renseignements-personnels/sujets-et-domaines-dinteret/principaux-changements-loi-25?utm_source=chatgpt.com) 

[4: Loi 25 | Quels sont ses impacts sur votre entreprise?](https://www.rcgt.com/fr/conseils/avis-d-experts/loi-25-quels-impacts-entreprises/?utm_source=chatgpt.com)

[5: Tout ce que vous devez savoir sur la Loi 25](https://www.cfib-fcei.ca/fr/site/qc-loi-25?utm_source=chatgpt.com)

[6: La Loi 25 en vigueur dans son entièreté](https://www.barreau.qc.ca/en/new/notices-to-members/loi-25-vigueur-entierete/?utm_source=chatgpt.com)

[7: Personal Information Protection and Electronic Documents Act](https://laws-lois.justice.gc.ca/eng/acts/p-8.6/page-7.html?utm_source=chatgpt.com)

[8: PIPEDA fair information principles - Office of the Privacy ...](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/?utm_source=chatgpt.com)

[9: ​Quels sont les 7 principes du RGPD ?](https://www.liberties.eu/fr/stories/what-are-the-7-principles-of-gdpr/44265?utm_source=chatgpt.com)

[10: California Consumer Privacy Act (CCPA)](https://oag.ca.gov/privacy/ccpa?utm_source=chatgpt.com) 
