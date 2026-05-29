import orderModel from "./orders.model.js";

const ordersController = {};

// SELECT 
ordersController.getOrders = async (req, res) => {
    const orders = await orderModel.find()
    res.json(orders)
};

// CREATE
ordersController.insertOrders = async (req, res) => {
    try {
        let {
            shopping_cart_id,delivered_address, payment_method,payment_status,status 
        } = req.body;

        const newOrders = new orderModel ({shopping_cart_id,delivered_address, payment_method,payment_status,status })
        await newOrders.save()

        return res.json(200).json({message: "Orders"})

    } catch (error) {
        console.log("error" + error)
        return res.json(500).json({message: "Internal server error"})
    }
};

// DELETE
ordersController.deleteOrders = async (req, res) => {
    try {
        const orders = await orderModel.findById(req.params.id)

        await orderModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Orders deleted"})

    } catch (error) {
        console.log ("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

// UPDATE

ordersController.updateOrders = async (req, res) => {
    // 1 - Solicitar los nuevos valores
    const {shopping_cart_id,delivered_address, payment_method,payment_status,status} = req.body;
    await orderModel.findByIdAndUpdate(req.params.id, {shopping_cart_id,delivered_address, payment_method,payment_status,status}, {new: true})

    res.json({message: "orders updated"})

};

