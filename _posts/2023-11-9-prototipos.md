---
title: "prototipos"
date: 2023-11-09
categories : [nodejs, course]
author: jhonny111s
lesson_name: Conceptos Avanzados
lesson_order: 2.6
---

# Descifrando los Prototipos en JavaScript

Si eres nuevo en JavaScript, es probable que hayas oído hablar de "prototipos" pero no estés seguro de qué significan exactamente. ¡No te preocupes! Vamos a desmitificar este concepto de manera sencilla con ejemplos prácticos.

## **Objetos y Prototipos**

En JavaScript, casi todo es un objeto o se puede tratar como uno. Cada objeto tiene asociado un prototipo, que actúa como un modelo que sigue el objeto.

### **Herencia a través de Prototipos: Compartiendo Características**

La herencia es como compartir características entre objetos. Si un objeto necesita algo que no tiene, simplemente lo busca en su prototipo. Si el prototipo tiene esa característica, ¡el objeto puede usarla como si fuera propia!

### **Ejemplo Práctico: Perros y Animales**

Vamos a pensar en perros y animales. Imagina que todos los animales tienen un conjunto común de habilidades, como hacer un sonido. Creamos un prototipo para estos animales:

```javascript
const animalPrototype = {
  makeSound: function() {
    console.log("Haciendo un sonido");
  }
};

const dog = Object.create(animalPrototype);
dog.breed = "Labrador";
dog.bark = function() {
  console.log("¡Guau!");
};

dog.makeSound(); // Output: Haciendo un sonido
dog.bark();      // Output: ¡Guau!
```

En este ejemplo, `dog` es como un objeto perro que sigue el modelo de `animalPrototype`. El perro hereda la capacidad de hacer sonidos, ¡y también tiene su propio ladrido!

### **Creación de Objetos con Prototipos: Funciones Constructoras**

Puedes usar funciones constructoras para crear objetos con un prototipo específico. Veamos cómo crear un objeto animal con un sonido:

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.makeSound = function() {
  console.log("Haciendo un sonido");
};

const cat = new Animal("Whiskers");
cat.makeSound(); // Output: Haciendo un sonido
```

En este caso, `cat` es un nuevo objeto animal creado con el prototipo de `Animal`. Hereda automáticamente la capacidad de hacer sonidos.

### **Buena Práctica: Definir Métodos por Fuera de la Clase**

Una buena práctica en JavaScript es agregar métodos por fuera de la clase o el constructor. Esto ayuda a mantener el código organizado y a separar las responsabilidades. Veamos cómo se hace:

```javascript
function Car(make, model) {
  this.make = make;
  this.model = model;
}

// Método agregado por fuera de la clase
Car.prototype.startEngine = function() {
  console.log(`${this.make} ${this.model}'s engine started.`);
};

const myCar = new Car('Toyota', 'Camry');
myCar.startEngine(); // Output: Toyota Camry's engine started.
```

En este ejemplo, hemos agregado el método `startEngine` después de definir la clase `Car`. Esto mejora la legibilidad del código y facilita la gestión de los métodos relacionados.

### **Programación Funcional y Contraste con Prototipos**

Ahora, veamos un contraste con la programación funcional. En lugar de utilizar prototipos, enfoquémonos en funciones y composición:

```javascript
// Función para crear animales
function createAnimal(name) {
  return {
    name: name,
    makeSound: function() {
      console.log("Haciendo un sonido");
    }
  };
}

const functionalCat = createAnimal("Whiskers");
functionalCat.makeSound(); // Output: Haciendo un sonido
```

En este ejemplo, utilizamos una función `createAnimal` para crear objetos animales sin necesidad de prototipos. La programación funcional se centra en funciones y composición, ofreciendo una alternativa a la herencia basada en prototipos.

## **Explorando la Naturaleza de Arrays en JavaScript: Más que una Colección de Elementos**

En el vasto mundo de JavaScript, los Arrays se destacan como estructuras fundamentales, pero ¿alguna vez te has preguntado qué hay detrás de la magia de los Arrays en este lenguaje de programación? En esta sección, nos sumergiremos en la esencia de los Arrays, revelando que, en el fondo, son más que simples colecciones de elementos.

#### **Introducción a la Dualidad de Arrays: Objetos y Colecciones:**

A primera vista, los Arrays en JavaScript parecen ser simples contenedores de elementos, listos para almacenar datos. Sin embargo, la verdad subyacente es que los Arrays comparten una dualidad fascinante: son tanto objetos como colecciones.

En JavaScript, cada Array es un tipo especializado de objeto. Esto significa que, al igual que cualquier otro objeto, un Array puede tener propiedades y métodos. La magia radica en la manera en que estas propiedades y métodos se entrelazan con la estructura de la colección de elementos.

#### **Propiedades y Métodos Específicos de Array:**

Los Arrays heredan propiedades y métodos de su prototipo, `Array.prototype`, que a su vez, hereda de `Object.prototype`. Esto les brinda características únicas, como la propiedad `length` y métodos como `push`, `pop`, `map`, y muchos más, que hacen que los Arrays sean poderosos y versátiles.

#### **Verificando Herencia de `Object.prototype`:**

Para verificar si `Array.prototype` hereda directamente de `Object.prototype`, podemos utilizar `Object.getPrototypeOf()`:

```javascript
const arrayPrototype = Array.prototype;
const objectPrototype = Object.prototype;

