+++
date = '2025-12-03T09:43:36-05:00'
draft = true
title = "Introduction à l’intelligence artificielle"
weight = 121
+++


## 6. **Défis et questions éthiques**

### **Biais algorithmiques :**

Les **biais algorithmiques** se produisent lorsque les modèles d'intelligence artificielle (IA) et d'apprentissage machine (machine learning) reflètent ou amplifient des préjugés ou des discriminations présentes dans les données utilisées pour les entraîner. Ces biais peuvent avoir des conséquences importantes, car les modèles d'IA peuvent prendre des décisions influençant des domaines tels que le recrutement, la justice pénale, le crédit, la santé, et d'autres aspects de la vie quotidienne.
Il y a 3 types de biais : biais historiques, biais de sélection et biais dans la collecte de données.

**Biais historiques** : Si les données utilisées pour entraîner un modèle ont été collectées dans des contextes où des discriminations existaient (par exemple, dans les décisions judiciaires où certains groupes sociaux étaient traités de manière inégale), le modèle peut perpétuer ces biais. Un exemple est l'utilisation de données historiques pour prédire la récidive des délinquants : si les données sont influencées par des biais raciaux ou sociaux, le modèle risque de renforcer ces inégalités.

**Biais de sélection** : Si les données collectées ne sont pas représentatives de l'ensemble de la population, le modèle peut refléter des biais de groupe. Par exemple, un système de recommandation qui se base sur des préférences de certains groupes démographiques pourrait ne pas être pertinent pour d'autres groupes sous-représentés.

**Biais dans la collecte de données** : Les biais peuvent également se manifester dans la manière dont les données sont collectées. Par exemple, des données de santé peuvent être biaisées si elles proviennent principalement de certaines régions géographiques ou d’un sous-ensemble d'individus, ne reflétant pas la diversité de la population.

### **Impact sur l'emploi :** Les implications de l'IA sur le marché du travail.

![Source : SimpliLearn](/420-514/images/ai/image_4.png)

Source : SimpliLearn

![Source : SimpliLearn](/420-514/images/ai/image_5.png)

Source : SimpliLearn

![image.png](/420-514/images/ai/image_6.png)

*Impact potentiel de l'IA par secteur et par type de cas d'usage. Graphique de source non citée et antérieur aux LLM : à lire comme une illustration, pas comme une donnée actuelle.*

### **Sécurité et vie privée :**

Les technologies d'**intelligence artificielle (IA)**, bien qu'elles offrent de nombreuses avancées, soumettent également les questions de **sécurité** et de **vie privée** à de nouveaux défis. L’IA, en exploitant des volumes massifs de données pour apprendre et prendre des décisions, peut interagir avec des informations personnelles sensibles, ce qui soulève des préoccupations concernant la protection de ces données. Voici comment les technologies d'IA peuvent affecter la confidentialité et la sécurité des données personnelles.

#### 1. **Collecte massive de données personnelles**

Les systèmes d'IA nécessitent de grandes quantités de données pour entraîner leurs modèles. Souvent, ces données incluent des informations personnelles sensibles telles que des identifiants, des comportements en ligne, des préférences ou des informations biométriques (empreintes digitales, reconnaissance faciale, etc.). Cette collecte à grande échelle peut violer la **confidentialité** des utilisateurs si elle n'est pas correctement régulée ou contrôlée.

- **Exemple :** Les assistants vocaux comme Alexa ou Siri collectent en permanence des informations auditives, ce qui peut entraîner des fuites de données privées si ces informations sont mal protégées.

#### 2. **Profilage et surveillance**

L'IA permet des techniques de **profilage** avancées qui collectent et analysent les données personnelles des individus pour prédire leur comportement, leurs préférences et même leur état psychologique. Cela peut conduire à des pratiques de **surveillance** intrusives, où des entreprises ou des gouvernements collectent des informations détaillées sur les utilisateurs sans leur consentement explicite.

- **Exemple :** Les plateformes de réseaux sociaux utilisent des algorithmes pour profiler les utilisateurs en fonction de leurs interactions et de leurs données personnelles. Ces profils peuvent être utilisés à des fins publicitaires ou, dans des cas extrêmes, pour manipuler des opinions publiques, ce qui soulève des préoccupations sur l'**influence** et l’**autonomie** des individus.

#### 3. **Sécurité des données**

Les systèmes d'IA sont vulnérables aux attaques informatiques, et lorsqu'ils traitent des informations personnelles, ces attaques peuvent avoir des conséquences graves sur la **sécurité** des données. Par exemple :

