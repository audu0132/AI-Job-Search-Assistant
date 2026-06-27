"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// Helper to generate JWT Token
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET || "your_super_secret_key", {
        expiresIn: "30d",
    });
};
/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, role, profilePicture, skills, experience, education, location, resumeUrl, linkedInUrl, gitHubUrl, } = req.body;
        // Check if user already exists
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
            return;
        }
        // Hash password
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // Create user
        const user = await User_1.default.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            role: role || "user",
            profilePicture,
            skills,
            experience,
            education,
            location,
            resumeUrl,
            linkedInUrl,
            gitHubUrl,
        });
        // Generate token
        const token = generateToken(user._id.toString(), user.role);
        // Send response with HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                phone: user.phone,
                profilePicture: user.profilePicture,
                skills: user.skills,
                experience: user.experience,
                education: user.education,
                location: user.location,
                resumeUrl: user.resumeUrl,
                linkedInUrl: user.linkedInUrl,
                gitHubUrl: user.gitHubUrl,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during registration",
            error: error.message,
        });
    }
};
exports.register = register;
/**
 * @desc    Auth user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate inputs
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Please provide an email and password",
            });
            return;
        }
        // Find user
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
            return;
        }
        // Check if password matches
        const isMatch = await bcrypt_1.default.compare(password, user.password || "");
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
            return;
        }
        // Generate token
        const token = generateToken(user._id.toString(), user.role);
        // Send response with HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                phone: user.phone,
                profilePicture: user.profilePicture,
                skills: user.skills,
                experience: user.experience,
                education: user.education,
                location: user.location,
                resumeUrl: user.resumeUrl,
                linkedInUrl: user.linkedInUrl,
                gitHubUrl: user.gitHubUrl,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error during login",
            error: error.message,
        });
    }
};
exports.login = login;
/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
    try {
        // req.user is already populated by the protect middleware
        if (!req.user) {
            res.status(404).json({
                success: false,
                message: "User profile not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            user: {
                id: req.user._id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                role: req.user.role,
                phone: req.user.phone,
                profilePicture: req.user.profilePicture,
                skills: req.user.skills,
                experience: req.user.experience,
                education: req.user.education,
                location: req.user.location,
                resumeUrl: req.user.resumeUrl,
                linkedInUrl: req.user.linkedInUrl,
                gitHubUrl: req.user.gitHubUrl,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error retrieving profile",
            error: error.message,
        });
    }
};
exports.getProfile = getProfile;
/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user?._id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        // Fields that are allowed to be updated
        const updatableFields = [
            "firstName",
            "lastName",
            "phone",
            "profilePicture",
            "skills",
            "experience",
            "education",
            "location",
            "resumeUrl",
            "linkedInUrl",
            "gitHubUrl",
        ];
        // Loop through update fields and apply updates
        updatableFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                // Use type assertion to set properties dynamically
                user[field] = req.body[field];
            }
        });
        // Also support password updates if requested
        if (req.body.password) {
            const salt = await bcrypt_1.default.genSalt(10);
            user.password = await bcrypt_1.default.hash(req.body.password, salt);
        }
        // Save updated user (pre-save validation will run)
        const updatedUser = await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                profilePicture: updatedUser.profilePicture,
                skills: updatedUser.skills,
                experience: updatedUser.experience,
                education: updatedUser.education,
                location: updatedUser.location,
                resumeUrl: updatedUser.resumeUrl,
                linkedInUrl: updatedUser.linkedInUrl,
                gitHubUrl: updatedUser.gitHubUrl,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error updating profile",
            error: error.message,
        });
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=authController.js.map