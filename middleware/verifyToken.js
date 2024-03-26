import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';


export const verifyToken = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (jwt.verify(token, config.secret)) {
                req.token = token;
                next();
            }
        } else {
            throw new Error("token not specified")
        }
    } catch (error) {
        next(error)
    }
}