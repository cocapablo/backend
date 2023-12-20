const impuestos = {
    impuesto1 : 234,
    impuesto2 : 456,
    impuesto3 : 789,
    impuesto4 : 900
}

let paresKeysValues = Object.entries(impuestos);
let keys = Object.keys(impuestos);
let valores = Object.values(impuestos);

console.log(paresKeysValues);
console.log(keys);
console.log(valores);