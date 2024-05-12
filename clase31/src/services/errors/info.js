export const generateErrorInfo = (user) => {
    let mensaje;

    mensaje = `Una o mas propiedades estaban incompletas o inválidas.
               Lista de propiedades requeridas:
          *     first_name: necesita un String, se recibió ${user.first_name}
          *     last_name: necesita un String, se recibió ${user.last_name} 
          *     email: necesita un String, se recibió ${user.email}
    `;

    return mensaje;
}

