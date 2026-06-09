import mongoose, {Schema, model} from "mongoose";

const favoritesModel = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true
    },
    products:[
        {
            _id: false,
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            }
        }
    ]
}, {
    timestamps: true,
    strict: false
})

export default model("favorites", favoritesModel);