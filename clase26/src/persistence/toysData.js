let toys = [];

export function getAllToys() {
    return toys;
}

export function createToy(newToy) {
    toys.push(newToy);

    return newToy;
}
