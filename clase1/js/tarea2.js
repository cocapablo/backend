class Contador {
    constructor(responsable) {
        this.responsable = responsable;
        this.contador = 0;
    }

    static contadorGlobal = 0;

    getResponsable() {
        return this.responsable;
    }

    getCuentaIndividual() {
        return this.contador;
    }

    getCuentaGlobal() {
        return Contador.contadorGlobal;
    }

    contar() {
        this.contador++;
        Contador.contadorGlobal++;
    }

}

let contadorPablo = new Contador("Pablo Andrés Coca");
let contadorLucas = new Contador("Lucas el Perro");

contadorPablo.contar();
contadorPablo.contar();
contadorLucas.contar();

console.log("Contador Pablo: " + contadorPablo.getCuentaIndividual());
console.log("Contador Lucas: " + contadorLucas.getCuentaIndividual());
console.log("Contador Global: " + Contador.contadorGlobal);
console.log("Contador Global con metodo de Lucas: " + contadorLucas.getCuentaGlobal());

