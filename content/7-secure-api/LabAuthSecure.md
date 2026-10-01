+++
draft = false
title = '🧪 Laboratoire : Mechanismes pour authentification sécuritaire'
weight = 84
+++


## 1. JWT
### 1.1 Installer les dépendances nécessaires
Installez les packages nécessaires pour JWT et bcrypt dans un projet NestJS :

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
npm install --save-dev @types/passport-jwt @types/bcryptjs
```

#### Structure recommandée
```
src/
├── auth/
│   ├── dto/login.dto.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
└── users/
    ├── schemas/user.schema.ts
    ├── users.service.ts
    └── users.module.ts
``` 

### 1.2 Créer un module d'authentification
Générez un module auth pour gérer l'authentification :

```bash
nest generate module auth
```
### 1.3 Créer un service pour l'authentification
Générez un service auth pour gérer la logique métier de l'authentification :

```bash
nest generate service auth
```
Dans le fichier `auth.service.ts`, implémentez les méthodes pour :

* Valider les utilisateurs.
* Générer des tokens JWT.
* Hacher les mots de passe avec bcrypt.

**Exemple de `auth.service.ts` :**

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Simuler une base de données d'utilisateurs
  private users = [
    { id: 1, username: 'user1', password: await bcrypt.hash('password1', 10) },
    { id: 2, username: 'user2', password: await bcrypt.hash('password2', 10) },
  ];

  // Valider un utilisateur
  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result; // Retourne l'utilisateur sans le mot de passe
    }
    throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe invalide');
  }

  // Générer un JWT
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

### 1.4 Configurer le module JWT
Ajoutez le module JWT dans le fichier `auth.module.ts` pour gérer la génération et la validation des tokens.

**Exemple de `auth.module.ts` :**
```ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Remplacez par une clé secrète sécurisée
      signOptions: { expiresIn: '1h' }, // Durée de validité du token
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
```


### 1.5 Implémenter une stratégie JWT
Créez une stratégie JWT pour valider les tokens.

**Exemple de `jwt.strategy.ts`**

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY', // Remplacez par la même clé secrète que dans JwtModule
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

### 1.6 Créer un contrôleur pour l'authentification
Générez un contrôleur auth pour gérer les routes d'authentification :
```ts
nest generate controller auth
```
Dans le fichier `auth.controller.ts`, implémentez les routes pour :

* **Login** : Authentifier un utilisateur et retourner un token JWT.
* **Profile** : Accéder à des données protégées avec un token JWT valide.

**Exemple de `auth.controller.ts` :**
```ts
import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Retourne les informations de l'utilisateur connecté
  }
}
```

### 1.7 Protéger les routes avec un guard JWT
Créez un guard pour protéger les routes nécessitant une authentification.

**Exemple de jwt-auth.guard.ts :**
```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### 1.8 Tester l'authentification
#### Étape 1 : Lancer le serveur
Démarrez votre application NestJS :

```shell
npm run start:dev
```

#### Étape 2 : Tester les routes avec Postman ou Curl
1. Route `POST /auth/login` :

    * Envoyez un nom d'utilisateur et un mot de passe pour obtenir un token JWT.
    * Exemple de requête :

```json
{
  "username": "user1",
  "password": "password1"
}
```
* Réponse attendue :
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
2. Route `GET /auth/profile` :

    * Ajoutez le token JWT dans l'en-tête `Authorization` :

```text
Authorization: Bearer <access_token>
```

* Réponse attendue :
```json
{
  "userId": 1,
  "username": "user1"
}
```


## 2. **Établissement de connexion sécurisée**
### 2.1 Installer les dépendances nécessaires
Pour activer HTTPS dans NestJS, vous devez utiliser les modules fs et https (déjà inclus dans Node.js). Aucune installation supplémentaire n'est nécessaire.

