import { isValidObjectId } from "mongoose";
import favoritesModel from "./model/favorites.model.js"
import productModel from "../products/models/products.model.js";

const controller = {};

const getFavoriteListByCustomer = async (customerId) => {
    let favoriteList = await favoritesModel.findOne({ customerId }).populate("products.productId");

    if (!favoriteList) {
        favoriteList = await favoritesModel.create({ customerId, products: [] });
        favoriteList = await favoriteList.populate("products.productId");
    }

    return favoriteList;
};

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

controller.getMyFavorites = async (req, res) => {
    try {
        const customerId = req.authUser.id;

        const favoriteList = await getFavoriteListByCustomer(customerId);
        return res.status(200).json(favoriteList);
    } catch (error) {
        return res.status(401).json({ message: "Invalid session" });
    }
}

controller.addMyFavorite = async (req, res) => {
    try {
        const customerId = req.authUser.id;
        const { productId } = req.params;

        if (!isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const productFound = await productModel.findById(productId);
        if (!productFound) {
            return res.status(404).json({ message: "Product not found" });
        }

        const favoriteList = await getFavoriteListByCustomer(customerId);
        const exists = favoriteList.products.some((item) => (
            item.productId?._id?.toString() === productId || item.productId?.toString() === productId
        ));

        if (!exists) {
            favoriteList.products.push({ productId });
            await favoriteList.save();
        }

        const populatedList = await favoriteList.populate("products.productId");
        return res.status(200).json({
            message: "Favorite saved",
            favorites: populatedList,
        });
    } catch (error) {
        return res.status(401).json({ message: "Invalid session" });
    }
}

controller.removeMyFavorite = async (req, res) => {
    try {
        const customerId = req.authUser.id;
        const { productId } = req.params;

        if (!isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const favoriteList = await getFavoriteListByCustomer(customerId);
        favoriteList.products = favoriteList.products.filter((item) => (
            item.productId?._id?.toString() !== productId && item.productId?.toString() !== productId
        ));
        await favoriteList.save();

        const populatedList = await favoriteList.populate("products.productId");
        return res.status(200).json({
            message: "Favorite removed",
            favorites: populatedList,
        });
    } catch (error) {
        return res.status(401).json({ message: "Invalid session" });
    }
}

//GET BY CUSTOMER ID
controller.getByCustomerId = async (req, res) => {
    try {
        const customerExists = await favoritesModel.findOne({ customerId: req.params.id });
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
