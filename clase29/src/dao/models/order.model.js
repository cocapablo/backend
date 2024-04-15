import { Schema, SchemaTypes, model } from "mongoose";

const orderSchema = new Schema({

    number: Number,
  
    business: {
  
      type: SchemaTypes.ObjectId,
  
      ref: "Business",
  
    },
  
    user: {
  
      type: SchemaTypes.ObjectId,
  
      ref: "Users",
  
    },
  
    products: [],
  
    status: String,
  
    totalPrice: Number,
  
  });
  
   
  
  const orderModel = model("Orders", orderSchema);
  
   
  
  export default orderModel;