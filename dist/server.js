"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const PORT = process.env.PORT || 5000;
// Sincronizar la base de datos antes de arrancar el servidor
database_1.default.sync({ alter: true }).then(() => {
    console.log("📦 Base de datos sincronizada");
    app_1.default.listen(PORT, () => {
        console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("❌ Error sincronizando la base de datos:", error);
});
