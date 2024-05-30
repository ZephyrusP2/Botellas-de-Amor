## Backend

**Desarrollador:** Miguel Sosa

**Tester:** Sergio Cordoba

**Clases/Archivos a verificar:** `backend/accounts/views.py` (todas las vistas, menos las de login y registro)

| Criterio a verificar                              | Cumple? | Justificación                                   | Cumple? | Justificación | Notas adicionales |
| ------------------------------------------------- | ------- | ----------------------------------------------- | ------- | ------------- | ----------------- |
| Nombres descriptivos                              | Si      |                                                 | Si        |               |                   |
| Métodos pequeños                                  | Si      |                                                 | Si        |               |                   |
| Comentarios adecuados                             | No      | El código se explica solo                       | No        | No hay              |                   |
| No duplicación de código                          | No      | UserData y UserRetrieve son lo mismo            | No        | Dos bloques de código con diferente nombre pero misma función              |                   |
| Manejo de excepciones                             | No      | Se manejan solas por medio de DRF (Django Rest) | No        | No se evidencian              |                   |
| Manejo de recursos                                | Si      |                                                 | Si        |               |                   |
| Consistencia de estilo                            | Si      |                                                 | No        | Debería ser `user_bottles` y no `userBottles`              |                   |
| Documentación de funciones                        | Si      |                                                 | Si        |               |                   |
| Control de versiones                              | Si      |                                                 | Si        |               |                   |
| Legibilidad del código                            | Si      |                                                 | Si        |               |                   |
| Cumplimiento de estándares                        | Si      |                                                 | Si        |               |                   |
| Logs y seguimiento                                | No      | No lo vi relevante                              | No        | No hay              |                   |
| Cumplimiento de estándares de codificación segura | Si      |                                                 | Si        |               |                   |
| Comentarios no redundantes                        | No      | No hubo comentarios                             | No        | No hay              |                   |
| Facilidad de mantenimiento                        | Si      |                                                 | Si        |               |                   |
| Manejo de excepciones y errores de usuario        | No      | Se manejan solas por medio de DRF (Django Rest) | No        | No hay              |                   |

## Frontend

**Desarrollador:** Miguel Jaramillo

**Tester:** Sergio Cordoba

**Clases/Archivos a verificar:** `admin/src/services/user.js`, `admin/src/components/MyTable.jsx`, `admin/src/components/TableItem.jsx`, `admin/src/views/Administradores/Usuarios/CreateChallenge.jsx`, `admin/src/views/Administradores/Usuarios/EditChallenge.jsx`, `admin/src/views/Administradores/Usuarios/ShowChallenge.jsx`, `admin/src/views/Administradores/Usuarios/IndexChallenge.jsx`

| Criterio a verificar                              | Cumple? | Justificación | Cumple? | Justificación | Notas adicionales |
| ------------------------------------------------- | ------- | ------------- | ------- | ------------- | ----------------- |
| Nombres descriptivos                              | Si        |               | Si        |               |                   |
| Métodos pequeños                                  | Si        |               | Si        |               |                   |
| Comentarios adecuados                             | No        | El código se explica solo              | No        | No hay              |                   |
| No duplicación de código                          | Si        |               | Si        |               |                   |
| Manejo de excepciones                             | Si        |               | Si        |               |                   |
| Manejo de recursos                                | Si        |               | Si        |               |                   |
| Consistencia de estilo                            | Si        |               | Si        |               |                   |
| Documentación de funciones                        | No        | Las funciones son fáciles de comprender              | No        | No hay              |                   |
| Control de versiones                              | Si        |               | Si        |               |                   |
| Legibilidad del código                            | Si        |               | Si        |               |                   |
| Cumplimiento de estándares                        | Si        |               | Si        |               |                   |
| Logs y seguimiento                                | No        | No lo vi relevante              | No        | No hay              |                   |
| Cumplimiento de estándares de codificación segura | Si        |               | Si        |               |                   |
| Comentarios no redundantes                        | No        | No hubo comentarios              | No        | No hay              |                   |
| Facilidad de mantenimiento                        | Si        |               | Si        |               |                   |
| Manejo de excepciones y errores de usuario        | Si        |               | Si        |               |                   |
