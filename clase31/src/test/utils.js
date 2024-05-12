import { fakerES as faker } from "@faker-js/faker";


export function generateUser() {
    let cantidadProductos;
    let productos = [];
    let user = {};

    //Genero una cantidad ficticia de productos
    cantidadProductos = faker.string.numeric();

    for (let i = 0; i < cantidadProductos; ++i) {
        let producto;

        producto = generateProduct();

        productos.push(producto);
    }

    //Creo el usuario
    user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        products: [...productos],
        image: faker.image.avatarLegacy(),
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email()
    }

    return user;
}

export function generateProduct() {
    let product = {};

    product = {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: faker.number.int({min: 1, max: 10000}),
        id: faker.database.mongodbObjectId(),
        image: faker.image.url()
    }

    return product;
}