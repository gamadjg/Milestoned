import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";

// @desc Create a new user and return JWT token
// @route POST /api/users
// @access Public
export const createUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    // Check to see if user already exists
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    //
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        milestones: [],
    });

    if (user) {
        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                milestones: user.milestones,
            },
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc Login user and return JWT token
// @route POST /login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("milestones");

    // If user exists and passwords match, generate JWT token a
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);

        // Send token and user data to client
        res.json({
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                milestones: user.milestones,
            },
        });
    } else {
        // If user does not exist or passwords do not match, send error message
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc Update user
// @route PUT /users/:id
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // Find user by id
    const user = await User.findById(req.user.id);

    // If user not found, return error
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Update user with new info, if provided
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.password = password || user.password;

    // Save updated user
    const updatedUser = await user.save();

    // Generate a new token for the updated user
    const token = generateToken(updatedUser._id);

    // Return updated user and new token
    res.json({
        token,
        user: {
            id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            milestones: updatedUser.milestones,
        },
    });
});

// @desc Delete user
// @route DELETE /users/:id
// @access Private
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id); // Find the user by their ID

    if (!user) {
        // If the user is not found, return an error
        res.status(404);
        throw new Error("User not found");
    }

    await user.deleteOne(); // Delete the user

    res.json({ message: "User removed" }); // Return a success message
});

// @desc Logout user
// @route POST /logout
// @access Private
export const logout = asyncHandler(async (req, res) => {
    // Delete the token from client-side storage (e.g., local storage or cookie)
    // This effectively logs out the user

    res.json({ message: "Logout successful" });
});
// @desc Get all Users
// @route Get /users
// @access Public
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean();

    if (!users?.length) {
        return res.status(400).json({ message: "No users found" });
    }
    res.json(users);
});
