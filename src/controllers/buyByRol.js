
import Roles from '../roles.js';
import Ticket from '../models/tickets.js';

const procesarPago = (carrito) => {
    const ticket = new Ticket({
        amount: calcularTotal(carrito),
        purchaser: user.email,
        products: carrito,
    });

    return ticket;
    console.log(" Pago procesado para:", carrito);
};

const guardarOrdenPendiente = (userId, carrito) => {
    console.log(" Orden pendiente para aprobación:", { userId, carrito });
};

const aprobarOrden = async (ordenId) => {
    console.log(" Orden aprobada:", ordenId);
    return Promise.resolve();
};

const comprar = (req, res) => {
    const { user } = req;
    const carrito = req.body.carrito;
    if (user.rol === Roles.JEFE) {
        guardarOrdenPendiente(user.id, carrito);
        return res.status(200).json({ mensaje: 'Compra enviada.' });
    }
    if ([Roles.CLIENTE, Roles.JEFE].includes(user.rol)) {
        procesarPago(carrito);
        return res.status(200).json({ mensaje: 'Compra realizada' });
    }
    res.status(403).json({ mensaje: 'no puedes comprar.' });
};

const aprobar = async (req, res) => {
    const ordenId = req.params.ordenId;
    try {
        await aprobarOrden(ordenId);
        res.status(200).json({ mensaje: 'orden aprobada.' });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error al aprobar la orden.' });
    }
};

export default { comprar, aprobar };
