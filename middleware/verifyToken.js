import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';


export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (jwt.verify(token, config.secret)) {
            req.token = token;
            next();
        }
    } catch (error) {
        return res.status(400).send({ "message": "invalid token" });
    }
}