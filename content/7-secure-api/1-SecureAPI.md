+++
draft = false
title = '📘 Sécurité des API'
weight = 80
+++


## Pourquoi sécuriser les API ?

Une API est comme une **porte d’entrée** vers ton système.
Sans sécurité :

* un attaquant peut accéder aux données sensibles (ex. : infos personnelles, numéros de carte de crédit),
* modifier des données (changer le prix d’un produit dans une boutique),
* ou bloquer ton service avec une attaque DDoS.

**Exemple concret** :
Une API de streaming vidéo sans authentification ➝ n’importe qui peut télécharger gratuitement le contenu en envoyant des requêtes HTTP.

![Exemple d'API Web](/420-514/images/how-a-web-api-works.avif)

### Endpoints API

* Un endpoint est l’URL d’accès à une ressource.
* Ils représentent une **surface d’attaque critique** : ex. `/api/users/:id`.
* Bonne pratique : vérifier les autorisations sur chaque endpoint et ne jamais exposer d’infos sensibles inutilement.
![Sécurité d'API](/420-514/images/what-is-api-security.avif)

## **Types d’API et différences**

* **API B2C** : exposées aux clients finaux (apps mobiles/web).
* **API B2B** : échanges entre entreprises (banque, facturation).
* **API publiques** : ouvertes à tous, nécessitent une doc claire et des limites strictes.
* **API privées/internes** : utilisées en interne, mais restent vulnérables si exposées par erreur.
* **API nord-sud** : ouvertes vers l’extérieur.
* **API est-ouest** : utilisées en interne.

![Exemple écosystème d'API](/420-514/images/api-landscape.avif)

![Exemples de type d'API](/420-514/images/what-are-api-types.avif)

## **Qu’est-ce que la sécurité des API ?**

* La sécurité des API consiste à **protéger les interfaces de communication** entre applications contre les abus, fuites de données et attaques.
* Les API sont au cœur des applis web, mobiles et IoT → elles véhiculent souvent des données sensibles.
* Menaces principales : 
    * Attaques MITM, injections (SQL, XSS, LDAP): données mal validées
    * DDoS : submersion de requêtes
    * Contrôle d’accès brisé.
    * Credential stuffing : réutilisation d’identifiants volés.
    * Data exfiltration : extraction de données sensibles via API publiques.
    * API Zombies : vieilles versions non désactivées.
* Importance croissante avec l’essor de l’IoT et des microservices.


## Authentification vs Autorisation

* **Authentification** = prouver son identité.
  🔑 Exemple : Se connecter avec un mot de passe ou un jeton JWT.
* **Autorisation** = définir ce qu’on a le droit de faire.
  🔐 Exemple : Un utilisateur « normal » peut consulter ses factures, mais seul un « admin » peut supprimer un compte.

**Analogie** :

* Authentification = montrer sa carte d’identité à l’entrée d’un bâtiment.
* Autorisation = badge qui permet ou non d’entrer dans certaines salles.


## Sécurité des API REST vs SOAP

* **REST** : utilise HTTP, JSON, URI → plus simple et léger, mais vulnérable sans sécurisation.
* **SOAP** : basé sur XML, signatures et jetons SAML → plus lourd mais plus strict niveau sécurité.
* Bonne pratique REST : HTTPS + jetons (JWT, OAuth).
* REST est aujourd’hui le standard, SOAP reste utilisé dans les systèmes legacy.


## **Sécurité des API : approche systématique**

* Stratégie complète = inventaire de toutes les API (publiées, fantômes, zombies).
* Classer les données manipulées : sensibles vs non sensibles.
* Mettre en place des mécanismes pour :

  * Détection des API fantômes (non documentées).
  * Correction des vulnérabilités (authentification cassée, autorisation faible).
  * Surveillance continue.

## 8. **Sécurité basée sur les signatures vs analyse comportementale**

* **Signatures** : rapide, efficace contre attaques connues → mais limité.
* **Analyse comportementale + IA/ML** : détecte les anomalies (ex. un utilisateur qui fait 10 000 requêtes en 2 min).
* Nécessaire pour les attaques nouvelles ou sans signature.

### **Détection et réponse API (ADR)**

* Analyse de données historiques pour :

  * Définir un comportement « normal ».
  * Détecter les anomalies.
  * Générer des alertes.
* Implémentée via des solutions SaaS (scalabilité nécessaire).

## Normes et bonnes pratiques de sécurité

1. **Chiffrement (TLS/SSL) : Toujours utiliser HTTPS (TLS)**
Protège données en transit.
   ```http
   http://api.monsite.com ❌
   https://api.monsite.com ✅
   ```

   ➝ Empêche un attaquant d’intercepter les données (attaque MITM).

2. **Limiter le nombre de requêtes (Rate Limiting)**

   * Ex. : max 100 requêtes/minute par utilisateur.

   ```js
   const rateLimit = require("express-rate-limit");
   app.use(rateLimit({ windowMs: 60000, max: 100 }));
   ```

3. **Valider les entrées utilisateur (Input Validation)**
Vulnérabilités courantes : injections SQL, JSON mal validés, absence de limitation de débit.
   ```js
   // Mauvais : concaténation de chaînes -> vulnérable SQL Injection
   db.query(`SELECT * FROM users WHERE id = ${req.query.id}`);

   // Correct : requêtes paramétrées
   db.query("SELECT * FROM users WHERE id = ?", [req.query.id]);
   ```

4. **Ne pas exposer trop de données (Excessive Data Exposure)**

   * Mauvais :

     ```json
     { "id":1, "name":"Alice", "password":"123456" }
     ```
   * Correct :

     ```json
     { "id":1, "name":"Alice" }
     ```

5. **Messages d’erreur génériques**

   * Mauvais : `Erreur SQL: invalid column 'password'`
   * Correct : `Erreur : requête invalide`

6. **Jetons** : valident l’identité des requêtes et expiration des jetons

7. **OAuth / OpenID Connect** : standards modernes pour authN/authZ.

8. **Zero Trust** : aucun trafic n’est fiable par défaut → tout doit être authentifié.

9. Sécuriser les dépendances tierces.

10. **Utiliser des en-têtes de sécurité** tel que : validez les saisies utilisateur pour l’en-tête Content-Type et le format des données (ce qui  d’empêche les attaques par injection en rejetant les saisies imprévues ou malformées.)

11. **Contrôler l’accès** : 
Pour renforcer la sécurité d’une API, il est essentiel de contrôler **qui a accès à quoi**. Deux approches principales sont utilisées : **RBAC** et **ABAC**.

    🔹RBAC (Role-Based Access Control – contrôle d’accès basé sur les rôles)

      * **Principe** : les permissions sont accordées en fonction du rôle de l’utilisateur (ex. : admin, manager, utilisateur).
      * **Exemple** :

        * Un **admin** peut créer, modifier et supprimer des ressources.
        * Un **manager** peut uniquement consulter et modifier.
        * Un **utilisateur** peut seulement consulter.

    🔹 ABAC (Attribute-Based Access Control – contrôle d’accès basé sur les attributs)

    * **Principe** : les permissions dépendent d’attributs liés à l’utilisateur, à la ressource ou au contexte.
    * **Exemple** :

      * Un utilisateur ne peut accéder à un document **que s’il appartient à son département** (attribut `department=user.department`).
      * Une API bancaire permet un virement **uniquement pendant les heures ouvrables** (attribut contextuel : `time < 18h`).

      
    **En pratique**, beaucoup d’API combinent **RBAC** (pour gérer les grands rôles) et **ABAC** (pour gérer des règles contextuelles fines).


12. **Chiffrer et masquer les données sensibles** (cartes bancaires) :
 Le chiffrement rend les données échangées ou stockées via une API illisibles sans clé de déchiffrement, protégeant ainsi leur confidentialité et leur intégrité même en cas d’interception. Les API peuvent parfois révéler par erreur des données sensibles (mots de passe, tokens, infos personnelles). Pour éviter cela, il faut chiffrer les données en transit et au repos, et ne jamais exposer ces informations dans les URL ou les logs.


13. Liste blanche d’IP.

![Évaluation posture sécurité API : étapes](/420-514/images/evaluate-your-api-security-posture.avif)

### **WAAP (Web Application and API Protection)**

* Évolution des WAF (pare-feux applicatifs).
* Combine : WAF + Anti-bots + DDoS protection + API Security.
* Apporte :

  * Gestion centralisée des politiques.
  * Limitation de débit.
  * Audit complet.


### **OWASP Top 10 API Security Risks – 2023**

1. **Broken Object Level Authorization (BOLA)** : accès non autorisé à un objet (ex. changer un `userId`).
2. **Broken Authentication** : auth mal implémentée → vol/forgery de tokens.
3. **Broken Object Property Level Authorization** : exposition de propriétés sensibles.
4. **Unrestricted Resource Consumption** : pas de limites → DDoS.
5. **Broken Function Level Authorization** : accès à des fonctions admin non protégées.
6. **Unrestricted Access to Sensitive Business Flows** : abus d’un processus métier (ex. spam de réservations).
7. **SSRF** : envoi de requêtes non validées par le serveur.
8. **Security Misconfiguration** : mauvaise configuration (TLS absent, CORS trop permissif).
9. **Improper Inventory Management** : API fantômes/zombies.
10. **Unsafe Consumption of APIs** : trop de confiance dans les API tierces.



## Méthodes d’authentification dans les API

1. **Clés API** (API Key)

   * Simple mais peu sécurisée si partagée.

   ```http
   GET /users
   Authorization: Api-Key 12345
   ```

   ➝ Bien pour des services internes, pas pour des données sensibles.

2. **JWT (JSON Web Token)**

   * Jeton signé, contient les infos de l’utilisateur. Un utilisateur obtient un token JWT après login :

   ```json
    {
    "user": "alice",
    "role": "admin",
    "exp": "2025-09-15T12:00:00Z"
    }

   ```
    Toutes ses requêtes suivantes contiendront Authorization: Bearer <token>.

   ```js
   // Exemple Node.js avec Express
   const jwt = require("jsonwebtoken");

   app.post("/login", (req, res) => {
     const user = { id: 1, role: "admin" };
     const token = jwt.sign(user, "secretKey", { expiresIn: "1h" });
     res.json({ token });
   });

   app.get("/profile", (req, res) => {
     const token = req.headers["authorization"]?.split(" ")[1];
     if (!token) return res.sendStatus(401);
     jwt.verify(token, "secretKey", (err, user) => {
       if (err) return res.sendStatus(403);
       res.json({ message: `Bonjour ${user.role}` });
     });
   });
   ```

   ➝ Standard moderne, portable, expiration configurable.

3. **OAuth 2.0 + OpenID Connect**

   * Utilisé par Google, Facebook, GitHub.
   * Permet à un utilisateur de se connecter via un service tiers.
   * Exemple : **Se connecter avec Google** sur un site e-commerce.

4. **mTLS (Mutual TLS)**

   * Basé sur des certificats.
   * Très sûr, utilisé dans les API bancaires.



## Exemple complet d’API sécurisée (Node.js/Express)

```js
const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());

// Limiter les requêtes
app.use(rateLimit({ windowMs: 60000, max: 50 }));

// Middleware d’authentification
function authenticate(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, "secretKey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Login -> génère un JWT
app.post("/login", (req, res) => {
  const user = { id: 1, role: "admin" };
  const token = jwt.sign(user, "secretKey", { expiresIn: "1h" });
  res.json({ token });
});

// Route protégée
app.get("/data", authenticate, (req, res) => {
  res.json({ message: `Bienvenue ${req.user.role}`, data: [1,2,3] });
});

app.listen(3000, () => console.log("API sécurisée sur http://localhost:3000"));
```


## Sécurité avancée

* **Analyse comportementale (IA/ML)** :
  ➝ Exemple : un utilisateur qui consulte soudainement 10 000 comptes clients en 5 min = alerte.

* **Détection et réponse API (ADR)** :
  ➝ Surveillance sur plusieurs semaines pour détecter des schémas anormaux.

* **Passerelles API (Kong, Apigee, AWS API Gateway)** :
  ➝ Gestion centralisée : authentification, quotas, logs.

* **WAAP (Web Application & API Protection)** :
  ➝ Combine WAF + anti-bots + API Security.


## Étude de cas

### Cas 1 : API e-commerce sans sécurité

* URL : `/api/orders?userId=2`
* Un attaquant change `2` en `3` et consulte les commandes d’un autre client.

### Cas 2 : API sécurisée

* Vérification d’authentification + autorisation (RBAC).
* L’API refuse l’accès : `403 Forbidden`.


## À savoir :

* **Les API publiques sont-elles plus vulnérables ?** → pas forcément, dépend des contrôles appliqués.
* **MFA pour API ?** → Oui, possible et recommandé.
* **Comment savoir si une API est compromise ?** → logs + détection anomalies.
* **Fréquence des audits** → au moins 1 fois/an + après toute mise à jour importante.

## Conclusion

La **sécurité des API** repose sur 4 piliers :

1. 🔑 Authentification forte (JWT, OAuth).
2. 🔐 Autorisation stricte (RBAC, ABAC).
3. 🛡️ Défenses techniques (TLS, rate limiting, input validation).
4. 📊 Surveillance continue (logs, analyse comportementale, ADR).

> **Sans sécurité, les API sont des portes ouvertes aux attaquants.**


## Ressources 
[OWASP Top 10 API Security Risks – 2023
](https://owasp.org/API-Security/editions/2023/fr/0x11-t10/)

[Orientation sur les pratiques exemplaires en matière de sécurité des API](https://www.canada.ca/fr/gouvernement/systeme/gouvernement-numerique/innovations-gouvernementales-numeriques/permettre-interoperabilite/directives-api/securite.html)

[
Qu'est-ce que la sécurité des API ?](https://www.akamai.com/fr/glossary/what-is-api-security#:~:text=La%20s%C3%A9curit%C3%A9%20des%20API%20est,aux%20fonctionnalit%C3%A9s%20et%20aux%20donn%C3%A9es)

[Liste de contrôle pour la sécurité des API : Meilleures pratiques, tests et NIST](https://www.f5.com/fr_fr/company/blog/api-security-checklist)

[11 bonnes pratiques de sécurité API](https://datadome.co/fr/menaces/11-meilleures-pratiques-de-securite-api-conseils-pour-proteger-vos-actifs-numeriques/)

