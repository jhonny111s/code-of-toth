---
title: "Child process"
date: 2020-09-10
categories : [nodejs, course]
author: jhonny111s
---

--------------
El fork es un caso especial de *spawn* donde vamos a tener la capacidad de comunicar de manera bidireccional el proceso principal y el proceso hijo por medio de un protocolo interno de comunicación.

# Child process

El modulo *child_process* se encarga de generar procesos, por medio de los procesos podemos correr comandos como en una terminal, por lo tanto nos permite interactuar con el sistema operativo y es ideal para correr tareas con alta carga de CPU de manera aislada (procesos en segundo plano) y así no afecte nuestro proceso principal.

{% include note.html content="Un proceso es una instancia de un programa escrito en cualquier lenguaje. Cuando creamos un servidor con express se genera un proceso y por lo tanto todo funciona en un solo hilo, a menos que generemos un nuevo proceso por medio de child_process, workers o clusters." %}

Básicamente child process nos permite acceder a las funcionalidades del sistema operativo y poder correr cualquier comando tal cual lo hacemos en nuestra linea de comandos a través de bash, concatenando comandos por medio de *pipe* como lo hacemos en linux, es muy importante tener en cuanta que los comandos que usemos están directamente vinculados a un sistema operativo (windows, linux, unix).

child_process y cluster (que vamos a ver en otro articulo), crean procesos que no comparten memoria, esto significa que nuestro sistema debe clonar la información y cada proceso va ser independiente, haciendo que nuestro sistema operativo tenga que disponer de más recursos haciendo lo más lento

cuando se corre un programa con node se crea un procesos que contiene un solo hilo y un event loop, el cual va consumir recursos del sistema, por este motivo no es aconsejable crear demasiados procesos y por eso es preferible utilizar paquetes o soluciones ya optimizadas (ver workers).

~~~bash
 __Parent___          __child___
|  process |        |  process |
|  1 thread|        |  1 thread|
|  1 event |        |  1 event |
|    loop  |        |    loop  |
|__________|        |__________|
~~~

Existen algunas formas de generar un nuevo proceso por medio de child process, las cuales veremos a continuación:

## exec

Genera una shell donde se corre un comando, se genera el proceso, se guarda en un buffer el resultado hasta que termine la tarea y finalmente envía el resultado.

{% include note.html content="Una *shell* es un programa que recibe comandos por medio de un dispositivo de entrada (usualmente el teclado) y se los envía al sistema operativo para que realice alguna acción. Algunos de los programas más conocidos para esto son **bash**, **sh** y **zsh**."%}

- Al utilizar la shell podemos usar la sintaxís que nos brinda y por lo tanto tener mucho más rango de manejo, al tener disponible todos los comandos que usamos en nuestra terminal.
- Usar la shell puede abrir huecos de seguridad, por lo que nunca debe permitirse una interacción directa del usuario.
- Si el tamaño de la información esperada es muy grande (> 200KB) y no cabe en el buffer, se va presentar un error por lo tanto debemos optar por otro método.
- Si se require consumir o procesar datos en tiempo real, no debemos usar exec.

~~~javascript
const { exec } = require('child_process');

// First argument is a command
exec('ls -lh', (error, stdout, stderr) => {
    // cannot run 
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  // run but with error
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.log(`stdout:\n${stdout}`);
});
~~~

## execFile

Funciona muy similar a *exec*, la única diferencia es que no genera una shell sino inmediatamente un proceso, lo que lo hace un poco más eficiente y debemos especificar la ruta del archivo o aplicación a correr. Debemos tener en cuenta que algunos comandos para poderlos ejecutar obligatoriamente necesitamos crear una shell.

~~~javascript
const { execFile } = require('child_process');

// First argument is a path to an executable file
const child = execFile('node', ['file.js'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
~~~

## spawn

Genera un proceso hijo de manera asíncrona, implementando la API de event emitter, esto quiere decir que podemos registrar funciones que hagan una determinada tarea cuando suceda un evento.

- cuando se manejan grandes cantidades de datos, podemos usar spawn ya que esta basado en streams.
- spawn es la versión más genérica del process_child, ya que los demás están construidos sobre este.

~~~javascript
const { spawn } = require('child_process');

const child = spawn('find', ['.', '-type', 'f']);

// generating data
child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

// generate an error
child.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

// receiving data
child.stdin.on('data', (data) => {
    console.log(`stdin: ${data}`);
});

child.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
});

child.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
});
~~~

El siguiente ejemplo muestra la posibilidad de combinar diferentes procesos por medio de los métodos de stdin y stdout, esto en la terminal podría ser: `echo "hello world" | wc`

~~~javascript
const { spawn } = require('child_process');

const wc = spawn('wc', ['-lwc']);

process.stdout.on('data', (data) => {
    wc.stdin.write(data);
    wc.stdin.end();
});

wc.stdout.on('data', (data) => {
    console.log(`Number of files ${data.toString()}`);
    process.exit();
});
~~~

## fork

El fork es un caso especial de spawn donde vamos a tener la capacidad de comunicar de manera bidireccional el proceso principal y el proceso hijo por medio de un protocolo interno de comunicación (IPC).

~~~javascript
// parent.js
const { fork } = require('child_process');

const forked = fork('child.js');

forked.on('message', (msg) => {
  console.log('Message from child', msg);
});

forked.send({ msg: 'I am the parent' });
~~~

~~~javascript
// child.js
process.on('message', (msg) => {
    console.log('Message from parent:', msg);
  });
  
process.send({ msg: 'I am the child'});  
~~~

- Cada proceso que se cree va tener su propio espacio en memoria, por lo tanto crear muchos procesos hijos es una mala practica ya que afecta directamente el rendimiento de todo nuestro sistema.
- Cuando tenemos tareas que bloquean y demoran la respuesta al usuario, es conveniente separar estas tareas en procesos hijos para que así nuestra aplicación pueda responder rápidamente.
