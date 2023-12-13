let nombre = "Juan";
let apellido = "Perez";

{
    let nombre = "Pablo";
    let apellido = "Coca";
    console.log(nombre + " " + apellido);
}

console.log(nombre + " " + apellido);

saludo();

//Funciones
function saludo() {
    const nombre = "Lucas"
    console.log("Hola " + nombre);
}

//Funciones anonimas
//Autoejecutables
(function() {
    console.log("hola, soy una función anónima autoejecutable");
})();

//Funciones flecha
const saludar = () => {
    console.log("Hola perro");
}

saludar();

//Parametros
const saludar2 = (persona) => {
    console.log("Hola " + persona);    
}

saludar2("Pablito");

//Sin parametros ni parentesis
//Parametros
const saludar3 = _ => {
    console.log("Hola sin parentesis");    
}

saludar3();

//Valores de retorno
const saludar4 = (nombre, apellido) => {
    let saludo = "";

    return(nombre + " " + apellido);
}

console.log(saludar4("Pablito", "Coca"));

//Retorno implícito
const saludar5 = (nombre, apellido) => "Hola como estás " + nombre + " " + apellido;

console.log(saludar5("Ramón", "Perez"));

//Template strings
const saludar6 = (nombre, apellido) => `Hola como estás ${nombre} ${apellido}`;
console.log(saludar6("Pepe", "Panda"));

//closure
function contar() {
    let contador = 0;

    return () => {
        contador ++;
        console.log(contador);
    }
}

let miContador = contar();

miContador();
miContador();
miContador();
miContador();
miContador();

//Clases
class Persona {
    constructor(pNombre, pApellido, pEmail) {
        this.nombre = pNombre;
        this.apellido = pApellido;
        this.email = pEmail;
    }

    saludando() {
        console.log("Hola , estoy saludando");
    }

    saludandoConFlecha = () => {
        console.log("Hola gente. Estoy saludando con fecha");    
    }

    presentarse() {
        console.log(`Mi nombre es ${this.nombre} ${this.apellido}`);
    }

    static raza = "Humano";

    static emitirSonido() {
        return "AAAAAAA";
    }
}

let chabon = new Persona("Pablo", "Coca", "cocapablo@gmail.com");

chabon.saludando();

console.log(`Hola. Soy ${chabon.nombre} ${chabon.apellido} y mi mail es ${chabon.email}`);

chabon.presentarse();

console.log(Persona.emitirSonido());




