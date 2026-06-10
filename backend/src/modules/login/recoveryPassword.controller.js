import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import customerModel from "../customers/customer.model.js";
import { config } from "../../utils/config.js";

const recoverPasswordController = {};

recoverPasswordController.requestRecovery = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "El correo es requerido" });
    }

    const customer = await customerModel.findOne({ email });

    if (!customer) {
      return res.status(200).json({
        message: "Si el correo está registrado, recibirás instrucciones.",
      });
    }

    const recoveryCode = crypto.randomBytes(3).toString("hex"); 

    const tokenCode = jsonwebtoken.sign(
      { email, recoveryCode },
      config.JWT.secret,
      { expiresIn: "15m" }
    );

    res.cookie("recoverTokenCookie", tokenCode, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.emailUser,
        pass: config.email.emailPass,
      },
    });

    const mailOptions = {
      from: config.email.emailUser,
      to: email,
      subject: "Recuperación de contraseña",
      text: `Tu código de recuperación es: ${recoveryCode}\nVálido por 15 minutos.`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;">
          <h2 style="color:#000">Recuperar contraseña</h2>
          <p>Usa este código para restablecer tu contraseña:</p>
          <div style="font-size:2rem;font-weight:bold;letter-spacing:8px;text-align:center;padding:16px;background:#fef9c3;border-radius:8px;">
            ${recoveryCode}
          </div>
          <p style="color:#888;font-size:12px;margin-top:16px;">Válido por 15 minutos. Si no solicitaste esto, ignora este correo.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Si el correo está registrado, recibirás instrucciones.",
    });
  } catch (error) {
    console.error("recoverPassword.requestRecovery error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

recoverPasswordController.resetPassword = async (req, res) => {
  try {
    const { code, newPassword } = req.body;

    if (!code || !newPassword) {
      return res.status(400).json({ message: "Código y nueva contraseña son requeridos" });
    }

    const token = req.cookies.recoverTokenCookie;

    if (!token) {
      return res.status(400).json({ message: "Sesión de recuperación no encontrada o expirada" });
    }

    let decoded;
    try {
      decoded = jsonwebtoken.verify(token, config.JWT.secret);
    } catch (_) {
      return res.status(400).json({ message: "El código expiró. Solicita uno nuevo." });
    }

    const { email, recoveryCode } = decoded;

    if (code !== recoveryCode) {
      return res.status(400).json({ message: "Código incorrecto" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    const passwordHash = await bcryptjs.hash(newPassword, 10);

    const updated = await customerModel.findOneAndUpdate(
      { email },
      { password: passwordHash, loginAttempts: 0, timeOut: null },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.clearCookie("recoverTokenCookie");

    return res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("recoverPassword.resetPassword error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default recoverPasswordController;