### 2.2 Générer un certificat SSL
Si vous n'avez pas encore de certificat SSL, vous pouvez en générer un pour le développement avec OpenSSL.

1. **Générer une clé privée et un certificat auto-signé :**

```bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365
```

* `server.key` : Clé privée.
* `server.cert` : Certificat auto-signé.
Placez ces fichiers dans un dossier sécurisé de votre projet, par exemple : `certs/`.

2. Placez ces fichiers dans un dossier sécurisé de votre projet, par exemple : `certs/`.

### 2.3 Configurer HTTPS dans NestJS
Modifiez le fichier principal `main.ts` pour activer HTTPS.

**Exemple de ``main.ts`` :**

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  // Charger les options HTTPS
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs/server.key')), // Chemin vers la clé privée
    cert: fs.readFileSync(path.join(__dirname, 'certs/server.cert')), // Chemin vers le certificat
  };

  // Créer l'application NestJS avec HTTPS
  const app = await NestFactory.create(AppModule, { httpsOptions });

  // Activer CORS si nécessaire
  app.enableCors();

  // Démarrer le serveur sur le port 3000
  await app.listen(3000);
}
bootstrap();
```

Pour ce faire, vous devez disposer d’un certificat SSL valide, qui peut être obtenu auprès d'une autorité de certification (AC).

### 2.4 Tester la connexion HTTPS

1. Lancez votre application :
```shell
npm run start:dev
```
2. Accédez à votre application via HTTPS :
```shell
https://localhost:3000
```
3. Si vous utilisez un certificat auto-signé, votre navigateur affichera un avertissement de sécurité. Vous pouvez l'ignorer pour le développement.


### 2.5 Recommandations pour la production
1. **Utiliser un certificat SSL valide :**

    * En production, utilisez un certificat SSL émis par une autorité de certification (CA) reconnue, comme `Let's Encrypt`.
    * Vous pouvez automatiser l'obtention et le renouvellement des certificats avec des outils comme `Certbot`.
2. **Configurer un proxy inverse :**

    * Utilisez un proxy inverse comme `Nginx` ou `Apache` pour gérer les connexions HTTPS et rediriger le trafic vers votre application NestJS.
3. **Forcer HTTPS :**

    * Configurez votre serveur pour rediriger automatiquement les requêtes HTTP vers HTTPS.
### 2.6 Exemple complet avec HTTPS et JWT
Voici un exemple combinant JWT pour l'authentification et HTTPS pour sécuriser les connexions.

**Fichier ``main.ts`` :**
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('certs/server.key'),
    cert: fs.readFileSync('certs/server.cert'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors(); // Activer CORS si nécessaire
  await app.listen(3000);
}
bootstrap();
```

**Fichier ``auth.controller.ts`` :**

```ts
import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
```

### 2.7 Résumé
* **HTTPS** : Ajoutez un certificat SSL pour sécuriser les connexions entre le client et le serveur.
* **JWT** : Utilisez des tokens pour authentifier les utilisateurs.
* **Production** :
    * Utilisez un certificat SSL valide (Let's Encrypt).
    * Configurez un proxy inverse pour gérer HTTPS.
    * Forcer les connexions HTTPS pour une sécurité optimale.
Avec cette configuration, votre application NestJS est sécurisée à la fois au niveau des connexions réseau (HTTPS) et de l'authentification (JWT).

## 3. **Utilisation de clés publiques et privées dans NestJS**
**Exemple d’utilisation de clés publiques pour le chiffrement :**
Le chiffrement RSA avec des clés publiques et privées est une méthode courante pour sécuriser les données sensibles. Voici comment l'implémenter dans une application NestJS.

### **Étape 1 : Installer les dépendances nécessaires**
Installez le package node-rsa pour gérer les clés RSA et leur chiffrement.

```bash
npm install node-rsa
npm i --save-dev @types/node-rsa
```

### **Étape 2 : Créer un service pour le chiffrement**
Générez un service dédié pour gérer le chiffrement et le déchiffrement des données.
```bash
nest generate service encryption
```
Dans le fichier `encryption.service.ts`, implémentez les méthodes pour :

* Générer des clés publiques et privées.
* Chiffrer des données avec la clé publique.
* Déchiffrer des données avec la clé privée.

**Exemple de `encryption.service.ts` :**

```ts
import { Injectable } from '@nestjs/common';
import * as NodeRSA from 'node-rsa';

