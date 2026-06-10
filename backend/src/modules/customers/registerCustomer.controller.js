import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import { config } from "../../utils/config.js";

import customerModel from "./customer.model.js";

const registerCustomerController = {};

registerCustomerController.register = async (req, res) => {

    try {

        const {
            name,
            last_name,
            email,
            password,
            addresses
        } = req.body;

        const existCustomer =
            await customerModel.findOne({ email });

        if (existCustomer) {

            return res.status(400).json({
                message: "Customer already exists"
            });

        }

        const passwordHash =
            await bcryptjs.hash(password, 10);

        const newCustomer = new customerModel({

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

            addresses,

            purchase_history: [],

            isActive: true,

            isVerified: false,

            loginAttempts: 0,

            timeOut: null

        });

        await newCustomer.save();

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

            subject: "Verificación de la cuenta",

            text:
                `Código de verificación: ${verificationCode}
                 valido por 15 minutos.`,
            html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;">
          <h2 style="color:#000">Verificación de la cuenta</h2>
          <p>Usa este código para verificar tu cuenta:</p>
          <div style="font-size:2rem;font-weight:bold;letter-spacing:8px;text-align:center;padding:16px;background:#fef9c3;border-radius:8px;">
            ${verificationCode}
          </div>
        </div>
      `,

        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({

            message:
                "Customer registered successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Internal server error"

        });

    }

};

registerCustomerController.verifyCode = async (req, res) => {

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

        await customerModel.findOneAndUpdate(
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

export default registerCustomerController;