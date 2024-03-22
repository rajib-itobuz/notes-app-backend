import authController from "../../controller/auth/authController.js";


export const authRoutes = (router) => {
    router.post("/register", authController.registerUser.bind(authController));
    router.post("/login", authController.loginUser.bind(authController));
}