@Injectable()
export class EncryptionService {
  private key: NodeRSA;
  private publicKey: string;
  private privateKey: string;

  constructor() {
    // Générer une paire de clés RSA
    this.key = new NodeRSA({ b: 512 }); // Taille de la clé : 512 bits
    this.publicKey = this.key.exportKey('public'); // Exporter la clé publique
    this.privateKey = this.key.exportKey('private'); // Exporter la clé privée
  }

  // Obtenir la clé publique
  getPublicKey(): string {
    return this.publicKey;
  }

  // Chiffrer des données avec la clé publique
  encryptData(data: string): string {
    return this.key.encrypt(data, 'base64'); // Chiffrement en base64
  }

  // Déchiffrer des données avec la clé privée
  decryptData(encryptedData: string): string {
    return this.key.decrypt(encryptedData, 'utf8'); // Déchiffrement en UTF-8
  }
}
```

### **Étape 3 : Créer un contrôleur pour exposer les fonctionnalités**
Générez un contrôleur pour gérer les routes liées au chiffrement.

```shell
nest generate controller encryption
```

Dans le fichier `encryption.controller.ts`, exposez des endpoints pour :

* Obtenir la clé publique.
* Chiffrer des données.
* Déchiffrer des données.

**Exemple de `encryption.controller.ts` :**

```ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { EncryptionService } from './encryption.service';

