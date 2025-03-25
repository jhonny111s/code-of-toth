---
title: "Módulos básicos"
date: 2020-07-02
categories : [nodejs, course]
author: jhonny111s
lesson_name: Modulos core
lesson_order: 3.1
---

--------------
Nodejs cuenta con unos módulos core que son la base para llevar a cabo cualquier tarea, en este apartado nos centraremos en los módulos mas sencillo.

# Modulos basícos

{% include badge.html content="Repositorio" repo="https://github.com/jhonny111s/examples/tree/master/core-basics" %}

Nodejs cuenta con unos módulos core que son la base para llevar a cabo cualquier tarea, en este apartado nos centraremos en los módulos mas sencillos, los cuales basta leer su documentación para comprenderlos sin tener que entrar en mucho detalle, y en general son utilidades para obtener información del sistema, manipular direcciones ya se web o archivos, hacer debugging o pruebas de código.

## Assert

El modulo `assert` nos provee funciones básicas que se encargan de verificar un comportamiento y si este no se cumple se lanza un error, la principal ventaja de los assert de nodeJS es que nos permiten obtener errores de forma clara gracias al stack trace de v8.

{% include note.html content="[Stack trace API](https://v8.dev/docs/stack-trace-api), se encarga de mostrarnos la ruta hasta el momento en que se genero un error y de esta manera entender en que archivo y linea puede estar el problema." %}

Muchos frameworks (jasmine, jest, mocha, tap, ava) para ejecutar pruebas unitarias utilizan librerías de assertion como chai, must, expect, should, etc; estas librerías lo que intentan es describir nuestros test en un lenguaje natural (should.be.equal), que sea fácilmente comprensible además de asegurar la compatibilidad entre versiones de un navegador si estamos trabajando en el frontend.

~~~javascript
// Debemos usar el modo strict para así
// evitar los métodos deprecados
const assert = require('assert').strict;

try {
  // assert.deepStrictEqual
  assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
  // assert.Equal
  // assert.notEqual
  // assert.ok
} catch (err) {
  // Propiedades del error
  console.log(err);
}
~~~

Podemos explorar diferentes assertions sin embargo no es muy común utilizar esta modulo gracias a librerías mucho más especializadas.

> Node recientemente libero un nuevo modulo llamado test, el cual vamos a explorar en más detalle en otro articulo, donde podremos usar tambien assert para crear unit test sin usar librerias extras.

## path

El modulo `path` provee utilidades para trabajar con rutas de archivos y directorios, permitiendo un correcto y consistente comportamiento entre diferentes sistemas operativos, recordemos que las rutas en windows no se comportan de la misma manera que en linux.

~~~javascript
const path = require('path');

// ruta del archivo actual
const myFile = __filename;
//ruta del directorio actual
const myDir = __dirname;

// Obtiene la ultima porción de la ruta
// en este caso el nombre del archivo
console.log(path.basename(myFile));
// Obtiene la ruta del directorio
// sin el nombre del archivo
console.log(path.dirname(myFile));
// Obtiene la extensión del archivo
console.log(path.extname(myFile));
// le agrega a la ruta dada, un segmento de ruta
console.log(path.join(myDir, 'path01.js'));
// elimina segmentos de separación innecesarios
console.log(path.normalize(myDir + '///wrong'));
// devuelve un ruta descompuesta en sus partes
console.log(path.parse(myFile));
~~~

## url

El modulo `url` nos provee una cantidad de utilidades orientadas a manipular y estandarizar una dirección que puede ser una pagina web o una ubicación en nuestro sistema operativo de un archivo.

~~~javascript
const url = require('url');

// En node podemos crear un objeto de una url de dos maneras
// con new URL y con parse del modulo url
// la diferencia son algunos campos de más en el objeto y los
// métodos que vamos a usar con el modulo url
const globalURL =
    url.parse('http://user:pass@www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument');
const moduleURL =
    new URL('http://user:pass@www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument')

console.log(globalURL);
console.log(moduleURL);

// Busco el valor de un parámetro del query
console.log(moduleURL.searchParams.get('key1'));
// Agrego un parámetro a la query
moduleURL.searchParams.append('abc', 'xyz');
console.log(moduleURL.href);

// Se encarga de crear una query
const params = new URLSearchParams([
    ['user', 'abc'],
    ['query', 'first'],
    ['query', 'second']
  ]);
console.log(params.toString());
~~~

