# Botellas de Amor

## Ejecución local

Primero, es necesario clonar el repositorio con en siguiente comando

```bash
git clone https://github.com/msosav/Botellas-de-Amor.git
cd Botellas-de-Amor
```

### Backend

Para ejecutar el backend, es necesario tener instalado pipenv (python y pip también),
a continuación se mostrará el proceso de instalación para Windows, Linux (Fedora)
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

Para iniciarlo es necesario ejecutar los siguientes comandos:

```bash
cd backend
pipenv install
pipenv run python manage.py runserver
```
