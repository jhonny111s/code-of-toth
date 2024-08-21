---
title: "Conceptos basicos nodeJs"
date: 2023-10-20
categories: [nodejs, course]
author: jhonny111s
lesson_name: Introducción
lesson_order: 1.8
---

---

# Fundamentos de JavaScript: Variables y Operadores

## Variables en JavaScript: Almacenando Valores de Manera Eficiente

En JavaScript, las variables son contenedores fundamentales que permiten a los desarrolladores almacenar y manipular datos de manera eficiente. Las variables son esenciales para el desarrollo de aplicaciones web, ya que permiten gestionar información dinámica y realizar cálculos.

### Declaración de Variables

En JavaScript, las variables se declaran utilizando palabras reservadas, las más comunes son `var`, `let` y `const`. Cada una tiene un propósito específico y afecta el alcance y la mutabilidad de la variable.

- `var`: Esta es la forma más antigua de declarar una variable en JavaScript. Las variables declaradas con `var` tienen un alcance de función y pueden ser reasignadas. Sin embargo, su uso se ha vuelto menos común en favor de `let` y `const`.

- `let`: La declaración de variables con `let` es la opción más utilizada en la actualidad. Las variables declaradas con `let` tienen un alcance de bloque, lo que significa que solo son accesibles dentro del bloque en el que se definen. Además, pueden ser reasignadas.

- `const`: Las variables declaradas con `const` también tienen un alcance de bloque, pero a diferencia de `let`, no pueden ser reasignadas después de su inicialización. Se utilizan para definir valores constantes que no deben cambiar.

### Reglas y Convenciones de Nomenclatura

Al nombrar variables en JavaScript, es importante seguir ciertas reglas y convenciones para mantener un código limpio y legible:

- Los nombres de variables deben comenzar con una letra (a-z, A-Z) o un guion bajo (\_). No pueden comenzar con números ni otros caracteres especiales.

- Se pueden usar letras, números, guiones bajos y cifras, pero se recomienda usar nombres descriptivos en lugar de caracteres crípticos. Por ejemplo, `nombreCompleto` en lugar de `nc`.

- JavaScript distingue entre mayúsculas y minúsculas, por lo que `miVariable` y `mivariable` son consideradas variables diferentes.

### Buena Práctica: Punto y Coma

Es una buena práctica terminar cada declaración en JavaScript con un punto y coma (`;`). Aunque en la mayoría de los casos JavaScript insertará automáticamente al ejecutarse los puntos y coma si se omiten, es mejor incluirlos explícitamente para evitar comportamientos inesperados.

#### Ejemplos de Declaración Correcta e Incorrecta

**Correcto:**

```javascript
let nombre = "Daniela";
let yearsInDays = 1000;
const PI = 3.1416;
```

**Incorrecto:**

```javascript
let 2nombre = 'Daniela'; // No se permite comenzar con un número
const pi = 3.1416; // Convención: Las constantes suelen nombrarse en mayúsculas
let yearsindays = 1000; // Convención: Use notación camelCase para nombres de variables
```

La correcta declaración y uso de variables es esencial para mantener un código limpio y eficiente en JavaScript. Al seguir las reglas y convenciones recomendadas, los desarrolladores pueden escribir código más legible y menos propenso a errores. Además, la elección entre `var`, `let`, y `const` depende de la necesidad de alcance y mutabilidad de la variable en un programa.

## Operadores Básicos en JavaScript: Fundamentos de la Programación

En JavaScript, los operadores son elementos esenciales para realizar operaciones en tus programas. Los operadores trabajan con operandos, que son los valores a los que se aplican. A continuación, exploraremos los operadores básicos en JavaScript, junto con ejemplos para comprender su funcionamiento.

### Operadores y Expresiones

En matemáticas, usamos operadores aritméticos como `+`, `-`, `*` y `/` para realizar cálculos con números. En programación, heredamos estos operadores y también utilizamos letras para representar datos o incógnitas.

### Operadores de Asignación

El operador de asignación `=` se utiliza para almacenar el valor del operando izquierdo en la variable de la derecha. El operando izquierdo puede ser una expresión simple, como un número, o una expresión compleja que incluye constantes, variables y funciones.

**Ejemplo:**

```javascript
let x = 2; // Asignación de un valor simple
let y = x; // Asignación de una variable a otra
let z = x + y; // Asignación de una expresión compleja
let myFunction = getCurrentDay(); // Asignación de una función
```

Los operadores de asignación también pueden ser compuestos, lo que permite modificar y asignar rápidamente valores a las variables.

### Operadores Aritméticos

