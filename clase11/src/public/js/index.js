const socket = io();
socket.emit("bienvenida", "Hola. Soy un WebSocket. ¿Como va todo Server?");

socket.on("nuevoMensaje", mensaje => {
    console.log("Hola. Soy un cliente y recibí un nuevo mensaje de alguien. Este es el mensaje", mensaje);
})
