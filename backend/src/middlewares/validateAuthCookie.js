import jsonwebtoken from "jsonwebtoken";
import { config } from "../utils/config.js";
import responses from "../utils/httpResponses.js";

export const validateAuthCookie = (allowedTypes = []) => {
    return (req, res, next) => {
        try {
            const { authCookie } = req.cookies || {};

            if (!authCookie) {
                return responses.forbidden(res, "No cookie found, authorization required");
            }

            const decoded = jsonwebtoken.verify(authCookie, config.JWT.secret);

            if (allowedTypes.length > 0 && !allowedTypes.includes(decoded.userType)) {
                return responses.unauthorized(res, "Access denied");
            }

            req.authUser = decoded;
            next();
        } catch (error) {
            console.log("error" + error);

            if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
                return responses.unauthorized(res, "Invalid session");
            }

            return responses.serverError(res);
        }
    };
};
