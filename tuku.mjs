import readline from 'readline';

// Crear una interfaz de lectura desde la entrada estándar (teclado)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Manejar el evento 'line' cuando se introduce una línea de texto
rl.on('line', (input) => {
  console.log(`¡Recibido: ${input}!`);
});

// Manejar el evento 'close' cuando se cierra la interfaz
rl.on('close', () => {
  console.log('Interfaz cerrada. ¡Adiós!');
});

// Preguntar al usuario por una entrada
rl.question('Escribe algo: ', (answer) => {
  console.log(`¡Has escrito: ${answer}!`);
  
  // Cerrar la interfaz después de obtener la entrada
  rl.close();
});