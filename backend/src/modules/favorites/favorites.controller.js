import favoritesModel from "./model/favorites.model.js"

const controller = {};

//GET
controller.getFavorites = async (req, res) => {
    try {
        const favorites = await favoritesModel.find();
        return res.status(200).json(favorites)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ info: error.message })
    }
}

//GET BY CUSTOMER ID
controller.getByCustomerId = async (req, res) => {
    try {
        const customerExists = favoritesModel.findOne({ customerId: req.params.id });
        if (!customerExists) {
            return res.status(404).json({ info: "The list of favorites from this customer wasn't found" })
        }
        return res.status(200).json(customerExists);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ info: error.message })
    }
}

//POST
controller.postFavorite = async (req, res) => {
    try {

        const {
            customerId,
            products
        } = req.body;

        if (!Array.isArray(products)) {
            return res.status(400).json({ info: "products debe ser un arreglo." })
        }

        for (const product of products) {
            if (!product.productId) {
                return res.status(400).json({ info: "Cada producto debe llevar un id." })
            }
        }

        //Creamos la nueva lista de favoritos
        const newFavorites = new favoritesModel({
            customerId,
            products
        })

        const savedFavorites = await newFavorites.save();
        return res.status(201).json({ message: "The list of favorites was created." })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ info: error.message })
    }
}

//PUT
controller.updateFavorites = async (req, res) => {
    try {

        const {
            customerId,
            products
        } = req.body;


        //Verficamos existencia
        const listToUpdate = favoritesModel.findById(req.params.id);
        if (!listToUpdate) {
            return res.status(404).json({ info: "The list of favorites you wanted to update wasn't found" })
        }

        //Vemos qué se va a actualizar
        const updatedData = {};

        if (customerId) updatedData.customerId = customerId;
        if (products) {
            if (!Array.isArray(products)) {
                return res.status(400).json({ info: "products debe ser un arreglo." })
            }

            for (const product of products) {
                if (!product.productId) {
                    return res.status(400).json({ info: "Cada producto debe llevar un id." })
                }
            }

            updatedData.products = products;
        }

        //Actualizamos
        const updatedList = await favoritesModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new : true}
        )

        return res.status(200).json({message: "List of favorites updated.", data: updatedList})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ info: error.message })
    }
}

//DELETE
controller.deleteFavorites = async (req, res) => {
    try {
        const deletedList = await favoritesModel.findByIdAndDelete(req.params.id)

        if(!deletedList){
            return res.status(404).json({info: "The list you wanted to delete was not found."})
        }
        return res.status(200).json({message: "The list was successfully deleted"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ info: error.message })
    }
}

export default controller;