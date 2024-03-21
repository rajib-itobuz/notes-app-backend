import { loginUser, registerUser } from "../../controller/auth/authController.js";


export const authRoutes = (router) => {
    router.post("/register", registerUser);
    router.post("/login", loginUser);
}