import { Router } from "express";
import { noteRoutes } from "./notes/noteRoute.js";
import { authRoutes } from "./auth/authRoutes.js";


export default function manageRoute(route) {
    const router = Router();
    authRoutes(router);
    noteRoutes(router);

    return router;
}