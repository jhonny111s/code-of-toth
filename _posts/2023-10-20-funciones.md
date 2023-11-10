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

### Alcance de Variables (Scope)

El alcance de variables se refiere a la accesibilidad de las variables en diferentes partes del código. JavaScript tiene dos tipos principales de alcance: el alcance global y el alcance de función.

- **Alcance Global**: Las variables declaradas fuera de todas las funciones tienen un alcance global y son accesibles en todo el programa. Esto significa que pueden ser modificadas y accedidas en cualquier lugar.

```javascript
const mensaje = "Hola, mundo"; // Alcance global

function saludar() {
  console.log(mensaje); // Puede acceder a mensaje
}

saludar(); // Muestra "Hola, mundo" en la consola
console.log(mensaje); // También puede acceder a mensaje
```

- **Alcance de Función**: Las variables declaradas dentro de una función solo son visibles dentro de esa función. Esto significa que no se pueden acceder desde fuera de la función.

```javascript
function mostrarMensaje() {
  const mensaje = "Hola desde la función"; // Alcance de función
  console.log(mensaje);
}

mostrarMensaje();
console.log(mensaje); // Error: mensaje no definido
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

### El Objeto `this`

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