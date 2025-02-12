"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const googleAuth_1 = __importDefault(require("./auth/googleAuth"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const workoutRoutes_1 = __importDefault(require("./routes/workoutRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // 📌 Importamos las rutas de autenticación
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(googleAuth_1.default.initialize());
app.use(googleAuth_1.default.session());
app.use("/users", userRoutes_1.default);
app.use("/workouts", workoutRoutes_1.default);
app.use("/auth", authRoutes_1.default); // 📌 Añadimos la autenticación
const PORT = process.env.PORT || 5000;
app.get("/", (_req, res) => {
    res.send("RideTrack API funcionando 🚴‍♂️🔥");
});
exports.default = app;
