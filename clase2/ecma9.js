

const objeto = {
    propiedad1 : "Hola",
    propiedad2 : 10,
    propiedad3: true
}

//Destructuring
const {propiedad1, propiedad2, propiedad3} = objeto;

//spread operator
const objeto1 = {objeto};

console.log(objeto1);

const objeto2 = {
    propiedad1 : "Que tal",
    propiedad2 : 123,   
}

const objeto3 = {...objeto2, ...objeto};

console.log(objeto3);


