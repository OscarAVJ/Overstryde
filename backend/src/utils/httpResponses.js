const responses = {
    forbidden: (res, message = "Forbidden") => res.status(403).json({ message }),
    unauthorized: (res, message = "Unauthorized") => res.status(401).json({ message }),
    serverError: (res, message = "Internal server error") => res.status(500).json({ message }),
};

export default responses;
