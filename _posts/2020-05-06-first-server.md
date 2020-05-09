---
title: "First Server"
date: 2020-05-06
categories : [nodejs, course]
author: jhonny111s
---

----------------
Los frameworks de NodeJs nos proveen métodos para registrar nuestra ruta, inicializar el servidor y abstraen una cantidad de problemas que ya son resueltos por medio de plugin, módulos o métodos, en este articulo vamos resolver las rutas por nosotros mismos.

## Mi primer servidor con NodeJs 

Un servidor web es como mínimo un servidor http aunque puede ser mucho más, un servidor http es aquel que entiendo las direcciones web (url), permite una comunicación bidireccional entre cliente y servidor, almacena y permite la manipulación de archivos. Entonces nodejs es un entorno de ejecución que nos permite crear aplicaciones y programar del lado del servidor usando javascript e eventos asíncronos. Nodejs es la base de frameworks para crear aplicaciones web como `expressjs`, `fastify`, `nestjs`, entre otros ya que provee una cantidad de módulos que permiten desde la comunicación por http hasta la interacción con el sistema operativo 


{% include note.html content="Para mas información ver [servidor web](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server )" %}


 
## Experimentando 

En este articulo vamos a crear un servidor que responda a una petición `get`, el cual nos devuelve `"hello world"`, como el objetivo es entender el funcionamiento de nodejs vamos a comparar tres frameworks y luego vamos a tratar de replicar ese comportamiento.  

{% include note.html content="Recordemos que un framework se divide en clases, librerías o módulos para abstraer toda la complejidad." %}

### Expressjs 

Expressjs es el framework más conocido para crear aplicaciones web con NodeJs ya que fue uno de los pioneros, se caracteriza por su facilidad y minimalismo. La mayor fortaleza es el uso de middelwares.

{% include badge.html content="Repositorio" repo="https://github.com/jhonny111s/examples/tree/master/firstServer/expressJs-example" %}

~~~bash
// Una vez dentro del proyecto, creamos el packaje.json e instalamos express
> npm init
> npm install express
~~~

~~~javascript
// Inicializa el servidor
var express = require('express');
var app = express(); 

// Agrega las rutas
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Corre la app
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
~~~

### Fastify 

Fastify es un framework enfocado en la eficiencia y velocidad, además de estar actualizado con las últimas tendencias y estándares. Todo en fastify es un plugin.

{% include badge.html content="Repositorio" repo="https://github.com/jhonny111s/examples/tree/master/firstServer/fastify-example" %}

~~~bash
// Una vez dentro del proyecto, creamos el packaje.json e instalamos fastify
> npm init
> npm install fastify
~~~

~~~javascript
// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
~~~

### NestJs 

Nestjs es un framework que trata de comportarse como Angular, usa mucha inyección de dependencias, typescript y básicamente implementa los principios [SOLID](https://medium.com/@cramirez92/s-o-l-i-d-the-first-5-priciples-of-object-oriented-design-with-javascript-790f6ac9b9fa), generando una estructura o forzándonos a programar de una manera. Al día de hoy es el framework más popular.

{% include badge.html content="Repositorio" repo="https://github.com/jhonny111s/examples/tree/master/firstServer/nestjs-example" %}

~~~bash
// nestjs crea toda una estructura de carpetas similar a Angular
// donde cada archivo tiene una unica responsabilidad
> npm i -g @nestjs/cli
> nest new project-name
~~~

~~~javascript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
   // Inicializa el servidor
  const app = await NestFactory.create(AppModule);
  // Corre la app
  await app.listen(3000);
}
bootstrap();
~~~
~~~javascript
// module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
~~~
~~~javascript
// controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Agrega las rutas
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
~~~
~~~javascript
// service.ts
import { Injectable } from '@nestjs/common';

// contenido de la ruta
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
~~~


### NodeJs 

Como pudieron observar los frameworks anteriores ya nos proveen métodos para registrar nuestra ruta, inicializar el servidor y abstraen una cantidad de problemas que ya son resueltos por medio de plugin, módulos o métodos. 

Nos podemos dar cuenta que no tuvimos que pensar en el protocolo http de comunicación, ni cómo manejar los datos según su tipo (texto, imágenes, videos), ni en funcionalidades para leer un stream (buffer de información), o tan siquiera como registrar una ruta. 

