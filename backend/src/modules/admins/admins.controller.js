import adminsModel from "./admins.model.js";
import { v2 as cloudinary } from "cloudinary";

const adminsController = {};

const parseBoolean = (value) => {
    if (value === undefined) return undefined;
    if (typeof value === "boolean") return value;
    return value === "true";
};

adminsController.getAdmins = async (req, res) => {
    try {

        const admins = await adminsModel.find()
        res.status(200).json(admins);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }
};

adminsController.getAdminById = async (req, res) => {

    try {

        const admin = await adminsModel.findById(req.params.id)
        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        res.status(200).json(admin);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }
};

adminsController.updateAdmins = async (req, res) => {

    try {

        const adminFound = await adminsModel.findById(req.params.id);

        if (!adminFound) {

            return res.status(404).json({
                message: "Admin not found"
            });

        }

        const updateData = {
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            isActive: parseBoolean(req.body.isActive),
            isVerified: parseBoolean(req.body.isVerified),
            loginAttempts: req.body.loginAttempts !== undefined ? Number(req.body.loginAttempts) : undefined,
            timeOut: req.body.timeOut
        };

        if (req.file) {

            if (adminFound.public_id) {

                await cloudinary.uploader.destroy(
                    adminFound.public_id
                );

            }

            updateData.photo = req.file.path;
            updateData.public_id = req.file.filename;
        }

        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        const updatedAdmin =
            await adminsModel.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

        res.status(200).json({
            message: "Admin updated",
            admin: updatedAdmin
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }

};

adminsController.deleteAdmins = async (req, res) => {

    try {

        const admin =
            await adminsModel.findById(req.params.id);

        if (!admin) {

            return res.status(404).json({
                message: "Admin not found"
            });

        }

        if (admin.public_id) {

            await cloudinary.uploader.destroy(
                admin.public_id
            );

        }

        await adminsModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Admin deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }

};

export default adminsController;
