+++
draft = false
title = '🧪 Laboratoire : Requêtes HTTP & échanges de données avec Node.js/Express'
weight = 33
+++


## Prérequis & mise en place

```bash
mkdir http-lab && cd http-lab
npm init -y
npm i express
```

Crée **server.js** :

```js
// server.js
const express = require('express');
const app = express();
app.use(express.json());

// ===== Middleware de log (ligne de requête) =====
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ===== Mock "DB" en mémoire =====
let nextId = 3;
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'student' },
  { id: 2, name: 'Bob',   email: 'bob@example.com',   role: 'student' },
];

// ===== Middlewares utilitaires =====
function findUser(req, res, next) {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  req.user = user;
  next();
}

function validateUserPayload(req, res, next) {
  const { name, email, role } = req.body ?? {};
  if (!name || !email) return res.status(400).json({ error: 'name et email sont requis' });
  if (role && !['student', 'admin', 'teacher'].includes(role)) {
    return res.status(400).json({ error: "role doit être 'student' | 'admin' | 'teacher'" });
  }
  next();
}

// ===== Routes de démonstration HTTP =====

// GET simple
app.get('/', (req, res) => {
    res.status(200).send('Bienvenue!');
});

// GET simple + en-tête custom
app.get('/hello', (req, res) => {
  res.set('X-Server', 'MV-Express');    // en-tête réponse
  res.status(200).send('Bonjour!');
});

// HEAD : renvoie seulement les en-têtes
app.head('/ping', (req, res) => res.status(200).end());

// Codes de statut à la demande (ex: /status/404)
app.get('/status/:code', (req, res) => res.sendStatus(Number(req.params.code)));

// ===== Ressource /users (CRUD) =====

// Liste + filtre ?q=
app.get('/users', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const result = q
    ? users.filter(u => [u.name, u.email, u.role].some(v => String(v).toLowerCase().includes(q)))
    : users;
  res.status(200).json({ count: result.length, data: result });
});

// Lire par id
app.get('/users/:id', findUser, (req, res) => res.status(200).json(req.user));

// Créer
app.post('/users', validateUserPayload, (req, res) => {
  const { name, email, role = 'student' } = req.body;
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: 'Email déjà utilisé' });
  }
  const user = { id: nextId++, name, email, role };
  users.push(user);
  res.status(201).location(`/users/${user.id}`).json(user);
});

// Remplacer (PUT)
app.put('/users/:id', findUser, validateUserPayload, (req, res) => {
  const { name, email, role = 'student' } = req.body;
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== req.user.id)) {
    return res.status(409).json({ error: 'Email déjà utilisé' });
  }
  Object.assign(req.user, { name, email, role });
  res.status(200).json(req.user);
});

// Modifier partiel (PATCH)
app.patch('/users/:id', findUser, (req, res) => {
  const allowed = ['name', 'email', 'role'];
  const payload = Object.fromEntries(
    Object.entries(req.body ?? {}).filter(([k]) => allowed.includes(k))
  );
  if ('role' in payload && !['student', 'admin', 'teacher'].includes(payload.role)) {
    return res.status(400).json({ error: "role doit être 'student' | 'admin' | 'teacher'" });
  }
  if ('email' in payload && users.some(u => u.email.toLowerCase() === payload.email.toLowerCase() && u.id !== req.user.id)) {
    return res.status(409).json({ error: 'Email déjà utilisé' });
  }
  Object.assign(req.user, payload);
  res.status(200).json(req.user);
});

// Supprimer
app.delete('/users/:id', findUser, (req, res) => {
  users = users.filter(u => u.id !== req.user.id);
  res.status(204).send();
});

// Erreur volontaire
app.get('/boom', (req, res) => { throw new Error('Oups 💥'); });

// Handler d’erreurs (toujours à la fin)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne', detail: err.message });
});

app.listen(3000, () => console.log('Serveur prêt : http://localhost:3000'));
```

Lancer :

```bash
node server.js
```

---

## 🧭 Partie A — Explorer avec **curl**

> Astuce : ajoute `-i` pour voir les **en-têtes** de réponse, `-s` pour silencieux, et `| jq` pour formater le JSON.

