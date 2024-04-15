import businessModel from "../models/business.model.js";

export default class Business {

    getBusinesss = async () => {
        try {
            let businesss = await businessModel.find();
            return businesss;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    getBusinessById = async (id) => {
        try {
            let business = await businessModel.findOne({_id: id});
            return business;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    saveBusiness = async (business) => {
        try {
            let result = await businessModel.create(business);
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        } 
    }

    updateBusiness = async (id, business) => {
        try {
            let result = await businessModel.updateOne({_id: id}, {$set: business});
            return result;
        }
        catch (error) {
            console.log(error);
            return null;
        } 
    }
}