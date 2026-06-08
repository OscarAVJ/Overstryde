import nodemailer from "nodemailer"; // Envia correos
import crypto from "crypto"; // Genera códigos aleatorios
import jsonwebtoken from "jsonwebtoken"; // Genera el token
import bcryptjs from "bcryptjs"; // Encriptar contraseña
import { config } from "../../config.js";

import customerModel from "./customer.model.js";
import { v2 as cloudinary } from "cloudinary";

const registerCustomerController = {};

registerCustomerController.register = async (req, res) => {
    try {
        const {
            name,
            last_name,
            email,
            password,
            addresses,
            purchase_history, 
            isActive,
            is_verified,
            loginAttempts, timeOut } = req.body;
        const existCustomer = await customerModel.findOne({ email })
        if (existCustomer) {
            return res.status(400).json({ message: "Customer already exists" })
        }

        // Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10);

        // Guardamos en BD
        const newCustomer = new customerModel({
            name,
            last_name,
            photo : req.file.path,
            public_id: req.file.filename,
            email,
            password : passwordHash,
            addresses,
            purchase_history, 
            isActive,
            is_verified : isVerified || false,
            loginAttempts, timeOut
        });

        await newCustomer.save();

        // Generar código aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex")

        // Se guarda el código en un token
        const tokenCode = jsonwebtoken.sign(
            // 1. ¿Que vamos a guardar?
            { email, verificationCode },
            // 2. Secret key
            config.JWT.secret,
            // 3. ¿Cuando expira?
            { expiresIn: "15m" }
        );

        res.cookie("verificationTokenCookie", tokenCode, { maxAge: 15 * 60 * 1000 }) // Se especifica el tiempo 15 = minuto. 60 = segundos. 1000 = milisegundos

        // Enviar un correo con el código
        // 1. Transporter -> ¿Quien envia el correo?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.emailUser,
                pass: config.email.emailPass
            }
        })

        // 2. ¿Quien lo recibe?
        const mailOptions = {
            from: config.email.emailUser,
            to: email,
            subject: "Verificación de cuenta",
            text: "Para verificar tu cuenta, utiliza este código" + verificationCode + "expira en 15 minutos"
        }

        // 3. Enviar el correo electrónico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error)
                return res.status(500).json({ message: "error" })
            }

            res.status(200).json({ message: "email send" })
        });


    }
    catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal server error" })
    }
};

registerCustomerController.verifyCode = async (req, res) => {
    try {
        // 1. Solicitamos el código que el usuario escribio en el frontend
        const { verificationCodeRequest } = req.body;

        // 2. Obtener el token de la cookie
        const token = req.cookies.verificationTokenCookie;

        // 3. Extraer la información del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const { email, verificationCode: storedCode } = decoded;

        // 4. Comparamos el token que el usuario escribio en el frontend conel que se se esta guarando en el token
        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: "Invalid Code" })
        }

        // Si el código si esta bien, entonces, se coloca el campo "isVerified" en true
        const customer = await customerModel.findOne({ email });
        customer.isVerified = true;
        await customer.save();

        res.clearCookie("verificationTokenCookie")

        res.json({ message: "Email verified successfully" })

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({ message: "Internal server error" + error })
    }
};

export default registerCustomerController;


