+++
date = '2025-11-13T07:26:22-05:00'
draft = false
title = 'Collecte des données'
weight = 103
+++


Pour la collecte de données avec Python, il existe plusieurs approches et bibliothèques qui permettent d'extraire, récupérer ou interagir avec des sources de données variées. Voici quelques-unes des méthodes les plus courantes avec des exemples d'utilisation.

## 1. **Collecte de données via une API**

Les APIs (interfaces de programmation d'applications) sont une source courante de données pour des applications web, des réseaux sociaux, et des services externes. Les bibliothèques comme `requests` ou `http.client` facilitent la communication avec les APIs pour récupérer des données au format JSON, XML, etc.

Pour une liste d’API public, voici quelques uns :

[A Collaborative List Of 1400+ Public APIs For Developers](https://publicapis.dev/)

[https://github.com/public-apis/public-apis](https://github.com/public-apis/public-apis)

[Google APIs Explorer  |  Google APIs Explorer  |  Google for Developers](https://developers.google.com/apis-explorer?hl=fr)

### Exemples d'utilisation :

```python
import requests
import pandas as pd

# Exemple d'appel API à une API publique (API nationalize.io)
url = "https://api.nationalize.io"
params = {
    'name': 'Sara'  # name
}
response = requests.get(url, params=params)

# Vérification du statut de la réponse et affichage des données
if response.status_code == 200:
    data = response.json()
    print(data)
    df = pd.DataFrame(data)
else:
    print("Erreur dans la requête API")

```

## 2. **Web Scraping (ratissage web) avec BeautifulSoup et requests**

Le scraping permet d'extraire des données de pages web lorsque celles-ci ne sont pas directement accessibles via une API. BeautifulSoup, combiné à `requests`, est l'une des bibliothèques les plus utilisées pour cette tâche.

Ne commencer pas à faire du ratissage web avant de s’assurer que vous êtes autoriser de le faire sur la route désirée. Pour consulter la listes des routes à autoriser ou interdire par un site web tappez l’url du site puis tapper`/robots.txt` . Exemple : 

[The Best Websites to Scrape: Practice Your Skills - Proxyway](https://proxyway.com/guides/best-websites-to-practice-your-web-scraping-skills)

### Exemples d'utilisation :

```python
import requests
from bs4 import BeautifulSoup

# Requête pour obtenir la page web
url = "https://example-blog.com"
response = requests.get(url)

# Vérification du statut de la réponse
if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extraction de données (par exemple, tous les titres h1)
    titles = soup.find_all('h1')
    for title in titles:
        print(title.get_text())
else:
    print("Erreur de chargement de la page")

```

## 3. **Lecture de fichiers CSV, Excel, et JSON**

Si vous avez des fichiers locaux ou distants, vous pouvez utiliser des bibliothèques comme `pandas` pour charger et manipuler les données.

### Exemple pour un fichier CSV :

```python
import pandas as pd

# Lecture d'un fichier CSV local
data = pd.read_csv('chemin_vers_fichier.csv')

# Affichage des 5 premières lignes du fichier
print(data.head())
```

### Exemple pour un fichier JSON :

```python
import pandas as pd

# Lecture d'un fichier JSON
data = pd.read_json('chemin_vers_fichier.json')

# Affichage des données
print(data.head())
```

## 4. **Collecte de données depuis une base de données SQL**

Python peut également se connecter à des bases de données pour collecter des données en temps réel. La bibliothèque `sqlite3` est utilisée pour SQLite, mais des connecteurs pour d'autres bases de données comme MySQL ou PostgreSQL (par exemple `mysql.connector`, `psycopg2`) existent également.

### Exemple pour une base de données SQLite :

```python
import sqlite3

# Connexion à la base de données SQLite
conn = sqlite3.connect('example.db')
cursor = conn.cursor()

# Exécution d'une requête SQL
cursor.execute("SELECT * FROM table_name")

# Récupération des données
rows = cursor.fetchall()

for row in rows:
    print(row)

# Fermeture de la connexion
conn.close()
```

### Exemple pour une base de données MongoDB (accès au cluster sur Atlas) :

```python
from pymongo import MongoClient
import pandas as pd

# Replace the uri string with your MongoDB deployment's connection string.
user = "" #PUT USERNAME HERE
pwd = "" #PUT PASSWORD FOR USERNAME HERE
server = "" # PUT SERVER NAME HERE
uri = f"mongodb+srv://{user}:{pwd}@{server}/?retryWrites=true"

client = MongoClient(uri)
coll = client.sample_guides.planets

#trouvez la moyenne des températures moyennes de planètes ayant une température moyenne de moins de 15 degrées

# find code goes here
cursor = coll.find({"surfaceTemperatureC.mean": {"$lt": 15}})
# cursor = coll.find()

# for doc in cursor:
#    print(doc)
df = pd.DataFrame(cursor)

# Close the connection to MongoDB when you're done.
client.close()

display(df)
```

## 5. **Utilisation de capteurs ou IoT (Internet des objets)**

Pour les projets de collecte de données à partir de capteurs physiques ou d'objets connectés, Python peut être utilisé pour communiquer avec ces dispositifs via des bibliothèques spécifiques comme `pySerial` pour des capteurs connectés via des ports série.

### Exemple d'utilisation de `pySerial` pour lire des données depuis un capteur :

```python
import serial

# Connexion au port série
ser = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)

# Lecture d'une ligne de données du capteur
data = ser.readline().decode('utf-8').strip()

print(f"Données reçues : {data}")

# Fermeture de la connexion
ser.close()
```

## 6. **Collecte de données en temps réel (streaming)**

Python permet également de gérer des flux de données en temps réel à partir de sources comme les réseaux sociaux (par exemple avec la bibliothèque `tweepy` pour Twitter) ou des services de streaming de données.

### Exemple d'utilisation avec Tweepy pour collecter des tweets en temps réel :

```python
import tweepy

# Clés API de Twitter
consumer_key = 'votre_consumer_key'
consumer_secret = 'votre_consumer_secret'
access_token = 'votre_access_token'
access_token_secret = 'votre_access_token_secret'

# Authentification
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

# Récupération des derniers tweets contenant un certain mot-clé
for tweet in tweepy.Cursor(api.search, q='Python', lang='fr').items(5):
    print(f"Tweet de {tweet.user.screen_name}: {tweet.text}")
```

### Conclusion

Plusieurs outils sont disponibles pour la collecte de données à partir de diverses sources comme des APIs, des pages web, des fichiers locaux, des bases de données, ou même des dispositifs IoT. Chaque méthode a ses propres avantages selon le type de données que vous souhaitez collecter.