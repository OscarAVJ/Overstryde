import mongoose, {Schema, model} from "mongoose";

const favoritesModel = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true
    },
    products:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            }
        },
    ]
})

export default model("favorites", favoritesModel);