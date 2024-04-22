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

```json
{
  "id": 1,
  "image": "site_images/example.jpg",
  "name": "Example Site",
  "address": "123 Main St, City",
  "schedule": [
    {
      "id": 1,
      "site": 1,
      "opens": "08:00:00",
      "closes": "17:00:00",
      "day": "Monday"
    },
    {
      "id": 2,
      "site": 1,
      "opens": "09:00:00",
      "closes": "18:00:00",
      "day": "Saturday"
    },
    {
      "id": 3,
      "site": 1,
      "opens": "10:00:00",
      "closes": "19:00:00",
      "day": "Sunday"
    }
  ]
}
```
