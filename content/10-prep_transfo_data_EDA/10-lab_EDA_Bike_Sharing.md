+++
draft = false
title = '🧪 Laboratoire : analyse exploratoire (EDA) '
weight = 1011
+++



**Fichier à remplir** : [03_EDA_Bike_Sharing.ipynb](/420-514/files/03_EDA_Bike_Sharing.ipynb)

## Contexte

Le système **Capital Bikeshare** (Washington, D.C.) met des vélos en libre-service. Le jeu de données **Bike Sharing Dataset** contient les locations **horaires** de 2011 et 2012, avec des informations sur la date, la saison et la météo.

Vous jouez le rôle d'un analyste de données. Le gestionnaire du service vous demande :

> **Quels facteurs semblent associés à une forte utilisation du service de vélos ?**

Il s'agit d'une exploration : on décrit, on compare et on formule des hypothèses. On ne cherche pas à prédire ni à prouver une cause.

## Objectifs

À la fin du laboratoire, vous serez capable de :

- charger et explorer un fichier CSV ;
- comprendre la structure d'un jeu de données ;
- préparer des variables (dates, libellés, variables dérivées) ;
- calculer des statistiques descriptives ;
- regrouper des données avec `groupby()` ;
- appliquer des filtres booléens ;
- détecter des valeurs atypiques avec l'IQR ;
- étudier des corrélations ;
- produire des graphiques pertinents avec Matplotlib ;
- créer une visualisation interactive avec `interact` ;
- **interpréter** vos résultats et formuler une conclusion.

## Jeu de données

| Élément | Valeur |
|---|---|
| Fichier à utiliser | `hour.csv` (dossier `data/raw/bike_sharing/`) |
| Source | UCI Machine Learning Repository, Fanaee-T, H. (2013), DOI : 10.24432/C5W894 |
| Granularité | Une ligne = une heure |

Ne modifiez jamais le fichier d'origine : travaillez sur le `DataFrame` chargé en mémoire.

| Variable | Description |
|---|---|
| `dteday` | Date |
| `season` | Saison (code) |
| `yr` | Année (0 = 2011, 1 = 2012) |
| `mnth` | Mois |
| `hr` | Heure (0 à 23) |
| `holiday` | Jour férié ou non |
| `weekday` | Jour de la semaine |
| `workingday` | Jour ouvrable ou non |
| `weathersit` | Conditions météorologiques (code) |
| `temp` | Température normalisée |
| `atemp` | Température ressentie normalisée |
| `hum` | Humidité normalisée |
| `windspeed` | Vitesse du vent normalisée |
| `casual` | Nombre d'utilisateurs occasionnels |
| `registered` | Nombre d'utilisateurs enregistrés |
| `cnt` | Nombre total de locations (`cnt = casual + registered`) |

## Préparation de l'environnement

Le carnet utilise `numpy`, `pandas`, `matplotlib` et `ipywidgets`. Si `ipywidgets` n'est pas installé :

```bash
pip install ipywidgets
```

## Comment travailler

1. Ouvrez `03_EDA_Bike_Sharing.ipynb` et exécutez les cellules **dans l'ordre**.
2. Complétez chaque cellule de code marquée `# À compléter` (ou portant un commentaire de consigne).
3. Rédigez vos réponses dans les cellules Markdown prévues (**Réponse**, **Interprétation**, **Conclusion**).
4. Appuyez chaque réponse sur un résultat de votre code : un chiffre, un tableau ou un graphique.
5. Avant de remettre, redémarrez le noyau et exécutez tout le carnet pour vérifier qu'il fonctionne de bout en bout.

> Un résultat sans interprétation n'a pas de valeur. Un graphique doit toujours être accompagné d'une phrase qui dit ce qu'on y observe.

## Travail demandé

### 1. Importation des bibliothèques

Déjà fournie. Exécutez la cellule.

### 2. Chargement des données

Chargez `hour.csv` dans un `DataFrame` nommé `df`, puis affichez les cinq premières lignes.

### 3. Première exploration

Déterminez le nombre de lignes et de colonnes, les noms des colonnes, les types de données, les valeurs manquantes, les doublons et les principales statistiques descriptives (`head()`, `shape`, `columns`, `dtypes`, `info()`, `describe()`, `isna()`, `duplicated()`).

Répondez ensuite aux questions :

1. Combien y a-t-il d'observations ?
2. Combien y a-t-il de variables ?
3. Quelles variables sont numériques ?
4. Certaines variables numériques représentent-elles en réalité des catégories ?
5. Y a-t-il des valeurs manquantes ?
6. Y a-t-il des doublons ?

