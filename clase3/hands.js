const suma = (numero1, numero2) => {
    return new Promise((resolve, reject) => {
            if (numero1 === 0 || numero2 === 0) reject("Operación innecesaria");
            if ((numero1 + numero2) < 0) reject("Solo operaciones positivas");

            resolve(numero1 + numero2);
        }
    )
}

const resta = (numero1, numero2) => {
    return new Promise((resolve, reject) => {
            if (numero1 === 0 || numero2 === 0) reject("Operación innecesaria");
            if ((numero1 - numero2) < 0) reject("Solo operaciones positivas");

            resolve(numero1 - numero2);
        }
    )
}

const calculosSuma = async () => {
    try {
        let numero1 = 10;
        let numero2 = 20;
        let resultado = await suma(numero1, numero2);
        console.log(resultado);
    }
    catch (error) {
        console.log(error);
    }
}

const calculosResta = async () => {
    try {
        let numero1 = 40;
        let numero2 = 20;
        let resultado = await resta(numero1, numero2);
        console.log(resultado);
    }
    catch (error) {
        console.log(error);
    }
}

calculosSuma();
calculosResta();
