+++
draft = false
title = '🧪 Laboratoire : Configuration HTTPS'
weight = 52
+++


Configurer HTTPS pour des connexions sécurisées dans une application Node.js avec Express est une étape cruciale pour sécuriser les communications entre les clients et le serveur. HTTPS chiffre les données échangées pour empêcher les interceptions et les attaques "man-in-the-middle". Voici comment vous pouvez configurer HTTPS dans une application Express.

## Obtenir un certificat SSL/TLS

Pour utiliser HTTPS, vous avez besoin d'un certificat SSL/TLS. Vous pouvez obtenir un certificat de plusieurs façons :

1. **Certificats auto-signés** : Bon pour le développement ou les tests, mais non approuvé par les navigateurs.
2. **Certificats émis par une autorité de certification (CA)** : Pour les environnements de production. Vous pouvez obtenir ces certificats via des services comme [Let's Encrypt](https://letsencrypt.org/), qui fournit des certificats gratuits.

## Générer un certificat auto-signé (pour le Développement)

Pour le développement, vous pouvez générer un certificat auto-signé à l'aide de `openssl` :

```bash
openssl genpkey -algorithm RSA -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

Cela génère deux fichiers :

- **`key.pem`** : La clé privée.
- **`cert.pem`** : Le certificat.

## Configurer HTTPS dans une application express

Une fois que vous avez les fichiers de certificat et de clé, vous pouvez configurer votre serveur Express pour utiliser HTTPS.

### Mettre à jour `index.js` pour HTTPS

Modifiez votre fichier `index.js` pour utiliser `https` à la place de `http`.

**`index.js`** :

```jsx
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Charger le certificat et la clé
const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

// Middleware JSON
app.use(express.json());

// Route simple pour tester
app.get('/', (req, res) => {
  res.send('Connexion HTTPS sécurisée');
});

// Créer le serveur HTTPS
https.createServer(options, app).listen(port, () => {
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${port}`);
});
```

## Tester la Configuration HTTPS

1. **Démarrez le Serveur** :
    
    ```bash
    node index.js
    ```
    
2. **Accédez à l'application** :
    
    Ouvrez votre navigateur et accédez à `https://localhost:3000`. Si vous utilisez un certificat auto-signé, le navigateur affichera une alerte de sécurité, car le certificat n'est pas émis par une autorité de certification reconnue. Vous pouvez ignorer l'alerte pour tester en développement.
    

## Redirection HTTP vers HTTPS

Pour vous assurer que tous les utilisateurs utilisent des connexions sécurisées, vous pouvez configurer une redirection de HTTP vers HTTPS.

### Configurer le serveur HTTP pour rediriger vers HTTPS

Ajoutez un serveur HTTP séparé qui redirige toutes les requêtes vers HTTPS.

**`index.js` (mis à jour)** :

```jsx
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();
const httpsPort = process.env.HTTPS_PORT || 3000;
const httpPort = process.env.HTTP_PORT || 3001;

// Charger le certificat et la clé
const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
};

// Middleware JSON
app.use(express.json());

// Route simple pour tester
app.get('/', (req, res) => {
  res.send('Connexion HTTPS sécurisée');
});

// Créer le serveur HTTPS
https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${httpsPort}`);
});

// Créer le serveur HTTP qui redirige vers HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://localhost:${httpsPort}${req.url}` });
  res.end();
}).listen(httpPort, () => {
  console.log(`Serveur HTTP en écoute sur <http://localhost>:${httpPort}`);
});
```

Si le certificat provien d’une source non approuvées, il est possible que vous ne pouvez accéder au [localhost](https://localhost) avec https, mais en dev on va juste cliquer sur avancer puis continuer avec la connexion non sécurisée.

![https connexion](/420-514/images/https_conn.png)

## Configurer le serveur pour la production

Si vous déployez sur un serveur de production, vous devez configurer le serveur web (comme Nginx ou Apache) pour gérer les certificats SSL et rediriger le trafic HTTP vers HTTPS.

### **Ne jamais inclure de certificats en production avec le code**

En production, les certificats et les clés privées doivent être gérés indépendamment du code source pour des raisons de sécurité. Utilisez des outils de gestion de certificats (comme **Let's Encrypt** pour les certificats gratuits) ou des services cloud pour les stocker et les renouveler automatiquement.

## **7. Bonnes pratiques supplémentaires pour la sécurité des certificats**

- **Permissions d'accès aux fichiers** : Les fichiers de certificat doivent avoir des permissions limitées pour que seuls les utilisateurs du système qui en ont besoin puissent y accéder. Par exemple, vous pouvez limiter les accès avec la commande `chmod` sous Linux :
    
    ```bash
    chmod 600 certs/key.pem
    chmod 600 certs/cert.pem
    ```
    
    Cela permet uniquement au propriétaire de lire et d'écrire dans ces fichiers.
    
- **Environnement de production** : Pour les environnements de production, vous pouvez stocker les certificats dans des services de gestion de certificats comme **AWS Certificate Manager** ou **Azure Key Vault**, afin de ne pas avoir à gérer manuellement les fichiers sur le serveur.
- **Variables d'environnement** : Vous pouvez aussi stocker les chemins vers les fichiers de certificats dans des **variables d'environnement**. Cela rend votre projet plus portable entre différents environnements (local, production, CI/CD). Exemple :
    - **.env** :
        
        ```
        SSL_KEY_PATH=./certs/key.pem
        SSL_CERT_PATH=./certs/cert.pem
        ```
        
    - **Chargement dans votre application** :
        
        ```tsx
        const certificatOptions = {
          key: fs.readFileSync(process.env.SSL_KEY_PATH),
          cert: fs.readFileSync(process.env.SSL_CERT_PATH)
        };
        ```
        

## Autres ressources

[Comment générer un CSR en Node.js - SSL Dragon](https://www.ssldragon.com/fr/how-to/generate-csr/node-js/)

[HTTPS | Node.js v22.8.0 Documentation](https://nodejs.org/api/https.html)

[TLS (SSL) | Node.js v22.8.0 Documentation](https://nodejs.org/api/tls.html#tls-ssl)

[Get Started - ZeroSSL](https://zerossl.com/go/?utm_source=google&utm_medium=cpc&utm_campaign=performance-max&gad_source=1&gclid=Cj0KCQjw9Km3BhDjARIsAGUb4nzBpNHucgshIfbZe5oiJ21lnwOWBaYbDNYcJBw1_2AqJMVE7gvwR5gaAul9EALw_wcB)