console.log(Object.getPrototypeOf(arrayPrototype) === objectPrototype); // Devolverá true
```

Aquí, estamos comparando el prototipo de `Array.prototype` con el prototipo de `Object.prototype` para determinar si existe una herencia directa. Si la comparación devuelve `true`, significa que `Array.prototype` hereda directamente de `Object.prototype`.

#### **Nota sobre `Object.getOwnPropertyNames()`:**

Es importante tener en cuenta que `Object.getOwnPropertyNames()` devuelve solo las propiedades directas y no incluye aquellas heredadas a través de la cadena de prototipos. Esto significa que si `Array.prototype` hereda propiedades de otros objetos, esas propiedades no se mostrarán en la lista resultante.


### **Explorando las Propiedades del Prototipo**

Cuando trabajamos con arrays en JavaScript, a menudo queremos entender qué métodos y propiedades están disponibles para manipular y operar con estos elementos. Para obtener una visión detallada de las propiedades de un Objeto, podemos utilizar la función `Object.getOwnPropertyNames`.

#### **Obteniendo Todas las Propiedades del Prototipo de Array**

La siguiente línea de código nos proporciona un array con todas las propiedades enumerables y no enumerables del prototipo de `Array`:

```javascript
const arrayPrototypeProperties = Object.getOwnPropertyNames(Array.prototype);
```

#### **Ejemplo Práctico**

```javascript
const arrayPrototypeProperties = Object.getOwnPropertyNames(Array.prototype);

console.log(arrayPrototypeProperties);
// Output: ['length', 'constructor', 'concat', 'find', 'fill', ... y más]

// Iterando sobre el array para obtener detalles sobre cada propiedad
arrayPrototypeProperties.forEach(property => {
  console.log(property, typeof Array.prototype[property]);
});
```

En este ejemplo, `arrayPrototypeProperties` contendrá una lista de todas las propiedades del prototipo de `Array`. Puedes explorar esta lista para comprender las funciones y capacidades que el prototipo proporciona.

#### **Beneficios de Conocer las Propiedades del Prototipo de Array**

Al conocer estas propiedades, podrás aprovechar al máximo las capacidades inherentes a los arrays en JavaScript. Esto es especialmente útil para desarrolladores que desean comprender en profundidad cómo funcionan las operaciones de array estándar y qué funcionalidades están disponibles para su uso.

Explorar las propiedades del prototipo de `Array` es una práctica valiosa para mejorar tu comprensión de JavaScript y optimizar tu manejo de arrays en tus proyectos. ¡Aprovecha esta herramienta para potenciar tu desarrollo en JavaScript!

### **Explorando Propiedades del Objeto y Definiendo Propiedades con Precisión en JavaScript**

En el vasto mundo de JavaScript, dos herramientas clave, `Object.getOwnPropertyDescriptor()` y `Object.defineProperty()`, se presentan como poderosos aliados para comprender y personalizar las propiedades de los objetos. Vamos a sumergirnos en estas funciones para desentrañar las propiedades del objeto de descripción y explorar cómo definir propiedades de manera precisa.

### **`Object.getOwnPropertyDescriptor()`: Explorando Detalles de Propiedades**

Antes de adentrarnos en la definición de propiedades, exploremos `Object.getOwnPropertyDescriptor()`. Este método nos brinda detalles específicos sobre una propiedad existente de un objeto.

#### **Sintaxis Básica:**

```javascript
const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, prop);
```

- `obj`: El objeto del cual deseas obtener información sobre la propiedad.
- `prop`: El nombre de la propiedad de la cual deseas obtener información.

#### **Propiedades del Objeto de Descripción:**

1. **value:** El valor de la propiedad.
2. **writable:** Indica si la propiedad puede ser modificada (`true`) o no (`false`).
3. **enumerable:** Indica si la propiedad aparecerá durante la iteración a través de las propiedades del objeto (`true`) o no (`false`).
4. **configurable:** Indica si la propiedad puede ser eliminada o si sus atributos pueden ser modificados (`true`) o no (`false`).

#### **Ejemplo Práctico:**

```javascript
const exampleObject = { key: 'value' };
const propertyDescriptor = Object.getOwnPropertyDescriptor(exampleObject, 'key');

