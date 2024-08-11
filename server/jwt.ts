import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { createError } from "./error";
import { config } from "dotenv";

config();

type UserType = string | JwtPayload | undefined;

interface CustomRequest extends Request {
  user?: UserType;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        String(process.env.ACCESS_TOKEN_SECRET),
        (err: any, user: UserType) => {
          if (err) return next(createError(403, "Token is not valid!"));
          req.user = user;
          next();
        }
      );
    } else {
      return next(createError(401, "You are not authenticated!"));
    }
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return next(createError(403, "No refresh token!"));
    jwt.verify(
      refreshToken,
      String(process.env.REFRESH_TOKEN_SECRET),
      (err: any, user: UserType) => {
        if (err) return next(createError(401, "Unauthorized!"));
        const newAccessToken = generateAccessToken(user);
        res.json({
          accessToken: newAccessToken,
        });
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

export const generateAccessToken = (user: UserType) => {
  return jwt.sign({ user }, String(process.env.ACCESS_TOKEN_SECRET), {
    expiresIn: "15m",
  });
};

//res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });

export const generateRefreshToken = (user: { username: string }) => {
  return jwt.sign(
    { username: user.username },
    String(process.env.REFRESH_TOKEN_SECRET),
    {
      expiresIn: 604800,
    }
  );
};

//res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
