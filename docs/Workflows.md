Los workflows se correrán en GitHub Actions y se encargarán de realizar las siguientes tareas:

1. **[Docker Admin](#docker-admin)**: Construir y publicar la imagen de Docker del admin.
2. **[Docker Backend](#docker-backend)**: Construir y publicar la imagen de Docker del backend.
3. **[Tests Backend](#tests-backend)**: Ejecutar las pruebas unitarias del backend.
4. **[Formatter](#formatter)**: Formatear el código.

## Docker Admin

```yml
name: Docker Image CI Admin

on:
  push:
    branches:
      - "main"
    paths-ignore:
      - "README.md"
      - ".github/workflows/**"
      - "app/**"
      - "backend/**"
      - .gitignore
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Copy Project Code
        uses: actions/checkout@v3

      - name: Docker login
        env:
          DOCKER_USER: ${{secrets.DOCKERHUB_USER}}
          DOCKER_PASS: ${{secrets.DOCKERHUB_PASS}}
        run: |
          docker login -u $DOCKER_USER -p $DOCKER_PASS

      - name: Build the Docker Image
        run: |
          cd admin
          docker build . --tag msosav/botellas-de-amor-admin:latest

      - name: Docker Push
        run: docker push msosav/botellas-de-amor-admin
```

### Explicación

1. **Nombre del flujo de trabajo:** `Docker Image CI Admin`.
2. **Disparadores:** Se ejecuta cuando se hace un `push` en la rama `main` y cuando se ejecuta manualmente.
3. **Trabajos:**
   1. **build:**
      1. **Sistema operativo:** `ubuntu-latest`.
      2. **Pasos:**
         1. **Copia del código del proyecto:** Se copia el código del proyecto.
         2. **Inicio de sesión en Docker:** Se inicia sesión en Docker Hub.
         3. **Construcción de la imagen de Docker:** Se construye la imagen de Docker.
         4. **Empuje de la imagen de Docker:** Se empuja la imagen de Docker a Docker Hub.

### Resultado

Al hacer un `push` en la rama `main` o ejecutar manualmente el flujo de trabajo, se construirá la imagen de Docker del admin y se empujará a Docker Hub. [Aquí se explica un poco más acerca de la imagen de docker](https://github.com/ZephyrusP2/Botellas-de-Amor/wiki/Docker#docker-admin).

## Docker Backend

```yml
name: Docker Image CI Backend

on:
  push:
    branches:
      - "main"
    paths-ignore:
      - "README.md"
      - ".github/workflows/**"
      - "app/**"
      - "admin/**"
      - .gitignore
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Copy Project Code
        uses: actions/checkout@v3

      - name: Docker login
        env:
          DOCKER_USER: ${{secrets.DOCKERHUB_USER}}
          DOCKER_PASS: ${{secrets.DOCKERHUB_PASS}}
        run: |
          docker login -u $DOCKER_USER -p $DOCKER_PASS

      - name: Build the Docker Image
        run: |
          cd backend
          docker build . --tag msosav/botellas-de-amor-backend:latest

      - name: Docker Push
        run: docker push msosav/botellas-de-amor-backend
```

### Explicación

1. **Nombre del flujo de trabajo:** `Docker Image CI Backend`.
2. **Disparadores:** Se ejecuta cuando se hace un `push` en la rama `main` y cuando se ejecuta manualmente.
3. **Trabajos:**
   1. **build:**
      1. **Sistema operativo:** `ubuntu-latest`.
      2. **Pasos:**
         1. **Copia del código del proyecto:** Se copia el código del proyecto.
         2. **Inicio de sesión en Docker:** Se inicia sesión en Docker Hub.
         3. **Construcción de la imagen de Docker:** Se construye la imagen de Docker.
         4. **Empuje de la imagen de Docker:** Se empuja la imagen de Docker a Docker Hub.

### Resultado

Al hacer un `push` en la rama `main` o ejecutar manualmente el flujo de trabajo, se construirá la imagen de Docker del backend y se empujará a Docker Hub. [Aquí se explica un poco más acerca de la imagen de docker](https://github.com/ZephyrusP2/Botellas-de-Amor/wiki/Docker#docker-backend).

## Tests Backend

```yml
name: Tests Backend

on:
  pull_request:
    branches:
      - main
    paths-ignore:
      - "README.md"
      - ".github/workflows/**"
      - "app/**"
      - "admin/**"
      - .gitignore
  workflow_dispatch:

jobs:
  test:
    name: Run Unit Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: 3.12

      - name: Install dependencies
        run: |
          cd backend
          python -m pip install pipenv

      - name: Install dependencies
        run: |
          cd backend  
          pipenv install

      - name: Run tests
        run: |
          cd backend
          pipenv run python manage.py test
```

### Explicación

1. **Nombre del flujo de trabajo:** `Tests Backend`.
2. **Disparadores:** Se ejecuta cuando se hace un `pull request` en la rama `main` y cuando se ejecuta manualmente.
3. **Trabajos:**
   1. **test:**
      1. **Nombre del trabajo:** `Run Unit Tests`.
      2. **Sistema operativo:** `ubuntu-latest`.
      3. **Pasos:**
         1. **Copia del código del proyecto:** Se copia el código del proyecto.
         2. **Configuración de Python:** Se configura Python 3.12.
         3. **Instalación de dependencias:** Se instalan las dependencias del proyecto.
         4. **Ejecución de pruebas:** Se ejecutan las pruebas unitarias del backend.

### Resultado

Al hacer un `pull request` en la rama `main` o ejecutar manualmente el flujo de trabajo, se ejecutarán las pruebas unitarias del backend.

## Formatter

# Formatters workflow

```yml
name: Formatter

on:
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
        with:
          ref: ${{ github.head_ref }}

      - name: Set up Python 3.12
        uses: actions/setup-python@v2
        with:
          python-version: 3.12

      - name: Install dependencies
        run: |
          pip install pipenv
          pipenv install --dev
        working-directory: backend

      - name: Black formatter
        run: |
          pipenv run black .
        working-directory: backend

      - name: Isort formatter
        run: |
          pipenv run isort .
        working-directory: backend

      - name: Prettier React Native
        uses: actions/setup-node@v2
        with:
          node-version: "14"
      - run: npm install
        working-directory: app
      - run: npm run format
        working-directory: app

      - name: Prettier React
        uses: actions/setup-node@v2
        with:
          node-version: "14"
      - run: npm install
        working-directory: admin
      - run: npm run format
        working-directory: admin

      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: Fix formatting
          skip_fetch: true
          branch: ${{ github.head_ref }}
```

### Explicación

1. **Nombre del flujo de trabajo:** `Formatter`.
2. **Disparadores:** Se ejecuta cuando se abre un `pull request` en la rama `main`.
3. **Trabajos:**
   1. **build:**
      1. **Sistema operativo:** `ubuntu-latest`.
      2. **Pasos:**
         1. **Copia del repositorio:** Se copia el repositorio.
         2. **Configuración de Python 3.12:** Se configura Python 3.12.
         3. **Instalación de dependencias:** Se instalan las dependencias del proyecto.
         4. **Formateador Black:** Se formatea el código con Black.
         5. **Formateador Isort:** Se ordenan las importaciones con Isort.
         6. **Prettier React Native:** Se formatea el código de React Native con Prettier.
         7. **Prettier React:** Se formatea el código de React con Prettier.
         8. **Confirmación de cambios:** Se confirman los cambios en el repositorio.
         9. **Rama:** Se utiliza la rama del pull request.
         10. **Mensaje de confirmación:** Se establece el mensaje de confirmación como `Fix formatting`.

### Resultado

Al abrir un `pull request` en la rama `main`, se formateará el código del proyecto y se confirmarán los cambios en el repositorio.
