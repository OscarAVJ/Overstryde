const isHttpsRequest = (req) =>
    req.secure || req.headers["x-forwarded-proto"] === "https";

export const getCookieOptions = (req, options = {}) => {
    const isSecure = isHttpsRequest(req);

    return {
        httpOnly: true,
        secure: isSecure,
        sameSite: isSecure ? "none" : "lax",
        path: "/",
        ...options,
    };
};
