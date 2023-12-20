const objetos =  [
	{
		manzanas:3,
		peras:2,
		carne:1,
		jugos:5,
		dulces:2
	},
	{
		manzanas:1,
		sandias:1,
		huevos:6,
		jugos:1,
		panes:4
	}
]

const arrayProductos = [];

objetos.forEach(objeto => {
    const arrayKeys = Object.keys(objeto);
    arrayKeys.forEach(key => {
        if (arrayProductos.includes(key) === false) {
            arrayProductos.push(key);
        }
    })
});

console.log(arrayProductos);

arrayProductos.forEach(producto => console.log(producto));

let totalVentas = 0;


objetos.forEach(objeto => {
    const arrayValores = Object.values(objeto);
    arrayValores.forEach(valor => {
        totalVentas += valor;
    })
})

console.log("Total Ventas: "+ totalVentas);