@Controller('encryption')
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  // Endpoint pour obtenir la clé publique
  @Get('public-key')
  getPublicKey(): string {
    return this.encryptionService.getPublicKey();
  }

  // Endpoint pour chiffrer des données
  @Post('encrypt')
  encryptData(@Body('data') data: string): string {
    return this.encryptionService.encryptData(data);
  }

  // Endpoint pour déchiffrer des données
  @Post('decrypt')
  decryptData(@Body('encryptedData') encryptedData: string): string {
    return this.encryptionService.decryptData(encryptedData);
  }
}
```

### **Étape 4 : Tester les endpoints**
1. **Lancer le serveur NestJS :**

```shell
npm run start:dev
```

2. **Tester les routes avec Postman ou Curl :**
    * Obtenir la clé publique :

```shell
curl http://localhost:3000/encryption/public-key
```

    * Chiffrer des données :

```shell
curl -X POST http://localhost:3000/encryption/encrypt \
-H "Content-Type: application/json" \
-d '{"data": "Données sensibles"}'
```

    * Déchiffrer des données :
```shell
curl -X POST http://localhost:3000/encryption/decrypt \
-H "Content-Type: application/json" \
-d '{"encryptedData": "<données_chiffrées>"}'
```

### **Étape 5 : Exemple de flux complet**
1. **Obtenir la clé publique :**
* Appel à GET /encryption/public-key.
* Réponse :
```shell
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
-----END PUBLIC KEY-----
```
2. **Chiffrer des données :**
* Appel à POST /encryption/encrypt avec le corps :
```json
{
  "data": "Données sensibles"
}
```
* Réponse :

```shell
Q2lwaGVyZWRUZXh0...
```
3. **Déchiffrer des données :**
* Appel à POST /encryption/decrypt avec le corps :

```json
{
  "encryptedData": "Q2lwaGVyZWRUZXh0..."
}
```

* Réponse :

```text
Données sensibles
```

### **Étape 6 : Recommandations pour la production**
1. **Augmenter la taille des clés :**

    * En production, utilisez des clés d'au moins 2048 bits pour une meilleure sécurité :
```ts
this.key = new NodeRSA({ b: 2048 });
```
2. **Stocker les clés de manière sécurisée :**

    * Enregistrez les clés publiques et privées dans des fichiers ou un gestionnaire de secrets sécurisé (ex. : AWS Secrets Manager, HashiCorp Vault).
3. **Limiter l'accès aux endpoints sensibles :**

    * Protégez les routes de chiffrement/déchiffrement avec des mécanismes d'authentification (ex. : JWT).

### **Résumé des fichiers créés**
* `encryption.service.ts` : Gère la logique de chiffrement et déchiffrement.
* `encryption.controller.ts` : Expose les endpoints pour interagir avec le chiffrement.
* ``main.ts`` : Configure l'application NestJS.

Avec cette implémentation, vous avez intégré un système de chiffrement RSA dans votre application NestJS, tout en respectant les bonnes pratiques. Vous pouvez maintenant sécuriser les données sensibles avec des clés publiques et privées.

## 4. **Utilisation de clés secrètes**

Les clés secrètes sont utilisées dans les algorithmes de chiffrement symétrique, comme AES (Advanced Encryption Standard). Contrairement au chiffrement asymétrique (RSA), le chiffrement symétrique utilise une seule clé pour chiffrer et déchiffrer les données.

### **Étape 1 : Installer les dépendances nécessaires**
Installez le module crypto (inclus par défaut dans Node.js, mais vous pouvez l'importer explicitement si nécessaire).

```bash
npm install crypto
```

### **Étape 2 : Créer un service pour le chiffrement symétrique**
Générez un service dédié pour gérer le chiffrement et le déchiffrement des données avec AES.

```bash
nest generate service symmetric-encryption
```

Dans le fichier `symmetric-encryption.service.ts`, implémentez les méthodes pour :

* Chiffrer des données avec une clé secrète.
* Déchiffrer des données avec la même clé.

**Exemple de `symmetric-encryption.service.ts` :**

```ts
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SymmetricEncryptionService {
  private readonly secretKey = crypto.randomBytes(32); // Génère une clé secrète de 256 bits
  private readonly iv = crypto.randomBytes(16); // Génère un vecteur d'initialisation (IV)

  // Chiffrement des données
  encrypt(text: string): string {
    const cipher = crypto.createCipheriv('aes-256-ctr', this.secretKey, this.iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return `${this.iv.toString('hex')}:${encrypted.toString('hex')}`; // Retourne IV + données chiffrées
  }

  // Déchiffrement des données
  decrypt(encryptedText: string): string {
    const [ivHex, encryptedHex] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-ctr', this.secretKey, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  }
}
```

### **Étape 3 : Créer un contrôleur pour exposer les fonctionnalités**
Générez un contrôleur pour gérer les routes liées au chiffrement symétrique.

```bash
nest generate controller symmetric-encryption
```
Dans le fichier `symmetric-encryption.controller.ts`, exposez des endpoints pour :

* Chiffrer des données.
* Déchiffrer des données.

**Exemple de `symmetric-encryption.controller.ts` :**


```ts
import { Controller, Post, Body } from '@nestjs/common';
import { SymmetricEncryptionService } from './symmetric-encryption.service';

@Controller('symmetric-encryption')
export class SymmetricEncryptionController {
    constructor(private readonly encryptionService: SymmetricEncryptionService) {}

  // Endpoint pour chiffrer des données
  @Post('encrypt')
  encrypt(@Body('data') data: string): string {
      return this.encryptionService.encrypt(data);
  }

  // Endpoint pour déchiffrer des données
  @Post('decrypt')
  decrypt(@Body('encryptedData') encryptedData: string): string {
      return this.encryptionService.decrypt(encryptedData);
  }
}
```

### **Étape 4 : Tester les endpoints**
1. **Lancer le serveur NestJS :**
```bash
npm run start:dev
```
2. **Tester les routes avec Postman ou Curl :**

    * Chiffrer des données :

```bash
curl -X POST http://localhost:3000/symmetric-encryption/encrypt \
-H "Content-Type: application/json" \
-d '{"data": "Données sensibles"}'
```
    * Déchiffrer des données :

```bash
curl -X POST http://localhost:3000/symmetric-encryption/decrypt \
-H "Content-Type: application/json" \
-d '{"encryptedData": "<données_chiffrées>"}'
```

### **Étape 5 : Exemple de flux complet**
1. **Chiffrer des données :**
* Appel à `POST /symmetric-encryption/encrypt` avec le corps :
```json
{
  "data": "Données sensibles"
}
```
Réponse :
```bash
<iv_hex>:<encrypted_data_hex>
```
2. **Déchiffrer des données :**
* Appel à POST /symmetric-encryption/decrypt avec le corps :
```json
{
  "encryptedData": "<iv_hex>:<encrypted_data_hex>"
}
```
Réponse :
```texte
Données sensibles
```
### **Étape 6 : Recommandations pour la production**
1. **Stocker la clé secrète de manière sécurisée :**

    * En production, utilisez un gestionnaire de secrets comme AWS Secrets Manager, Azure Key Vault, ou HashiCorp Vault pour stocker la clé secrète.
2. **Utiliser un vecteur d'initialisation (IV) unique :**

    * Assurez-vous que le vecteur d'initialisation (IV) est unique pour chaque opération de chiffrement.
3. **Limiter l'accès aux endpoints sensibles :**

    * Protégez les routes de chiffrement/déchiffrement avec des mécanismes d'authentification (ex. : JWT).

### **Résumé des fichiers créés**
* `symmetric-encryption.service.ts` : Gère la logique de chiffrement et déchiffrement avec AES.
* `symmetric-encryption.controller.ts` : Expose les endpoints pour interagir avec le chiffrement.
* `main.ts` : Configure l'application NestJS.


Avec cette implémentation, vous avez intégré un système de chiffrement symétrique avec AES dans votre application NestJS. Cela permet de sécuriser les données sensibles avec une clé secrète unique.



## 5. **Stockage sécuritaire des données des utilisateurs**
Le hachage est une méthode utilisée pour stocker les mots de passe de manière sécurisée. Contrairement au chiffrement, le hachage est un processus unidirectionnel : une fois le mot de passe haché, il ne peut pas être reconverti en texte clair.

### **Étape 1 : Installer bcryptjs**
Installez la bibliothèque bcryptjs pour gérer le hachage des mots de passe.

```shell
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### **Étape 2 : Créer un service pour gérer les mots de passe**
Générez un service dédié pour gérer le hachage et la vérification des mots de passe.

```shell
nest generate service password
```

Dans le fichier `password.service.ts`, implémentez les méthodes pour :

* Hacher un mot de passe.
* Vérifier un mot de passe.

**Exemple de `password.service.ts` :**

```ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordService {
  // Hacher un mot de passe
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Générer un sel
    return bcrypt.hash(password, salt); // Hacher le mot de passe avec le sel
  }

  // Vérifier un mot de passe
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword); // Comparer le mot de passe avec le hash
  }
}
```

### **Étape 3 : Utiliser le service dans un module utilisateur**

Générez un module pour gérer les utilisateurs.

```shell
nest generate module users
```

Ajoutez le service PasswordService dans le module des utilisateurs pour gérer le hachage des mots de passe.

**Exemple de `users.module.ts` :**

```ts
import { Module } from '@nestjs/common';
import { PasswordService } from '../password/password.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, PasswordService],
  controllers: [UsersController],
})
export class UsersModule {}
```

### **Étape 4 : Implémenter le service utilisateur**
Dans le fichier `users.service.ts`, utilisez le service PasswordService pour hacher les mots de passe avant de les enregistrer.

**Exemple de `users.service.ts` :**

```ts
import { Injectable } from '@nestjs/common';
import { PasswordService } from '../password/password.service';

@Injectable()
export class UsersService {
  private users = []; // Simuler une base de données d'utilisateurs

  constructor(private readonly passwordService: PasswordService) {}

  // Créer un utilisateur avec un mot de passe haché
  async createUser(username: string, password: string): Promise<any> {
    const hashedPassword = await this.passwordService.hashPassword(password);
    const user = { id: Date.now(), username, password: hashedPassword };
    this.users.push(user);
    return { id: user.id, username: user.username }; // Ne pas retourner le mot de passe
  }

  // Vérifier les informations d'identification d'un utilisateur
  async validateUser(username: string, password: string): Promise<boolean> {
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      return false;
    }
    return this.passwordService.verifyPassword(password, user.password);
  }
}
```

### **Étape 5 : Créer un contrôleur pour gérer les utilisateurs**
Générez un contrôleur pour exposer les endpoints liés aux utilisateurs.

```shell
nest generate controller users
```
Dans le fichier ``users.controller.ts``, exposez des endpoints pour :

* Créer un utilisateur.
* Valider les informations d'identification.

**Exemple de ``users.controller.ts`` :**

```ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint pour créer un utilisateur
  @Post('create')
  async createUser(@Body() body: { username: string; password: string }) {
    return this.usersService.createUser(body.username, body.password);
  }

  // Endpoint pour valider un utilisateur
  @Post('validate')
  async validateUser(@Body() body: { username: string; password: string }) {
    const isValid = await this.usersService.validateUser(body.username, body.password);
    return { isValid };
  }
}
```

### **Étape 6 : Tester les endpoints**
1. **Lancer le serveur NestJS :**

```shell
npm run start:dev
```
2. **Tester les routes avec Postman ou Curl :**

    * Créer un utilisateur :

```shell
curl -X POST http://localhost:3000/users/create \
-H "Content-Type: application/json" \
-d '{"username": "user1", "password": "password123"}'
```
    * Valider un utilisateur :

```shell
curl -X POST http://localhost:3000/users/validate \
-H "Content-Type: application/json" \
-d '{"username": "user1", "password": "password123"}'
```

### **Étape 7 : Recommandations pour la production**
1. Augmenter le coût du sel :

    * En production, utilisez un coût de sel plus élevé (ex. : 12 ou 14) pour renforcer la sécurité :

```ts
const salt = await bcrypt.genSalt(12);
```
2. Ne jamais stocker les mots de passe en clair :

    * Assurez-vous que tous les mots de passe sont hachés avant d'être enregistrés dans la base de données.
3. Limiter les tentatives de connexion :

    * Implémentez un mécanisme pour limiter les tentatives de connexion afin de prévenir les attaques par force brute.
4. Utiliser HTTPS :

    * Assurez-vous que toutes les communications entre le client et le serveur sont sécurisées avec HTTPS.

### **Résumé des fichiers créés**
* `password.service.ts` : Gère le hachage et la vérification des mots de passe.
* `users.service.ts` : Gère la logique métier des utilisateurs.
* `users.controller.ts` : Expose les endpoints pour gérer les utilisateurs.
* `users.module.ts` : Configure le module des utilisateurs.


Avec cette implémentation, vous avez intégré un système de stockage sécurisé des mots de passe dans votre application NestJS. Cela garantit que les mots de passe des utilisateurs sont protégés contre les attaques et les fuites de données.


## 6. **Gestion des accès**

Dans une application NestJS, vous pouvez utiliser des guards pour restreindre l'accès aux routes en fonction des rôles des utilisateurs. Les guards permettent de centraliser la logique de contrôle d'accès et de l'appliquer facilement à des routes ou des modules.

### **Étape 1 : Créer un guard pour la gestion des rôles**
Générez un guard dédié pour vérifier les rôles des utilisateurs.

```shell
nest generate guard roles
```
Dans le fichier `roles.guard.ts`, implémentez la logique pour vérifier si l'utilisateur a le rôle requis.

**Exemple de `roles.guard.ts` :**

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Récupérer les rôles requis pour la route
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si aucun rôle n'est requis, autoriser l'accès
    }

    // Récupérer l'utilisateur depuis la requête
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Vérifier si l'utilisateur a au moins un des rôles requis
    return user && user.roles && requiredRoles.some((role) => user.roles.includes(role));
  }
}
```

### **Étape 2 : Créer un décorateur pour définir les rôles**
Générez un décorateur personnalisé pour définir les rôles requis sur les routes.
* 
* **Exemple de ``roles.decorator.ts`` :** **  *

```ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

