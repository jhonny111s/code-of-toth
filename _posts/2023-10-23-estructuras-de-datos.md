---
title: "Estructuras de Datos"
date: 2023-10-23
categories : [nodejs, course]
author: jhonny111s
lesson_name: Introducción
lesson_order: 1.9
---

--------------

# Estructuras de Datos en JavaScript: Fundamentos para Desarrolladores

JavaScript es un lenguaje de programación poderoso y versátil, y uno de los conceptos fundamentales en este lenguaje son las estructuras de datos. Ya sea que estés empezando o seas un desarrollador experimentado, entender cómo funcionan y cuándo usar estas estructuras es esencial. En este artículo, exploraremos las estructuras de datos clave en JavaScript de una manera accesible para todos.

## Tipos de Datos Primitivos

JavaScript tiene 7 tipos de datos primitivos, que son como los bloques de construcción fundamentales para todo en JavaScript.

### 1. Number

El tipo `Number` representa números enteros y decimales. Puedes hacer cálculos matemáticos con ellos.

```javascript
let age = 18;
let score = 17.8;

// Constantes y métodos útiles
const maxSafeInteger = Number.MAX_SAFE_INTEGER;
const isFiniteNumber = Number.isFinite(42);
```

### 2. BigInt

Cuando necesitas trabajar con números realmente grandes y precisos, puedes usar el tipo `BigInt`.

```javascript
let bigN = 2n ** 54n;

// Constantes útiles
const maxSafeIntegerBigInt = BigInt(Number.MAX_SAFE_INTEGER);
const isBigInt = typeof 42n === 'bigint';
```

### 3. String

Los `String` son cadenas de texto, ideales para manipular palabras y frases.

```javascript
let name = "Daniela";
let drink = 'milk';
let quote = `La escritora ${name} le gusta beber ${drink}`;

// Métodos útiles
const upperCaseName = name.toUpperCase();
```

### 4. Boolean

Los datos booleanos representan valores verdaderos o falsos, como interruptores.

```javascript
let isOld = true;
let isMyFriend = false;
let isGreaterThan = 5 > 4;
let exist = !!undefined;
```

### 5. null

`null` se usa para representar la ausencia intencional de un valor u objeto.

```javascript
let game = null;
```

### 6. undefined

`undefined` se refiere a variables que se han declarado pero no tienen valor asignado.

```javascript
let name; // undefined
let age = undefined;
```

### 7. Symbol

Los `Symbol` permiten crear valores únicos que no pueden ser cambiados.

```javascript
const value1 = Symbol('hello');
console.log(value1.description);
```

Estos tipos primitivos son fundamentales y se utilizan para representar información en cualquier programa JavaScript.

## El Poder del Objeto (Object)

El objeto es como una bolsa que puede contener múltiples valores y funciones relacionadas.

```javascript
let car = {
  type: "sedan",
  name: "Ford Fusion",
  hasDebt: true
}

// Algunos métodos y constantes útiles
const objectKeys = Object.keys(car);
const objectValues = Object.values(car);
```

## Arrays: Colecciones Ordenadas

Los `Array` son como listas ordenadas de elementos. Son ideales para almacenar conjuntos de datos.

```javascript
let numbers = [1, 2, 3, 4, 5];

// Métodos y constantes útiles
const arrayLength = numbers.length;
const firstElement = numbers[0];
```

Los arrays ofrecen muchas funciones útiles, como agregar o quitar elementos, filtrar datos y más.

## Los Objetos Incorporados Más Utilizados

En JavaScript, hay objetos incorporados que proporcionan funcionalidades y métodos predefinidos para realizar tareas comunes. Aquí están algunos de los objetos incorporados más utilizados:

### Object

El objeto `Object` es la raíz de todos los objetos en JavaScript. Se utiliza para crear objetos personalizados.

```javascript
const person = {
  name: "Alice",
  age: 28,
};
```

### Array

El objeto `Array` se utiliza para crear listas ordenadas de elementos. Es ampliamente utilizado para almacenar conjuntos de datos.

```javascript
const numbers = [1, 2, 3, 4, 5];
```

### Math

El objeto `Math` proporciona constantes y funciones matemáticas, lo que lo hace útil para realizar cálculos matemáticos.

```javascript
const pi = Math.PI;
const squareRoot = Math.sqrt(16);
```

### Date

El objeto `Date` se utiliza para trabajar con fechas y horas. Es especialmente útil para operaciones de fecha y hora.

```javascript
const currentDate = new Date();
const dayOfWeek = currentDate.getDay();
```

### RegExp

El objeto `RegExp` se utiliza para trabajar con expresiones regulares, lo que permite buscar y manipular patrones de texto.

```javascript
const pattern = /[0-9]+/;
const containsDigits = pattern.test("abc123");
```

### Function

El objeto `Function` se utiliza para definir funciones en JavaScript, que son componentes fundamentales en la programación.

```javascript
function add(a, b) {
  return a + b;
}
```

### JSON

El objeto `JSON` se utiliza para analizar y serializar objetos en formato JSON, esencial para la comunicación de datos en aplicaciones web.

```javascript
const data = '{"name": "Alice", "age": 30}';
const parsedData = JSON.parse(data);
```

### Map

The Map object is used for storing key-value pairs and allows efficient data retrieval. It's a flexible alternative to plain objects.

```javascript
const carDetails = new Map();
carDetails.set("make", "Ford");
carDetails.set("model", "Fusion");
const model = carDetails.get("model");
```


