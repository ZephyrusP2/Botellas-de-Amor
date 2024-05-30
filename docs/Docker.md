Se usarán imágenes de Docker para el [admin](#docker-admin) y el [backend](#docker-backend) del proyecto.

## Docker admin

```Dockerfile
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install the dependencies
COPY package*.json ./
RUN npm install

# Copy the source code to the container
COPY . .

# Build the application
RUN npm run build

# Make port 5173 available to the world outside this container
EXPOSE 4173

# Run the application
CMD ["npm", "run", "preview", "--", "--port", "4173", "--host"]
```

### Explicación

1. **Imagen base:** Se utiliza la imagen de Node 16.
2. **Directorio de trabajo:** Se establece el directorio de trabajo en el contenedor como `/app`.
3. **Instalación de dependencias:** Se copian los archivos `package.json` y `package-lock.json` y se instalan las dependencias del proyecto.
4. **Copia del código fuente:** Se copia el código fuente del proyecto al directorio de trabajo del contenedor.
5. **Construcción de la aplicación:** Se construye la aplicación.
6. **Puerto:** Se expone el puerto 4173 del contenedor.
7. **Ejecución de la aplicación:** Se ejecuta la aplicación en el contenedor.

### Modo de uso

Para descargar la imagen de Docker del admin, ejecuta el siguiente comando:

```bash
docker pull msosav/botellas-de-amor-admin
```

Para ejecutar la imagen de Docker del admin, ejecuta el siguiente comando:

```bash
docker run -p 4173:4173 msosav/botellas-de-amor-admin
```

## Docker backend

```Dockerfile
FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install pipenv
RUN pip install pipenv

# Install the dependencies
RUN pipenv install --deploy --ignore-pipfile

# Set the environment variable
ENV DJANGO_ENV "production"

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the application
CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
```

### Explicación

1. **Imagen base:** Se utiliza la imagen de Python 3.12.
2. **Variables de entorno:**
   - `PYTHONDONTWRITEBYTECODE`: Evita la creación de archivos `.pyc`.
   - `PYTHONUNBUFFERED`: Evita que la salida de Python se almacene en un búfer.
   - `DJANGO_ENV`: Se establece el entorno de Django como `production`.
3. **Directorio de trabajo:** Se establece el directorio de trabajo en el contenedor como `/app`.
4. **Copia del código:** Se copia el código del proyecto al directorio de trabajo del contenedor.
5. **Instalación de pipenv:** Se instala `pipenv` en el contenedor.
6. **Instalación de dependencias:** Se instalan las dependencias del proyecto.
7. **Puerto:** Se expone el puerto 8000 del contenedor.
8. **Ejecución de la aplicación:** Se ejecuta la aplicación en el contenedor.

### Modo de uso

Para descargar la imagen de Docker del backend, ejecuta el siguiente comando:

```bash
docker pull msosav/botellas-de-amor-backend
```

Para ejecutar la imagen de Docker del backend, ejecuta el siguiente comando:

```bash
docker run -p 8000:8000 msosav/botellas-de-amor-backend
```
