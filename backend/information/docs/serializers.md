# Information serializers

## Project Serializer

The `ProjectSerializer` class is responsible for serializing and deserializing `Project` objects.

### Fields

- `id`: The unique identifier of the project.
- `name`: The name of the project.
- `description`: The description of the project.
- `image`: The image associated with the project.
- `status`: The status of the project.
- `goal_tons`: The goal of the project in tons.
- `total_tons`: The total amount of tons collected.
- `organizations`: A list of organizations associated with the project.
- `location`: The location of the project.

### Example

#### Create

```json
{
  "name": "Proyecto de reciclaje",
  "description": "Proyecto de reciclaje de botellas plásticas",
  "image": "path/to/image.jpg",
  "status": "En progreso",
  "goal_tons": 100,
  "total_tons": 0,
  "organizations": ["Pintuco", "Ecopetrol"],
  "location": "Medellín, Antioquia"
}
```

#### Retrieve

```json
{
  "id": 1,
  "name": "Proyecto de reciclaje",
  "description": "Proyecto de reciclaje de botellas plásticas",
  "image": "path/to/image.jpg",
  "status": "En progreso",
  "goal_tons": 100,
  "total_tons": 0,
  "organizations": ["Pintuco", "Ecopetrol"],
  "location": "Medellín, Antioquia"
}
```

#### Update

```json
{
  "name": "Proyecto de reciclaje",
  "description": "Proyecto de reciclaje de botellas plásticas",
  "image": "path/to/image.jpg",
  "status": "En progreso",
  "goal_tons": 100,
  "total_tons": 50,
  "organizations": ["Pintuco", "Ecopetrol"],
  "location": "Medellín, Antioquia"
}
```

## Fact Serializer

The `FactSerializer` class is responsible for serializing and deserializing `Fact` objects.

### Fields

- `id`: The unique identifier of the fact.
- `message`: The message of the fact.

### Example

#### Create

```json
{
  "message": "Reciclamos 100 toneladas de plástico al mes."
}
```

#### Retrieve

```json
{
  "id": 1,
  "message": "Reciclamos 100 toneladas de plástico al mes."
}
```

#### Update

```json
{
  "message": "Reciclamos 200 toneladas de plástico al mes."
}
```

#### Random

```json
{
  "id": 1,
  "message": "Reciclamos 100 toneladas de plástico al mes."
}
```
