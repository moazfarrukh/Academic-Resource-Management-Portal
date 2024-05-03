const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { hashPassword, comparePasswords } = require('../utils/auth_utils');
const { check, validationResult } = require('express-validator');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'email or password not provided' });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email ' });
        }

        // Check if the password is correct
        const isPasswordValid = comparePasswords(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate and send a JWT token with 1 day expiry
        const token = jwt.sign({ userId: user.id, firstName: user.firstName, lastname: user.lastName, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.register = async (req, res) => {
    try {
        // Define validation rules
        const validationPromises = [
            check('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
            check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
            check('firstName').notEmpty().withMessage('First name is required'),
            check('lastName').notEmpty().withMessage('Last name is required')
        ];

        // Run validation rules
        await Promise.all(validationPromises.map(validation => validation.run(req)));

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // If validation passes, continue with registration logic...
        const { email, password, firstName, lastName } = req.body;
        const newEmail = email.toLowerCase().trim();

        // Check if the email is already taken
        const existingUser = await User.findOne({ email: newEmail });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        const hashedPassword = hashPassword(password);

        // Create a new user in the database
        const newUser = await User.create({
            email: newEmail,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });

        res.status(201).json({ message: 'Registration successful', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};
