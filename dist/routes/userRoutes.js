"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)(); // 📌 Definir Router correctamente
// 📌 Crear usuario
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, profilePicture, authProvider } = req.body;
        if (!email || !name || !authProvider) {
            res.status(400).json({ message: "Faltan datos obligatorios" });
            return;
        }
        const user = yield User_1.User.create({ email, name, profilePicture, authProvider });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error creando usuario", error });
    }
}));
// 📌 Obtener usuario por ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo usuario", error });
    }
}));
exports.default = router;