### **Étape 3 : Appliquer les guards et les rôles aux routes**
Dans un contrôleur, utilisez le décorateur `@Roles` pour définir les rôles requis, et appliquez le `RolesGuard` pour protéger les routes.

**Exemple de `users.controller.ts` :**
```ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Appliquer les guards
export class UsersController {
  @Get('admin')
  @Roles('admin') // Seuls les utilisateurs avec le rôle "admin" peuvent accéder
  getAdminData(@Request() req) {
    return { message: 'Données réservées aux administrateurs', user: req.user };
  }

  @Get('user')
  @Roles('user') // Seuls les utilisateurs avec le rôle "user" peuvent accéder
  getUserData(@Request() req) {
    return { message: 'Données réservées aux utilisateurs', user: req.user };
  }
}
```

### **Étape 4 : Ajouter les rôles dans le payload JWT**
Lors de la génération du token JWT, incluez les rôles de l'utilisateur dans le payload.

**Exemple de `auth.service.ts` :**

```ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

### **Étape 5 : Extraire les rôles dans la stratégie JWT**
Dans la stratégie JWT, assurez-vous que les rôles sont extraits et attachés à l'objet utilisateur.

**Exemple de `jwt.strategy.ts` :**

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY', // Remplacez par votre clé secrète
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
```

