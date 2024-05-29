# Accounts serializers

## UserSerializer

### Fields

- `id`: The unique identifier of the user.
- `role`: The role of the user.
- `name`: The name of the user.
- `last_name`: The last name of the user.
- `birth_date`: The birth date of the user.
- `location`: The location of the user
- `gender`: The gender of the user.
- `email`: The email of the user.
- `password`: The password of the user.
- `plastic_footprint`: The plastic footprint of the user.

### Examples

#### Create (POST)

```json
{
  "role": "user",
  "name": "John",
  "last_name": "Doe",
  "birth_date": "1990-01-01",
  "location": "Medellín, Antioquia",
  "gender": "masculino",
  "email": "john@doe.com",
  "password": "password",
  "plastic_footprint": 0
}
```

#### Retrieve (GET)

```json
{
  "id": 1,
  "role": "user",
  "name": "John",
  "last_name": "Doe",
  "birth_date": "1990-01-01",
  "location": "Medellín, Antioquia",
  "gender": "masculino",
  "email": "jhon@doe.com",
  "plastic_footprint": 0
}
```

## UserUpdateSerializer

### Fields

- `id`: The unique identifier of the user.
- `role`: The role of the user.
- `name`: The name of the user.
- `last_name`: The last name of the user.
- `birth_date`: The birth date of the user.
- `location`: The location of the user
- `gender`: The gender of the user.
- `email`: The email of the user.

### Example (PUT)

```json
{
  "id": 1,
  "role": "user",
  "name": "John",
  "last_name": "Doe",
  "birth_date": "1990-01-01",
  "location": "Medellín, Antioquia",
  "gender": "masculino",
  "email": "jhon1@doe.com"
}
```

## ChangePasswordSerializer

### Fields

- `new_password`: The new password of the user.
- `old_password`: The old password of the user.

### Example

#### Change password (POST)

```json
{
  "new_password": "new_password",
  "old_password": "old_password"
}
```

## ResetPasswordSerializer

### Fields

- `new_password`: The new password of the user.

### Example (POST)

```json
{
  "new_password": "new_password"
}
```
