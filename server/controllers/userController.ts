import bcrypt from "bcrypt";
import { createError } from "../error";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import pool from "../dbConfig";
import { generateAccessToken, generateRefreshToken } from "../jwt";
import { QueryResult } from "pg";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const user = await pool.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    res.status(200).json(user.rows[0]);
  } catch (error) {
    next(error);
  }
};