- **Atteintes à la confidentialité :** Si un modèle d'IA est mal sécurisé, des pirates peuvent accéder aux données personnelles qu'il traite, mettant en danger la confidentialité des utilisateurs.
- **Attaques adversariales :** Les attaques adversariales sont des tentatives visant à tromper les modèles d'IA en leur fournissant des données erronées, ce qui peut entraîner des erreurs dans la prise de décision et compromettre la **sécurité** des informations.
- **Exemple :** Des systèmes de reconnaissance faciale mal sécurisés peuvent être piratés, exposant des informations personnelles de milliers de personnes.

#### 4. **Prédictions et décisions automatisées**

L'IA est de plus en plus utilisée pour prendre des décisions automatisées, que ce soit pour accorder des prêts, évaluer des candidatures à un emploi ou déterminer des soins médicaux. Ces décisions, basées sur des **modèles prédictifs**, peuvent entraîner des **discriminations** ou des erreurs si les données utilisées sont biaisées ou mal protégées.

- **Exemple :** Si une IA utilisée dans un système de crédit accorde des prêts sur la base de données historiques biaisées, cela peut conduire à des décisions injustes, excluant certains groupes de l'accès au crédit.

#### 5. **Transparence et explicabilité des modèles**

L'un des principaux problèmes de sécurité et de confidentialité en IA est le manque de **transparence** des modèles. Les algorithmes utilisés pour prendre des décisions sont souvent des **boîtes noires**, ce qui signifie qu'il peut être difficile, voire impossible, de comprendre comment une décision a été prise ou quelles données ont été utilisées. Cela complique la tâche de garantir que les décisions respectent la vie privée et la sécurité des données.

- **Exemple :** Si un utilisateur reçoit une recommandation erronée d'un système de santé basé sur un modèle d'IA opaque, il peut être difficile de savoir quelles données ont influencé cette décision et si elles ont été correctement protégées.

#### 6. **Anonymisation et ré-identification**

Les technologies d'IA sont parfois utilisées pour anonymiser les données afin de protéger la vie privée des individus. Cependant, l'**anonymisation** n'est pas toujours complète, et il existe un risque de **ré-identification** à partir de données anonymes. Les modèles d'IA peuvent être capables de combiner différentes sources de données pour retrouver l'identité d'un individu, ce qui compromet la confidentialité.

- **Exemple :** Des chercheurs ont montré que des ensembles de données soi-disant anonymisées pouvaient être ré-identifiés en croisant ces informations avec des données publiques, exposant ainsi la vie privée des individus.

#### 7. **Droits des utilisateurs et consentement éclairé**

Le **consentement éclairé** est crucial lorsque des données personnelles sont collectées et utilisées par des systèmes d'IA. Cependant, de nombreux utilisateurs ne sont pas pleinement conscients de la manière dont leurs données sont utilisées. Les entreprises peuvent collecter des informations sans que les utilisateurs aient une véritable compréhension des conséquences sur leur vie privée.

- **Exemple :** De nombreuses applications collectent des données personnelles par défaut, sans donner aux utilisateurs une option claire de refuser, ce qui porte atteinte à leur droit à la vie privée.

#### 8. **Risques propres aux modèles de langage (LLM)**

Les applications qui intègrent des LLM ajoutent de nouveaux risques, répertoriés notamment dans le *OWASP Top 10 for LLM Applications* :

- **Injection de prompt :** Des instructions malveillantes, saisies par l'utilisateur ou cachées dans un document ou une page web, détournent le comportement du modèle.
- **Fuite de données :** Le modèle peut révéler des informations sensibles présentes dans son contexte, ses documents (RAG) ou ses données d'entraînement. Les données envoyées à un service externe quittent aussi le périmètre de l'organisation.
- **Hallucinations :** Le modèle produit des réponses plausibles mais fausses. Il ne faut pas les utiliser sans validation, surtout dans un contexte juridique, médical ou financier.
- **Contenus synthétiques :** Les *deepfakes* (voix, images, vidéos) facilitent la fraude, l'hameçonnage et la désinformation.
- **Agents trop autonomes :** Un agent doté d'accès à des outils ou à des API doit être limité au strict nécessaire (principe du moindre privilège).

#### Comment atténuer les risques pour la sécurité et la vie privée ?

1. **Renforcer la sécurité des données** : Les systèmes d'IA doivent être dotés de mécanismes de sécurité robustes pour protéger les informations personnelles sensibles. Cela inclut des technologies telles que le chiffrement des données, les mécanismes de gestion des identités et des accès, ainsi que les contrôles d'accès stricts.
2. **Respecter la vie privée dès la conception (Privacy by Design)** : Lors de la conception de systèmes d'IA, les principes de protection de la vie privée doivent être intégrés dès le début du processus. Cela implique des politiques strictes sur la collecte des données, leur utilisation et leur stockage.
3. **Régulations et législations** : Des lois sur la protection des données, telles que le **RGPD (Règlement général sur la protection des données)** en Europe, doivent être appliquées et renforcées pour garantir que les utilisateurs ont un contrôle sur leurs données et sont protégés contre les abus.
4. **Transparence des algorithmes** : Les modèles d'IA doivent être conçus de manière à être compréhensibles et audités. La transparence dans les algorithmes est essentielle pour garantir que les décisions prises par l'IA sont explicables et respectent les droits des utilisateurs.
5. **Sensibilisation des utilisateurs** : Il est important d'éduquer les utilisateurs sur les implications de la collecte de données et de leur permettre de comprendre et de contrôler la manière dont leurs informations personnelles sont utilisées par les systèmes d'IA.

