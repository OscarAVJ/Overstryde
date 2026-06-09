import bcrypt from "bcryptjs"; // Encriptacion
import jsonwebtoken from "jsonwebtoken"; // Token
import customerModel from "../customers/customer.model.js";
import { config } from "../../utils/config.js";

// Array de funciones
const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
    try {
        
        // 1. Solcitar los datos (correo y contraseña)
        const {email, password } = req.body;
        // verificar si existe el correo en la base de datos
        const userFound = await customerModel.findOne({email});

        // Si no lo encuentra
        if(!userFound){
            return res.status(404).json({message: "Customer not found"})
        }

        // Verificar si la cuenta está bloqueada
        if(userFound.timeOut && userFound.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueda"})
        }

        // Verificamos la contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch){
            // En caso de equivocarse en la contraseña
            // Suma 1 a los intentos fallidos
            userFound.loginAttemps = (userFound.loginAttemps || 0)+1 ;
            // Se bloquea la cuenta despues de 5 intentos fallidos
            if (userFound.loginAttemps >= 5){
                userFound.timeOut = Date.now() + 15 *60*1000;
                // Se reinicia el numero de intentos
                userFound.loginAttemps = 0;

                await userFound.save();
                return res.status(403).json({message: "Cuenta bloqueada"})
            }
            await userFound.save();
            return res.status(403).json({message: "Contraseña incorrecta"})   
        }

        userFound.loginAttemps = 0
        userFound.timeOut = null
        await userFound.save();

        // Generar el token
        const token = jsonwebtoken.sign(
            // 1. ¿Que vamos a guardar?
            {id: userFound._id, userType:"customer"},
            // 2 Secret key
            config.JWT.secret,
            // 3. tiempo de expiracion
            {expiresIn:"30d"}
        );

        // Guardamos el tokene en una cookie
        res.cookie("authCookie",token);

        // y yap
        return res.status(200).json({message:"Login exitoso"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message:"Internal server error"})
    }
};

export default loginCustomerController;