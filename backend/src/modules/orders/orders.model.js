/* orders: 
id, 
shopping_cart_id, 
delivered_address, 
payment_method, 
payment_status, 
status (returned, delivered, pending) 
 */

import mongoose, {Schema, model} from "mongoose";

const OrderSchema = new Schema({
    shopping_cart_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Shopping_Cart_Id"
    },
    delivered_address : {
        type : String
    },
    payment_method : {
        type: String
    },
    payment_status : {
        type : String
    },
    status : {
        type : String
    }
},
{
    timestamps : true,
    strict : false 
}
);

export default model ("orders", OrderSchema);