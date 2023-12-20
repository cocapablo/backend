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
            precio: precio * (this.#precioBaseDeGanancia + 1),
            capacidad,
            fecha,
            participantes: []
        }
        this.eventos.push(nuevoEvento);
        return this.eventos;
    }

    agregarUsuario(idEvento, idUsuario) {
        //Validaciones
        //idEvento
        let todoOk = false;
        let eventoElegido;

        eventoElegido = this.eventos.find(evento => evento.id === idEvento);
        if (eventoElegido) {
            //El evento existe
            //Me fijo si el usuario ya estaba registrado como participante
            if (eventoElegido.participantes.includes(idUsuario) === false) {
                //El usuario no estaba. Lo agrego a la lista de participantes
                eventoElegido.participantes.push(idUsuario);
                todoOk = true;
                console.log("Evento elegido: ");
                console.log(eventoElegido);
            }
        }

        return todoOk;
    }

    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha=Date()) {
        //Paso 1: Busco el evento
        let todoOk = false;
        let eventoElegido;

        eventoElegido = this.eventos.find(evento => evento.id === idEvento);
        if (eventoElegido) {
            //El evento existe
            let nuevoEvento = {
                ...eventoElegido,
                lugar: nuevaLocalidad,
                fecha: nuevaFecha,
                participantes: []
            }
            this.agregarEvento(nuevoEvento);
            todoOk = true;
        }

        return todoOk;
    }


  
}

const ticketManager = new TicketManager();
ticketManager.agregarEvento({nombre: "Evento uno", lugar: "River Plate", precio: 1000});
ticketManager.agregarEvento({nombre: "Evento dos", lugar: "Boca Juniors", precio: 2000});
ticketManager.agregarEvento({nombre: "Evento tres", lugar: "San Lorenzo", precio: 3000});

console.log(ticketManager.getEventos());

ticketManager.agregarUsuario(1, 2);
ticketManager.agregarUsuario(1, 5);
ticketManager.agregarUsuario(1, 5);

ticketManager.ponerEventoEnGira(1, "Calamuchita", Date());
console.log(ticketManager.getEventos());