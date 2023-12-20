const sumar = (numero1, numero2) => numero1 + numero2;
const restar = (numero1, numero2) => numero1 - numero2;
const multiplicar = (numero1, numero2) => numero1 * numero2;
const dividir = (error, numero1, numero2) => error === "error" ? error : numero1 / numero2; /// si numero2 === 0 el resultado es infinity

const realizarOperaciones = (numero1, numero2, fnOperacion) => {
    let resultado;
    console.log("Vamos a realizar la operación");
    if (fnOperacion === dividir) {
        if (numero2 === 0) {
            resultado = fnOperacion("error", numero1, numero2);
        }
        else {
            resultado = fnOperacion(null, numero1, numero2)
        }
    }
    else { 
        resultado = fnOperacion(numero1, numero2);
    }
    console.log("el resultado de la operación es: " + resultado);
}

realizarOperaciones(5, 3, sumar);
realizarOperaciones(10, 2, restar);
realizarOperaciones(11, 6, multiplicar);
realizarOperaciones(100, 2, dividir);

//Errores


