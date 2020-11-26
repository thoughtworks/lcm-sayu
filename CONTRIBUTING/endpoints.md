## REST client

Para la ejecución de los endpoints que se encuentran en [api/\*](../pages/api/), en vez de optar por algún programa como [Postman](https://www.postman.com/) o [insomnia](https://insomnia.rest/), hemos decidido ocupar archivos [\*.http](../test/__endpoints/), que nos permite escribir las ejecuciones de endpoints como código, permitiéndonos versionar y estandarizar su uso.

Nosotros estamos utilizando [REST client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), para poder utilizarlo correctamente, aun que podrias utilizar cualquier programa compatible con archivos `*.http`, debes crear un archivo llamado `.vscode/settings.json` y agregar el siguiente contenido:

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

1. Autenticarte en SAYU ![foto autenticando](img/authentication.png 'authentication page')
1. Hacer flujo normal hasta [Registro de síntomas](http:localhost:3000/face-scale-screen)
1. En la pantalla de registro de síntoma, abre el inspector del navegador (Firefox/Chrome: `cmd + option + i`) y presiona el botón `Registrar`, revisa el request a `registry-save` en network y revisa sus `headers` y copia la cookie ![alt text](copy-cookie.png 'copy cookie')
1. Copia esa cookie en `localhost.cookie` ![Pegando la cookie en settings.json](img/paste-cookie.png 'paste cookie')
1. Ahora puedes ejecutar los archivos `*.http` ![Ejecutando REST endpoint](img/http-execution.png 'http-execution')
