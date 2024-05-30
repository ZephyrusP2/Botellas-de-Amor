## Sección 1. Introducción

### 1.1 Propósito

El siguiente documento describe el plan de pruebas para una aplicación móvil de una fundación llamada Botellas de Amor, dedicada a la transformación de plásticos en viviendas, parques infantiles y mobiliario en plástico reciclado. En concreto define los siguientes objetivos específicos.

- Identifica los elementos que van a ser testeados.
- Especifica cuales van a ser las pruebas que van a ser implementadas durante el proceso de pruebas.
- Se logra concluir con los resultados que se obtienen de dichas pruebas.

### 1.2 Ámbito

El siguiente plan de pruebas describe pruebas de tipo de unidad, de sistema y experiencia de usuario. El objetivo es testear los requisitos que fueron definidos y los casos de uso.

### 1.3 Definiciones, acrónimos y abreviaturas

Revisar el glosario de términos

## Sección 2. Requerimientos de las pruebas

La lista enunciada a continuación, muestra los elementos que van a ser parte del plan de pruebas (casos de uso, requisitos funcionales y requisitos no funcionales). 

**Pruebas de integridad de los datos**
- Verificar el acceso a la aplicación móvil de botellas de amor
- Verificar la correcta recuperación de los datos para su visualización
- Verificar que la lectura de los datos sea correcta

**Pruebas de funcionalidad**
- Verificar [HU1: Yo como usuario quiero poder registrarme e iniciar sesión en la aplicación](../../issues/10)
- Verificar [HU2: Yo como usuario deseo interactuar con la botella de la aplicación](../../issues/12)
- Verificar [HU3: Yo como administrador deseo poder iniciar sesión en el sistema](../../issues/49)
- Verificar [HU4: Yo como usuario deseo ver imágenes de los puntos de acopio](../../issues/11)
- Verificar [HU5: Yo como usuario deseo visualizar Proyectos Actuales](../../issues/15)
- Verificar [HU6: Yo como usuario deseo visualizar Información sobre la fundación](../../issues/14)
- Verificar [HU7: Yo como usuario deseo conocer como se hacen los Ecoladrillos](../../issues/16)
- Verificar [HU8: Yo como usuario deseo ver un mapa de los Puntos de Acopio mas cercanos](../../issues/17)
- Verificar [HU9: Yo como usuario deseo tener Indicaciones de como llegar al Punto de Acopio](../../issues/18)
- Verificar [HU10: Yo como Operador de recolección deseo registrar la cantidad y el peso de las botellas entregadas por un usuario](../../issues/19)
- Verificar [HU11: Yo como usuario deseo poder ver cuales son los retos asignados que tengo](../../issues/20)
- Verificar [HU12: Yo como administrador deseo crear, actualizar, visualizar y eliminar puntos de acopio](../../issues/21)
- Verificar [HU13: Yo como usuario deseo ver cual es mi aporte a la huella de carbono](../../issues/22)
- Verificar [HU14: Yo como usuario y administrador deseo visualizar los usuarios que mas aportan en la fundación](../../issues/23)
- Verificar [HU15: Yo como organización deseo agendar citas de recolección](../../issues/24)
- Verificar [HU16: Yo como usuario deseo ver los aportes posibles a futuro](../../issues/25)
- Verificar [HU17: Yo como usuario o administrador deseo poder ver cuales son las personas y organizaciones que mas aportaran a futuro](../../issues/26)
- Verificar [HU18: Yo como administrador deseo conocer la cantidad de Organizaciones vinculadas a futuro](../../issues/28)
- Verificar [HU19: Yo como administrador deseo crear, actualizar, visualizar y eliminar proyectos](../../issues/27)
- Verificar [HU20: Yo como administrador deseo poder gestionar los demás administradores dentro del sistema](../../issues/29)
- Verificar [HU21: Yo como Operador de recolección deseo conocer vía correo mis credenciales asignadas](../../issues/30)
- Verificar [HU22: Yo como Operador de recolección deseo iniciar sesión en el sistema](../../issues/31)
- Verificar [HU23: Yo como administrador deseo añadir y eliminar retos para los usuarios](../../issues/32)
- Verificar [HU24: Yo como usuario deseo editar o eliminar mi cuenta](../../issues/51)

**Pruebas de interfaz de usuario**
- Verificar que que cada historia de usuario se entienda fácilmente
- Verificar que todas las pantallas funcionen correctamente
- Verificar todas las historias de usuario

**Pruebas de desarrollo**
- Documento de Visión, Producto: "Un diseño familiar para todos los usuarios"
- Documento de Visión, Producto: "Aplicación de fácil uso para los usuarios"
- Documento de Visión, Producto: "Fácil inscripción para las instituciones y/u organizaciones"

## Sección 3. Estrategia de prueba

En esta sección se presenta el enfoque/criterios que vamos a tener para probar el sistema de software. Aquí se define como se harán las pruebas.

### 3.1 Tipos de pruebas y técnicas

#### 3.1.1 Pruebas de integridad de los datos

- _**Objetivo:**_ probar que el acceso a la base de datos sea el correcto.
- _**Técnicas:**_ probar cada método de invocación a la base de datos con dato válidos e inválidos para asegurar que el resultado sea el correcto.
- _**Criterios de finalización:**_ todos los métodos y procedimientos funcionan como estaban establecidos y sin errores.
- _**Consideraciones:**_ se deben invocar los métodos manualmente y se debería utilizar una base de datos de tamaño pequeño para una correcta visualización de los resultados.

#### 3.1.2 Pruebas de funcionalidad

