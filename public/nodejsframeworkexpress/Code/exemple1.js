
function sayHello(name) {
    // On utilise le caractère backtick pour remplacer la concaténation avec la syntaxe 
    // Template string EC6 / ES2015   : ${argName}
    console.log(`Hello ${name}!`);
}

sayHello('students');

// Ce code ne fonctionne pas (exception levée)
// console.log(window); 

global.console.log('Salut');

console.log(__filename)
console.log(__dirname)