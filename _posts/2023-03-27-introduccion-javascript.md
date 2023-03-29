---
title: "Introducción a javascript"
date: 2023-03-27
categories: nodejs course javascript
author: jhonny111s
---

--------------
Es un lenguaje dinámico y débilmente tipado porque no debemos declarar el tipo de una variable, por ejemplo si va ser de tipo número o cadena, sino que el intérprete lo hace el mismo cada vez que lee una línea y si encuentra un error lo muestra inmediatamente..

# Introducción a javascript

Javascript es un lenguaje de programación que nace de la necesidad de desarrollar funcionalidades para los navegadores web de manera rápida y flexible, se caracteriza por ser un lenguaje interpretado, dinámico, débilmente tipado y orientado a objetos.

Existen diferentes tipos de lenguajes: los compilados donde todo nuestro código debe estar listo para que sea revisado y los lenguajes interpretados son aquellos que se revisan línea a línea.

Es un lenguaje dinámico y débilmente tipado porque no debemos declarar el tipo de una variable, por ejemplo si va ser de tipo número o cadena, sino que el intérprete lo hace el mismo cada vez que lee una línea y si encuentra un error lo muestra inmediatamente.

Es orientado a objetos porque nos permite usar este paradigma de programación sin limitarnos solo a este, ya que podemos usar no solo objetos sino también funciones.


javascript está basado en un estándar internacional llamado `Ecmascript`, el cual define cómo debe funcionar y que tipo de características debe de tener el lenguaje sin entrar a explicar cómo implementarlo (cada plataforma puede tener su propia implementación y diferencias), con la adopción y popularidad de javascript se quiso migrar todo estos beneficios y su gran comunidad a otras esferas como aplicaciones móviles, aplicaciones de escritorio y aplicaciones de servidor usando la misma sintaxis de javascript, pero debemos recordar que pueden existir diferencias y limitaciones según la plataforma que estemos trabajando, por ejemplo javascript para el navegador nos permite trabajar con diferentes APIs web para interactuar con el navegador, lo que no tendría sentido en un servidor donde necesitamos interactuar con el sistema operativo de alguna manera.

Javascript al ser un lenguaje interpretado que funciona bajo un motor de javascript o una máquina virtual si se le quiere llamar de otra manera, es el encargado de comunicarse con el navegador, la computadora o el móvil, es por esto que cada navegador tiene su propio motor y existen diferentes tipos de motores según la plataforma que se está usando.

- tenemos javascript para los navegadores donde google chrome usa el motor v8 y firefox usa su motor spidermonkey.
- tenemos nodejs para los servidores donde su motor es v8.
- tenemos electrón para las aplicaciones de escritorio donde su motor es v8 por medio de chromium.
- tenemos react native para los dispositivos android y apple con su motor hermes.


https://rockcontent.com/blog/scripting-languages/
https://www.freecodecamp.org/news/compiled-versus-interpreted-languages/
https://es.javascript.info/intro


## tópicos básicos

Vamos a explorar algunos conceptos básicos que son por lo general comunes en todos los lenguajes de programación y nos servirán para entender cómo funciona javascript, en este caso todos los ejemplos se van a realizar usando Nodejs y no se va explorar nada relacionado con el navegador.


### variables

Las variables son contenedores o cajas donde podemos guardar valores y en javascript debemos usar unas palabras reservadas (**var**, **let**, **const**) para definirla, también existen unas reglas y consensos para su nombramiento y además es buena práctica terminar con punto y coma.

~~~javascript
// bien
let nombre = 'daniela';
let yearsInDays= 1000;
const PI = 3.1416;

// mal
let 2nombre = daniela
const pi = 3.1416
let yearsindays = 1000
~~~


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variables
https://www.codecademy.com/resources/blog/your-guide-to-semicolons-in-javascript/



### Tipos de datos