## **Réglementations et lois sur l'IA :**

Les **réglementations et lois sur l'intelligence artificielle (IA)** cherchent à encadrer l'utilisation de cette technologie tout en protégeant la vie privée, les droits des individus et en favorisant l'innovation responsable. Voici un résumé des principales initiatives :

1. **RGPD (Union européenne)** : Le règlement impose des exigences strictes sur le consentement des utilisateurs, le droit à l'explication des décisions automatisées, et la protection des données personnelles.
2. **Règlement sur l'IA (UE, « AI Act »)** : Adopté en 2024 et entré en vigueur le 1er août 2024, il s'applique par étapes. Il classe l'IA selon le risque (inacceptable, élevé, limité, minimal). Les pratiques interdites s'appliquent depuis février 2025, les obligations pour les modèles d'IA à usage général depuis août 2025, et les règles de transparence (article 50 : informer qu'on interagit avec une IA, identifier les contenus générés) depuis août 2026. L'interdiction des systèmes générant des images intimes non consensuelles ou du matériel d'exploitation sexuelle d'enfants s'applique à partir de décembre 2026. Les obligations pour les systèmes à haut risque ont été reportées au 2 décembre 2027 (cas d'usage de l'annexe III : emploi, éducation, crédit, justice, etc.) et au 2 août 2028 (IA intégrée à des produits réglementés). Source : calendrier officiel de mise en œuvre de l'AI Act.
3. **CCPA (Californie)** : Cette loi accorde aux utilisateurs des droits sur leurs données personnelles, comme la possibilité de les supprimer ou de refuser leur vente, impactant l'utilisation de l'IA.
4. **Royaume-Uni** : Il n'existe pas de loi générale sur l'IA. Le pays privilégie une approche flexible, fondée sur des principes appliqués par les régulateurs sectoriels. L'institut créé en 2023 (*AI Safety Institute*) a été renommé *AI Security Institute* en février 2025.
5. **Directives de l'OCDE** : Promouvoir l'IA responsable à travers des principes d'éthique comme la transparence, l'inclusion et la protection des droits humains.
6. **États-Unis** : Pas de loi fédérale générale sur l'IA. Le décret de 2023 du président Biden a été révoqué en janvier 2025, et un décret de décembre 2025 vise à décourager les lois d'États jugées contraignantes. L'encadrement passe donc surtout par les États et les villes : en Californie, la loi SB 53 sur la transparence des modèles de pointe (en vigueur depuis janvier 2026) ; à New York, la règle de la Ville sur l'audit des outils de recrutement automatisés (depuis 2023) et la loi RAISE sur les modèles de pointe (prévue pour 2027) ; au Colorado, la loi de 2024 sur l'IA à haut risque a été remplacée en mai 2026 par une loi centrée sur l'obligation d'informer les personnes.
7. **Lutte contre les biais algorithmiques** : Des législations émergent pour prévenir les discriminations dans l'utilisation de l'IA, notamment dans l'emploi et la justice.
8. **Québec : Loi 25** : Elle impose d'informer la personne lorsqu'une décision est fondée exclusivement sur un traitement automatisé, de lui communiquer, à sa demande, les renseignements utilisés et les principaux facteurs ayant mené à la décision, et de lui donner l'occasion de présenter ses observations à une personne en mesure de réviser la décision (article 12.1 de la Loi sur la protection des renseignements personnels dans le secteur privé). Elle exige aussi une évaluation des facteurs relatifs à la vie privée (ÉFVP) pour tout projet de système d'information impliquant des renseignements personnels (article 3.3).
9. **Canada** : Le projet de loi C-27 (incluant la Loi sur l'intelligence artificielle et les données, LIAD) est mort au feuilleton à la fin de la session parlementaire (6 janvier 2025) sans avoir franchi l'étape du comité. Les pages officielles de la LIAD sont archivées, et le Canada n'a pas de cadre réglementaire propre à l'IA : on y applique les lois existantes et un code de conduite volontaire sur l'IA générative (2023).
10. **Convention-cadre du Conseil de l'Europe sur l'IA (2024)** : Premier traité international juridiquement contraignant sur l'IA, centré sur les droits humains, la démocratie et l'État de droit. Ouvert à la signature en septembre 2024 (21 signataires, dont le Canada, le Royaume-Uni, les États-Unis et l'UE), il n'est pas encore entré en vigueur : seules deux parties l'avaient ratifié à la dernière consultation du site du Conseil de l'Europe.

Ces lois visent à garantir que l'IA soit utilisée de manière **éthique** et **sûre**, tout en protégeant les **droits fondamentaux** des individus.

## 7. **Tendances futures**

### **L'IA générative :**

L'**IA générative** désigne des modèles d'intelligence artificielle capables de créer de nouveaux contenus (textes, images, vidéos, musique, etc.) à partir de données d'entraînement. Voici un résumé des concepts clés associés à l'IA générative :

#### **Principes de base** :

L'IA générative utilise des algorithmes d'apprentissage machine, notamment des réseaux de neurones, pour apprendre à partir de grandes quantités de données et générer de nouvelles créations similaires aux exemples fournis.

#### **Types de modèles** :

- **Modèles de langage (LLM) (ex. GPT d'OpenAI, Claude d'Anthropic, Gemini de Google, Llama de Meta, Mistral, DeepSeek)** : Génèrent des textes cohérents et contextuels, répondent à des questions, rédigent des articles, écrivent du code ou génèrent des dialogues. Plusieurs sont **multimodaux** (texte, image, audio).
- **Modèles de génération d'images (ex. Midjourney, Stable Diffusion, modèles d'images intégrés à ChatGPT et Gemini)** : Produisent des images à partir de descriptions textuelles, la plupart par diffusion.
- **Modèles de musique (ex. Suno)** : Génèrent des chansons complètes (paroles et voix incluses) à partir d'un prompt. Les outils du secteur se sont réorientés vers des modèles sous licence après les poursuites des maisons de disques (ex. : accords de Suno avec Warner et BMG, et d'Udio avec Universal).
- **Modèles vidéo (ex. Veo de Google, Runway, Kling, Seedance, Synthesia)** : Créent des vidéos à partir de texte ou d'images, ou des avatars présentateurs. Le marché évolue vite : OpenAI a par exemple arrêté son outil Sora en 2026.

