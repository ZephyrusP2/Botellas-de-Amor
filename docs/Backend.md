# Diagrama de Arquitectura

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/f844a669-3a8f-40ee-9e92-dc0922a6464a" alt="Diagrama de arquitectura">
</p>

# Diagrama de Clases

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/fa3ab0fb-8129-4bf3-b9f3-3ffcf2b8dfa9" alt="Diagrama de clases">
</p>

# Endpoints

## Usuario

### Registro del Usuario

**Endpoint:** `api/accounts/user/register`

Esta ruta se encarga de gestionar todo el proceso del registro. Se deben enviar los siguientes datos mediante un objeto JSON:

- `name`: Nombre del usuario.
- `last_name`: Apellido del usuario.
- `birth_date`: Fecha de nacimiento del usuario (es con el formato YYYY/MM/DD).
- `location`: Ubicación del usuario.
- `gender`: Género del usuario.
- `email`: Correo electrónico del usuario.
- `password`: Contraseña del usuario.

La respuesta de esta ruta es un `token`, el cual se asigna al usuario y le permite llevar a cabo acciones en la plataforma. Y el `id` del usuario.

### Inicio de sesión del Usuario

**Endpoint:** `api/accounts/user/login`

Esta ruta se encarga de gestionar todo el proceso de inicio de sesión. Se deben enviar los siguientes datos mediante un objeto JSON:

- `email`: Correo electrónico del usuario.
- `password`: Contraseña del usuario.

La respuesta de esta ruta es un `token`, el cual se asigna al usuario y le permite llevar a cabo acciones en la plataforma. Y el `id` del usuario.

### Inicio de sesión de la página de administrador

**Endpoint:** `api/accounts/admin/login`

Esta ruta se encarga de gestionar todo el proceso de inicio de sesión. Se deben enviar los siguientes datos mediante un objeto JSON:

- `email`: Correo electrónico del administrador u operador.
- `password`: Contraseña del administrador u operador.

La respuesta de esta ruta es un `token`, el cual se asigna al administrador u operador y le permite llevar a cabo acciones en la plataforma. Y el role que este tiene, que es `admin` u `operator`.

### Crear un Usuario

**Endpoint:** `api/accounts/user/create`

Esta ruta se encarga de crear un usuario. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se deben enviar los siguientes datos mediante el método `POST`:

- `name`: Nombre del usuario.
- `last_name`: Apellido del usuario.
- `birth_date`: Fecha de nacimiento del usuario (es con el formato YYYY/MM/DD).
- `location`: Ubicación del usuario.
- `gender`: Género del usuario.
- `email`: Correo electrónico del usuario.
- `password`: Contraseña del usuario.
- `role`: Rol del usuario.

### Retreive del Usuario

**Endpoint:** `api/accounts/user/show/<id>`

Esta ruta se encarga de devolver un usuario en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin` o el usuario en cuestión. Se debe acceder por el método `GET`.

La respuesta de esta ruta es un objeto JSON con la información del usuario. Ej:

```json
{
  "id": 1,
  "role": "user",
  "name": "Juan",
  "last_name": "Pérez",
  "birth_date": "1999-01-01",
  "location": "CDMX",
  "gender": "masculino",
  "email": "juan@perez.com"
}
```

### Update del Usuario

**Endpoint:** `api/accounts/user/update/<id>`

Esta ruta se encarga de editar un usuario en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin` o el usuario en cuestión. Se deben enviar los siguientes datos mediante el método `PUT`:

- `name`: Nombre del usuario.
- `last_name`: Apellido del usuario.
- `birth_date`: Fecha de nacimiento del usuario (es con el formato YYYY/MM/DD).
- `location`: Ubicación del usuario.
- `gender`: Género del usuario.
- `email`: Correo electrónico del usuario.
- `role`: Rol del usuario.

### Delete del Usuario

**Endpoint:** `api/accounts/user/delete/<id>`

Esta ruta se encarga de eliminar un usuario en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `DELETE`.

### Listar los Usuarios

**Endpoint:** `api/accounts/user/list`

Esta ruta se encarga de listar todos los usuarios guardados en el sistema. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. El modo de uso es el siguiente:

- **GET:** Trae toda la información de los usuarios.

La respuesta de esta ruta es un objeto JSON con objetos JSON que contienen la información de cada usuario.

## Puntos de acopio

### Create del punto de acopio

**Endpoint:** `api/disposal/site/create`

