---
title: "Event loop"
date: 2020-07-07
categories : [nodejs, course]
author: jhonny111s
lesson_name: Conceptos Avanzados
lesson_order: 2.7
---

--------------

# Event loop

El event loop es un mecanismo para hacer a Nodejs asíncrono y eficiente al trabajar en un solo hilo, esto significa que vamos a tener un listado de tareas (call stack) que van a pasar por unas fases y el  sistema operativo se va encargar de las operaciones pesadas mientras continuamos esperando más entradas al stack.


## Call stack

Nuestro programa o script va empezar por la función que inicializa todo y a partir de esta va a empezar a agregarlas en una cola LIFO (ultimo en entrar, primero en salir), cada uno de estos elementos de la cola van a pasar por el event loop para así resolverse.

~~~javascript
// index.js
function bar () {
    console.log('bar')
}
function foo () {
    console.log('foo')
    bar();
}

foo()
~~~

~~~bash
FIFO                    _______
                       |console|
        _______  _____ |_______| _____  
  IN   |console||bar()||bar()  ||bar  |  OUT
 __↓__ |_______|| ____||_______||_____| __↑_
|foo()|| foo() ||foo()||foo()  ||foo()|| foo|
|_____||_______||_____||_______||_____||____|


> init foo()
-- > | foo() | --> | console | --> 'foo'
-- > | foo() | --> | bar() | --> | console | --> 'bar'
-- > | foo() | --> remove bar()
--> remove foo()
> finish
~~~

En este ejemplo se abstraen las fases necesarias para poder resolver la función *foo* y asi entender nuestro primer concepto, el `call stack`.

## Fases

Nuestro event loop tiene 6 fases y cada una con una responsabilidad, cada fase funciona como una cola FIFO (primero en entrar, primero en salir)y siempre que terminamos ese ciclo y volvemos a empezar lo llamamos una marca (tick).

![Event Loop]({{site.url}}/assets/images/eventloop.png)

- timers: En esta fase se ejecutan los callback que tienen un tiempo programado (`setTimeout()` and `setInterval()`).
- pending callbacks: Esta fase ejecuta un callback que debe esperar una operación no bloqueante I/O. Casi todo en nodejs son callbacks.
- idle, prepare: Esta fase es usada internamente por node para ejecutar operaciones y preparar la siguiente fase, por eso no se muestra en la imagen.
- poll: Esta fase es el director, se encarga de realizar las operaciones I/O y de verificar que operación ha terminado para ejecutarla y de agregar entradas a las fases.
- check: Esta fase ejecuta un callback inmediatamente despues del poll  (`setImmediate()`)
- close callbacks: cierra algunos tipos de callback como un socket.

### Introducción

Para empezar con un ejemplo muy sencillo, vamos a tomar una función *foo* que a su vez llama otras funciones, al solo tener consoles no va repercutir en el event loop ya que el console lo ejecuta node.

~~~javascript
function bar() {
  console.log('bar')
}

function baz() {
  console.log('baz')
}

function foo() {
  console.log('foo')
  bar()
  baz()
}

foo()

/**
- entra foo al call stack
- entra el console y lo ejecuta, sale del stack
- entra bar al call stack
- entra el console y lo ejecuta, sale del stack
- sale bar del stack
- entra el baz al call stack
- entra el console y lo ejecuta, sale del stack
- sale baz del stack
- sale foo del stack
- finaliza
*/
~~~

![event loop example 1]({{site.url}}/assets/images/loop01.png)

### Timers

