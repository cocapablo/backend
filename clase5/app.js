
/* console.log(Math.random());

class GeneradorRandom {
    constructor(minimo, maximo) {
        this.minimo = minimo;
        this.maximo = maximo;
    }

    #getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generarNumeros() {

        //Genero 
    }
}

/* function numerosRandom(min, max, q) {

    return Array.from({ length: q }, () => Math.floor(Math.random() * (max - min + 1)) + 1)

}

const misNumeros = numerosRandom(1, 20, 10000) */

// console.log(misNumeros)

/* const resultado = {}

misNumeros.forEach(numero => resultado[numero] = (resultado[numero] || 0) + 1)

console.log(resultado) */

const fs = require("fs/promises")

const crypto = require("crypto")

class UserManager {

    constructor() {

        this.filePath = "./Usuarios.json"

    }

    async createUser(user) {

        const { nombre, apellido, username, password } = user

        //Hashear la contraseña

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        try {

            //cargar los usuarios de un archivo creado

            let users = []

            if (await fs.access(this.filePath).then(() => true).catch(() => false)) {

                const fileContent = await fs.readFile(this.filePath, "utf8")

                users = JSON.parse(fileContent)

            }

            users.push({ nombre, apellido, username, password: hashedPassword })

            await fs.writeFile(this.filePath, JSON.stringify(users, null, 2))

        } catch (error) {

            console.error("Error al crear el usuario", error)

        }

    }

    async validateUser(username, password) {

        try {

            //cargar los datos del archivo

            if (await fs.access(this.filePath).then(() => true).catch(() => false)) {

                const fileContent = await fs.readFile(this.filePath, "utf8")

                const users = JSON.parse(fileContent)

                //buscar los usuarios por nombre de usuario(username)

                const user = users.find(u => u.username === username)

                if (user) {

                    //verificar password

                    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

                    if (hashedPassword === user.password) {

                        console.log("Usuario logueado")

                    } else {

                        console.log("Contraseña incorrecta")

                    }

                } else {

                    console.log("El usuario no fue encontrado")

                }

            } else {

                console.log("No hay usuarios registrados")

            }

        } catch (error) {

            console.error("Error de validacion", error)

        }

    }

}

const userManager = new UserManager()

userManager.createUser({

    nombre: "Coder",

    apellido: "House",

    username: "Coder24",

    password: "123456"

}).then(() => {

    userManager.validateUser("Coder24", "123456")

})