### **Étape 6 : Tester les rôles et les accès**
1. **Lancer le serveur NestJS :**

```shell
npm run start:dev
```
2. **Tester les routes avec Postman ou Curl :**

    * Route réservée aux administrateurs :
```shell
curl -X GET http://localhost:3000/users/admin \
-H "Authorization: Bearer <access_token>"
```
    * Route réservée aux utilisateurs :
```shell
curl -X GET http://localhost:3000/users/user \
-H "Authorization: Bearer <access_token>"
```

3. **Scénarios de test :**

    * Un utilisateur avec le rôle admin peut accéder à /users/admin.
    * Un utilisateur avec le rôle user peut accéder à /users/user.
    * Un utilisateur sans rôle requis reçoit une erreur 403 Forbidden.


### **Étape 7 : Recommandations pour la production**
1. **Limiter les rôles sensibles :**

    * Assurez-vous que seuls les administrateurs peuvent attribuer ou modifier des rôles.
2. Protéger les routes critiques :

    * Appliquez des guards supplémentaires pour les routes sensibles.
3. Journaliser les accès :

    * Enregistrez les tentatives d'accès aux routes protégées pour détecter les comportements suspects.

### **Résumé des fichiers créés**
* `roles.guard.ts` : Gère la logique de vérification des rôles.
* `roles.decorator.ts` : Définit les rôles requis pour les routes.
* `users.controller.ts` : Expose les endpoints protégés par rôles.
* `auth.service.ts` : Ajoute les rôles dans le payload JWT.
* `jwt.strategy.ts` : Extrait les rôles du token JWT.

Avec cette implémentation, vous avez intégré un système de gestion des accès basé sur les rôles dans votre application NestJS. Cela garantit que seules les personnes autorisées peuvent accéder aux routes protégées.

