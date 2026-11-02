+++
date = '2025-11-13T07:49:17-05:00'
draft = false
title = 'BeautifulSoup'
weight = 108
+++


**BeautifulSoup** est une bibliothèque Python très populaire utilisée pour le **web scraping**. Elle permet de parser des documents HTML ou XML afin d'extraire facilement les informations dont vous avez besoin à partir de pages web. Elle fonctionne en combinaison avec des outils comme **`requests`** pour récupérer le contenu HTML et ensuite traiter ce contenu.

## Installation de BeautifulSoup

Pour utiliser BeautifulSoup, vous devez installer deux bibliothèques : **`beautifulsoup4`** pour le parsing, et  **`requests`** pour pour envoyer des requêtes vers les routes à ratisser. Voici comment les installer :

```bash
pip install beautifulsoup4 requests
```

Il faut notter que si vous utilisez Google Collaboratory, vous n’avez qu’à les importer directement, car elles viennent déjà installées.

## Utilisation de BeautifulSoup

Voici un exemple d'utilisation basique de BeautifulSoup pour analyser une page web :

### 1. Scraping d'une page statique avec BeautifulSoup

Supposons que vous souhaitez extraire des titres d'articles depuis une page de blog. 

```python
import requests
from bs4 import BeautifulSoup

# URL de la page web à scraper
url = 'https://example.com'

# Envoyer une requête pour récupérer le contenu de la page
response = requests.get(url)

# Vérifier si la requête est réussie
if response.status_code == 200:
    # Parse le contenu HTML de la page
    soup = BeautifulSoup(response.content, 'html.parser')  # Vous pouvez aussi utiliser 'lxml'

    # Extraire toutes les balises <h2> (par exemple, les titres d'articles)
    titles = soup.find_all('h2')

    # Boucler sur tous les titres et les afficher
    for title in titles:
        print(title.get_text())
    # Afficher le contenu formaté
		print(soup.prettify())
else:
    print(f"Erreur: {response.status_code}")
```

### 2. Explication des fonctions principales de BeautifulSoup

- **`soup = BeautifulSoup(html_content, '**html.parser**')**` : Crée un objet BeautifulSoup à partir du contenu HTML récupéré. Le second argument spécifie l'analyseur (parser) à utiliser, ici `html.parser`.
- **`soup.find_all('h2')`** : Récupère toutes les balises `<h2>` de la page. Vous pouvez rechercher n'importe quelle autre balise HTML (`div`, `span`, `a`, etc.).
- **`title.get_text()`** : Renvoie le texte à l'intérieur de la balise, en supprimant les balises HTML.
- **`soup.prettify()`** permet d'afficher le contenu HTML de manière lisible, en indentant chaque balise et son contenu.

### 3. Recherche d'éléments HTML par classe, identifiant ou attribut

BeautifulSoup permet de rechercher des éléments HTML en fonction de divers critères comme les identifiants, les classes CSS, ou d'autres attributs.

#### a) Trouver un élément par **ID** :

```python
# Trouver une balise avec un identifiant spécifique (ex: <div id="main">)
main_content = soup.find(id="main")
print(main_content.get_text())
```

#### b) Trouver un élément par balise HTML :

```python
# Trouver la première balise <h1> de la page
h1_tag = soup.find('h1')
print(h1_tag.text)  # Afficher le texte à l'intérieur de la balise

# Trouver toutes les balises <p> (paragraphe) de la page
p_tags = soup.find_all('p')
for p in p_tags:
    print(p.text)  # Afficher le texte des balises <p>
```

#### c) Trouver un élément par **classe CSS** :

```python
# Trouver toutes les balises <div> avec la classe "article"
articles = soup.find_all('div', class_='article')

# Afficher le contenu de chaque article
for article in articles:
    print(article.get_text())
```

#### d) Trouver un élément par **attribut** spécifique :

```python
# Trouver toutes les balises <a> qui ont un attribut 'href' contenant une URL spécifique
links = soup.find_all('a', href=True)

for link in links:
    print(link['href'])  # Afficher l'attribut href de chaque lien
```

### 4. Naviguer dans la structure HTML avec BeautifulSoup