Los operadores aritméticos estándar incluyen suma (`+`), resta (`-`), multiplicación (`*`) y división (`/`).

**Ejemplo:**

```javascript
let addition = 1 + 2;
let subtraction = 5 - 3;
let multiplication = 4 * 4;
let division = 5 / 2; // Resultado: 2.5
```

Además, JavaScript ofrece otros operadores aritméticos, como el operador de módulo (`%`), el operador de exponenciación (`**`) y los operadores unarios (`-` y `+`).

**Ejemplo:**

```javascript
let remainder = 5 % 2; // Resultado: 1
let exponentiation = 3 ** 2; // Resultado: 9
let unary_negation = -4; // Resultado: -4
let unary_plus = +"5"; // Resultado: 5
```

También puedes incrementar y decrementar variables con los operadores `++` y `--`.

### Operadores Lógicos

Los operadores lógicos devuelven valores booleanos (`true` o `false`) y se utilizan para evaluar expresiones lógicas. Si un valor no es booleano, se aplica una conversión automática.

**AND (`&&`):**

```javascript
let a1 = true && true; // true
let a2 = true && false; // false
let a3 = false && true; // false
let a4 = false && false; // false
```

**OR (`||`):**

```javascript
let o1 = true || true; // true
let o2 = true || false; // true
let o3 = false || true; // true
let o4 = false || false; // false
```

**NOT (`!`):**

```javascript
let n1 = !true; // false
let n2 = !false; // true
```

Los operadores lógicos pueden aprovechar el operador cortocircuito, lo que significa que la evaluación se detiene tan pronto como se conoce el resultado.

### Operadores de Cadena

El operador `+` se utiliza para concatenar cadenas de texto.

**Ejemplo:**

```javascript
let myString = "sumar";

console.log(myString + " dos números"); // "sumar dos números"
myString += " dos números"; // Lo mismo que la línea anterior
```

### Operador Condicional o Ternario

El operador condicional (`? :`) toma tres operandos, donde el primero es una condición. Dependiendo de la condición, se devuelve el primer valor o el segundo.

**Ejemplo:**

```javascript
var status = age >= 18 ? "adult" : "child"; // Si age es mayor o igual a 18, status es 'adulto', de lo contrario, 'menor'
```

Es importante tener en cuenta que los operadores tienen una precedencia, lo que significa que algunas operaciones se ejecutan antes que otras. Puedes consultar la [documentación de MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators) para obtener detalles sobre la precedencia de los operadores.

### Operadores de Comparación

Los operadores de comparación se utilizan para comparar valores y devuelven un valor booleano (`true` o `false`). Pueden comparar valores del mismo tipo o realizar conversiones implícitas de tipo.

**Igualdad (`==` y `===`):**

```javascript
console.log("5" == 5); // true
console.log("5" === 5); // false
```

**Desigualdad (`!=` y `!==`):**

```javascript
console.log("5" != 5); // false
console.log("5" !== 5); // true
```

**Mayor y Menor (`>`, `<`, `>=`, `<=`):**

```javascript
console.log(5 > 5); // false
console.log(5 >= 5); // true
console.log(5 < 5); // false
console.log(5 <= 5); // true
```

Ten en cuenta que en JavaScript, una variable puede ser de un tipo y contener un valor, lo que puede llevar a situaciones inesperadas.

