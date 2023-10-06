import { Router } from "express";
import { createMovie, deleteMovie, getMovies, getOneMovie, updateMessage } from "../logic";
import { isIdMovieValid, verifyIdMovieUnique } from "../middlewares";

export const moviesRouter = Router();

moviesRouter.post("/movies", verifyIdMovieUnique, createMovie);
moviesRouter.get("/movies", getMovies);
moviesRouter.get("/movies/:id", isIdMovieValid, getOneMovie);
moviesRouter.delete("/movies/:id", isIdMovieValid, deleteMovie);
moviesRouter.patch("/movies/:id", isIdMovieValid, verifyIdMovieUnique, updateMessage);