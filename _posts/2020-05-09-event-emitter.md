---
title: "Event Emitter"
date: 2020-05-09
categories : [nodejs, course]
author: jhonny111s
lesson_name: Modulos core
lesson_order: 3.3
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

En nodejs la gran mayoría módulos tienen eventos que nos ayudan a interactuar por medio de `on`,  por ejemplo cuando creamos un servidor con el módulo *http*, podemos suscribirnos al evento `request` y cada que un cliente haga una petición vamos a poder obtener datos como la ruta y el método que requieren para asi reaccionar con la respuesta adecuada.

{% include note.html content="Es importante que sea un evento ya que no va bloquear nuestro servidor por lo tanto podemos tener multiples request por conexión." %}
 
~~~javascript
const server = http.createServer();

server.on('request', (request, response) => {
  //request es un stream que emite eventos
  const res = `Method: ${request.method}, URL: ${request.url}`
  console.log(res);
  response.end(res)
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
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


Todos los objetos que emiten [eventos](https://nodejs.org/docs/latest-v13.x/api/events.html) son instacias de la clase `EventEmitter` y por medio del método `on` podemos registrar listener, mientras que con el método `emit` podemos disparar un evento, en el siguiente código vamos a registrar el evento *event*, lo podemos llamar como queramos, la convención es que sea camel-case, aquí solo imprimimos un mensaje si es llamado, y emit se encarga de llamarlo.

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

### Ejemplo practico

Consideremos un sistema simple de monitoreo de temperatura en el que tenemos múltiples sensores y un módulo central encargado de procesar y tomar decisiones basadas en las lecturas de temperatura. Utilizaremos EventEmitter para la comunicación entre los sensores y el módulo central.



**Archivo `temperatureController.js`**

```javascript
const TemperatureSensor = require('./temperatureSensor');
const EventEmitter = require('events');

class TemperatureController extends EventEmitter {
  constructor() {
    super();
    this.sensors = [];
  }

  // Función para agregar un sensor al controlador
  addSensor(sensor) {
    this.sensors.push(sensor);
    // Escuchar eventos de lectura de temperatura del sensor
    sensor.on('temperatureRead', ({ sensorId, temperature }) => {
      console.log(`Sensor ${sensorId} leyó temperatura: ${temperature.toFixed(2)}°C`);
      // Tomar decisiones basadas en la lectura de temperatura
      this.emit('temperatureDecision', { sensorId, temperature });
    });
  }

  // Función de toma de decisiones
  sensorAlert({ sensorId, temperature }) {
    if (temperature > 30) {
      console.log(`¡Alerta! Temperatura alta detectada en el Sensor ${sensorId}.`);
    } else {
      console.log(`Temperatura normal en el Sensor ${sensorId}.`);
    }
  }
}

// Exportar la clase del controlador de temperatura
module.exports = TemperatureController;
```

**Archivo `index.js`**

```javascript
const TemperatureSensor = require('./temperatureSensor');
const TemperatureController = require('./temperatureController');

// Crear instancias de sensores de temperatura
const sensor1 = new TemperatureSensor(1);
const sensor2 = new TemperatureSensor(2);

// Crear instancia del controlador de temperatura
const controller = new TemperatureController();

// Agregar sensores al controlador
controller.addSensor(sensor1);
controller.addSensor(sensor2);

// Escuchar eventos de toma de decisiones
controller.on('temperatureDecision', (decision) => {
  // Tomar decisiones basadas en la lectura de temperatura
  controller.sensorAlert(decision);
});

// Leer temperaturas cada 3 segundos (simulación)
setInterval(() => {
  sensor1.readTemperature();
  sensor2.readTemperature();
}, 3000);
```

*TemperatureSensor* es una clase que simula la lectura de temperatura y emite eventos cuando la temperatura es leída.

*TemperatureController* es una clase que agrega sensores y toma decisiones basadas en las lecturas de temperatura.

En *index.js*, creamos instancias de sensores y del controlador de temperatura. Luego, leemos las temperaturas de los sensores cada 3 segundos (simulación).

Este ejemplo ilustra cómo EventEmitter facilita la comunicación entre diferentes partes del sistema, permitiendo que los sensores notifiquen al controlador sobre las lecturas de temperatura y tomen decisiones basadas en esas lecturas.

## conclusiones

- En general tenemos un modulo muy potente que nos permite encapsular un comportamiento a traves de un event emitter y tener interfaces más limpias.
- Es un patron de diseño publish/suscribe.
- Podemos usarlo en cualquier parte del código (bajo acoplamiento).
- Es usual utilizarlo para extender la funcionalidad de nuestra aplicación de forma no bloqueante, por ejemplo mandar un [correo](https://github.com/jhonny111s/examples/blob/master/eventEmitter/login.js) cuando se registre un usuario, o usar un logger.
- Se puede decir que los event-driven son la base teórica de lo que hoy son los observables, sin querer decir que funcionan igual.