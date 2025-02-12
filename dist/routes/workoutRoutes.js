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
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
// 📌 Registrar un entrenamiento
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, date, type, distance, duration, averagePower, maxPower, calories } = req.body;
        if (!userId || !date || !type || !distance || !duration || !averagePower || !maxPower || !calories) {
            res.status(400).json({ message: "Faltan datos obligatorios" });
            return;
        }
        const workout = yield Workout_1.Workout.create({
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
    }
    catch (error) {
        res.status(500).json({ message: "Error registrando entrenamiento", error });
    }
}));
// 📌 Obtener entrenamientos de un usuario
router.get("/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const workouts = yield Workout_1.Workout.findAll({ where: { userId } });
        if (workouts.length === 0) {
            res.status(404).json({ message: "No hay entrenamientos para este usuario." });
            return;
        }
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo entrenamientos", error });
    }
}));
exports.default = router;
