import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (jwt.verify(token, process.env.JWTSECRET)) {
            req.token = token;
            next();
        }
    } catch (error) {
        return res.status(400).json({ "message": "invalid token" });
    }
}