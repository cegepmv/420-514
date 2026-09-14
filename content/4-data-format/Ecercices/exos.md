
## Étude de cas : améliorer une API

### Proposition initiale

```http
POST /api/createMeasurement
Content-Type: text/plain

sen-104,18.75,kWh,26/08/2026 10:30
```

Réponse :

```http
HTTP/1.1 200 OK

success
```

### Problèmes à identifier

- un verbe apparaît dans le chemin;
- le nom de la ressource est au singulier;
- les données sont difficiles à interpréter;
- la date est ambiguë et sans fuseau horaire;
- la valeur et l'unité ne sont pas clairement nommées;
- `200 OK` ne précise pas qu'une ressource a été créée;
- la réponse ne contient ni identifiant ni représentation de la ressource;
- le contrat d'erreur n'est pas défini.

### Proposition améliorée

```http
POST /api/v1/measurements
Content-Type: application/json
Accept: application/json

{
  "sensorId": "sen-104",
  "value": 18.75,
  "unit": "kWh",
  "recordedAt": "2026-08-26T14:30:00Z"
}
```

Réponse :

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/v1/measurements/mea-901

{
  "id": "mea-901",
  "sensorId": "sen-104",
  "value": 18.75,
  "unit": "kWh",
  "recordedAt": "2026-08-26T14:30:00Z"
}
```

---

## Activité en classe

Pour chacune des routes suivantes, on doit :

1. repérer les problèmes;
2. proposer une route améliorée;
3. choisir le code de statut de succès;
4. proposer un exemple JSON lorsqu'un corps est nécessaire.

```http
GET /api/getAllSensors
POST /api/deleteSensor?id=12
GET /api/buildingByCity/Montreal
POST /api/addEnergyMeasurement
```

#### Correction possible

```http
GET    /api/v1/sensors
DELETE /api/v1/sensors/12
GET    /api/v1/buildings?city=Montréal
POST   /api/v1/energy-measurements
```


