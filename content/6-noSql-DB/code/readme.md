## Exemple structure :
```
{
  "_id": "book001",
  "title": "Cell Biology",
  "authors": [
    { "author_id": "author124", "name": "Ellie Smith" },
    { "author_id": "author381", "name": "John Palmer" }
  ]
}
```

## Exemples d’utilisation :

### ajouter un auteur à un livre
`POST /books/book001/authors`

```
{
  "author_id": "author999",
  "name": "New Author"
}
```

### renommer un auteur dans un livre

`PATCH /books/book001/authors/author999`

```json
{
  "name": "New Name"
}
```

### supprimer un auteur d’un livre
`DELETE /books/book001/authors/author999`

Si vous devez aussi maintenir la relation dans l’autre sens, par exemple un document Author avec un tableau books, alors il faut mettre à jour les deux documents. Dans ce cas, la bonne pratique est d’utiliser une transaction.

## Les opérations à retenir sont :

### Ajouter un auteur

POST /books/:bookId/authors
utilise $push

### Modifier un auteur

PATCH /books/:bookId/authors/:authorId
utilise $set avec l’opérateur positionnel $


### Modifier avec plus de précision

PATCH /books/:bookId/authors/:authorId/filters
utilise arrayFilters


### Supprimer un auteur

DELETE /books/:bookId/authors/:authorId
utilise $pull
Si vous devez conserver aussi un document Author avec un tableau books, alors vous avez deux options :

### mettre à jour les deux documents
utiliser une transaction pour garder la cohérence
Dans ce cas, je recommande la transaction, car MongoDB peut garantir l’atomicité sur plusieurs documents dans la même session.