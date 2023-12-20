const arrayNumeros = [1, 2, 3, 4, 5];

function miMap(array, fnCallback) {
    let nuevoArray = [];

    for (i = 0; i < array.length; ++i) {
        let nuevoValor = fnCallback(array[i]);
        nuevoArray.push(nuevoValor);
    }

    return nuevoArray;
}

let nuevoArray = miMap(arrayNumeros, nro => nro * 2);

console.log(nuevoArray);

//Lo agrego a la clase Array
Array.prototype.miMap = function(fnCallback) {
    let nuevoArray = [];

    for (i = 0; i < this.length; ++i) {
        let nuevoValor = fnCallback(this[i]);
        nuevoArray.push(nuevoValor);
    }

    return nuevoArray;    
}

let nuevoArrayPrototype = arrayNumeros.miMap(nro => nro * 2);

console.log(nuevoArrayPrototype);
