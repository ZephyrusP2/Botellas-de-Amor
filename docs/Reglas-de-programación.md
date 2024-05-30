## Reglas para el Repositorio

### Reglas Generales

**IMPORTANTE:** No se permitirán commits directos en la rama principal (main) para garantizar la revisión previa de cada cambio.

### Reglas para los Commits

Los commits deben seguir la siguiente estructura en inglés: `[Acción] [Descripción]`, por ejemplo, `Add user login form` o `Fix user view not working`. Además, cada commit debe tener una descripción detallada de los cambios realizados.

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/4cf12170-f9f9-486f-a163-63c1ee3414e7" />
</p>

Se utilizarán los siguientes verbos para describir la acción:

- **Add:** Para agregar código o archivos nuevos. Ejemplo: `Add projects form` o `Add .gitignore`.
- **Implement:** Para introducir nuevas funcionalidades. Ejemplo: `Implement user CRUD`.
- **Fix:** Para corregir problemas. Ejemplo: `Fix api values` o `Fix button color`.
- **Delete:** Para eliminar archivos o código. Ejemplo: `Delete search projects function`.

### Reglas para las Ramas

Cada *issue* debe tener asignada una rama con la siguiente estructura en inglés: `[Tipo]/[Descripción]`, como por ejemplo, `us/admin-crud` o `task/edit-project`.

Los tipos de ramas son:

- **us:** Asociada a una historia de usuario. Ejemplo: `us/agendar-recoleccion`.
- **task:** Asociada a una tarea específica dentro de una historia de usuario. Ejemplo: `task/vista-agendar-recoleccion`.

Para asignar una rama a una *issue*, sigue estos pasos:

1. Ve a la *issue* correspondiente.

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/31792665-7676-46a3-b67b-796b05a30ec7" />
</p>

2. En el apartado de desarrollo, haz clic en *Create a branch for this issue or link a pull request*.

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/619671b9-04de-435d-b7f9-832c9a25683b" />
</p>

3. Si es una `us`, configura la rama para que se derive de la rama principal (*main*) y crea la rama para comenzar a trabajar en la historia de usuario.

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/1956bfa9-a412-48e3-95a0-b4f85c391dfa" />
</p>

4. Si es una `task`, primero crea una *issue* para esa tarea. En el comentario de la *issue*, haz clic en el punto y selecciona *Convert to issue*. Se explica mejor en [este video](https://youtu.be/SSza2dRsBok?si=TMpDVcAb_bn5xrdN&t=15)

5. Luego, sigue el mismo proceso del paso 3, pero con la rama de la historia de usuario como la rama objetivo.

**IMPORTANTE:** Las pull request que se hacen a la rama main tienen que ser revisada por el arquitecto (Miguel Sosa), para comprobar que se haya cumplido con los lineamientos acá escritos.

## Django

### Reglas generales

- Las variables deben nombrarse en snake_case, por ejemplo, `bottles_recycled`.
- Todas las funciones deben incluir un docstring que explique brevemente su propósito, parámetros y retornos.
  ```python
  def show_bottle(id):
    """
    Show bottle details
    :param id: bottle id
    :return: bottle details
    """
    app_data = {}
    ...
    return app_data
  ```
- Los nombres de las clases deben estar en PascalCase, como por ejemplo, `class ProjectManager`.
- Los nombres de las funciones deben estar en snake_case, como por ejemplo, `def show_bottle`.

### Reglas para los modelos

- Los nombres de los atributos en los modelos deben estar en snake_case, por ejemplo, `birth_date = models...`.
- Se deben crear campos para los atributos `created_at` y `updated_at` para un mejor seguimiento de los objetos en la base de datos.
- Los atributos deben ser coherentes con el diagrama de clases y el diagrama entidad-relación.

### Reglas para las vistas

- No se permite el uso de `print()` en ninguna parte del código.

### Reglas para las urls

- Cada aplicación de Django debe tener su propio archivo de URLs para que las URLs del proyecto utilicen ese conjunto de rutas.
  ```python
  urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
  ]
  ```
- Cada URL debe estar vinculada a una función de una vista, por ejemplo, `path('signup/', views.signup, name='signup')`.

## React

### Reglas generales

- Utilizar camelCase para nombres de variables, por ejemplo, `bottlesRecycled`.
- Los nombres de las clases deben estar en PascalCase, como por ejemplo, `class ProjectManager`.
- Los nombres de las funciones deben estar en camelCase, por ejemplo, `function showBottle()`.
- Se debe utilizar Bootstrap para que la aplicación sea responsive.
- Las funciones deben ser tipo felcha, como por ejemplo
  ```js
  login = async (userData) => {
    ...
  };
  ```

### Reglas para los componentes

- Los componentes deben ir en la carpeta *src/components*.
- Los componentes deben ser modulares y centrados en una sola responsabilidad.
- Los componentes deben tener un nombre claro y conciso que refleje su propósito.
- Los componentes se deben nombrar en PascalCase, como por ejemplo `AddUser`.
- Los archivos se deben nombrar en PascalCase, como por ejemplo `AddUser.jsx`.
- Todos se trabajarán con JSX para facilitar la implementación.

### Reglas para los servicios

- Los servicios deben ir en la carpeta *src/services*.
- Se usará axios para manejar las conexiones http.

### Reglas para el routing

- Se debe utilizar la librería React Routing para el manejo de rutas dentro de la aplicación.

## React Native

### Reglas generales

- Utilizar camelCase para nombres de variables, por ejemplo, `bottlesRecycled`.
- Los nombres de las clases deben estar en PascalCase, como por ejemplo, `class ProjectManager`.
- Los nombres de las funciones deben estar en camelCase, por ejemplo, `function showBottle()`.
- Para la conexión con la api se debe usar la librería axios.
- Las funciones deben ser tipo felcha, como por ejemplo
  ```js
  login = async (userData) => {
    ...
  };
  ```

### Reglas para los componentes

- Los componentes deben ir en la carpeta *src/components*.
- Los componentes deben ser modulares y centrados en una sola responsabilidad.
- Los componentes deben tener un nombre claro y conciso que refleje su propósito.
- Los componentes se deben nombrar en PascalCase, como por ejemplo `AddUser`.
- Los archivos se deben nombrar en PascalCase, como por ejemplo `AddUser.jsx`.
- Todos se trabajarán con JSX para facilitar la implementación.