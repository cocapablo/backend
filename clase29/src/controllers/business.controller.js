import Business from "../dao/classes/business.dao.js"

const businessService = new Business();

export const getBusiness = async (req, res) => {
    const business = await businessService.getBusinesss(); 
    if (!business) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: business});
}

export const getBusinessById = async (req, res) => {
    const {bid} = req.params;

    const business = await businessService.getBusinessById(bid);
    if (!business) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: business});
}

export const createBusiness = async (req, res) => {
    const business = req.body;

    const result = await businessService.saveBusiness(business);
    if (!result) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: "createBusiness"});
}

export const addProduct = async (req, res) => {
    let product = req.body;
    const {bid} = req.params;

    let business = await businessService.getBusinessById(bid);
    if (!business) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    business.products.push(product);

    const result = await businessService.updateBusiness(business._id, business);
    if (!result) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: "Business updated"});
}