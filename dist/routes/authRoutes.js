"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const googleAuth_1 = __importDefault(require("../auth/googleAuth"));
const router = (0, express_1.Router)();
// 📌 Ruta para iniciar sesión con Google
router.get("/google", googleAuth_1.default.authenticate("google", { scope: ["profile", "email"] }));
// 📌 Callback de Google (después de la autenticación)
router.get("/google/callback", googleAuth_1.default.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure",
}));
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
exports.default = router;
