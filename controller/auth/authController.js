import { User } from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const emailValidator =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email && password) {

            if (!String(email).trim().toLowerCase().match(emailValidator)) {
                throw new Error("invalid email");
            }

            const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT));
            const user = await User.create({ email, password: hashedPassword });

            if (user) {
                const token = jwt.sign({ email, id: user._id }, process.env.JWTSECRET, { expiresIn: '30d' });
                return res.status(200).send({ status: 400, "message": "user created successfully", data: { token, email } });
            }

        } else {
            throw new Error("missing fields")
        }
    } catch (err) {

        return res.status(400).send({ status: 400, "message": err.message, data: null })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email && password) {
            if (!String(email).trim().toLowerCase().match(emailValidator)) {
                throw new Error("invalid email");
            }


            const user = await User.findOne({ email });

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ email, id: user._id }, process.env.JWTSECRET, { expiresIn: '30d' });
                return res.status(200).send({ status: 200, "message": "User logged in Successfully", data: { token, email, orders: user.orders, cart: user.cart, } })
            } else {
                throw new Error("user not found/invalid credentials")

            }
        } else {
            throw new Error("missing fields")
        }

    } catch (err) {
        return res.status(400).send({ status: 400, "message": err.message, data: null })
    }


}