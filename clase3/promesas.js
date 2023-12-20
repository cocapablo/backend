//Promesas
//Estados: 
// - Pendiente (el primero)
// - Completado
// - Rechazado

const task = new Promise((resuelto, rechazado) => {
    //Acciones
    resuelto("Todo ok");
    //rechazado("Todo mal");
})

//console.log(task);
task.then(resultado => console.log(resultado), error => console.log(error));

//Por si se ejecutan errores en la función then
task.then(resultado => 
    {throw Error("Error del then");
    console.log(resultado);
    }
    , error => console.log(error));

    //Por si se ejecutan errores en la función then
task.then(resultado => 
    {console.log("Vamos bien");
    console.log(resultado);
    }
    ).catch(error => console.log(error))
    .finally(() => console.log("finally"));


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








