const fs = require('fs');

// Écriture
fs.writeFileSync('message.txt', 'Bonjour Node.js Sync!');

// Sans promise le programme s'exécute et se termine avant que l'écriture finit son exécution
fs.writeFile('example.txt', 'Hello, Node.js Async!', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('File written successfully!');
    }
});

// Lecture
const data = fs.readFileSync('message.txt', 'utf8');
console.log("Contenu du fichier :", data); 

fs.readFile('message.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  console.log("Lecture asynchrone :", data);
});

  
console.log("Cette ligne s’affiche avant la lecture du fichier !");