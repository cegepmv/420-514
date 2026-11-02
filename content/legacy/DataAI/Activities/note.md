

## Jupiter Notebook
Permet d'écrire du text : 
- format markdown 
- latex

### exemples latex :
x à la 2 :
```latex
$ x^2 $ 
```
Pour afficher ua milieu :
```latex
$$
 x^2 
$$ 
```
Aussi : fraction, x à la 2, Ai, représentation de matrice ij et la racine à la n de x par exemple (\\ permet de dire afficher sur une nouvelle ligne) :
```latex
$$
\frac {x}{y} \\
x^2 \\
A_i\\
B_{ij} \\
\sqrt{n}{x}
$$ 
```
```py
liste = []
liste = list()
l = [1, 2, 3, 4, 5]
l[0]
l[-1]   # accès au dernier elem
l[2:4]
l = [1, 'strings', [1,2,3]]
for i in l:
    print(i)

for i in range(len(l)):
    print(l[i])

## dict
d = {'a':1, 'b':2}
s='Hello world!'
print('world' in s)  # True
print('wOrld' in s)  # false
print('wOrld' not in s)  # True

print(s[1:8])   # slice string (substring)
print(s[-1::-1]) # reverse string
s.upper()       # to upper case
s.lower()       # to lower case
s.split(s)      # retourne ['Hello', 'world!']
s.replace(' ', '-')  # rtourne 'Hello-world!'
print('{}, welcome!'.format('Alex'))

```




## I. Labo complet Matplotlib (structure de notebook)

Tu peux copier-coller ce contenu dans un `.ipynb` (ou dans un `.py` type “notebook script”), ou simplement le suivre en classe.

---

### Cellule 0 – En-tête / Contexte (Markdown)

```markdown
# Laboratoire : Introduction à Matplotlib

## Objectifs du labo

À la fin de ce labo, on sera capable de :
- Tracer différents types de graphiques avec Matplotlib (courbes, barres, histogrammes, nuages de points).
- Personnaliser les graphiques (titre, labels, légende).
- Utiliser Matplotlib avec des données provenant d'un DataFrame pandas.
- Interpréter visuellement des distributions simples.

## Prérequis

- Python de base (variables, listes).
- Notions de base sur les données tabulaires (colonnes / lignes).
- Avoir installé : `matplotlib` et `pandas`
  - `pip install matplotlib pandas`
```

---

### Cellule 1 – Imports et configuration (Code)

```python
import matplotlib.pyplot as plt
import pandas as pd

# Optionnel : rendre les graphiques plus nets dans certains environnements
# %matplotlib inline  # à activer dans Jupyter si besoin
```

---

### Cellule 2 – Premier graphique simple (Code)

```python
# Données simples
x = [1, 2, 3, 4, 5]
y = [2, 5, 3, 8, 7]

plt.plot(x, y)
plt.xlabel("X")
plt.ylabel("Y")
plt.title("Premier graphique simple")
plt.show()
```

---

### Cellule 3 (Markdown) – Questions rapides

```markdown
### Questions

1. Que se passe-t-il si on enlève `plt.xlabel(...)` et `plt.ylabel(...)` ?
2. À quoi sert `plt.show()` ?
3. Modifier la liste `y` pour que la courbe soit strictement croissante.
```

---

### Cellule 4 – Dataset créé en code (ventes par région) (Code)

```python
# Créons un petit dataset de ventes pour illustrer l'utilisation avec pandas

data = {
    "region": ["Nord", "Sud", "Est", "Ouest", "Centre"],
    "ventes_2023": [120, 150, 90, 110, 130],
    "ventes_2024": [140, 160, 100, 130, 150],
    "nb_clients": [45, 60, 30, 40, 55]
}

df = pd.DataFrame(data)
df
```

---

### Cellule 5 (Markdown) – Visualisation 1 : Diagramme en barres

```markdown
## Partie 1 : Diagrammes en barres

On veut comparer les ventes 2023 par région.
```

### Cellule 6 – Barres simples (Code)

```python
plt.bar(df["region"], df["ventes_2023"])
plt.xlabel("Région")
plt.ylabel("Ventes en 2023")
plt.title("Ventes 2023 par région")
plt.show()
```

---

### Cellule 7 (Markdown) – Questions / variations

