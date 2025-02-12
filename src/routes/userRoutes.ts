import { Router, Request, Response } from "express";
import { User } from "../models/User";

const router = Router(); // 📌 Definir Router correctamente

// 📌 Crear usuario
router.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, name, profilePicture, authProvider } = req.body;

        if (!email || !name || !authProvider) {
            res.status(400).json({ message: "Faltan datos obligatorios" });
            return;
        }

        const user = await User.create({ email, name, profilePicture, authProvider });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error creando usuario", error });
    }
});

// 📌 Obtener usuario por ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo usuario", error });
    }
});

export default router;

