---
title: "Ejecutando NodeJS"
date: 2020-05-13
categories : [nodejs, course]
author: jhonny111s
lesson_name: Introducción
lesson_order: 1.7
---

--------------
NodeJS es una plataforma runtime javascript que nos permite crear proyectos escalables usualmente aplicaciones del lado del  servidor, aplicaciones de red, api rest etc.

# Ejecución de Archivos JavaScript en Node.js: Desentrañando el Entorno del Servidor

En el vasto ecosistema de desarrollo, Node.js ha emergido como un entorno de ejecución de JavaScript en el lado del servidor. Exploraremos cómo ejecutar archivos JavaScript en Node.js.


## Que es NodeJS

NodeJS es una plataforma runtime javascript que nos permite crear proyectos escalables usualmente aplicaciones del lado del  servidor, aplicaciones de red, api rest etc, es conocido por su eficiencia y rapidez al compilar gracias al motor V8 de google, este motor es el mismo que utiliza el navegador Chrome y nos permite trabajar con la especificación ECMAScript (javascript) sin tener que preocuparnos por la compatibilidad con algún navegador, y esto significa muchas veces no tener que cambiar de lenguaje de programación cuando trabajamos en el backend y en el fronted, además de tener una comunidad inmensa aportando a su desarrollo.

Muchos lenguajes de programación para ejecutar procesos de manera concurrente y no bloquear deben crear hilos y manejar todos los posibles dificultades que esto acarrea, nodejs por el contrario corre en un único hilo que gracias a la librería [libuv](https://github.com/libuv/libuv) podemos ejecutar procesos de entrada y salida de manera asíncrona y no bloqueante.

{% include note.html content="El [event loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout) es un mecanismo para ejecutar procesos de manera no bloqueante y eficiente, que ejecuta nodejs en conjunto con la librería libuv." %}

### Los principales conceptos en NodeJS


- [Programación asíncrona](https://nodejs.org/en/knowledge/getting-started/control-flow/what-are-callbacks/) (callback, promesas, async/await)
- timers (setTimeout, setInterval, setImmediate)
- [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [event loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout)


Si bien programamos con el estándar EmacScrip no significa que nodejs sea igual a javascript en el navegador, para empezar en el navegador nuestra entrada global es `window`, desde donde vamos a poder acceder a funciones sin tener que importarlas como por ejemplo console o Array  (*windows.console*, *windows.array*) además de tener acceso al DOM y algunas API's de la web que no son necesarias en nodejs. En nodejs también tenemos una entrada principal y es `global` (*global.buffer*, *global.Array*), para explorar los objetos podemos utilizar el [CLI](https://nodejs.org/api/cli.html) de nodejs o RELP (**Read-Eval-Print-Loop**), donde podemos ver nuestros módulos core.

~~~bash
> node -p "Object.getOwnPropertyNames(global)"
~~~

## Correr un script con NodeJS

Node.js es un entorno de ejecución de JavaScript en el lado del servidor que permite a los desarrolladores construir aplicaciones backend. A continuación, se describen varias formas de ejecutar archivos JavaScript en Node.js:

### 1. Ejecución con el comando `node`

La forma más común de ejecutar un archivo JavaScript en Node.js es utilizando el comando `node`. Sigue estos pasos:

- Asegúrate de que Node.js esté instalado en tu sistema. Si no lo tienes instalado, puedes descargarlo desde el sitio web oficial de Node.js (https://nodejs.org/).

- Abre tu terminal y navega al directorio donde se encuentra el archivo JavaScript que deseas ejecutar.

- Ejecuta el archivo utilizando el comando `node` seguido del nombre del archivo:

> Para facilitar la gestión de diferentes versiones de Node.js en tu sistema, puedes considerar la instalación de NVM (Node Version Manager). NVM te permite instalar y cambiar entre diferentes versiones de Node.js de manera sencilla. Esto es especialmente útil cuando trabajas en proyectos que requieren versiones específicas de Node.js. Puedes instalar NVM siguiendo las instrucciones en su repositorio en GitHub (https://github.com/nvm-sh/nvm).

```bash
node miarchivo.js
```

### 2. Uso del módulo `eval()`

El módulo `eval()` permite ejecutar código JavaScript desde un archivo. Aunque no se recomienda su uso en entornos de producción debido a riesgos de seguridad, puede ser útil para pruebas o desarrollo. Sigue estos pasos:

```javascript
const fs = require('fs');
const codigo = fs.readFileSync('miarchivo.js', 'utf-8');
eval(codigo);
```

### 3. Ejecución en el REPL de Node.js

El REPL (Read-Eval-Print Loop) de Node.js es una herramienta poderosa para experimentar con código JavaScript de forma interactiva. Para abrir el REPL, simplemente ejecuta el comando `node` en tu terminal. Esto te llevará a un entorno interactivo donde puedes ingresar y ejecutar código línea por línea. Para cargar un archivo JavaScript en el REPL, puedes utilizar el comando `require`:

```javascript
const miArchivo = require('./miarchivo.js');
```

El REPL te permite experimentar y jugar con el lenguaje de una manera interactiva, lo que es valioso para probar funciones y depurar código.

#### Beneficios del REPL

El REPL de Node.js proporciona varios beneficios importantes:

- **Experimentación interactiva**: Te permite probar ideas y conceptos rápidamente sin la necesidad de escribir un archivo separado.

- **Depuración en tiempo real**: Puedes depurar y corregir problemas en tu código a medida que escribes y ejecutas comandos.

- **Exploración de APIs y bibliotecas**: Es útil para explorar bibliotecas y APIs, ya que puedes ver los resultados de las llamadas y entender cómo funcionan.

### Opciones de la linea de comando

Nodejs nos permite interactuar y configurar el runtime por medio de la [linea de comandos](https://nodejs.org/docs/latest-v12.x/api/cli.html) mediante algunas opciones. Podemos ver las opciones con `node --help`.

Unas de las opciones más interesantes son *print* (`-p` o `--print`) y *eval* (`-e` o `--eval`) con los cuales vamos a poder probar rápidamente nuestro código sin tener que crear un archivo y sin tener que importar los módulos ya que en este contexto tenemos acceso a todos los **core**.

~~~bash
> node -p '"My platform is: " + os.platform()'
~~~
