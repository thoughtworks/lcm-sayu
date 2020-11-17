# Tips para desarrollo

- IDE: VSCode
- Lenguaje: Typescript
- Framework: NextJS

## Comandos para:

### levantar la base de datos y aplicación en modo desarrollo

`make dev`

### levantar solo el servidor en modo desarrollo

`yarn dev`

### crear imagen docker en local con la app, para ver cómo funcionaría en ambiente de producción

`make build`

### crear imagen docker en local

`make build image`

### ejecutar imagen docker

`make run`

## REST client

Para la ejecucion de los endpoints que se encuentran en /api/\*, utilizamos [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), para poder utilizarlo correctamente, debes crear un archivo llamado `.vscode/settings.json` y agregar el siguiente contenido:

```json
{
  "rest-client.environmentVariables": {
    "$shared": {},
    "local": {
      "host": "http://localhost:3000",
      "cookie": "devcookie"
    },
    "production": {
      "host": "http://lcm-sayu-alb-dev-37544665.us-west-2.elb.amazonaws.com",
      "cookie": "prodcookie"
    }
  }
}
```

Debes reemplazar los valores de `cookie` por una cookie real con los siguientes pasos

1. Autenticarte en SAYU ![alt text](authentication.png 'authentication page')
1. Hacer flujo normal hasta [Registro de sintomas](http:localhost:3000/face-scale-screen)
1. En la pantalla de registro de sintoma, abre el inspector del navegador (Firefox/Chrome: `cmd + option + i`) y presiona el boton `Registrar`, revisa el request a `registry-save` en network y revisa sus `headers` y copia la cookie ![alt text](copy-cookie.png 'copy cookie')
1. Copia esa cookie en `localhost.cookie` ![alt text](paste-cookie.png 'paste cookie')
1. Ahora puedes ejecutar los archivos `*.http` ![alt text](http-execution.png 'http-execution')