```markdown
### À faire

1. Changer le titre pour : `Ventes par région (année 2023)`.
2. Inverser les axes : utiliser la région sur l’axe des **y** et les ventes sur l’axe des **x** (indice : `plt.barh`).
3. Quelle région a le plus de ventes en 2023 ? Laquelle a le moins ?
```

---

### Cellule 8 (Markdown) – Visualisation 2 : Comparer deux années

```markdown
## Partie 2 : Comparer deux années côte à côte

On veut comparer **ventes_2023** et **ventes_2024** pour chaque région.
```

### Cellule 9 – Barres groupées (Code)

```python
import numpy as np

regions = df["region"]
indices = np.arange(len(regions))
largeur = 0.35

plt.bar(indices - largeur/2, df["ventes_2023"], width=largeur, label="2023")
plt.bar(indices + largeur/2, df["ventes_2024"], width=largeur, label="2024")

plt.xticks(indices, regions)
plt.xlabel("Région")
plt.ylabel("Ventes")
plt.title("Comparaison des ventes 2023 vs 2024")
plt.legend()
plt.show()
```

---

### Cellule 10 (Markdown) – Questions

```markdown
### Questions

1. Dans quelles régions observe-t-on une augmentation des ventes entre 2023 et 2024 ?
2. Dans quelles régions l’augmentation semble la plus importante visuellement ?
3. Comment pourrait-on vérifier numériquement l’augmentation (sans graphique) ?
```

---

### Cellule 11 (Markdown) – Visualisation 3 : Nuage de points

```markdown
## Partie 3 : Nuage de points (scatter plot)

On veut étudier la relation entre :
- le nombre de clients,
- et les ventes 2024.
```

### Cellule 12 – Scatter (Code)

```python
plt.scatter(df["nb_clients"], df["ventes_2024"])
plt.xlabel("Nombre de clients")
plt.ylabel("Ventes 2024")
plt.title("Relation entre nombre de clients et ventes 2024")
plt.show()
```

---

### Cellule 13 (Markdown) – Interprétation

```markdown
### Questions

1. Est-ce qu’on voit une tendance générale (plus de clients ⇒ plus de ventes) ?
2. Y a-t-il des régions qui semblent "anormales" (beaucoup de clients mais peu de ventes, ou l’inverse) ?
3. Pourquoi ce type de graphique est plus adapté qu’un diagramme en barres pour ce cas ?
```

---

### Cellule 14 (Markdown) – Visualisation 4 : Histogramme

```markdown
## Partie 4 : Histogramme

On veut visualiser la répartition des ventes 2024.
```

### Cellule 15 – Histogramme (Code)

```python
plt.hist(df["ventes_2024"], bins=5)
plt.xlabel("Ventes 2024")
plt.ylabel("Fréquence")
plt.title("Distribution des ventes 2024")
plt.show()
```

---

### Cellule 16 (Markdown) – Questions

```markdown
### Questions

1. Combien de barres (bins) a-t-on dans l’histogramme ? Essayer avec `bins=3` et `bins=10`.
2. Est-ce que les valeurs de ventes sont plutôt regroupées (cluster) ou dispersées ?
3. Que se passerait-il si le dataset était beaucoup plus grand ?
```

---

### Cellule 17 (Markdown) – Mini-exercice final (autonome)

```markdown
## Mini-exercice final

On ajoute une nouvelle colonne `taux_croissance` qui représente la croissance des ventes entre 2023 et 2024, en pourcentage.

1. Calculer la colonne `taux_croissance` comme suit :

   \[
   taux\_croissance = \frac{ventes\_2024 - ventes\_2023}{ventes\_2023} \times 100
   \]

2. Afficher le DataFrame pour vérifier le calcul.
3. Tracer un diagramme en barres du `taux_croissance` par région.
4. Ajouter :
   - un titre clair,
   - un label pour l’axe des x,
   - un label pour l’axe des y,
   - faire pivoter les labels de l’axe des x de 45° si besoin.
5. Question : dans quelle région la croissance est-elle la plus forte ? La plus faible ?
```

### Cellule 18 – Corrigé possible (Code, optionnel pour toi)

```python
df["taux_croissance"] = (df["ventes_2024"] - df["ventes_2023"]) / df["ventes_2023"] * 100
df

plt.bar(df["region"], df["taux_croissance"])
plt.xlabel("Région")
plt.ylabel("Taux de croissance (%)")
plt.title("Taux de croissance des ventes (2023 → 2024)")
plt.xticks(rotation=45)
plt.show()
```

---

