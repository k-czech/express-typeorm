import "reflect-metadata";
import { AppDataSource } from "./data-source.ts";
import { User } from "./entities/User.ts";
import express from 'express';
import userRoutes from "./routes/userRoutes.ts";

const PORT = 3000;
const app = express();
// Bardzo ważne: pozwala Expressowi rozumieć JSON-y wysyłane w Body
app.use(express.json());

AppDataSource.initialize()
    .then(async () => {
        console.log("Połączono z bazą danych! 🚀");

        app.use("/users", userRoutes);
        
        app.listen(PORT, () => {
            console.log(`Serwer wystartował na http://localhost:${PORT} i ścieżki są gotowe! ✅`);
        });
    })
    .catch((error) => console.log("Błąd połączenia: ", error));