Lo que vamos a intentar es crear un servidor y que funcione con una ruta.

{% include badge.html content="Repositorio" repo="https://github.com/jhonny111s/examples/tree/master/firstServer/nodejs-example" %}

~~~javascript
// https://nodejs.org/api/http.html
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

/** Another way to create the server */
// const server = http.createServer();
// server.on("request", function(req, res) {
//   // same code as below
// });

// Inicializa el servidor
const server = http.createServer((req, res) => {
  let body = "";
  let status = 200;
  let headers = {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "text/plain"
  };

   // Agrega las rutas y menaja el error si no existe
  if (req.url === "/" && req.method === "GET") {
    body = "hello world";
    status = 200;
  } else {
    const err = new Error("Not found");
    body = err.message;
    status = 404;
  }

  /** simplified way to add status and multiple headers */
  //res.writeHead(status, headers);

  // debemos tener en cuenta status code, header y en general mucho más
  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain");
  res.end(body);
});

// Corre la app
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
~~~

Cuando creamos un servidor a este se le pasan dos parámetros, `request` y `response` los cuales son unos objetos (`IncomingMessage`) con una cantidad de propiedades y métodos. Para simplificar request es todo lo que entra y response lo que sale, es por eso que para comprobar si una ruta existe debemos verificar sus [propiedades](https://nodejs.org/docs/latest-v13.x/api/http.html#http_class_http_incomingmessage) (*req.url*, *req.method*) y también podemos asignar valores a estas propiedades por medio de métodos (*res.end()*).

Ahora vamos a intentar simular estos métodos para agregar rutas en los otros frameworks, hay que destacar que va ser una abstracción muy sencilla.

~~~javascript
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  /** Route handle */
  req.routes = {
    get: {},
    post: {},
    put: {}
  };

  req.get = function(path, callback) {
    req.routes.get[path] = callback;
  };

  req.post = function(path, callback) {
    req.routes.post[path] = callback;
  };
  /** End route handle */



  /** Routes initialization */

  req.get("/", function(req, res) {
    res.statusCode = 200;
    res.end("hello world");
  });

  req.post("/", function(req, res) {
    res.statusCode = 200;
    res.end("debemos darle un manejo al body ya que es un stream");
  });

  /** End routes initialization */

  /** Server handle */
  const method = req.method.toLowerCase();
  const url = req.url;

  if (
    req.routes[method] &&
    Object.keys(req.routes[method]).indexOf(url) != -1
  ) {
    console.log("existe la ruta");

    req.routes[method][url](req, res);
  } else {
    console.log("No existe la ruta");
    const err = new Error("Not found");
    res.statusCode = 404;
    res.end(err.message);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
~~~

En los frameworks podemos ver que ya tenemos unos métodos (*get*, *post*, *put*) y que solo debemos usarlos, nodejs no nos provee esto y es por eso que cada framework tiene una implementación para agregarlo, en este ejemplo todo lo estamos haciendo en el mismo archivo pero debería estar modularizado.

- El primer paso fue agregar una propiedad al request llamado routes, este es un objeto donde vamos a tener todas nuestras rutas

~~~javascript
routes = {
    get: {
        "/": function(req, res),
        "user": function(req, res),
        ...
        },
    post: { ... },
    put: { ... }
  };
~~~

- El segundo paso es tener unos métodos que nos permitan guardar estas rutas. En este momento se crea uno por cada método http con fines didácticos, pero puede ser uno solo, hay que tener en cuenta que cada método tiene sus propias validaciónes algo que no estamos haciendo.

~~~javascript
req.get = function(path, callback) {
    req.routes.get[path] = callback;
  };
~~~

- El tercer paso es inicializar las rutas y lo hacemos similar pero no igual que en los frameworks.

- El paso final es responder al cliente cuando este envíe una petición, y para eso verificamos si la ruta existe y si es así ejecutamos la función almacenada, de lo contrario enviamos un error.

~~~javascript
if (
    req.routes[method] &&
    Object.keys(req.routes[method]).indexOf(url) != -1
  ) {
    console.log("existe la ruta");

    req.routes[method][url](req, res);
  } else {
    console.log("No existe la ruta");
    const err = new Error("Not found");
    res.statusCode = 404;
    res.end(err.message);
  }
~~~