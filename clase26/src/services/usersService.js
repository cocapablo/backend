import * as usersData from "../persistence/usersData.js";

export function getAllUsers() {
    return usersData.getAllUsers();
}

export function createUser(newUser) {
    return usersData.createUser(newUser);
}