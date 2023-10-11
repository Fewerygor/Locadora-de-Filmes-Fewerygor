import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import format from "pg-format";

export const createMovie = async (req: Request, res: Response) => {
  const queryString = `INSERT INTO movies (name, category, duration, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [
      req.body.name,
      req.body.category,
      req.body.duration,
      req.body.price,
    ],
  };

  const query = await client.query(queryConfig);

  return res.status(201).json(query.rows[0]);
};

export const getMovies = async (req: Request, res: Response) => {
  const queryString = `SELECT * FROM movies WHERE category = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.query.category],
  };

  const query = await client.query(queryConfig);

  if (query.rows.length == 0) {
    const queryString = `SELECT * FROM movies;`;
    const query = await client.query(queryString);
    return res.status(200).json(query.rows);
  }

  return res.status(200).json(query.rows);
};

export const getOneMovie = async (req: Request, res: Response) => {
  return res.status(200).json(res.locals.movie);
};

export const deleteMovie = async (req: Request, res: Response) => {
  const queryString = `DELETE FROM movies WHERE id = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [req.params.id],
  };

  const query = client.query(queryConfig);

  return res.status(204).json();
};

export const updateMessage = async (req: Request, res: Response) => {
  const queryConfig = format(
    `
        UPDATE movies SET (%I) = ROW (%L) WHERE ID = %L RETURNING *;
    `,
    Object.keys(req.body),
    Object.values(req.body),
    req.params.id
  );

  const query = await client.query(queryConfig);

  return res.status(200).json(query.rows[0]);
};
