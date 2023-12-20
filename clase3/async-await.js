//Promesas
//Estados: 
// - Pendiente (el primero)
// - Completado
// - Rechazado


//Dividir con promesas
const dividir = (numero1, numero2) => {
    return new Promise((res, rej) => {
            if (numero2 === 0) {
                rej("No se puede dividir por cero");
            }

            res(numero1 / numero2);
        }
    )
}

dividir(10, 2)
.then(resultado => console.log(resultado))
.catch(error => console.log(error));

//async - await : es sugar syntax de Promises
const operacion = async () => {
    try {
    const resultado = await dividir(10, 2); //me suplanta el then pero tiene la ventaja de que puedo seguir accediendo al resultado (mismo scope)

    const resultado2 = resultado * 2;

    console.log(resultado);
    console.log(resultado2);
    }
    catch (error) {
        console.log(error);
    }
}

operacion();

