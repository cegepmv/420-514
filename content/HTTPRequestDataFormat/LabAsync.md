+++
draft = true
title = '🧪 Laboratoire : Requêtes asynchrones en Node.js'
+++


## 🎯 Objectifs

* Comprendre le **non-blocant** en Node.js (event loop).
* Écrire une **API Express** simple et la **consommer** depuis un script Node.
* Pratiquer **fetch**, **async/await**, gestion d’erreurs et **codes HTTP**.


## 1. Mise en place

```bash
mkdir node-async-lab && cd node-async-lab
npm init -y
npm i express
```

Créez **server.js** (API) et **client.js** (consommateur).


## 2. Serveur Express (API)

```js
// server.js
const express = require('express');
const app = express();
app.use(express.json());

const posts = [
  { id: 1, title: 'Hello', body: 'Bienvenue 👋' },
  { id: 2, title: 'Async', body: 'Les requêtes ne bloquent pas.' },
];

// Latence simulée
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// GET /api/ping
app.get('/api/ping', async (req, res) => {
  await delay(200);
  res.json({ ok: true, t: Date.now() });
});

// GET /api/posts
app.get('/api/posts', async (req, res) => {
  await delay(300);
  res.json(posts);
});

// GET /api/posts/:id
app.get('/api/posts/:id', async (req, res) => {
  await delay(250);
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post introuvable' });
  res.json(post);
});

// POST /api/posts
app.post('/api/posts', async (req, res) => {
  await delay(200);
  const { title, body } = req.body || {};
  if (!title || !body) return res.status(400).json({ error: 'title et body requis' });
  const id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
  const post = { id, title, body };
  posts.push(post);
  res.status(201).location(`/api/posts/${id}`).json(post);
});

// Erreur volontaire
app.get('/api/boom', (req, res) => { throw new Error('Oups 💥'); });

// Handler d’erreurs (centralisé)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne', detail: err.message });
});

app.listen(3000, () => console.log('API prête sur http://localhost:3000'));
```

Lancez le serveur :

```bash
node server.js
```


## 3. Client Node (requêtes asynchrones)

> Node 18+ inclut `fetch`. Si vous êtes en <18, installez `npm i node-fetch` et `import fetch from 'node-fetch'`.

```js
// client.js
const BASE = 'http://localhost:3000';

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status} sur ${path}`);
  return res.json();
}

async function postJson(path, data) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} sur ${path}`);
  return res.json();
}

(async () => {
  console.log('→ Appel ping …');
  const ping = await getJson('/api/ping');
  console.log('Ping:', ping);

  console.log('→ Liste des posts …');
  const list = await getJson('/api/posts');
  console.log('Posts:', list);

  console.log('→ Création d’un post …');
  const created = await postJson('/api/posts', { title: 'Nouveau', body: 'Créé via client' });
  console.log('Créé:', created);

  console.log('→ Lecture par id …');
  const one = await getJson(`/api/posts/${created.id}`);
  console.log('Post:', one);

  console.log('→ Test erreur 404 …');
  try {
    await getJson('/api/posts/9999');
  } catch (e) {
    console.error('Attendu (404):', e.message);
  }

  console.log('→ Test erreur serveur …');
  try {
    await getJson('/api/boom');
  } catch (e) {
    console.error('Attendu (500):', e.message);
  }

  console.log('Terminé ✅');
})();
```

Exécutez :

```bash
node client.js
```


## 4. Exercices à réaliser

### A. Comprendre l’asynchrone

1. Ajoutez un `console.log('Après les appels…')` **sous** l’auto-exécution et montrez qu’il **n’attend pas** les réponses (spoiler : il attend, car on est dans une IIFE `async` — mettez plutôt un log **avant** l’IIFE pour montrer l’exécution non bloquante du programme principal).
2. Simulez **plus de latence** (`delay(1000)`) et observez l’ordre d’affichage.

### B. Codes & erreurs

1. Modifiez `postJson` pour renvoyer un objet détaillé en cas d’erreur :

   * `{ status, path, body: await res.text() }`.
2. Tentez un `POST /api/posts` **sans body** → attendez **400** et affichez le détail.

### C. En-têtes & corps

1. Dans `/api/ping`, ajoutez un en-tête : `res.set('X-Lab', 'Async');`
2. Côté client, logguez `res.headers.get('X-Lab')` (adaptez `getJson` pour retourner aussi les headers si souhaité).

### D. Parallélisme

1. Faites 3 appels **en parallèle** : `/api/posts`, `/api/ping`, `/api/posts/1` :

   ```js
   const [a, b, c] = await Promise.all([
     getJson('/api/posts'),
     getJson('/api/ping'),
     getJson('/api/posts/1'),
   ]);
   ```
2. Comparez la durée avec la version **séquentielle** (utilisez `console.time/console.timeEnd`).

### E. Robustesse

1. Ajoutez un **timeout** côté client (AbortController) de 500 ms sur `/api/posts` (latence 1000 ms côté serveur) → gérez l’exception proprement.
2. Ajoutez un **retry** (jusqu’à 3 tentatives) en cas de 500 ms dépassé.


## Exercice supplémentaire

* Ajouter un `PUT /api/posts/:id` et `DELETE /api/posts/:id` et faire appels côté client.
* Servir `Cache-Control: max-age=10` sur `/api/posts` et observer le cache avec le navigateur.
* Écrire de **petits tests** (Jest) pour `getJson/postJson` en simulant des réponses (MSW ou nock).

