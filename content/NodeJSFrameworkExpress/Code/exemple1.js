function sayHello(name) {
    // On utilise le caractère backtick pour remplacer la concaténation avec la syntaxe 
    // Template string EC6 / ES2015   : ${argName}
    console.log(`Hello ${name}!`);
}

sayHello('students');

// Ce code ne fonctionne pas (exception levée)
// console.log(window); 

setTimeout(() => {
    global.console.log("Ceci s’exécute après 1 seconde");
}, 1000);

globalThis.console.log('Salut');

console.log(__filename)
console.log(__dirname) 