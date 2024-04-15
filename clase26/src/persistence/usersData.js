let users = [];

export function getAllUsers() {
    return users;
}

export function createUser(newUser) {
    users.push(newUser);

    return newUser;
}