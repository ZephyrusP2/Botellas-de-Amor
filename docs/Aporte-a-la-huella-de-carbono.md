## Backend

**Desarrollador:** Miguel Sosa

**Tester:** Sergio Cordoba

**Clases/Archivos a verificar:** `backend/accounts/views.py` (el método bottle)

| Criterio a verificar                              | Cumple? | Justificación                                   | Cumple? | Justificación | Notas adicionales |
| ------------------------------------------------- | ------- | ----------------------------------------------- | ------- | ------------- | ----------------- |
| Nombres descriptivos                              | Si      |                                                 | Si        |               |                   |
| Métodos pequeños                                  | Si      |                                                 | Si        |               |                   |
| Comentarios adecuados                             | No      | El código se explica solo                       | No        | No hay              |                   |
| No duplicación de código                          | Si      |                                                 | Si        |               |                   |
| Manejo de excepciones                             | No      | Se manejan solas por medio de DRF (Django Rest) | No        | No se evidencian              |                   |
| Manejo de recursos                                | Si      |                                                 | Si        |               |                   |
| Consistencia de estilo                            | No      | `userBottles` debería ser `user_bottles`        | No        | No se utilizó snake case              |                   |
| Documentación de funciones                        | Si      |                                                 | Si        |               |                   |
| Control de versiones                              | Si      |                                                 | Si        |               |                   |
| Legibilidad del código                            | Si      |                                                 | Si        |               |                   |
| Cumplimiento de estándares                        | Si      |                                                 | Si        |               |                   |
| Logs y seguimiento                                | No      | No lo vi relevante                              | No        | No hay              |                   |
| Cumplimiento de estándares de codificación segura | Si      |                                                 | Si        |               |                   |
| Comentarios no redundantes                        | No      | No hubo comentarios                             | No        | No hay              |                   |
| Facilidad de mantenimiento                        | Si      |                                                 | Si        |               |                   |
| Manejo de excepciones y errores de usuario        | No      | Se manejan solas por medio de DRF (Django Rest) | No        | No se evidencian              |                   |

## Frontend

**Desarrollador:** Nicolás Tovar

**Tester:** Sergio Cordoba

**Clases/Archivos a verificar:**

| Criterio a verificar                              | Cumple?      | Justificación                                                                        | Cumple? | Justificación | Notas adicionales |
| ------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------ | ------- | ------------- | ----------------- |
| Nombres descriptivos                              | Sí           | Los nombres de variables y funciones son descriptivos y reflejan su propósito        |         |               |                   |
| Métodos pequeños                                  | Sí           | Los métodos son relativamente pequeños y se enfocan en tareas específicas            |         |               |                   |
| Comentarios adecuados                             | Sí           | Se utilizan comentarios para explicar el propósito y funcionamiento de las funciones |         |               |                   |
| No duplicación de código                          | Sí           | No se observa duplicación significativa de código                                    |         |               |                   |
| Manejo de excepciones                             | Sí           | Se manejan las excepciones de manera adecuada                                        |         |               |                   |
| Manejo de recursos                                | Sí           | Se utiliza `AsyncStorage` para manejar recursos de manera eficiente                  |         |               |                   |
| Consistencia de estilo                            | Sí           | El código sigue un estilo consistente en todo el archivo                             |         |               |                   |
| Documentación de funciones                        | Parcialmente | Algunas funciones podrían tener una documentación más detallada                      |         |               |                   |
| Control de versiones                              | Sí           | El código se puede rastrear a través de un sistema de control de versiones           |         |               |                   |
| Legibilidad del código                            | Sí           | El código es legible y fácil de entender                                             |         |               |                   |
| Cumplimiento de estándares                        | Sí           | El código sigue los estándares de React Native                                       |         |               |                   |
| Logs y seguimiento                                | Sí           | Se utilizan logs para seguir el flujo de ejecución                                   |         |               |                   |
| Cumplimiento de estándares de codificación segura | Sí           | No se observan vulnerabilidades de seguridad evidentes                               |         |               |                   |
| Comentarios no redundantes                        | Sí           | Los comentarios son informativos y no redundantes                                    |         |               |                   |
| Facilidad de mantenimiento                        | Sí           | El código está estructurado de manera que sea fácil de mantener                      |         |               |                   |
| Manejo de excepciones y errores de usuario        | Sí           | Se manejan las excepciones y errores de manera adecuada                              |         |               |                   |
