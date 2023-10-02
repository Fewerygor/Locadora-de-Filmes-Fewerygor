import express from "express";
import "dotenv/config";
import { connectData } from "./database";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`API started sucessfully in port ${PORT}`);
    connectData();
});