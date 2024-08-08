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
    const token = req.cookies.accessToken;
    console.log("token", token);
    if (!token) return next(createError(401, "You are not authenticated!"));
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: any, user: UserType) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
      }
    );
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
    const token = req.cookies.refreshToken;
    if (!token) return next(createError(403, "No token to refresh!"));
    jwt.verify(
      token,
      String(process.env.REFRESH_TOKEN_SECRET),
      (err: any, user: UserType) => {
        if (err) return next(createError(401, "Unauthorized!"));
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
        });
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
        });
        res.json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
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

export const generateRefreshToken = (user: UserType) => {
  return jwt.sign({ user }, String(process.env.REFRESH_TOKEN_SECRET), {
    expiresIn: "7d",
  });
};

//res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
