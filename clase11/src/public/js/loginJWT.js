function loginJWTCookie() {
     
     //Obtengo email y password
    let txtEmail = document.getElementById("idemail");
    let email = txtEmail.value;

    if (email.trim().length === 0) {
        Swal.fire({
            icon: "warning",
            title: "ERROR",
            text: "Debe ingresar en email"
        });
        
        return;
    }

    let txtPassword = document.getElementById("idpassword");
    let password = txtPassword.value;

    if (password.trim().length === 0) {
        Swal.fire({
            icon: "warning",
            title: "ERROR",
            text: "Debe ingresar una Contraseña"
        });  
        
        return;
    }

    //Hago el loginJWT con Cookie
    let datosUsuario = {
        email,
        password
    }

    let datos = {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(datosUsuario)
    }

    fetch("/api/jwt/loginCookie", datos)
    .then(res => res.json())
    .then(resultados => {
        //Analizo los Resultados devueltos
        if (resultados.status === "error") {
            //Hubo un error
            Swal.fire({
                icon: "warning",
                title: "ERROR",
                text: `Se produjo el siguiente error: ${resultados.error}`
            })    
        }
        else {
            //Exito!!!
            Swal.fire({
                icon: "success",
                title: "Login exitoso",
                text: `Se ha logueado correctamente. ${resultados.message}`
            })

            //El token se guarda en el cookie
        }
    })
    .catch(err => {
        Swal.fire({
            icon: "warning",
            title: "ERROR",
            text: `Se produjo el siguiente error: ${err.toString()}`
        })
    });

    return;
    
}

function obtenerUsuarioLogueadoCookie() {
    
    //LLamo a la api para obtener los datos de usuario
    
    fetch("/api/jwt/currentCookie")
    .then(res => res.json())
    .then(resultados => {
        //Analizo los Resultados devueltos
        if (resultados.status === "error") {
            //Hubo un error
            Swal.fire({
                icon: "warning",
                title: "ERROR",
                text: `Se produjo el siguiente error: ${resultados.error}`
            })    
        }
        else {
            //Exito!!!
            console.log("Resultados: ", resultados);
            Swal.fire({
                icon: "success",
                title: "Datos del Usuario",
                text: `Nombre ${resultados.payload.name} - Email: ${resultados.payload.email} - Password: ${resultados.payload.password} - Role: ${resultados.payload.role}`
            })
        }
    })
    .catch(err => {
        Swal.fire({
            icon: "warning",
            title: "ERROR",
            text: `Se produjo el siguiente error: ${err.toString()}`
        })
    });

    return;


}

function loginJWT(evt) {
    evt.preventDefault();

    //Obtengo email y password
   let txtEmail = document.getElementById("idemail");
   let email = txtEmail.value;

   if (email.trim().length === 0) {
       Swal.fire({
           icon: "warning",
           title: "ERROR",
           text: "Debe ingresar en email"
       });
       
       return;
   }

   let txtPassword = document.getElementById("idpassword");
   let password = txtPassword.value;

   if (password.trim().length === 0) {
       Swal.fire({
           icon: "warning",
           title: "ERROR",
           text: "Debe ingresar una Contraseña"
       });  
       
       return;
   }

   //Hago el loginJWT
   let datosUsuario = {
       email,
       password
   }

   let datos = {
       method: "POST",
       headers: {"Content-type": "application/json; charset=UTF-8"},
       body: JSON.stringify(datosUsuario)
   }

   fetch("/api/jwt/login", datos)
   .then(res => res.json())
   .then(resultados => {
       //Analizo los Resultados devueltos
       if (resultados.status === "error") {
           //Hubo un error
           Swal.fire({
               icon: "warning",
               title: "ERROR",
               text: `Se produjo el siguiente error: ${resultados.error}`
           })    
       }
       else {
           //Exito!!!
           Swal.fire({
               icon: "success",
               title: "Login exitoso",
               text: `Se ha logueado correctamente. Su token es ${resultados.access_token}`
           })

           let token = resultados.access_token;

           //Guardo el token en LocalStorage
           localStorage.setItem("authToken", token);
       }
   })
   .catch(err => {
       Swal.fire({
           icon: "warning",
           title: "ERROR",
           text: `Se produjo el siguiente error: ${err.toString()}`
       })
   });

   return;
   
}

function obtenerUsuarioLogueado() {
    //Paso 1: Me fijo si tengo un token
    let token = localStorage.getItem("authToken");

    if (!token) {
        Swal.fire({
            icon: "warning",
            title: "ERROR",
            text: `No hay ningún usuario logueado aquí`
        })
        
        return;
    }

    //LLamo a la api para obtener los datos de usuario
    
    let datos = {
        method: "GET",
        headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "Bearer " + token
                },
        }

    fetch("/api/jwt/current", datos)
    .then(res => res.json())
    .then(resultados => {
        //Analizo los Resultados devueltos
        if (resultados.status === "error") {
            //Hubo un error
            Swal.fire({
                icon: "warning",
                title: "ERROR",
                text: `Se produjo el siguiente error: ${resultados.error}`
            })    
        }
        else {
            //Exito!!!
            console.log("Resultados: ", resultados);
            Swal.fire({
                icon: "success",
                title: "Datos del Usuario",
                text: `Nombre ${resultados.payload.name} - Email: ${resultados.payload.email} - Password: ${resultados.payload.password} - Role: ${resultados.payload.role}`
            })
        }
    })
    .catch(err => {
        Swal.fire({
            icon: "warning",
            title: "ERROR",
            text: `Se produjo el siguiente error: ${err.toString()}`
        })
    });

    return;


}