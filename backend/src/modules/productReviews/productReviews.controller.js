import productReviewModel from "./model/productReview.model.js"

const controller = {};

//GET
controller.getReviews = async (req, res) => {
    try {
        const filter = req.query.productId ? { productId: req.query.productId } : {};
        const reviews = await productReviewModel.find(filter)
            .populate("customerId", "name last_name photo")
            .populate("productId", "name")
            .sort({ createdAt: -1 });
        return res.status(200).json(reviews)
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ info: error.message })
    }
}

//POST
controller.postReview = async (req, res) => {
    try {

        //Pedimos datos
        const {
            productId,
            customerId,
            title,
            description,
            ranking,
            experienceType,
            certificatedPurchase
        } = req.body;

        //VALIDACIONES
        //Campos obligatorios
        if (!productId || !customerId || !title || !description || !ranking || !experienceType) {
            return res.status(400).json({ info: "All the fields must be filled" })
        }

        const newReview = new productReviewModel({
            productId,
            customerId,
            title,
            description,
            ranking,
            experienceType,
            certificatedPurchase
        })

        const savedReview = await newReview.save();
        await savedReview.populate("customerId", "name last_name photo");
        await savedReview.populate("productId", "name");
        return res.status(201).json({ message: "The product review was succesfully added.", data: savedReview })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ info: error.message })
    }
}

//PUT
controller.updateReview = async (req, res) => {
    try {

        const {
            productId,
            customerId,
            title,
            description,
            ranking,
            experienceType,
            certificatedPurchase
        } = req.body

        //Verificamos existencia
        const reviewExists = await productReviewModel.findById(req.params.id)
        if (!reviewExists) {
            return res.status(404).json({ info: "The review you wanted to update wasn't found." })
        }

        if (!productId || !customerId || !title || !description || !ranking || !experienceType) {
            return res.status(400).json({ info: "All the fields must be filled" })
        }

        //Actualizamos
        const updatedReview = await productReviewModel.findByIdAndUpdate(
            req.params.id,
            {
                productId,
                customerId,
                title,
                description,
                ranking,
                experienceType,
                certificatedPurchase
            },
            {new: true, runValidators: true}
        )

        await updatedReview.populate("customerId", "name last_name photo");
        await updatedReview.populate("productId", "name");
        return res.status(200).json({message: "Review updated", data: updatedReview})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ info: error.message })
    }
}

//DELETE
controller.deleteReview = async (req, res) => {
    try {
        const deletedReview = await productReviewModel.findByIdAndDelete(req.params.id)

        if(!deletedReview){
            return res.status(404).json({info: "The review that you wanted to delete wasn't found."})
        }
        
        return res.status(200).json({message: "Review deleted"})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ info: error.message })
    }
}

export default controller;
