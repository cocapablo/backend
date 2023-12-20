let nombre = "         Pablo      ";

console.log(nombre);
console.log(nombre.trim());

const array = [1, 2, [3, 4], [5, 6, 7], [8, [9, 10]]];

console.log(array.flat());

console.log(array.flat(2)); //Aplana dos niveles de anidación. el default es 1

//importaciones dinámicas
//import React from 'react' => type module
//const React = require("react") => type common
//
//Importación dinámica
const modulo = "calculo";

const sumarNumeros = async () => {
    if (modulo === "calculo") {
        const { Calculadora } = await import("./calculadora.js");
        let calculadora = new Calculadora();
        console.log(calculadora.sumar(3, 5));

    }
}

sumarNumeros();



