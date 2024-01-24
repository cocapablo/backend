
const socket = io();
socket.emit("bienvenida", "Hola. Soy un WebSocket. ¿Como va todo Server?");

document.getElementById("btnEnviar").addEventListener("click", enviarMensaje);

socket.on("gracias", datos => {
    let divRespuesta = document.getElementById("divRespuesta");
    
    divRespuesta.innerHTML ="<p>" + datos + "</p>";
})

socket.on("listaMensajes", mensajes => {
    mostrarMensajes(mensajes);
});

function enviarMensaje() {
    let mensaje;
    let txtMensaje;

    mensaje = document.getElementById("idMensaje").value;

    socket.emit("mensaje", mensaje);

}

function mostrarMensajes(mensajes) {
    let divMensajes = document.getElementById("idMensajes");
    let htmlMensajes = "";

    mensajes.forEach(mensaje => {
        htmlMensajes += `<p>- ${mensaje} </p>`;

    });

    divMensajes.innerHTML = htmlMensajes;

}