BeautifulSoup permet également de naviguer dans la structure des documents HTML en accédant aux parents, enfants et frères d'éléments HTML.

### a) Accéder aux enfants d'un élément :

```python
# Accéder aux enfants d'une balise <div>
div = soup.find('div', id='main')
for child in div.children:
    print(child)
```

#### b) Accéder aux parents d'un élément :

```python
# Trouver l'élément parent d'un <p>
paragraph = soup.find('p')
parent = paragraph.parent
print(parent)
```

#### c) Accéder aux frères et sœurs d'un élément :

```python
# Accéder aux frères et sœurs d'un élément
first_paragraph = soup.find('p')
for sibling in first_paragraph.next_siblings:
    print(sibling)
```

### 5. Extraire des tableaux HTML avec BeautifulSoup

Si la page contient des tableaux HTML, BeautifulSoup peut facilement extraire les données.

```python
# Rechercher le tableau
table = soup.find('table')

# Récupérer toutes les lignes du tableau
rows = table.find_all('tr')

# Extraire les données de chaque cellule du tableau
for row in rows:
    cells = row.find_all('td')
    cell_data = [cell.get_text() for cell in cells]
    print(cell_data)
    
# Extraire le texte d'une balise <p>
p_tag = soup.find('p')
print(p_tag.text)  # Affiche le texte à l'intérieur de la balise
```

### 6. Gestion des erreurs et limitations

Lors du scraping de pages web, vous pouvez rencontrer des problèmes tels que des pages protégées par des CAPTCHA ou des limitations sur le nombre de requêtes par minute. Voici quelques conseils :

- **Requêtes avec un en-tête utilisateur** : Certains sites web bloquent les requêtes sans en-tête utilisateur (User-Agent). Vous pouvez imiter un navigateur en ajoutant un en-tête à votre requête.

```python
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
response = requests.get(url, headers=headers)
```

- **Limiter le nombre de requêtes** : Utilisez des délais pour éviter de surcharger le serveur.

```python
import time
time.sleep(2)  # Pause de 2 secondes entre chaque requête

```

### 7. Scraping de pages paginées

Pour extraire des données à partir de plusieurs pages (par exemple, des articles paginés ou des produits sur un site de e-commerce), vous pouvez automatiser la navigation à travers les pages.

```python
base_url = 'https://example.com/page='

for page_num in range(1, 6):  # Boucle sur les 5 premières pages
    url = base_url + str(page_num)
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'lxml')

    # Extraire les informations d'intérêt sur chaque page
    articles = soup.find_all('h2', class_='article-title')
    for article in articles:
        print(article.get_text())
```

## Exemples pratiques

### 1. Scraper une liste de titres d'articles sur un blog

Supposons que vous souhaitiez extraire tous les titres d'articles d'une page web.

```python
import requests
from bs4 import BeautifulSoup

# URL de la page à scraper
url = 'https://example-blog.com'

# Envoyer la requête
response = requests.get(url)

# Créer l'objet BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Trouver tous les titres d'articles dans des balises <h2>
titles = soup.find_all('h2', class_='article-title')

# Afficher les titres
for title in titles:
    print(title.text)
```

### 2. Scraper un tableau HTML

Voici un exemple où vous scrapez un tableau HTML et le convertissez en DataFrame Pandas.

```python
import requests
from bs4 import BeautifulSoup
import pandas as pd

# URL de la page avec un tableau HTML
url = 'https://example.com/table-page'

response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Trouver le tableau HTML
table = soup.find('table')

# Extraire les en-têtes
headers = [th.text.strip() for th in table.find_all('th')]

# Extraire les lignes de données
rows = []
for row in table.find_all('tr')[1:]:
    rows.append([td.text.strip() for td in row.find_all('td')])

# Convertir en DataFrame Pandas
df = pd.DataFrame(rows, columns=headers)

# Afficher le tableau
print(df)
```

## Conclusion

**BeautifulSoup** est une bibliothèque puissante pour l'extraction de données à partir de pages web statiques. Combinée avec `requests` pour récupérer le contenu des pages web, elle permet d'accéder à presque toutes les informations visibles dans le HTML. Cependant, pour des pages dynamiques générées en JavaScript, des outils comme **Selenium** peuvent être nécessaires.