

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



