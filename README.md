# Botellas de Amor

## Ejecución local

Primero, es necesario clonar el repositorio con el siguiente comando.

```bash
git clone https://github.com/ZephyrusP2/Botellas-de-Amor.git
cd Botellas-de-Amor
```

### Backend

Para ejecutar el backend, es necesario tener instalado pipenv (python y pip también).
A continuación se mostrará el proceso de instalación para Windows, Linux (Fedora)
y MacOS.

#### Instalar pipenv en Windows

```shell
pip install pipenv
```

#### Instalar pipenv en Linux (Fedora)

```bash
sudo dnf install python-pipenv
```

#### Instalar pipenv en MacOS

```bash
brew install pipenv
```

#### Ejecutar el backend

Para iniciarlo es necesario ejecutar los siguientes comandos.

```bash
cd backend
pipenv install
pipenv run python manage.py runserver 0.0.0.0:8000
```

### Admin

Para ejecutar el admin es necesario tener instalado node.js. A continuación
se mostrará el proceso de instalación para Windows, Linux (Fedora)
y MacOS.

#### Instalar node en Windows y MacOS

Ir y seguir las instrucciones de la [página oficial de node.js.](https://nodejs.org/en/download).

#### Instalar node en Linux (Fedora)

Ejecutar el siguiente comando.

```bash
sudo dnf install nodejs
```

#### Ejecutar la vista de admin

Se debe crear un archivo `.env` en la carpeta `admin` con el siguiente contenido.

```env
VITE_SERVER_IP=[ip del servidor]
```

Para conectarse a la vista de admin es necesario ejecutar los siguientes comandos.

```bash
cd admin
npm install
npm run dev
```

### App

Para la app es necesario tener node instalado, por ende seguir los pasos de la
vista de admin. Además es necesario tener la aplicación Expo Go, disponible para
[Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=es_CO&gl=US)
y [IOS](https://apps.apple.com/co/app/expo-go/id982107779)

#### Ejecutar la app

Se debe crear un archivo `.env` en la carpeta `app` con el siguiente contenido.

```env
SERVER_IP=[ip del servidor]
```

Para ejecutar la app es necesario ejecutar el siguiente comando.

```bash
cd app
npm install
npx expo start --clear
```

Y luego, con la cámara del celular se debe escanear el código QR que se muestra
en la pantalla (es necesario tener instalada la app Expo Go).

## Ejecución en Docker

### Backend

Para ejecutar el backend en Docker, es necesario tener instalado Docker.
A continuación se mostrará el proceso de instalación para Windows, Linux (Fedora)

#### Instalar Docker en Windows

Ir y seguir las instrucciones de la [página oficial de Docker.](https://docs.docker.com/desktop/windows/install/)

#### Instalar Docker en Linux (Fedora)

Ejecutar el siguiente comando.

```bash
sudo dnf install docker
```

#### Ejecutar el backend en Docker

Para ejecutar el backend en Docker es necesario ejecutar los siguientes comandos.

```bash
cd backend
docker pull msosav/botellas-de-amor-backend
docker run -p 8000:8000 -e botellas-de-amor-backend
```
