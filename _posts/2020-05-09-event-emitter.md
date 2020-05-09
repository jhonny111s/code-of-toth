---
title: "Event Emitter"
date: 2020-05-09
categories : [nodejs, course]
author: jhonny111s
---
----------------
Todos los objetos que emiten eventos son instacias de la clase `EventEmitter` y por medio del método `on` podemos registrar listener, mientras que con el método `emit` podemos disparar un evento.


# Que es un evento

{% include badge.html content="Repositorio" repo="https://github.com/jhonny111s/examples/tree/master/eventEmitter" %}

Los eventos son tal vez uno de los dos concepto más importante en nodejs ( `backend `) ya que gran parte de su core esta construido alrededor de este, para la mayoría de desarrolladores de javascript ( `fronted`) son bien conocidos los eventos como por ejemplo hacer click sobre un botón o presionar una tecla donde usamos [addEventListener](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener) el cual se encarga de registrar el evento y reaccionar cada vez que se emita.



~~~html
<div id="prueba"></div>

<script>
  document.getElementById("prueba").addEventListener("click", function( event ) {
    // presentar la cuenta de clicks realizados sobre el elemento con id "prueba"
    event.target.innerHTML = "Conteo de Clicks: " + event.detail;
  }, false);
</script>
~~~

## El modulo event

En nodejs los módulos tienen eventos que nos ayudan a interactuar por medio de `on`,  por ejemplo cuando creamos un servidor con el módulo *http*, podemos suscribirnos al evento `request` y cada que un cliente haga una petición vamos a poder obtener datos como la ruta y el método que requieren para asi reaccionar con la respuesta adecuada.

{% include note.html content="Es importante que sea un evento ya que no va bloquear nuestro servidor por lo tanto podemos tener multiples request por conexión." %}
 
~~~javascript
const server = http.createServer();
server.on('request', (request, response) => {
  //request es un stream que emite eventos
});
~~~

Otra ejemplo es el modulo *filesystem* donde podemos monitorial cualquier cambio en un directorio o archivo por medio del evento `change`, en este caso fs.watch es el encargado de manejar este listener.

~~~javascript
fs.watch('.', { encoding: 'buffer' }, (eventType, filename) => {
    if (filename) {
      console.log(filename.toString());
    }
  });
~~~


Todos los objetos que emiten [eventos](https://nodejs.org/docs/latest-v13.x/api/events.html) son instacias de la clase `EventEmitter` y por medio del método `on` podemos registrar listener, mientras que con el método `emit` podemos disparar un evento, en el siguiente código vamos a registrar el evento *event*, lo podemos llamar como queramos la convención es que sea camel-case, aquí solo imprimimos un mensaje si es llamado, y emit se encarga de llamarlo.

~~~javascript
const EventEmitter = require('events');
// podemos modificar el comportamiento de un event o agragar metodos
class MyEmitter extends EventEmitter {}

//const myEmitter = new EventEmitter();
const myEmitter = new MyEmitter();
myEmitter.on('event', (param) => {
  console.log('an event occurred!', param);
});
myEmitter.emit('event', 'param);
~~~

## conclusiones

- En general tenemos un modulo muy potente que nos permite encapsular un comportamiento a traves de un event emitter y tener interfaces más limpias.
- Es un patron de diseño publish/suscribe.
- Podemos usarlo en cualquier parte del código (bajo acoplamiento).
- Es usual utilizarlo para extender la funcionalidad de nuestra aplicación de forma no bloqueante, por ejemplo mandar un [correo](https://github.com/jhonny111s/examples/blob/master/eventEmitter/login.js) cuando se registre un usuario, o usar un logger.
- Se puede decir que los event-driven son la base teórica de lo que hoy son los observables, sin querer decir que funcionan igual.