| Commande                        | Méthode | Usage                                  |
| ------------------------------- | ------- | -------------------------------------- |
| `curl http://.../users`         | GET     | Récupérer tous les utilisateurs        |
| `curl "http://.../users?q=nom"` | GET     | Recherche par query string             |
| `curl -X POST -d ...`           | POST    | Créer un utilisateur                   |
| `curl http://.../users/1`       | GET     | Lire un utilisateur                    |
| `curl -X PUT -d ...`            | PUT     | Remplacer entièrement un utilisateur   |
| `curl -X PATCH -d ...`          | PATCH   | Modifier partiellement                 |
| `curl -X DELETE ...`            | DELETE  | Supprimer un utilisateur               |
| `curl -i -X POST ... (conflit)` | POST    | Démontrer les erreurs et codes 400/409 |


1. **GET** `/hello`

```bash
curl -i http://localhost:3000/hello
```

→ Observe statut **200**, en-tête custom `X-Server`, corps texte.

2. **HEAD** `/ping`

```bash
curl -I http://localhost:3000/ping
```

→ En-têtes seulement (pas de corps).

3. **GET** `/users` (liste)

```bash
curl -s http://localhost:3000/users | jq
```

4. **GET** `/users?q=alice` (filtre)

```bash
curl -s "http://localhost:3000/users?q=alice" | jq
```

5. **POST** `/users` (création)

```bash
curl -i -H "Content-Type: application/json" \
  -d '{"name":"Chloe","email":"chloe@example.com","role":"teacher"}' \
  http://localhost:3000/users
```

→ Attends **201 Created** + en-tête **Location**.

6. **GET** `/users/1` (lecture)

```bash
curl -s http://localhost:3000/users/1 | jq
```

7. **PUT** `/users/1` (remplacement)

```bash
curl -s -X PUT -H "Content-Type: application/json" \
  -d '{"name":"Alice Doe","email":"alice.d@example.com","role":"student"}' \
  http://localhost:3000/users/1 | jq
```

8. **PATCH** `/users/1` (modif partielle)

```bash
curl -s -X PATCH -H "Content-Type: application/json" \
  -d '{"role":"admin"}' \
  http://localhost:3000/users/1 | jq
```

9. **DELETE** `/users/1`

```bash
curl -i -X DELETE http://localhost:3000/users/1
```

→ Attends **204 No Content**.

10. **Erreurs & statuts**

```bash
curl -i http://localhost:3000/status/404
curl -i http://localhost:3000/boom
curl -i -X POST -H "Content-Type: application/json" \
  -d '{"name":"Dup","email":"alice@example.com"}' http://localhost:3000/users
```

→ Observe **404**, **500**, **409**.

Résumé des résultats :

