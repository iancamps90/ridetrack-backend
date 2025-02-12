import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Workout } from "../models/Workout";
import { Activity } from "../models/Activity";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    models: [User, Workout, Activity], // Asegura que los modelos están bien importados
});

export default sequelize;

