import express from "express";
import "dotenv/config";
import { connectData } from "./database";
import { moviesRouter } from "./Router/movies.routers";

const app = express();

app.use(express.json());

const PORT = 3000;

app.use(moviesRouter);

app.listen(PORT, () => {
    console.log(`API started sucessfully in port ${PORT}`);
    connectData();
});