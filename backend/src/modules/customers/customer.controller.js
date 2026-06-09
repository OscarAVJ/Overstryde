import customerModel from "./customer.model.js";
import { v2 as cloudinary } from "cloudinary";

const customerController = {};

customerController.getCustomers = async (req, res) => {
    try {

        const customers = await customerModel.find()
            .populate("purchase_history.orders_id");

        res.status(200).json(customers);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }
};

customerController.getCustomerById = async (req, res) => {

    try {

        const customer = await customerModel.findById(req.params.id)
            .populate("purchase_history.orders_id");

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json(customer);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }
};

customerController.updateCustomers = async (req, res) => {

    try {

        const customerFound = await customerModel.findById(req.params.id);

        if (!customerFound) {

            return res.status(404).json({
                message: "Customer not found"
            });

        }

        const updateData = {
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            addresses: req.body.addresses,
            purchase_history: req.body.purchase_history,
            isActive: req.body.isActive,
            isVerified: req.body.isVerified,
            loginAttempts: req.body.loginAttempts,
            timeOut: req.body.timeOut
        };

        if (req.file) {

            if (customerFound.public_id) {

                await cloudinary.uploader.destroy(
                    customerFound.public_id
                );

            }

            updateData.photo = req.file.path;
            updateData.public_id = req.file.filename;
        }

        const updatedCustomer =
            await customerModel.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

        res.status(200).json({
            message: "Customer updated",
            customer: updatedCustomer
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }

};

customerController.deleteCustomers = async (req, res) => {

    try {

        const customer =
            await customerModel.findById(req.params.id);

        if (!customer) {

            return res.status(404).json({
                message: "Customer not found"
            });

        }

        if (customer.public_id) {

            await cloudinary.uploader.destroy(
                customer.public_id
            );

        }

        await customerModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Customer deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }

};

export default customerController;