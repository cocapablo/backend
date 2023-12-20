const arrayNros = [1, 2, 3, 4, 5, 6];

//Exponencial
arrayNros.forEach(elemento => {
    console.log(elemento ** 2);
}
)

if (arrayNros.includes(3)) {
    console.log("Está el 3 en el array");
}
else {
    console.log("No está el 3 en el array");
}