## II. Fiche synthèse Matplotlib (Markdown à distribuer)

Voici une fiche concise que tu peux donner telle quelle aux étudiant·es ou intégrer à ton plan de cours.

````markdown
# Fiche synthèse – Matplotlib (Python)

## 1. Rôle de Matplotlib

- Matplotlib est une bibliothèque Python pour créer des graphiques 2D.
- On l’utilise souvent avec le sous-module `pyplot`.

```python
import matplotlib.pyplot as plt
````

---

## 2. Structure de base d’un graphique

En général, on suit ce schéma :

```python
plt.plot(x, y)        # ou plt.bar, plt.scatter, plt.hist, etc.
plt.xlabel("Label X")
plt.ylabel("Label Y")
plt.title("Titre du graphique")
plt.show()
```

* `plt.plot(...)` : crée le graphique.
* `plt.xlabel(...)`, `plt.ylabel(...)` : nom des axes.
* `plt.title(...)` : titre.
* `plt.show()` : affiche le graphique (important dans un script).

---

## 3. Types de graphiques courants

### 3.1. Courbe (line plot)

```python
plt.plot(x, y)
plt.show()
```

Utilisation :

* Évolution d’une valeur dans le temps.
* Séries ordonnées.

### 3.2. Nuage de points (scatter plot)

```python
plt.scatter(x, y)
plt.show()
```

Utilisation :

* Étudier la relation entre deux variables numériques (corrélation).

### 3.3. Diagramme en barres

```python
plt.bar(categories, valeurs)
plt.show()
```

Variante horizontale :

```python
plt.barh(categories, valeurs)
plt.show()
```

Utilisation :

* Comparer des catégories (régions, produits, groupes, etc.).

### 3.4. Histogramme

```python
plt.hist(donnees, bins=10)
plt.show()
```

Utilisation :

* Visualiser la **distribution** d’une variable numérique (répartition).

---

## 4. Matplotlib + pandas

On travaille souvent avec des DataFrames :

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("donnees.csv")

plt.plot(df["annee"], df["ventes"])
plt.xlabel("Année")
plt.ylabel("Ventes")
plt.title("Évolution des ventes")
plt.show()
```

L’idée :

* On récupère les colonnes du DataFrame (`df["colonne"]`) et on les passe aux fonctions `plt.plot`, `plt.bar`, etc.

---

## 5. Personnalisation de base

### 5.1. Titres et labels

```python
plt.title("Mon titre")
plt.xlabel("Axe X")
plt.ylabel("Axe Y")
```

### 5.2. Légende

Quand il y a plusieurs séries :

```python
plt.plot(x, y1, label="Série 1")
plt.plot(x, y2, label="Série 2")
plt.legend()
```

### 5.3. Graduation de l’axe X

```python
plt.xticks(rotation=45)  # faire pivoter les labels de l’axe X
```

---

## 6. Sauvegarder un graphique

```python
plt.plot(x, y)
plt.title("Graphique à sauvegarder")
plt.savefig("graphique.png")  # sauvegarde dans un fichier
plt.show()
```

Formats possibles : `.png`, `.jpg`, `.pdf`, etc.

---

## 7. Bonnes pratiques

* Toujours donner :

  * un **titre** clair,
  * des **labels** pour les axes,
  * une **légende** si plusieurs séries.
* Vérifier que :

  * les échelles sont compréhensibles,
  * le graphique n’est pas surchargé.
* Choisir le type de graphique adapté :

  * **courbe** : évolution dans le temps,
  * **barres** : comparaison de catégories,
  * **nuage de points** : relation entre deux variables,
  * **histogramme** : distribution d’une variable.

---

## 8. Erreurs fréquentes

* Oublier `plt.show()` dans un script : rien ne s’affiche.
* Mélanger les longueurs : `x` et `y` doivent avoir la **même taille**.
* Ne pas mettre de labels ni de titre : le graphique devient difficile à interpréter.
* Utiliser un mauvais type de graphique (ex. barre pour une série temporelle fine).

---

## 9. Récapitulatif minimal à retenir

1. `import matplotlib.pyplot as plt`
2. Choisir le type :

   * `plt.plot`, `plt.bar`, `plt.scatter`, `plt.hist`, etc.
3. Ajouter :

   * `plt.title`, `plt.xlabel`, `plt.ylabel`, `plt.legend` au besoin.
4. Terminer par :

   * `plt.show()`

```


