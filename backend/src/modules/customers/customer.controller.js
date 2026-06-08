import customerModel from "./customer.model.js";

import { v2 as cloudinary } from "cloudinary";


const customerController = {};

// SELECT
customerController.getCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find();
        return res.status(200).json(customers)
    } catch (error) {
        console.log ("Error" + error)
        return res.status(500).json({message : "Internal server error"})
    }
};

// DELETE
customerController.deleteCustomers = async (req, res) => {
    try {
        const deletedCustomer = await customerModel.findByIdAndDelete(req.params.id)
        if(!deletedCustomer){
            return res.status(404).json({message: "Customer not found"})
        }
        return res.status(200).json({message: "Customer deleted"})
    } catch (error) {
        console.log ("Error" + error)
        return res.status(500).json({message : "Internal server error"})
    }
};

// UPDATE
customerController.updateCustomers = async (req, res) => {
    try {
        const {name,
            last_name,
            email,
            password,
            addresses,
            purchase_history,isActive,
            is_verified,
            loginAttempts,timeOut} = req.body;

            // Se identifica el usuario que se quiere actualizar
            const customerFound = await customerModel.findById(req.params.id);

            const updateData ={
                name,
            last_name,
            email,
            password,
            addresses,
            purchase_history,isActive,
            is_verified,
            loginAttempts,timeOut
            }
            // Si viene con imagen
            if(req.file){
                // Elimina la imagen anterior
                await cloudinary.uploader.destroy(customerFound.public_id)

                updateData.photo = req.file.path,
                updateData.public_id = req.file.filename
            }

            // Guarda todo en la base de datos
            await customerModel.findByIdAndUpdate(
                req.params.id,
                updateData,
                {new :  true}
            )
            return res.status(200).json({message: "Customer updated"})
    } catch (error) {
        console.log ("Error" + error)
        return res.status(500).json({message : "Internal server error"})
    }
}

export default customerController;