En javascript existen 8 [Tipos de datos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values), los cuales nos permiten aplicar diferentes operaciones sobre el dato o conocer alguna información. En general todo en javascript es un objeto y es por eso que los tipos tienen propiedades y métodos.

{% include note.html content="Los tipos primitivos que son 7 y no incluyen a object  usualmente tienen un capa de código que les permite exponer métodos y propiedades a excepción de null y undefined." %}


#### Number 

Este tipo de datos representa [números](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) enteros y de punto flotante y básicamente podemos utilizar todas las operaciones matemáticas.

cuando trabajamos con números debemos tener en cuenta que cuando queremos trabajar con números muy grandes y con alta precisión, number no va ser nuestra mejor elección porque lo que va hacer es aproximar los números que sean mayores a 2<sup>53</sup>+ 1

~~~javascript
// bien
const BIGGEST_INT = Number.MAX_SAFE_INTEGER; // 9007199254740991
let age = 18
let score = 17.8

// cuidado
const x = Number.MAX_SAFE_INTEGER + 1;
const y = Number.MAX_SAFE_INTEGER + 2;
console.log(x === y)  // true
~~~

#### Bigint 

[bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) representa valores numéricos muy grandes con los cuales queremos tener alta precisión, usualmente agregamos una `n` al numero para que javascript sepa que es un bigint.

~~~javascript
let bigN = 2n ** 54n

const x = BigInt(Number.MAX_SAFE_INTEGER) + 1n;
const y = BigInt(Number.MAX_SAFE_INTEGER) + 2n;
console.log(x === y) // false
~~~


#### String 

Los [strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) son un cadena de caracteres, esto significa que tenemos un texto donde cada símbolo o letra es un carácter, lo podemos escribir entre 'comillas simples', "comillas dobles" o \`comilla invertida\` (acento grave) para generar un template literal.

~~~javascript
let name = "Daniela";
let drink = 'milk';
let quote = `la escritora ${name} le gusta beber ${drink}`;
let concatStrings = "uno" + "dos";

let Upper = "bebe".toUpperCase()
~~~

#### Boolean 

los datos [booleanos](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) son valores que representan un valor de verdad, osea verdadero o falso, prendido o apagado, 0 o 1. lo podemos asignar a una variable con los valores true o false, o aplicando una operación comúnmente de comparación.

~~~javascript
let isOld = true;
let isMyFriend = false;
let isGreaterThan = 5 > 4
let exist = !!undefined;
~~~

#### null 

[null](https://developer.mozilla.org/en-US/docs/Glossary/Null) por si solo es un dato en javascript, sin embargo existe un bug el cual dice que es un objeto y no se ha corregido por el problema que generaría este cambio en muchos programas. null representa vacío, o desconocido (un ejemplo se nos termino el papel y nos quedo solo el rollo de cartón)

~~~javascript
let game = null;
~~~

#### undefined

[undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) es otro tipo de dato que representa que no se ha asignado un valor (un ejemplo no hay rollo de papel)

~~~javascript
let name; // undefined
let age = undefined;
~~~

#### object

Los objetos son un tipo de dato que pueden almacenar estructuras más complejas y puede contener todos los otros tipos de datos primitivos y aquí debemos recordar que tenemos propiedades y métodos que nos va permitir hacer muchas cosas, dependiendo del objeto podemos tener más o menos métodos que nos van a permitir interactuar.

~~~javascript
let car = {
    type: "sedan",
    name: "ford fusion",
    hasDebt: true
}

let library = Math;
let currentDate = new Date();
let structureMap = new Map();
let myArray = [1, 2, "jose", {}]
~~~

#### symbol 

el tipo [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) es un dato que no es muy usado, pero básicamente nos permite crear un valor único que no pueden cambiar.

~~~javascript
const value1 = Symbol('hello');
console.log(value1.description);
~~~











 



https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/up%20%26%20going/ch2.md
https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-javascript
https://es.javascript.info/types