Ces outils soulèvent aussi des questions de droit d'auteur (litiges sur les données d'entraînement) et de propriété des contenus générés.

#### **Applications** :

- **Création de contenu** : Rédaction automatisée d'articles, génération d'images pour le design, création de musique.
- **Personnalisation** : Création de recommandations de produits, génération de publicités personnalisées, ou contenu sur mesure pour les utilisateurs.
- **Amélioration des processus créatifs** : Utilisation de l'IA pour assister les artistes, écrivains, musiciens dans leur travail en générant des idées, des maquettes ou des prototypes.

### **L'IA explicable :**

L'**IA explicable** (XAI) vise à rendre les modèles d'intelligence artificielle transparents et compréhensibles pour les humains. Contrairement aux systèmes "boîte noire", elle permet de comprendre pourquoi un modèle fait une certaine prédiction, renforçant ainsi la confiance, la responsabilité et la conformité aux régulations comme le RGPD. Les techniques incluent des modèles simples, des méthodes post-hoc comme LIME et SHAP, et des mécanismes d'attention. L'IA explicable est cruciale dans des domaines sensibles comme la santé, la finance et la justice, mais elle présente des défis, notamment le compromis entre précision et interprétabilité. Son objectif est de rendre l'IA plus accessible, éthique et fiable.

### **Autres tendances :**

- **Agents IA :** Systèmes qui planifient et exécutent des tâches en plusieurs étapes en utilisant des outils et des API (ex. : agents de programmation, protocole MCP pour connecter les modèles aux outils).
- **Modèles de raisonnement :** Modèles qui « réfléchissent » avant de répondre (ex. : o1 et o3 d'OpenAI, DeepSeek-R1), meilleurs en mathématiques et en programmation.
- **RAG :** Associer un LLM à des documents ou bases de données de l'organisation pour limiter les hallucinations et utiliser des données à jour.
- **Modèles ouverts et petits modèles :** Modèles à poids ouverts exécutables localement, utiles pour la confidentialité et les coûts.
- **Réglementation et gouvernance :** Mise en application progressive de l'AI Act (transparence depuis août 2026, haut risque en 2027-2028), exigences d'étiquetage des contenus générés et d'évaluation des risques, tensions entre lois d'États et politique fédérale aux États-Unis.

## Ressources :

[Intelligence artificielle : définition, histoire et application](https://www.justai.co/articles-de-blog/intelligence-artificielle)

[EU Artificial Intelligence Act](https://artificialintelligenceact.eu/)

[OWASP Top 10 for LLM Applications](https://genai.owasp.org/)