Estos son algunos de los objetos incorporados más utilizados en JavaScript. Cada uno de ellos desempeña un papel importante en el desarrollo de aplicaciones. La elección de cuál utilizar depende de las necesidades específicas de tu programa.

## Profundizando

### El objeto `Array`

En JavaScript, un array es un tipo especial de objeto que se utiliza para almacenar múltiples valores en una única variable. Aunque los arrays tienen un comportamiento y sintaxis especiales para acceder a los elementos, internamente son objetos.

El índice de un array en JavaScript funciona como una clave en un objeto. Cada elemento en el array tiene un índice numérico que comienza en 0 para el primer elemento, 1 para el segundo elemento, y así sucesivamente. Este índice se utiliza para acceder y modificar los elementos del array.

Por ejemplo, si tienes un array `arr = ['a', 'b', 'c']`, puedes acceder al primer elemento con `arr[0]`, que devuelve `'a'``.

Aunque los índices de los arrays son numéricos, debido a que los arrays son objetos, también puedes agregar propiedades con claves que son cadenas. Por ejemplo, `arr['propiedad'] = 'valor'` es válido en JavaScript. Sin embargo, estas propiedades no se consideran parte de los elementos del array y no afectan la longitud del array.

Es importante tener en cuenta que, aunque los arrays en JavaScript son flexibles y fáciles de usar, no siempre son la opción más eficiente para manejar grandes cantidades de datos o para operaciones complejas. En esos casos, puede ser más apropiado utilizar otras estructuras de datos o bibliotecas.

### Diferencia entre set, get y un metodo

Los "accessors" (accesores) y "mutators" (mutadores) en JavaScript son funciones especiales que se utilizan para obtener o establecer los valores de las propiedades de un objeto. Son un tipo de métodos, pero con un propósito específico.

Accessors (Accesores): También conocidos como "getters", son funciones que se utilizan para obtener el valor de una propiedad específica. Permiten que el valor de una propiedad sea calculado dinámicamente cuando se accede a ella.

Mutators (Mutadores): También conocidos como "setters", son funciones que se utilizan para establecer el valor de una propiedad específica. Permiten que el valor de una propiedad sea calculado dinámicamente cuando se establece.

La diferencia principal entre los accesores y mutadores y los métodos regulares es que los accesores y mutadores se utilizan para controlar el acceso a las propiedades de un objeto, mientras que los métodos regulares pueden realizar cualquier tipo de operación.

### Referencias

En Node.js, y en JavaScript en general, los objetos y arrays son conocidos como valores de referencia. A diferencia de los valores primitivos (como números, strings, booleanos, `null`, y `undefined`), cuando asignas un objeto o array a una variable, lo que realmente estás asignando es una referencia a ese objeto o array, no el objeto o array en sí.

Esto significa que si asignas un objeto a otra variable, ambas variables apuntan al mismo objeto en la memoria, no a copias separadas del objeto. Por lo tanto, si modificas el objeto a través de una de las variables, los cambios se reflejarán cuando accedas al objeto a través de la otra variable.

```javascript
let obj1 = { value: 1 };
let obj2 = obj1;

obj2.value = 2;

console.log(obj1.value);
```

En este ejemplo, `obj1` y `obj2` apuntan al mismo objeto. Cuando cambias obj2.value, también estás cambiando obj1.value, porque ambos apuntan al mismo objeto.

Es importante tener en cuenta este comportamiento al trabajar con objetos y arrays en Node.js, ya que puede tener implicaciones en cómo se comporta tu código. Por ejemplo, si pasas un objeto a una función y la función modifica el objeto, los cambios se reflejarán fuera de la función. Esto puede ser útil, pero también puede ser fuente de errores si no se espera este comportamiento.

#### Crear una nueva copia

En JavaScript, hay varias formas de hacer una copia de un objeto o un array. Aquí te dejo algunas de ellas:

***Para objetos:***

**Object.assign**: Esta función crea una copia superficial de un objeto. Sin embargo, solo copia las propiedades del primer nivel. Las propiedades de los niveles más profundos se copian por referencia.

```javascript
let obj1 = { a: 1, b: 2 };
let obj2 = Object.assign({}, obj1);
```

**Spread operator (...)**: Este operador también crea una copia superficial de un objeto.

```javascript
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1 };
```


***Para arrays:***

**Array.prototype.slice**: Este método devuelve una copia superficial de una porción de un array.

```javascript
let arr1 = [1, 2, 3];
let arr2 = arr1.slice();
```

**Array.prototype.concat**: Este método se utiliza para combinar dos o más arrays. Sin argumentos, devuelve una copia del array original.

```javascript
let arr1 = [1, 2, 3];
let arr2 = arr1.concat();
```

**Spread operator (...)**: Este operador también crea una copia superficial de un array.

```javascript
let arr1 = [1, 2, 3];
let arr2 = [...arr1];
```

Recuerda que todas estas técnicas crean copias superficiales. Si necesitas una copia profunda, puedes usar `JSON.parse(JSON.stringify(obj))`, pero ten en cuenta que tiene limitaciones (no puede copiar funciones, no puede copiar objetos con referencias circulares, etc.). Para copias profundas más robustas, puedes considerar el uso de bibliotecas como lodash con su función `_.cloneDeep()`.



## Conclusión

Las estructuras de datos y objetos incorporados en JavaScript son herramientas poderosas que te permiten gestionar y manipular datos de manera efectiva. Al comprender los tipos de datos y cómo utilizar los objetos incorporados, podrás escribir código más eficiente y funcional en tus aplicaciones. Sigue explorando y practicando para fortalecer tus habilidades en JavaScript. ¡Feliz codificación!