### 4. Préparation des données

1. **Date** : convertissez `dteday` avec `pd.to_datetime()`.
2. **Libellés** : créez les colonnes `saison` (1 = hiver, 2 = printemps, 3 = été, 4 = automne) et `meteo` (1 = dégagé / quelques nuages, 2 = brume / nuageux, 3 = pluie légère / neige légère, 4 = conditions sévères).
3. **Période de la journée** : créez `periode` à partir de `hr`.

   | Heure | Période |
   |---|---|
   | 0 à 5 | Nuit |
   | 6 à 11 | Matin |
   | 12 à 17 | Après-midi |
   | 18 à 23 | Soir |

4. **Vérification** : affichez quelques lignes pour confirmer que les nouvelles variables sont correctes.

### 5. Statistiques descriptives sur `cnt`

Calculez au minimum la moyenne, la médiane, le minimum, le maximum, l'écart-type, la variance, Q1 et Q3. Interprétez :

1. La moyenne et la médiane sont-elles proches ?
2. Le maximum est-il très éloigné des valeurs centrales ?
3. Que peut-on dire de la dispersion des locations ?

### 6. Analyse par groupes

Avec `groupby()`, calculez le nombre moyen de locations (`cnt`) selon :

1. la **saison** : quelle saison présente la plus forte moyenne ?
2. l'**heure** : à quelle heure la demande est-elle la plus élevée ? Observe-t-on une ou plusieurs périodes de pointe ?
3. la **météo** : les conditions semblent-elles associées à l'utilisation du service ?

### 7. Filtrage

1. **Les 10 % d'heures les plus achalandées** : calculez le 90e percentile de `cnt` et affichez les observations au-dessus de ce seuil. Quelles heures reviennent souvent ?
2. **Forte demande malgré une météo moins favorable** : affichez les observations où la météo est de catégorie `3` **et** où `cnt` dépasse la moyenne générale. Que montre ce résultat ? La météo explique-t-elle à elle seule la demande ?

### 8. Valeurs atypiques avec l'IQR

Calculez Q1, Q3, l'IQR et les bornes :

$$IQR = Q_3 - Q_1$$

$$Borne_{inf} = Q_1 - 1{,}5 \times IQR \qquad Borne_{sup} = Q_3 + 1{,}5 \times IQR$$

Sélectionnez les valeurs atypiques de `cnt`, puis répondez :

1. Combien d'observations atypiques sont détectées ?
2. Une valeur très élevée représente-t-elle nécessairement une erreur ?
3. Que faudrait-il vérifier avant de supprimer une observation atypique ?

### 9. Corrélations

Calculez la matrice de corrélation entre `temp`, `atemp`, `hum`, `windspeed` et `cnt`, puis répondez :

1. Quelle variable météorologique semble la plus associée à `cnt` ?
2. La relation est-elle positive ou négative ?
3. Pourquoi ne peut-on pas conclure à une relation de causalité uniquement à partir d'une corrélation ?

### 10. Visualisations

Pour **chaque** graphique : choisissez une taille appropriée, ajoutez un titre, nommez les axes, ajoutez une légende si nécessaire et rédigez une courte interprétation.

| # | Graphique | Contenu |
|---|---|---|
| 10.1 | Courbe | `hr` → moyenne de `cnt` |
| 10.2 | Diagramme à barres | Nombre moyen de locations par saison |
| 10.3 | Histogramme | Distribution de `cnt` |
| 10.4 | Nuage de points | `temp` ↔ `cnt` |

### 11. Visualisation interactive

Créez une visualisation avec `interact` qui permet de choisir une saison et d'afficher automatiquement le **profil horaire** correspondant (heure → nombre moyen de locations).

```python
def afficher_saison(saison):
    ...

interact(
    afficher_saison,
    saison=...
)
```

Question : pourquoi l'interactivité est-elle utile ici ?

### 12. Mini-synthèse

En vous appuyant sur vos calculs et vos graphiques :

1. À quel moment de la journée la demande semble-t-elle la plus forte ?
2. Quelle saison présente la plus forte utilisation moyenne ?
3. Quel rôle les conditions météorologiques semblent-elles jouer ?
4. Quelle recommandation simple pourrait être faite au gestionnaire du service ?

### 13. Conclusion

Rédigez une conclusion de **5 à 8 lignes** qui présente :

- deux constats importants ;
- une limite de l'analyse ;
- une analyse supplémentaire qu'il serait intéressant de réaliser.
