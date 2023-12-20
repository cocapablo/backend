//Operador nullish
let variableCondicion1 = 0; //es falso
let variableCondicion2 = ""; // es falso
let variableCondicion3 = false;

let pruebaCondicion1 = variableCondicion1 || "sin valor";
let pruebaCondicion2 = variableCondicion2 || "sin valor";
let pruebaCondicion3 = variableCondicion3 || "sin valor";

let pruebaCondicion4 = variableCondicion1 ?? "sin valor";
let pruebaCondicion5 = variableCondicion2 ?? "sin valor";
let pruebaCondicion6 = variableCondicion3 ?? "sin valor"; //El operador ?? (nullish) solo retorna la expresión derecha cuando la izquierda es null o undefinded
let pruebaCondicion7 = null ?? "sin valor";

console.log(pruebaCondicion1);
console.log(pruebaCondicion2);
console.log(pruebaCondicion3);

console.log(pruebaCondicion4);
console.log(pruebaCondicion5);
console.log(pruebaCondicion6);
console.log(pruebaCondicion7);

// Variables privadas
class Persona {
    #apellido = "Coca"; //Variable privada

    constructor(nombre, eMail) {
        this.nombre = nombre;
        this.eMail = eMail;
        this.fullName = `${this.nombre} ${this.#apellido}`;
    }

    getNombre() {
        return nombre;
    }

    getApellido() {
        return this.#apellido;
    }
}

let persona = new Persona("Pablo", "cocapablo@gmail.com");

console.log("Apellido: " + persona.getApellido());
console.log("Full Name: " + persona.fullName);
