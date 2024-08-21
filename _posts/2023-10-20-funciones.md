---
title: "Funciones"
date: 2023-10-20
categories : [nodejs, course]
author: jhonny111s
lesson_name: Introducción
lesson_order: 1.11
---

## Funciones en JavaScript: Declaración, Alcance y "this"

Las funciones son un componente fundamental en JavaScript y desempeñan un papel crucial en el desarrollo de aplicaciones web. En este artículo, exploraremos en detalle cómo declarar y utilizar funciones en JavaScript, con un enfoque especial en el alcance de variables, las clausuras y el uso del objeto `this`.

### Declaración de Funciones

En JavaScript, las funciones se pueden declarar de varias formas, pero la más común es utilizando la palabra clave `function`. Aquí está la estructura básica de una declaración de función:

```javascript
function nombreDeLaFuncion(parametro1, parametro2) {
  // Cuerpo de la función
  // Realiza operaciones aquí
  return resultado; // Opcional: devuelve un valor
}
```

- `nombreDeLaFuncion`: Este es el nombre de la función y debe ser descriptivo de su propósito. Las convenciones de nomenclatura sugieren el uso de notación camelCase, por ejemplo, `calcularEdad` o `obtenerNombre`.

- `parametro1`, `parametro2`: Estos son los parámetros de la función. Las funciones pueden aceptar cero o más parámetros que actúan como entradas.

- `return resultado`: La declaración `return` es opcional y se usa para devolver un valor. Si se omite, la función devuelve `undefined`.

#### Ejemplo de Declaración de Función

```javascript
function sumar(a, b) {
  return a + b;
}

const resultado = sumar(3, 4); // Llama a la función y almacena el resultado
console.log(resultado); // Muestra "7" en la consola
```

### Arrow functions

Las Arrow Functions, introducidas en ES6, ofrecen una sintaxis más concisa para escribir funciones en JavaScript. Son especialmente útiles para funciones cortas que se pasan como argumentos a métodos de orden superior como `map`, `filter` y `reduce`.

Aquí tienes la sintaxis básica de una Arrow Function:

```javascript
const myFunction = (param1, param2) => {
  // código de la función aquí
};
```
Si la función solo tiene un parámetro, puedes omitir los paréntesis:

```javascript
const myFunction = param => {
  // código de la función aquí
};
```
Si la función solo tiene una expresión y esa expresión es el valor de retorno, puedes omitir las llaves y la palabra clave return:

