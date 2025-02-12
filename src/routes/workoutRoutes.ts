import { Router, Request, Response } from "express";
import { Workout } from "../models/Workout";

const router = Router();

// 📌 Registrar un entrenamiento
router.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, date, type, distance, duration, averagePower, maxPower, calories } = req.body;

        if (!userId || !date || !type || !distance || !duration || !averagePower || !maxPower || !calories) {
            res.status(400).json({ message: "Faltan datos obligatorios" });
            return;
        }

        const workout = await Workout.create({
            userId,
            date,
            type,
            distance,
            duration,
            averagePower,
            maxPower,
            calories,
        });

        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ message: "Error registrando entrenamiento", error });
    }
});


// 📌 Obtener entrenamientos de un usuario
router.get("/user/:userId", async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const workouts = await Workout.findAll({ where: { userId } });

        if (workouts.length === 0) {
            res.status(404).json({ message: "No hay entrenamientos para este usuario." });
            return;
        }

        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo entrenamientos", error });
    }
});




export default router;



