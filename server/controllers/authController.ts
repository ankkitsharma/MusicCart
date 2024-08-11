import bcrypt from "bcrypt";
import { createError } from "../error";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import pool from "../dbConfig";
import { generateAccessToken, generateRefreshToken } from "../jwt";
import { QueryResult } from "pg";

interface customSignUpRequest extends Request {
  body: {
    username: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    address?: string;
  };
}

export const signUp = async (
  req: customSignUpRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("req.body ", req.body);
    const { username, password, email, first_name, last_name, phone, address } =
      req.body;
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const emailCheckQuery = {
      text: "SELECT * from users WHERE username = $1",
      values: [username],
    };
    const emailCheckResult = await pool.query(emailCheckQuery);
    if (emailCheckResult.rows.length > 0) {
      return next(createError(400, "User already exists!"));
    }
    const insertUserQuery = {
      text: `INSERT INTO users (username, password_hash, email, first_name, last_name, phone, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      values: [
        username,
        password_hash,
        email,
        first_name,
        last_name,
        phone || null,
        address || null,
      ],
    };
    const newUser = await pool.query(insertUserQuery);
    res.status(201).json({
      message: "user registered successfully",
      user: newUser.rows[0],
    });
    next();
  } catch (error) {
    console.error("Error signing up ");
    next(error);
  }
};

interface SignInQueryResult extends QueryResult {
  username: string;
  password_hash: string;
  email: string;
  first_name: string;
  last_name: string;
}

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const user: SignInQueryResult = (await pool.query(
      `SELECT * FROM users WHERE ${username ? "username" : "email"} = $1 `,
      [username || email]
    )) as SignInQueryResult;
    if (user.rowCount === 0) {
      return next(createError(404, "User not found"));
    } else {
      const isCorrect = await bcrypt.compare(
        password,
        user.rows[0].password_hash
      );
      if (!isCorrect) return next(createError(400, "wrong Credentials!"));
      const accessToken = generateAccessToken(user.rows[0]);
      const refreshToken = generateRefreshToken(user.rows[0]);
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
        })
        .status(200)
        .json({
          message: "Login successful",
          user: user.rows[0],
          accessToken,
        });
      next();
    }
  } catch (error) {
    console.error("Error logging in ");
    next(error);
  }
};
