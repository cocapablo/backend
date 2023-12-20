//Primero callback
//después promesas

//después async y await (sugar syntax de promesas)

//callbacks se usan en maps, syntax, etc

const arrayNumeros = [1, 2, 3, 4];

let nuevoArrayNumeros = arrayNumeros.map((numero) => {return numero * 2});

console.log(nuevoArrayNumeros);

//O
function duplicar(numero) {
    return numero * 2;
}

let nuevoArrayNumeros2 = arrayNumeros.map(duplicar);

console.log(nuevoArrayNumeros2);