`new URL()` es una forma compatible con el estandar que manejan los navegadores para trabajar con urls y en terminos practicos es el que deberiamos usar, podemos hacer lo mismo con cualquiera de los dos, sin embargo require(url) se considera legacy.

## querystring

El modulo `querystring` es utilizado en el modulo url, y usualmente no se usa directamente, podemos verlo con la clase URLSearchParams de url.

~~~javascript
const querystring = require('querystring');

// Devuelve los parámetros de un query como un objeto
const myQuery = 'foo=bar&abc=xyz&abc=123'
console.log(querystring.parse(myQuery));

// Devuelve un objeto como una cadena de una query
const myObject = { foo: 'bar', abc: [ 'xyz', '123' ] }
console.log(querystring.stringify(myObject));
~~~

## console

El modulo `console` es tal vez el modulo más conocido porque nos permite imprimir en nuestra terminal, console es un writable stream esto significa que podemos configurarlo para escribir nuestra respuestas y errores en algún lado (por defecto `stdout` y `stderr`), y ademas nos provee muchas más utilidades que un simple log.

~~~javascript
// Imprimimos una cadena
console.log('hello world');
// Imprimimos una cadena con formato 
console.log('hello %s', 'world2');

// Agrupamos por un label, se ve una identación
console.group(['COUNT'])
    // Muestra un contador por label
    console.count('word');
    console.count('word');
console.groupEnd();

// Con dir podemos expandir las propiedades
console.dir(global.console, {'showHidden': true}  );

// Imprime un error
// la diferencia con log es la ubicación en el sistema donde se escribe
console.error('error #%d', 1);

// Table nos permite organizar los datos en filas y columnas
console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);

// Nos permite imprimir el stack trace
console.trace("check here!");

// time lo usamos para calcular el tiempo al ejecutar una operación.
console.time('process');
console.timeLog('process', 42);
setTimeout(() => {
    console.timeStamp('process');
    console.timeEnd('process');
}, 100);
~~~

## string_decoder

El modulo `string_decoder` nos permite decodificar un buffer y convertirlo a string sin que se dañe la codificación, es utilizado por el modulo buffer.

~~~javascript
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

// https://www.fileformat.info/info/unicode/char/20ac/index.htm
const euro = Buffer.from([0xE2, 0x82, 0xAC]);
console.log(decoder.write(euro));


decoder.write(Buffer.from([0xE2]));
decoder.write(Buffer.from([0x82]));
console.log(decoder.end(Buffer.from([0xAC])));
~~~

## os

El modulo `os` nos brinda utilidades muy generales para obtener información relacionada al sistema operativo, como la arquitectura, información de la memoria, cpus y algo muy importante las constantes donde podemos encontrar todas las [signals](https://man7.org/linux/man-pages/man7/signal.7.html), que básicamente se encargan de identificar el comportamiento de un proceso (inicio, aborto, termino, etc). Os junto con otros módulos como process nos permitiría tener un sistema para recolectar estadísticas (pm2, statsD).

~~~javascript
const os = require('os');

console.log('UserInfo:', os.userInfo());
console.log('version:', os.version());
console.log('cpus:', os.cpus());
console.log('architecture:', os.arch());
console.log('totalmem:', os.totalmem());
console.log('freemem:', os.freemem());
console.log('homedir:', os.homedir());
console.log('constants:', os.constants);
~~~

## util

El modulo `util` recoge algunas utilidades con diversos propósitos usados internamente en node, tenemos utilidades muy valiosas que podemos usar con nuestro código, sin embargo recordemos que tenemos un ecosistema de paquetes enormes con **npm** que pueden proporcionarnos mejores utilidades.

~~~javascript
const util = require('util');
const fs = require('fs');

// callbackify
// Convierte una promesa a callback
async function fn() {
  return 'hello world';
}

const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  if (err) throw err;
  console.log(ret);
});


//promisify
// Convierte un callback en promesa
const stat = util.promisify(fs.stat);

stat('.').then((stats) => {
  console.log(stats);
}).catch((error) => {
  console.log(error);
});

// Le da formato a una cadena, es usado en el console
console.log(util.format('%s:%s', 'foo', 'bar', 'baz'));


fs.access('file/that/does/not/exist', (err) => {
  console.log(err);
  // Obtiene el nombre a partir de un código de error de node
  const name = util.getSystemErrorName(err.errno);
  console.error(name); // ENOENT
});
~~~