```javascript
const myFunction = param => param * 2;
```

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(number => number * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### Funciones Anónimas

Una función anónima es una función sin nombre. Las funciones anónimas son comúnmente asignadas a variables o pasadas como argumentos a otras funciones.

Aquí tienes la sintaxis básica de una función anónima:

```javascript
const myFunction = function(param1, param2) {
  // código de la función aquí
};
```

Las funciones anónimas son útiles cuando necesitas una función para un uso de corta duración que no necesitarás referenciar por su nombre más tarde. También son útiles para encapsular código en un ámbito local para evitar la contaminación del ámbito global.

Aquí tienes un ejemplo de cómo se puede usar una función anónima:

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(number) {
  return number * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]
```

En este ejemplo, pasamos una función anónima a map para duplicar cada número en el array numbers.

**Arrow Functions VS funciones anonimas**

La elección entre una función anónima y una Arrow Function depende en gran medida del contexto y de lo que necesites hacer.

*Arrow Functions son útiles cuando:*

- Necesitas una función con una sintaxis concisa: Las Arrow Functions tienen una sintaxis más corta que las funciones anónimas, lo que puede hacer que tu código sea más legible si la función es suficientemente simple.

- Quieres que `this` sea el mismo dentro y fuera de la función: Las Arrow Functions no crean su propio ámbito para this, por lo que this dentro de una Arrow Function es el mismo que this fuera de la función. Esto puede ser útil en situaciones donde necesitas acceder a this del ámbito externo, como en manejadores de eventos o en métodos de un objeto.

*Funciones anónimas son útiles cuando:*

- Necesitas una función que pueda actuar como constructor: Las Arrow Functions no pueden ser usadas como constructores, por lo que si necesitas una función que pueda ser invocada con el operador `new` para crear un nuevo objeto, deberías usar una función anónima.

- Quieres que `this` sea vinculado al objeto que invoca la función: En una función anónima, this es vinculado al objeto que invoca la función. Esto puede ser útil en métodos de un objeto donde quieres que this se refiera al objeto que posee el método.

### Funciones que se invocan inmediatamente

Una IIFE (Immediately Invoked Function Expression) es una función en JavaScript que se ejecuta inmediatamente después de ser definida. La sintaxis básica de una IIFE es como sigue:

```javascript
(function() {
  // código aquí
})();
```

La función anónima está dentro de paréntesis, lo que evita que se interprete como una declaración de función. Luego, los paréntesis finales invocan inmediatamente la función.

Las IIFE son útiles para encapsular código y evitar la contaminación del ámbito global. Todo lo que se define dentro de la IIFE (como variables o funciones) no es accesible desde el ámbito global, lo que ayuda a evitar conflictos de nombres y a mantener el código limpio y organizado.

Aquí tienes un ejemplo de cómo se puede usar una IIFE:

```javascript
(function() {
  var message = 'Hello, world!';
  console.log(message); // 'Hello, world!'
})();

console.log(message); // ReferenceError: message is not defined
```

En este ejemplo, la variable message solo es accesible dentro de la IIFE. Cuando intentamos acceder a message fuera de la IIFE, obtenemos un error de referencia.


### Alcance de Variables (Scope o ambito)

El alcance de variables se refiere a la accesibilidad de las variables en diferentes partes del código. JavaScript tiene tres tipos principales de alcance: el alcance global, el alcance de función y el alcance de bloque.

#### **Alcance Global**
 Las variables declaradas fuera de todas las funciones tienen un alcance global y son accesibles en todo el programa. Esto significa que pueden ser modificadas y accedidas en cualquier lugar.

```javascript
const mensaje = "Hola, mundo"; // Alcance global

function saludar() {
  console.log(mensaje); // Puede acceder a mensaje
}

saludar(); // Muestra "Hola, mundo" en la consola
console.log(mensaje); // También puede acceder a mensaje
```

#### **Alcance de Función**
 Las variables y funciones declaradas dentro de una función solo son visibles dentro de esa función. Esto significa que no se pueden acceder desde fuera de la función.

```javascript
function mostrarMensaje() {
  const mensaje = "Hola desde la función"; // Alcance de función
  console.log(mensaje);
}

mostrarMensaje();
console.log(mensaje); // Error: mensaje no definido
```

#### **Alcance de bloque**
 Con la introducción de let y const en ES6, JavaScript ahora tiene ámbito de bloque. Las variables definidas con let o const solo son accesibles dentro del bloque en el que se definen `{}`.

```javascript
{
  let blockVar = 'Soy una variable de bloque';
  console.log(blockVar); // 'Soy una variable de bloque'
}
console.log(blockVar); // ReferenceError: blockVar is not defined
```

### Clausuras (Closures)

Una clausura es una función anidada que tiene acceso a las variables de su función externa, incluso después de que la función externa haya terminado de ejecutarse. Esto permite que las variables se mantengan "vivas" y accesibles.

```javascript
function creaContador() {
  let contador = 0; // Variable en el ámbito de creaContador
  return function() {
    contador++;
    console.log(contador);
  };
}

const incrementar = creaContador(); // incrementar es una clausura
incrementar(); // Muestra "1"
incrementar(); // Muestra "2"
```

En el ejemplo anterior, `creaContador` retorna una función anónima que tiene acceso a la variable `contador` incluso después de que `creaContador` haya terminado de ejecutarse. Esto permite mantener un estado interno, en este caso, el contador.

### El Objeto `this` (contexto)

En JavaScript, el objeto `this` se refiere al objeto al que pertenece la función. El valor de `this` puede cambiar según cómo se invoque una función.

- Cuando una función se llama en el ámbito global, `this` se refiere al objeto global (`window` en navegadores).

```javascript
function mostrarThis() {
  console.log(this);
}

mostrarThis(); // Muestra "window" en un navegador
```

- Cuando una función es un método de un objeto, `this` se refiere al objeto al que pertenece el método.

```javascript
const persona = {
  nombre: "Juan",
  saludar: function() {
    console.log("Hola, soy " + this.nombre);
  }
};

persona.saludar(); // Muestra "Hola, soy Juan"
```

- Si utilizas funciones flecha (arrow functions), el valor de `this` se toma del contexto en el que se definió la función, lo que puede evitar cambios no deseados.

```javascript
const boton = document.querySelector("#miBoton");
boton.addEventListener("click", () => {
  console.log(this); // Se mantiene igual que en el contexto actual
});
```

El objeto `this` es fundamental para la programación orientada a objetos en JavaScript y juega un papel importante en la interacción con eventos y la manipulación del DOM.

### Conclusion

Las funciones son un componente esencial de JavaScript y desempeñan un papel fundamental en el desarrollo de aplicaciones web. Al comprender cómo declarar y utilizar funciones, junto con conceptos como alcance, clausuras y el objeto `this`, estarás bien preparado para escribir código JavaScript profesional y eficiente.