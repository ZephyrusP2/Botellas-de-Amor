# Disposal serializers

## Site Serializer

The `SiteSerializer` class is responsible for serializing and deserializing `Site` objects.

### Fields

- `id`: The unique identifier of the site.
- `image`: The image associated with the site.
- `name`: The name of the site.
- `address`: The address of the site.
- `schedule`: A list of [schedules]() associated with the site.

### Example

#### Create

```json
{
  "image": "path/to/image.jpg",
  "name": "Universidad EAFIT",
  "address": "Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
  "schedules": [
    { "day": "Lunes", "opens": "10:00:00", "closes": "17:00:00" },
    { "day": "Martes", "opens": "10:00:00", "closes": "17:00:00" },
    { "day": "Miércoles", "opens": "10:00:00", "closes": "17:00:00" },
    { "day": "Jueves", "opens": "10:00:00", "closes": "17:00:00" },
    { "day": "Viernes", "opens": "10:00:00", "closes": "17:00:00" },
    { "day": "Sábado", "opens": "10:00:00", "closes": "17:00:00" },
    { "day": "Domingo", "opens": "10:00:00", "closes": "13:00:00" }
  ]
}
```

#### Retrieve

```json
{
  "id": 1,
  "image": "path/to/image.jpg",
  "name": "Universidad EAFIT",
  "address": "Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
  "schedules": [
    { "id": 1, "day": "Lunes", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 2, "day": "Martes", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 3, "day": "Miércoles", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 4, "day": "Jueves", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 5, "day": "Viernes", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 6, "day": "Sábado", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 7, "day": "Domingo", "opens": "10:00:00", "closes": "13:00:00" }
  ]
}
```

#### Update

```json
{
  "image": "path/to/image.jpg",
  "name": "Universidad EAFIT",
  "address": "Carrera 49, Cl. 7 Sur #50, Medellín, Antioquia",
  "schedules": [
    { "id": 1, "day": "Lunes", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 2, "day": "Martes", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 3, "day": "Miércoles", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 4, "day": "Jueves", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 5, "day": "Viernes", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 6, "day": "Sábado", "opens": "10:00:00", "closes": "17:00:00" },
    { "id": 7, "day": "Domingo", "opens": "10:00:00", "closes": "13:00:00" }
  ]
}
```
