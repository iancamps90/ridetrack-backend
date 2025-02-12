import app from "./app";
import sequelize from "./config/database";

const PORT = process.env.PORT || 5000;

// Sincronizar la base de datos antes de arrancar el servidor
sequelize.sync({ alter: true }).then(() => {
    console.log("📦 Base de datos sincronizada");
    app.listen(PORT, () => {
        console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("❌ Error sincronizando la base de datos:", error);
});
