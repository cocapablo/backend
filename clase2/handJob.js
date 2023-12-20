class TicketManager {
    #precioBaseDeGanancia = 0.15;

    constructor() {
        this.eventos = [];
    }

    getEventos() {
        return this.eventos;
    }

    agregarEvento({nombre, lugar, precio, capacidad=50, fecha=Date()}) {
        const nuevoEvento = {
            id: this.eventos.length + 1,
            nombre,
            lugar,
            precio,
            capacidad,
            fecha
        }
        this.eventos.push(nuevoEvento);
        return this.eventos;
    }

 
}

const ticketManager = new TicketManager();
ticketManager.agregarEvento({nombre: "Evento uno", lugar: "River Plate", precio: 1000});
ticketManager.agregarEvento({nombre: "Evento dos", lugar: "Boca Juniors", precio: 2000});
ticketManager.agregarEvento({nombre: "Evento tres", lugar: "San Lorenzo", precio: 3000});

console.log(ticketManager.getEventos());