import { Router } from "express";
import passport from "../auth/googleAuth";

const router = Router();

// 📌 Ruta para iniciar sesión con Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 📌 Callback de Google (después de la autenticación)
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/auth/success",
        failureRedirect: "/auth/failure",
    })
);

// 📌 Ruta de éxito (cuando el usuario inicia sesión correctamente)
router.get("/success", (req, res) => {
    res.json({ message: "Autenticación exitosa", user: req.user });
});

// 📌 Ruta de error (cuando falla la autenticación)
router.get("/failure", (req, res) => {
    res.status(401).json({ message: "Autenticación fallida" });
});

// 📌 Ruta para cerrar sesión
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.json({ message: "Sesión cerrada" });
    });
});

export default router;
