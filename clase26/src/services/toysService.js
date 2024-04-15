import * as toysData from "../persistence/toysData.js";

export function getAllToys() {
    return toysData.getAllToys();
}

export function createToy(newToy) {
    return toysData.createToy(newToy);
}

