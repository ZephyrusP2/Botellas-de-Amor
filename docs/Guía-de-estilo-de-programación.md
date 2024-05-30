**IMPORTANTE:** Este documento proporciona información sobre la implementación de formateadores y su uso. Se ha decidido incorporar GitHub Actions para ejecutar estos formateadores de forma automática.

## Django

### black

`black` es una herramienta de formateo para Python que revisa y ajusta aspectos del código como espacios, paréntesis y la apariencia general del código. Se utilizará para mantener un estándar visual en el código backend.

**Instrucciones de uso:**

1. Asegúrate de estar en el entorno virtual:

```bash
pipenv shell
```

2. Dentro del entorno virtual, ejecuta el siguiente comando:

```bash
black .
```

### isort

`isort` es otra herramienta de formateo para Python que se encarga de organizar las importaciones según el tipo y el orden alfabético. Esto contribuye a una estructura más limpia y fácil de seguir en el código.

Su uso es el siguiente:

**Instrucciones de uso:**

1. Asegúrate de estar en el entorno virtual:

```bash
pipenv shell
```

2. Dentro del entorno virtual, ejecuta el siguiente comando:

```bash
isort .
```

## React y React Native

### Prettier

`Prettier` es una herramienta de formateo para código en JavaScript, incluyendo React y React Native. Su función principal es mantener un estilo consistente y legible en el código.

**Instrucciones de uso:**

1 Ejecuta el siguiente comando:

```bash
npm run format
```