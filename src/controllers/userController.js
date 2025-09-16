import express from 'express';
import  User from '../models/user.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';


//? @route POST /api/users/register
//? @desc Register a new user
//? @access Public


//post user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                profilePicture: user.profilePicture,
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//? @route POST /api/users/login
//? @desc Login a user
//? @access Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'incorrect password or email' });
        }
        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                profilePicture: user.profilePicture,
                token: generateToken(user._id),
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


