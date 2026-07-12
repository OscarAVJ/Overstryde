import customerModel from "./customer.model.js";
import { v2 as cloudinary } from "cloudinary";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../utils/config.js";

const customerController = {};

const getAuthenticatedCustomerId = (req) => {
    const token = req.cookies?.authCookie;

    if (!token) {
        return null;
    }

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    if (decoded.userType !== "customer") {
        return null;
    }

    return decoded.id;
};

const normalizeAddress = (payload = {}) => ({
    country: payload.country?.trim(),
    address: payload.address?.trim(),
    department: payload.department?.trim(),
    city: payload.city?.trim(),
    references: payload.references?.trim() || payload.reference?.trim(),
    phone: payload.phone?.trim() || payload.phoneNumber?.trim(),
});

const validateAddress = (payload = {}) => {
    const address = normalizeAddress(payload);
    const requiredFields = ["country", "address", "department", "city", "phone"];
    const missingField = requiredFields.find((field) => !address[field]);

    if (missingField) {
        return { error: "Complete all required address fields" };
    }

    return { address };
};

customerController.getCurrentCustomer = async (req, res) => {
    try {
        const customerId = getAuthenticatedCustomerId(req);
        if (!customerId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const customer = await customerModel
            .findById(customerId)
            .select("name last_name email photo addresses purchase_history isActive isVerified")
            .populate({
                path: "purchase_history.orders_id",
                populate: {
                    path: "shopping_cart_id",
                    populate: {
                        path: "products.productId",
                        select: "name price images",
                    },
                },
            });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        return res.status(200).json(customer);
    } catch (error) {
        return res.status(401).json({ message: "Invalid session" });
    }
};

customerController.updateCurrentCustomer = async (req, res) => {
    try {
        const customerId = getAuthenticatedCustomerId(req);
        if (!customerId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const updateData = {
            name: req.body.name?.trim(),
            last_name: req.body.last_name?.trim(),
            email: req.body.email?.trim(),
        };

        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined || updateData[key] === "") {
                delete updateData[key];
            }
        });

        const updatedCustomer = await customerModel
            .findByIdAndUpdate(customerId, updateData, { new: true, runValidators: true })
            .select("name last_name email photo addresses purchase_history isActive isVerified")
            .populate({
                path: "purchase_history.orders_id",
                populate: {
                    path: "shopping_cart_id",
                    populate: {
                        path: "products.productId",
                        select: "name price images",
                    },
                },
            });

        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        return res.status(200).json({
            message: "Customer updated",
            customer: updatedCustomer,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

customerController.addAddress = async (req, res) => {
    try {
        const customerId = getAuthenticatedCustomerId(req);
        if (!customerId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const validateAddressResult = validateAddress(req.body);
        if (validateAddressResult.error) {
            return res.status(400).json({ message: validateAddressResult.error });
        }

        const customer = await customerModel.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        customer.addresses.push(validateAddressResult.address);
        await customer.save();

        return res.status(201).json({
            message: "Address saved",
            addresses: customer.addresses,
            address: customer.addresses[customer.addresses.length - 1],
        });
    } catch (error) {
        return res.status(401).json({ message: "Invalid session" });
    }
};

customerController.updateAddress = async (req, res) => {
    try {
        const customerId = getAuthenticatedCustomerId(req);
        if (!customerId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const validateAddressResult = validateAddress(req.body);
        if (validateAddressResult.error) {
            return res.status(400).json({ message: validateAddressResult.error });
        }

        const customer = await customerModel.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const address = customer.addresses.id(req.params.addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        address.set(validateAddressResult.address);
        await customer.save();

        return res.status(200).json({
            message: "Address updated",
            addresses: customer.addresses,
            address,
        });
    } catch (error) {
        return res.status(401).json({ message: "Invalid session" });
    }
};

customerController.deleteAddress = async (req, res) => {
    try {
        const customerId = getAuthenticatedCustomerId(req);
        if (!customerId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const customer = await customerModel.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const address = customer.addresses.id(req.params.addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        address.deleteOne();
        await customer.save();

        return res.status(200).json({
            message: "Address deleted",
            addresses: customer.addresses,
        });
    } catch (error) {
        return res.status(401).json({ message: "Invalid session" });
    }
};

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
