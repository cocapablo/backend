const mostrarLista = (arrayList = []) => {
    if (arrayList.length === 0) {
        return"Lista vacía";
    }

    arrayList.forEach(elemento => console.log(elemento));
    return arrayList.length;
}


if (mostrarLista() === "Lista vacía") {
    console.log("Prueba pasada. Lista vacía");
}

if (mostrarLista([1, 2, 3]) === 3) {
    console.log("Prueba 2 superada");
}