Los [timers](https://nodejs.org/api/timers.html) son la primera fase del event loop y son funcionalidades que nos permiten ejecutar algo en un tiempo programado

- setTimeout: se invoca un callback después de alcanzar como mínimo el tiempo que se pasa como parámetro (puede demorar un poco más).

    `setTimeout(callback, delay);`

- setInterval: se invoca un callback repetidamente cada cierto tiempo.

    `setInterval(callback, delay)`

El siguiente ejemplo introduce el concepto de tener una función que se resuelve después de un tiempo determinado.

~~~javascript
function bar() {
    console.log('bar')
}

function baz() {
    console.log('baz')
}

function foo() {
    console.log('foo');
    setTimeout(() => {
        bar();
    }, 100);
    baz();

}

foo()

/**
- entra foo al call stack
- entra el console y lo ejecuta, sale del stack
- entra el setTimeOut y el event loop programa el tiempo
- entra el baz al call stack
- entra el console y lo ejecuta, sale del stack
- sale baz del stack
- se verifica si ya termino el tiempo de setTimeout y se libera bar
- Entra bar al call stack
- entra el console y lo ejecuta, sale del stack
- sale bar del stack
- sale foo del stack
- finaliza
*/
~~~

![event loop example 2]({{site.url}}/assets/images/loop02.png)

Como se puede observar en la imagen cuando entra al event loop setTimeout, primero entra a la fase de timer donde va a comenzar a registrar el paso del tiempo, luego va a poner pendiente el callback que contiene la función *bar*, mientras la fase de poll esta constantemente preguntando si algo se libero para ejecutarlo.

### Check/setImmediate

En la fase de check se ejecuta setImmediate() y básicamente lo utilizamos cuando queremos ejecutar una pieza de código asíncrono lo mas pronto posible esto después de la fase poll. para comprender mejor vamos a comparar setTimeout con un delay de cero y setImmediate en dos diferentes circunstancias.

~~~javascript
function foo() {
    setTimeout(() => console.log('1'), 0);
    setImmediate(() => console.log('2'));
  }
  
foo();
  
/**
 - entra foo al call stack
 - setTimeout y setImmediate se agregan al event loop cada uno en su fase
 - entra a la fase de timer y comienza el conteo
 - entra a la fase de pending callback y agrega el callback con el console
 - entra a la fase de poll y pregunta si existe algo para ejecutar
 - pueden pasar dos cosas. 1) setTimeout esta listo para ejecutarse, 2) continuar
 - al entrar a la fase de check se ejecuta setImmediate
 - finaliza
 */
~~~

![event loop example 3]({{site.url}}/assets/images/loop03.png)

En este ejemplo podemos tener dos respuestas dependiendo de lo rápido que nuestro ordenador ejecute un proceso, recordemos que usamos un delay de cero con setTimeout por lo tanto al llegar a la fase de poll, puede estar listo o no.

> setImmediate se ejecutara primero, incluso si hay timers programados con tiempos de retardo más cortos que el de setImmediate. Sin embargo, es importante tener en cuenta que esta prioridad se aplica solo dentro del mismo ciclo de event loop. Si hay setImmediate y timers programados en ciclos de event loop posteriores, se respetará el orden de ejecución original según los tiempos de retardo.

~~~javascript
const fs = require('fs');

function foo() {
  fs.readFile(__filename, () => {
    setTimeout(() => console.log('1'), 0);
    setImmediate(() => console.log('2'));
  });
}

foo();

/**
 - entra foo al call stack
 - readFile se agregan al event loop, en la fase poll
 - como no hay nada más, esperamos hasta que este listo readFile
 - entra settimeout y setimmediate cada uno en su fase
 - sigo en la fase poll, por lo tanto debe mantener ese orden
 - entra a la fase check y ejecuta siempre primero setimmediate
 - entra a la fase de timer y comienza el conteo
 - entra a la fase de pending callback y agrega el callback con el console
 - entra a la fase de poll y pregunta si existe algo para ejecutar
 - ejecuta el callback de setTimeout
 - finaliza
 */
~~~

![event loop example 4]({{site.url}}/assets/images/loop04.png)

En este ejemplo tenemos algo muy similar al anterior, la diferencia radica en que existe un callback de readfile que contiene settimeout y setimmediate. En este ejemplo siempre se va a ejecutar setImmediate primero y esto se debe a que cuando estamos dentro de un callback nos vamos a encontrar en una fase en este caso poll (ejecutamos toda operación I/O) y debemos continuar en el orden.

{% include note.html content="setImmediate siempre se va ejecutar antes de cualquier timer (no importa cuantos), siempre y cuando se encuentren en un ciclo I/O" %}

### process.nextTick

nextTick no hace parte del event loop, sin embargo se prioriza sobre cualquier otra fase del event loop, en terminos generales un tick es cuando se han terminado de consumir todas las fases y vuelve a comenzar.

~~~javascript
function foo() {
    setTimeout(() => console.log('1'), 0);
    process.nextTick(() => console.log('2'));
    setImmediate(() => console.log('3'));
    process.nextTick(() => console.log('4'));
}

foo();

/**
- entra foo al call stack
- se agregan los nextTick al principio del event loop y se ejecutan
- setTimeout y setImmediate se agregan al event loop cada uno en su fase
- entra a la fase de timer y comienza el conteo
- entra a la fase de pending callback y agrega el callback con el console
- entra a la fase de poll y pregunta si existe algo para ejecutar, no!
- entra a la fase check y ejecuta el setImmediate
- vuelve a empezar hasta ejecutar el timeout
- finaliza
*/
~~~

![event loop example 5]({{site.url}}/assets/images/loop05.png)

En el ejemplo anterior se priorizan los tick y van a ser lo primero en entrar al event loop, por lo tanto se ejecutan los dos consoles, y luego continua trabajando como lo hemos estado haciendo.

~~~javascript
const fs = require('fs');

function foo() {
  setTimeout(() => console.log('1'), 1000);
  setImmediate(() => console.log('2'));

  fs.readFile(__filename, (err, buff) => {
    setTimeout(() => {
      console.log('3');
    }, 0);

    process.nextTick(() => {
      console.log('process.nextTick');
    });

    setImmediate(() => console.log('4'));
  });

  setImmediate(() => console.log('5'));
}

foo();

/**
 - entra foo al call stack
 - setTimeout y setImmediate se agregan al event loop cada uno en su fase
 - readFile y setImmediate se agregan al event loop cada uno en su fase
 - entra a la fase de timer y comienza el conteo
 - entra a la fase de pending callback y agrega el callback con el console y el readFile
 - entra a la fase de poll y pregunta si existe algo para ejecutar, no!
 - entra a la fase de check se ejecutan los setImmediate, primero en entrar primero en salir
 - comienza de nuevo el event loop, llega a pool y esta listo readFile
    - setTimeout y setImmediate se agregan al nuevo event loop cada uno en su fase
    - se ejecutan los nextTick al principio
    - continuamos en la fase de pool, debemos seguir en ese orden
    - entra a la fase de check se ejecutan los setImmediate
    - comienza de nuevo el event loop hasta ejecutar el setTimeout
    - sale del event loop de readfile
 - ejecuta el setTimeout del loop principal
 - finaliza
 */
~~~

![event loop example 6]({{site.url}}/assets/images/loop06.png)

El ejemplo anterior muestra la misma teoria todo junto, para estudiarla e interirorizar los pasos

links

[1](https://dev.to/lunaticmonk/understanding-the-node-js-event-loop-phases-and-how-it-executes-the-javascript-code-1j9)

[2](https://heynode.com/tutorial/how-event-loop-works-nodejs)

[3](https://heynode.com/tutorial/explore-timers-phase-nodes-event-loop)

[4](https://heynode.com/tutorial/explore-io-callbacks-phase-nodejs-event-loop)

[5](https://davidhettler.net/blog/event-loop-lag/)

[6](https://www.dynatrace.com/news/blog/all-you-need-to-know-to-really-understand-the-node-js-event-loop-and-its-metrics/)

[7](https://nodejs.dev/learn/the-nodejs-event-loop)

[8](http://latentflip.com/loupe/)

[9](https://medium.com/@deedee8/event-loop-cycle-in-node-js-bc9dd0f2834f)

[10](https://developer.ibm.com/technologies/node-js/tutorials/learn-nodejs-the-event-loop/)