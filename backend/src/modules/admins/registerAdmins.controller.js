import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import { config } from "../../utils/config.js";

import adminsModel from "./admins.model.js";

const registerAdminController = {};

registerAdminController.register = async (req, res) => {

    try {

        const {
            name,
            last_name,
            email,
            password
        } = req.body;

        const existAdmin =
            await adminsModel.findOne({ email });

        if (existAdmin) {

            return res.status(400).json({
                message: "Admin already exists"
            });

        }

        const passwordHash =
            await bcryptjs.hash(password, 10);

        const newAdmin = new adminsModel({

            name,
            last_name,

            photo: req.file
                ? req.file.path
                : "",

            public_id: req.file
                ? req.file.filename
                : "",

            email,

            password: passwordHash,

            isActive: true,

            isVerified: false,

            loginAttempts: 0,

            timeOut: null

        });

        await newAdmin.save();

        const verificationCode =
            crypto.randomBytes(3).toString("hex");

        const tokenCode =
            jsonwebtoken.sign(

                {
                    email,
                    verificationCode
                },

                config.JWT.secret,

                {
                    expiresIn: "15m"
                }
            );

        res.cookie(
            "verificationTokenCookie",
            tokenCode,
            {
                maxAge: 15 * 60 * 1000,
                httpOnly: true
            }
        );

        const transporter =
            nodemailer.createTransport({

                service: "gmail",

                auth: {

                    user: config.email.emailUser,

                    pass: config.email.emailPass

                }

            });

        const mailOptions = {

            from: config.email.emailUser,

            to: email,

            subject: "Account verification",

            text:
                `Verification code: ${verificationCode}
                 Valid for 15 minutes`

        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({

            message:
                "Admin registered successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Internal server error"

        });

    }

};

registerAdminController.verifyCode = async (req, res) => {

    try {

        const { verificationCodeRequest } = req.body;

        const token =
            req.cookies.verificationTokenCookie;

        if (!token) {

            return res.status(400).json({
                message: "Token not found"
            });

        }

        const decoded =
            jsonwebtoken.verify(
                token,
                config.JWT.secret
            );

        const {
            email,
            verificationCode
        } = decoded;

        if (
            verificationCodeRequest !==
            verificationCode
        ) {

            return res.status(400).json({
                message: "Invalid code"
            });

        }

        await adminsModel.findOneAndUpdate(
            { email },
            {
                isVerified: true
            }
        );

        res.clearCookie(
            "verificationTokenCookie"
        );

        res.status(200).json({
            message:
                "Email verified successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal server error"
        });

    }

};

export default registerAdminController;