Este artículo proporciona una visión general de los operadores básicos en JavaScript. Para obtener información detallada sobre la precedencia y el comportamiento de los operadores, puedes consultar la [documentación de MDN sobre operadores de expresiones y operadores](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Expressions_and_Operators#operadores_de_comparaci%C3%B3n).

# Conversión de Tipos en JavaScript (Coerción)

En JavaScript, la coerción se refiere a la conversión automática de un tipo de dato en otro cuando se realizan operaciones o comparaciones. Esto puede llevar a resultados inesperados si no se comprende completamente. A continuación, exploraremos diferentes ejemplos de coerción y cómo afectan las operaciones en JavaScript.

## Coerción Implícita

La coerción implícita ocurre cuando JavaScript convierte automáticamente un tipo de dato en otro sin intervención explícita del desarrollador. Un ejemplo común de coerción implícita se produce en operaciones aritméticas y concatenación de cadenas.

### Ejemplo 1: Coerción Implícita en Operaciones Aritméticas

```javascript
let numero = 5;
let texto = "10";

let resultado = numero + texto;

console.log(resultado); // El resultado es "510", una cadena
```

En este caso, JavaScript convierte implícitamente el número en una cadena y luego realiza la concatenación en lugar de la suma.

### Ejemplo 2: Coerción Implícita en Comparaciones con `==`

La coerción también ocurre en comparaciones con el operador `==`, donde JavaScript intenta convertir los valores para que tengan el mismo tipo antes de realizar la comparación.

```javascript
let num = 10;
let str = "10";

if (num == str) {
  console.log("Son iguales");
} else {
  console.log("No son iguales");
}
```

En este ejemplo, la coerción implícita convierte la cadena en un número antes de comparar, lo que resulta en que se consideren iguales.

### Ejemplo 3: Comparaciones Estrictas con `===`

Para evitar la coerción implícita, puedes utilizar el operador de igualdad estricta `===`, que también compara el tipo de dato. En este caso, los mismos valores no se considerarían iguales:

```javascript
let num = 10;
let str = "10";

if (num === str) {
  console.log("Son iguales");
} else {
  console.log("No son iguales");
}
```

## Coerción Explícita

La coerción explícita se refiere a la conversión de tipos de datos de manera deliberada por parte del desarrollador. JavaScript proporciona funciones y métodos para realizar conversiones explícitas de tipos.

### Ejemplo 4: Coerción Explícita con `parseInt()`

```javascript
let cadena = "20";
let numero = parseInt(cadena);

console.log(numero); // El resultado es 20, un número
```

En este caso, utilizamos la función `parseInt()` para convertir explícitamente una cadena en un número entero.

### Ejemplo 5: Coerción Explícita con `Number()`

```javascript
let valor = "42.5";
let numero = Number(valor);

console.log(numero); // El resultado es 42.5, un número de punto flotante
```

Mediante la función `Number()`, convertimos explícitamente una cadena en un número de punto flotante.

## Evitando Problemas con Coerción

Para evitar problemas con la coerción, es importante comprender cómo funcionan las conversiones en JavaScript. Puedes optar por utilizar operadores estrictos, como `===` para comparaciones, que también consideran el tipo de dato. Además, conviene realizar conversiones explícitas cuando sea necesario para asegurarse de que los tipos de datos sean los esperados.

La coerción es una característica poderosa de JavaScript, pero puede ser sorprendente si no se maneja adecuadamente. Con una comprensión sólida de cómo se lleva a cabo la coerción, puedes escribir código más robusto y evitar errores inesperados.

# Profundizando

## Hoisting

El "hoisting" o "elevación" es un comportamiento en JavaScript donde las declaraciones de variables y funciones se mueven, o son "elevadas", a la parte superior de su ámbito actual durante la fase de compilación, antes de que el código sea ejecutado.

Es importante notar que solo las declaraciones son "elevadas", no las inicializaciones. Esto significa que puedes referenciar una variable antes de que haya sido declarada, pero no antes de que haya sido inicializada.

Con `var`, esto puede llevar a resultados inesperados:

```javascript
console.log(myVar); // undefined, not ReferenceError
var myVar = 5;
console.log(myVar); // 5
```

En este caso, la declaración `var` myVar es "elevada" a la parte superior del ámbito, pero la inicialización myVar = 5 no lo es. Por eso el primer console.log(myVar) devuelve undefined en lugar de un error de referencia.

```javascript
var myVar; // declaración elevada
console.log(myVar);
myVar = 5;
console.log(myVar); // 5
```

Aunque var es elevado al ámbito de la función más cercana, `let` y `const` son elevados al ámbito del bloque más cercano. Aunque todas son "elevadas", let y const no son accesibles hasta que su declaración es evaluada, lo que se conoce como la "zona muerta temporal"

```javascript
// En este punto del código, debido al hoisting:
// - myVar existe pero su valor es undefined
// - myLet y myConst existen en el ámbito temporalmente muerto y no pueden ser accedidos

console.log(myVar); // undefined
console.log(myLet); // ReferenceError
console.log(myConst); // ReferenceError

var myVar = 1;
let myLet = 2;
const myConst = 3;
```

Este comportamiento puede ayudar a prevenir errores y hacer que tu código sea más predecible.


## Buenas practicas

Declarar e inicializar variables al comienzo de su ámbito es una buena práctica por varias razones:

- Evita confusiones con el hoisting.

- Mejora la legibilidad del código: Cuando todas las variables se declaran e inicializan al comienzo de su ámbito, es más fácil para otros desarrolladores (o para ti mismo en el futuro) entender qué variables están en juego en ese ámbito.

- Previene errores de referencia: Si intentas usar una variable antes de declararla, obtendrás un error de referencia. Declarar todas las variables al comienzo ayuda a prevenir estos errores.

- Ayuda a gestionar la memoria: Si sabes desde el principio qué variables necesitarás, puedes declararlas todas juntas, lo que puede ayudar a tu programa a gestionar la memoria de manera más eficiente.
