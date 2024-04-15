import Order from "../dao/classes/order.dao.js";
import Business from "../dao/classes/business.dao.js";
import User from "../dao/classes/user.dao.js";

const userService = new User();
const businessService = new Business();
const orderService = new Order();

export const getOrders = async (req, res) => {
    const orders = await orderService.getOrders();
    if (!orders) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: orders});
}

export const getOrderById = async (req, res) => {
    const {oid} = req.params;

    const order = await orderService.getOrderById(oid);
    if (!order) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: order});
}

export const createOrder = async (req, res) => {
    const {user, business, products} = req.body;

    const resultUser = await userService.getUserById(user);
    if (!resultUser) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    const resultBusiness = await businessService.getBusinessById(business);
    if (!resultBusiness) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    let actualOrders = resultBusiness.products.filter(product => products.includes(product.id));

    let sum = actualOrders.reduce((acc, prev) => {
        acc += prev.price;
        return acc;
    }, 0);

    let orderNumber = Math.floor(Math.random() * 10000 + 1);

    let order = {
        number : orderNumber,
        business,
        user,
        status: "pending",
        products: actualOrders.map(product => product.id),
        totalPrice: sum
    };

    let orderResult = await orderService.createOrder(order);
    if (!orderResult) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    resultUser.orders.push(orderResult._id);

    let resultado = await userService.updateUser(user, resultUser);
    if (!resultado) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: orderResult});
}

export const resolveOrder = async (req, res) => {
    const {oid} = req.params;

    let order = await orderService.getOrderById(oid);
    if (!order) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    order.status = "resolve";

    let result = await orderService.resolveOrder(oid, order);
    if (!result) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: "Order Resolved"});
}