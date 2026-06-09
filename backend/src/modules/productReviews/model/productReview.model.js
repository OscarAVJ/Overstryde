import mongoose, {Schema, model} from "mongoose"

const productReviewModel = new Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers"
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    ranking:{
        type: String, 
        required: true,
        trim: true
    },
    experienceType:{
        type: String,
        required: true,
        trim: true
    },
    certificatedPurchase:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    strict: false
})

export default model("productReviews", productReviewModel)