| #  | Commande `curl`                                                                                                                                                                                           | Code HTTP attendu | Réponse JSON (ou texte) observée                |                                                          |
| -- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------- | -------------------------------------------------------- |
| 1  | `curl -i http://localhost:3000/hello`                                                                                                                                                                     | 200 OK            | Corps texte : `Bonjour 👋` + en-tête `X-Server` |                                                          |
| 2  | `curl -I http://localhost:3000/ping`                                                                                                                                                                      | 200 OK            | Aucun corps, uniquement les en-têtes            |                                                          |
| 3  | \`curl -s [http://localhost:3000/users](http://localhost:3000/users)                                                                                                                                      | jq\`              | 200 OK                                          | Liste complète des utilisateurs (`count`, `data: [...]`) |
| 4  | \`curl -s "[http://localhost:3000/users?q=alice](http://localhost:3000/users?q=alice)"                                                                                                                    | jq\`              | 200 OK                                          | Résultat filtré par le paramètre `q`                     |
| 5  | `curl -i -H "Content-Type: application/json" -d '{"name":"Chloe","email":"chloe@example.com"}' http://localhost:3000/users`                                                                               | 201 Created       | Objet utilisateur créé + en-tête `Location`     |                                                          |
| 6  | \`curl -s [http://localhost:3000/users/1](http://localhost:3000/users/1)                                                                                                                                  | jq\`              | 200 OK                                          | Détails de l’utilisateur avec `id=1`                     |
| 7  | \`curl -s -X PUT -H "Content-Type: application/json" -d '{"name":"Alice Doe","email":"[alice.d@example.com](mailto:alice.d@example.com)"}' [http://localhost:3000/users/1](http://localhost:3000/users/1) | jq\`              | 200 OK                                          | Utilisateur remplacé par les nouvelles données           |
| 8  | \`curl -s -X PATCH -H "Content-Type: application/json" -d '{"role":"admin"}' [http://localhost:3000/users/1](http://localhost:3000/users/1)                                                               | jq\`              | 200 OK                                          | Champ `role` modifié                                     |
| 9  | `curl -i -X DELETE http://localhost:3000/users/1`                                                                                                                                                         | 204 No Content    | Aucun corps dans la réponse                     |                                                          |
| 10 | `curl -i http://localhost:3000/status/404`                                                                                                                                                                | 404 Not Found     | JSON ou message d’erreur                        |                                                          |
| 11 | `curl -i http://localhost:3000/boom`                                                                                                                                                                      | 500 Server Error  | JSON `{ "error": "Erreur interne", ... }`       |                                                          |
| 12 | `curl -i -X POST -H "Content-Type: application/json" -d '{"name":"Dup","email":"alice@example.com"}' http://localhost:3000/users`                                                                         | 409 Conflict      | JSON `{ "error": "Email déjà utilisé" }`        |                                                          |


## 🧭 Partie B — Scénario **Postman**

1. **Environnement** : `baseUrl = http://localhost:3000`.

2. **Collection** « Users API (Local) » avec ces requêtes :

   * `GET {{baseUrl}}/users` — tests : 200, JSON, `{count,data}`.
   * `POST {{baseUrl}}/users` — Body JSON ; **Pre-request** `pm.variables.set("rand", Date.now())`; email `chloe{{rand}}@example.com` ; tests : **201**, `Location`, sauvegarde `userId`.
   * `GET {{baseUrl}}/users/{{userId}}` — tests : 200, id égal.
   * `PUT {{baseUrl}}/users/{{userId}}` — Body avec nom/email/role ; tests : 200, nom mis à jour.
   * `PATCH {{baseUrl}}/users/{{userId}}` — Body `{ "role": "admin" }` ; tests : 200, rôle = admin.
   * `DELETE {{baseUrl}}/users/{{userId}}` — tests : **204**.
   * (Optionnel) `GET {{baseUrl}}/users/{{userId}}` — test **404** après suppression.

3. **Runner** : exécuter la collection (POST → GET id → PUT → PATCH → DELETE).

4. **Data-driven** : CSV `name,email,role` et utiliser `{{name}}`, `{{email}}`, `{{role}}` dans le Body du POST.

Exemple : 
```csv
name,email,role
Alice,alice@example.com,student
Bob,bob@example.com,teacher
Chloe,chloe@example.com,admin
```
Requête POST dans Postman :
URL : `POST {{baseUrl}}/api/posts`

Headers :
```pgsql
Content-Type: application/json
```

Body (raw/JSON) :
```json
{
  "name": "{{name}}",
  "email": "{{email}}",
  "role": "{{role}}"
}
```
Ici, {{name}}, {{email}} et {{role}} sont des variables de Postman qui seront remplacées par les valeurs du CSV.

Snippets tests utiles :

```js
pm.test("200 OK", () => pm.response.code === 200);
pm.test("JSON", () => pm.response.headers.get("Content-Type").includes("application/json"));
pm.environment.set("userId", pm.response.json().id);
```

## 📋 À produire

1. **Tableau** “requête → réponse” pour 6 routes (méthode, chemin, **code**, en-têtes clés, corps).
2. **3 captures** onglet *Network* (annotation : ligne de requête, en-têtes, corps).
3. **3 commandes curl** + sorties.
4. **Export Postman** (collection JSON) ou capture du **Runner** qui passe vert.


## ⭐ Extra

* `npm i cors` puis `app.use(require('cors')());` — tester les en-têtes CORS.
* Pagination (`GET /users?page=1&limit=5`) et tri.