Estas pruebas se enfocan en cualquier requisito, historia de usuario o regla de negocio. El objetivo es verificar el correcto funcionamiento de las reglas de negocio. Se van a revisar tanto la interfaces de usuario como sus respectivos resultados.

- _**Objetivo:**_ verificar la correcta navegación entre pantallas, procesamiento de datos y su recuperación
- _**Técnicas:**_ ejecutar cada historia de usuario o flujo de datos para evaluar su funcionamiento, el retorno de datos adecuados y las reglas de negocio aplicadas
- **_Criterios de finalización:_** todas las pruebas definidas se aplicaron y se identificaron los errores
- _**Consideraciones:**_ ninguna

#### 3.1.3 Pruebas de interfaz de usuario

Se busca verificar la interacción del usuario con la aplicación móvil. El objetivo es asegurarse de que al usuario se le permite navegar por todas las pantallas de la aplicación

- _**Objetivo:**_ las diferentes pantallas muestran la información adecuada respecto a las reglas de negocio, requisitos e historias de usuario
- _**Técnicas:**_ pruebas para cada pantalla con la finalidad de ver su funcionamiento
- **_Criterios de finalización:_** todas las pantallas fueron verificadas y su funcionamiento es el adecuado
- _**Consideraciones:**_ ninguna

#### 3.1.4 Pruebas de desarrollo

El objetivo es medir los tiempos de respuesta de la aplicación, asegurarse que el sistema tiene un rendimiento óptimo para el usuario

- _**Objetivo:**_ validar los tiempos de respuesta con carga normal y un gran volumen de trabajo
- _**Técnicas:**_ varias iteraciones para incrementar el número de transacciones
- **_Criterios de finalización:_** se llevaron a cabo todas las pruebas sin errores y en tiempos establecidos
- _**Consideraciones:**_ ninguna

### 3.2 Herramientas

<div align="center">

| Tipo de prueba | Herramienta |
|---------------------------------|--------------------|
| Gestión del proyecto | GitHub Projects |
| Herramienta DBMS | MySQLite3 |
| Interfaz de usuario | Test Complete |
| Funcionales | JUnit y Optimize it |
| Rendimiento | Test Load |

</div>

## Sección 4. Recursos

### 4.1 Recursos hardware

<div align="center">

| Recurso | Cantidad | Nombre y tipo |
|---------|----------|---------------|
| PC | 1 | Diseño y ejecución de las pruebas |

</div>

### 4.2 Recursos software

<div align="center">

| Nombre del elemento software | Tipo y otras notas |
|---------------------------------|--------------------|
| Visual Studio Code | Desarrollo del proyecto |
| GitHub Projects | Gestión del proyecto |
| MySQLite3 | Herramienta DBMS |
| Test Complete | Interfaz de usuario |
| JUnit y Optimize it | Funcionales |
| Test Load | Rendimiento |

</div>

### 4.3 Herramientas de soporte

Ninguna

### 4.4 Configuración de entornos de prueba

Ninguna

### 4.5 Recursos Humanos

<div align="center">

| Rol | Mínimos Recursos Recomendados | Responsabilidades específicas o comentarios |
|-----|-------------------------------|---------------------------------------------|
| Programador | 2 | Desarrollo de la lógica de negocio de la aplicación |
| Probador (Tester) | 1 | Ejecutar pruebas, recuperar los errores y documentar los defectos |
| Arquitecto | 1 | Construir el plan de desarrollo de la aplicación/proyecto (reglas de desarrollo)|
| SCRUM Master | 1 | Hace la división de tareas del proyecto |
| Diseñador UX | 1 | Se encarga de realizar prototipos, mockups o interfaces de la aplicación |

</div>

## Sección 5. Actividades de Pruebas

<div align="center">

| Actividad | Esfuerzo (p/d) | Fecha de comienzo | Fecha de finalización |
|-----------|----------------|-------------------|-----------------------|
| Planificación de la prueba | | 12 de marzo | 15 de marzo |
| Diseño de la prueba | | 12 de abril | 20 de abril |
| Implementación de la prueba | | 2 de mayo | 20 de mayo
| Ejecución de la prueba | | 1 de junio | 15 de junio |
| Evaluación de la prueba | | 3 de junio | 17 de junio |

</div>

## Sección 6. Resultados de las Pruebas

<div align="center">

| Documento de desarrollo de software | Desarrollador | Revisión | Fecha |
|-----------|----------------|-------------------|-----------------------|
| Plan de prueba | |  | 20 de marzo |
| Casos de prueba | | | 25 de mayo |
| Informe de evaluación de pruebas | | | 20 de junio
| Modelo de prueba | | | 16 de junio |

</div>

## Sección 7. Tareas de la etapa de prueba

Las tareas que se realizan en cada una de las etapas son:

**Planificación de las pruebas**
- Identificar requisitos para las pruebas
- Valorar riesgos
- Desarrollar la estrategia de pruebas
- Identificar los recursos necesarios para realizar las pruebas
- Planificar los tiempos
- Desarrollar el plan de pruebas

**Diseño de las pruebas**
- Análisis de la carga de trabajo
- Ejecución de pruebas
- Establecer los casos de prueba

**Implementación de las pruebas**
- Definir el entorno de prueba
- Establecer los datos de prueba

**Ejecución de las pruebas**
- Verificar los resultado
- Registrar defectos
- Ejecutar las pruebas con los datos establecidos

**Evaluación de las pruebas**
- Analizar defectos
- Determinar si se alcanzaron los objetivos
- Crear los informes de evaluación de las pruebas