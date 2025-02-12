import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./auth/googleAuth";
import userRoutes from "./routes/userRoutes";
import workoutRoutes from "./routes/workoutRoutes";
import authRoutes from "./routes/authRoutes"; // 📌 Importamos las rutas de autenticación

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);
app.use("/auth", authRoutes); // 📌 Añadimos la autenticación

const PORT = process.env.PORT || 5000;

app.get("/", (_req, res) => {
    res.send("RideTrack API funcionando 🚴‍♂️🔥");
});

export default app;