console.log(propertyDescriptor);
/*
Output:
{
  value: 'value',
  writable: true,
  enumerable: true,
  configurable: true
}
*/
```

### **Definir nuevas propiedades**

Al combinar `Object.getOwnPropertyDescriptor()` y `Object.defineProperty()`, puedes explorar las propiedades existentes de un objeto y, luego, definir nuevas propiedades o modificar las existentes según tus necesidades.

### **Cómo Usar `Object.defineProperty()`: Definiendo Propiedades con Claridad**

Supongamos que deseas agregar una nueva propiedad `age` a un objeto `person` y asegurarte de que no sea modificable ni enumerada. Puedes hacerlo de la siguiente manera:

```javascript
const person = {};

// Definir la propiedad 'age' con Object.defineProperty()
Object.defineProperty(person, 'age', {
  value: 25,
  writable: false,
  enumerable: false,
  configurable: true
});

console.log(person.age); // Output: 25

// Intentar modificar la propiedad (no se permitirá debido a writable: false)
person.age = 30;

console.log(person.age); // Output: 25
```

En este ejemplo, hemos definido la propiedad `age` de manera clara y explícita, especificando que no es modificable (`writable: false`) y no es enumerable (`enumerable: false`).

### **Explorando la Propiedad `Symbol.iterator` en Arrays y su Implementación Personalizada**

En el universo de JavaScript, la propiedad `Symbol.iterator` desempeña un papel fundamental en la iteración de elementos en Arrays. En esta sección, exploraremos cómo funciona esta propiedad, cómo implementar un iterador personalizado y cómo métodos como `map` y `filter` aprovechan esta característica para operar sobre Arrays de manera eficiente.

### **Propiedad `Symbol.iterator` en Arrays:**

La propiedad `Symbol.iterator` permite acceder a un iterador, una interfaz que facilita la iteración sobre los elementos de un Array. Veamos un ejemplo básico:

```javascript
const myArray = [1, 2, 3];

// Obtener el iterador a través de Symbol.iterator
const iterator = myArray[Symbol.iterator]();

// Iterar sobre los elementos usando el método next()
let result = iterator.next();
while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
// Output: 1, 2, 3
```

### **Implementación de un Iterador Personalizado:**

Ahora, crearemos un iterador personalizado para un Array simple. Esta implementación nos permitirá entender cómo funciona la propiedad `Symbol.iterator` en un contexto más práctico.

```javascript
const customArray = [4, 5, 6];

// Implementación del iterador personalizado
customArray[Symbol.iterator] = function () {
  let index = 0;

  return {
    next: () => {
      if (index < customArray.length) {
        return { value: customArray[index++], done: false };
      } else {
        return { done: true };
      }
    },
  };
};

// Iterar sobre los elementos usando el iterador personalizado
for (const element of customArray) {
  console.log(element);
}
// Output: 4, 5, 6
```

### **Uso de `Symbol.iterator` en Métodos como `map` y `filter`:**

Métodos comunes de Array, como `map` y `filter`, utilizan la propiedad `Symbol.iterator` internamente para recorrer los elementos y aplicar operaciones.

```javascript
const originalArray = [1, 2, 3];

// Utilizando el método map
const newArrayMap = originalArray.map(num => num * 2);
console.log(newArrayMap); // Output: [2, 4, 6]

// Utilizando el método filter
const newArrayFilter = originalArray.filter(num => num > 1);
console.log(newArrayFilter); // Output: [2, 3]
```

### **Nota sobre Square Brackets y Propiedades Computadas:**

Es común utilizar corchetes cuadrados (`[]`) al acceder a propiedades, especialmente con propiedades computadas como `Symbol.iterator`. Esto se debe a que el uso de corchetes cuadrados permite evaluar la expresión dentro de los corchetes como el nombre de la propiedad. En el caso de `Symbol.iterator`, esto facilita la obtención del iterador asociado al Array.

Esta práctica proporciona una forma más dinámica y expresiva de acceder a propiedades, especialmente cuando se utilizan símbolos únicos como `Symbol.iterator`.

Con esta comprensión de `Symbol.iterator` y su aplicación práctica, puedes aprovechar al máximo las capacidades de iteración en JavaScript. ¡Siéntete libre de explorar y experimentar con estas ideas en tus proyectos!

--------

### Conclusión

En resumen, los prototipos en JavaScript son como modelos que los objetos siguen, permitiendo la herencia y compartiendo características. La buena práctica de definir métodos por fuera de la clase mejora la organización del código. Por otro lado, la programación funcional ofrece una alternativa basada en funciones y composición. ¡No temas explorar ambos enfoques, ya que te brindan herramientas poderosas para desarrollar en JavaScript! ¡Bienvenido al fascinante mundo de los prototipos y la programación funcional en JavaScript!