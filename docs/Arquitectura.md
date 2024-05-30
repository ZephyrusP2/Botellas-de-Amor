## Sección 1. Alcance

## Sección 2. Descripción de componentes

- **Backend:** Contendrá toda la lógica del negocio, la conexión con la base de datos y todo el procesamiento de los datos. Será Django el framework que se usará.

- **Frontend**

  - _Vista de administrador:_ Manejará la parte de adición de puntos de disposición, la visualización de datos relevantes con respecto a las estadísticas de recolección y podrá controlar los kilos que entrega cada persona. Será React la librería que se usará.

  - _Aplicación:_ Manejará la parte de la cuenta de botellas por usuarios, además de los usuarios que más han reciclado. Será React Native el framework que se usará.

### 2.1 Estilos Arquitectónicos Usados

<div align="center">

| Tipo de aplicación       | Móvil y Web                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| Estilo arquitectónico    | <ul><li>SOA</li><li>Cliente Servidor</li><li>Orientada a Objetos</li></ul>                               |
| Lenguaje de programación | <ul><li>Python (Backend)</li><li>Javascript (App y Admin)</li></ul>                                      |
| Aspectos técnicos        | <ul><li>La base de datos será relacional (SQLite3)</li><li>Se usarán modelos de clusterización</li></ul> |
| Frameworks               | <ul><li>Django</li><li>React</li><li>React Native</li></ul>                                              |

</div>

### 2.2 Vista Lógica - Diagrama de Clases de Diseño

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/b0a129d2-da8e-4950-afe4-ae04c1d97e5b" />
</p>

### 2.3 Vista Lógica - Diagrama Entidad-Relación (Modelo de datos o de persistencia)

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/3402434c-7cd8-41e8-9cdf-516038369b35" />
</p>

### 2.4 Modelo C4

**C1**

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/0923248c-2025-403b-a0da-ef6b00ed898f" />
</p>

**C2**

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/b51d6656-0137-4dd5-aa9c-9c93801f32aa" />
</p>

**C3**

<p align="center">
  <img src="https://github.com/ZephyrusP2/Botellas-de-Amor/assets/85181687/97ac70a8-25d4-478f-80c6-f4ad584a8d90" />
</p>
