+++
draft = false
title = '🧪 Laboratoire : Mechanismes pour authentification sécuritaire'
weight = 54
+++


## 1. JWT

**Exemple avec JSON Web Token (JWT) :**

```bash
npm install express jsonwebtoken bcryptjs
```

Avec TypeScript, il ne faut pas ajouter les packages nécessaires :

```bash
npm i --save-dev @types/jsonwebtoken @types/bcryptjs
```

```jsx
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const users = []; // Simuler une base de données en mémoire

app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send('Utilisateur enregistré');
});

app.post('/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ username: user.username }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(403).send('Nom d’utilisateur ou mot de passe incorrect');
    }
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
```

### 2. **Établissement de connexion sécurisée**

Il est recommandé d'utiliser HTTPS pour sécuriser les connexions entre le client et le serveur.

**Exemple avec HTTPS :**

```bash
npm install express fs https
```

```jsx
const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();

// Charger les certificats
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

app.get('/', (req, res) => {
    res.send('Connexion sécurisée');
});

https.createServer(options, app).listen(3000, () => {
    console.log('Serveur HTTPS démarré sur le port 3000');
});
```

Pour ce faire, vous devez disposer d’un certificat SSL valide, qui peut être obtenu auprès d'une autorité de certification (AC).

[Configuration HTTPS pour des connexions sécurisées](https://www.notion.so/Configuration-HTTPS-pour-des-connexions-s-curis-es-04e05ecc0fe34a3b97c411f0d959fd09?pvs=21)

### 3. **Utilisation de clés publiques**

Le chiffrement RSA avec des clés publiques et privées est une méthode courante.

**Exemple d’utilisation de clés publiques pour le chiffrement :**

```bash
npm install node-rsa
npm i --save-dev @types/node-rsa
```

```jsx
const NodeRSA = require('node-rsa');

const key = new NodeRSA({ b: 512 });
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

// Chiffrement avec clé publique
const text = 'Données sensibles';
const encrypted = key.encrypt(text, 'base64');
console.log('Texte chiffré :', encrypted);

// Déchiffrement avec clé privée
key.importKey(privateKey, 'private');
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('Texte déchiffré :', decrypted);
```

### 4. **Utilisation de clés secrètes**

Les clés secrètes sont utilisées dans les algorithmes symétriques comme AES.

**Exemple de chiffrement symétrique avec AES :**

```bash
npm install crypto
```

```jsx
const crypto = require('crypto');

// Clé secrète
const secretKey = 'my-secret-key-123';

// Chiffrement
function encrypt(text) {
    const cipher = crypto.createCipher('aes-256-ctr', secretKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Déchiffrement
function decrypt(encryptedText) {
    const decipher = crypto.createDecipher('aes-256-ctr', secretKey);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const text = 'Données à protéger';
const encrypted = encrypt(text);
const decrypted = decrypt(encrypted);

console.log('Texte chiffré :', encrypted);
console.log('Texte déchiffré :', decrypted);
```

### 5. **Stockage sécuritaire des données des utilisateurs**

Le hachage est utilisé pour stocker les mots de passe de manière sécurisée.

**Exemple avec bcryptjs pour hacher les mots de passe :**

```bash
npm install bcryptjs
```

```jsx
const bcrypt = require('bcryptjs');

// Hachage du mot de passe
async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

// Vérification du mot de passe
async function verifyPassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

const password = 'monMotDePasse';
hashPassword(password).then(hashedPassword => {
    console.log('Mot de passe haché :', hashedPassword);

    verifyPassword(password, hashedPassword).then(isMatch => {
        console.log('Les mots de passe correspondent :', isMatch);
    });
});
```

### 6. **Gestion des accès**

Vous pouvez utiliser les middlewares pour restreindre l’accès aux routes selon les rôles des utilisateurs.

**Exemple de gestion des accès avec des rôles utilisateurs :**

```jsx
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = 'SECRET_KEY';

// Middleware de vérification du rôle
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.sendStatus(401);
        next();
    };
}

// Route accessible uniquement par un administrateur
app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.send('Bienvenue, administrateur !');
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
```