Esta ruta se encarga de crear los puntos de acopio. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se deben enviar los siguientes datos mediante el método `POST`:

- `image`: Path donde se encuentra la imagen.
- `opens`: Hora de apertura. El dato se manda de la siguiente manera `HH:MM:SS` ej. `10:00:00`.
- `closes`: Hora de cierre. El dato se manda de la siguiente manera `HH:MM:SS` ej. `17:00:00`.
- `name`: Nombre del punto de acopio.
- `address`: La dirección del punto de acopio.

### Retreive del punto de acopio

**Endpoint:** `api/disposal/site/show/<id>`

Esta ruta se encarga de devolver un puntos de acopio en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `GET`.

### Update del punto de acopio

**Endpoint:** `api/disposal/site/update/<id>`

Esta ruta se encarga de editar un puntos de acopio en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `PUT`.

### Delete del punto de acopio

**Endpoint:** `api/disposal/site/delete/<id>`

Esta ruta se encarga de editar un puntos de acopio en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `DELETE`.

### Listar los puntos de acopio

**Endpoint:** `api/disposal/site/list`

Esta ruta se encarga de devolver todos los puntos de acopio guardados en la base de datos. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `GET`.

## Retos

### Create del reto

**Endpoint:** `api/disposal/challenge/create`

Esta ruta se encarga de crear los retos. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se deben enviar los siguientes datos mediante el método `POST`:

- `challenge`: El nombre del reto que se va a crear.
- `experience`: La cantidad de experiencia que gana el usuario con dicho reto.

### Retreive del reto

**Endpoint:** `api/disposal/challenge/show/<id>`

Esta ruta se encarga de devolver un reto en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `GET`.

### Update del reto

**Endpoint:** `api/disposal/challenge/update/<id>`

Esta ruta se encarga de editar un reto en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `PUT`.

### Delete del reto

**Endpoint:** `api/disposal/challenge/delete/<id>`

Esta ruta se encarga de eliminar un reto en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `DELETE`.

### Listar los retos

**Endpoint:** `api/disposal/challenge/list`

Esta ruta se encarga de devolver todos los retos guardados en la base de datos. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `GET`.

## Facts (Hechos interesantes)

### Create del hecho

**Endpoint:** `api/disposal/fact/create`

Esta ruta se encarga de crear los hechos. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se deben enviar los siguientes datos mediante el método `POST`:

- `message`: La explicación del hecho.

### Retreive del hecho

**Endpoint:** `api/disposal/fact/show/<id>`

Esta ruta se encarga de devolver un hecho en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `GET`.

### Update del hecho

**Endpoint:** `api/disposal/fact/update/<id>`

Esta ruta se encarga de editar un hecho en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `PUT`.

### Delete del hecho

**Endpoint:** `api/disposal/fact/delete/<id>`

Esta ruta se encarga de eliminar un hecho en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `DELETE`.

### Listar los hechos

**Endpoint:** `api/disposal/fact/list`

Esta ruta se encarga de devolver todos los hechos guardados en la base de datos. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`. Se debe acceder por el método `GET`.

## Disposición

### Create de la disposición

**Endpoint:** `api/disposal/disposition/create`

Esta ruta se encarga de crear las disposiciones. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin` u `operador`. Se deben enviar los siguientes datos mediante el método `POST`:

- `user_id`: El id del usuario que va a realizar la disposición.
- `site_id`: El id del punto de acopio donde se va a realizar la disposición.
- `weight`: El peso de la disposición.
- `bottles`: La cantidad de botellas que se van a reciclar.

Ejemplo de uso:

```json
{
  "user_id": 1,
  "site_id": 1,
  "weight": 10,
  "bottles": 100
}
```

### Retreive de la disposición

**Endpoint:** `api/disposal/disposition/show/<id>`

Esta ruta se encarga de devolver una disposición en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin`, `operador` o el usuario en cuestión. Se debe acceder por el método `GET`.

### Update de la disposición

**Endpoint:** `api/disposal/disposition/update/<id>`

Esta ruta se encarga de editar una disposición en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin` u `operador`. Se debe acceder por el método `PUT`.

### Delete de la disposición

**Endpoint:** `api/disposal/disposition/delete/<id>`

Esta ruta se encarga de eliminar una disposición en específico. Solo pueden acceder a ella los usuarios que tengan asignado el rol de `admin` u `operador`. Se debe acceder por el método `DELETE`.
