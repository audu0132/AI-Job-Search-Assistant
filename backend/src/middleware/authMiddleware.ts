import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

interface JwtPayload {
  id: string;
  role: string;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Check Authorization header for Bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Check cookies as fallback (if cookie-parser is used)
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Not authorized to access this route. No token provided.",
      });
      return;
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "cZZHTOvllWuh71HYLMH5GuTVxiqqaJdZo6sgHbr4sFq"
    ) as JwtPayload;

    // Get user from the token
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Not authorized. User not found.",
      });
      return;
    }

    // Attach user to request object
    req.user = {id: user._id.toString()};
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized. Invalid or expired token.",
    });
  }
};
