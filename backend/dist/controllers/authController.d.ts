import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export declare const register: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @desc    Auth user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export declare const login: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export declare const getProfile: (req: AuthRequest, res: Response) => Promise<void>;
/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
export declare const updateProfile: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map