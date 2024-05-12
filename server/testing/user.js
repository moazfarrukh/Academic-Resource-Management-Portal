const User = require("../models/user.js");
const Resource = require('../models/resource.js')
const jwt = require('jsonwebtoken');
const { hashPassword } = require('../utils/auth_utils.js')

const getUserController = async (req, res) => {
    try {
        const userId = req.params.id || req.query.id;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Failed to retrieve user" });
    }
};

const getUserUploadedResources = async (req, res) => {
    const { id } = req.body;
    try {
        const resources = await Resource.find({ user_id: id })
        res.status(200).json(resources)
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Failed to retrieve resources" });
    }
}

const updateUserDetails = async (req, res) => {
    const { userID, data } = req.body;
    try {
        let user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        if (data.firstName) user.firstName = data.firstName;
        if (data.lastName) user.lastName = data.lastName;
        if (data.newPassword) {   
            const hashedPassword = hashPassword(data.newPassword);
            user.password = hashedPassword;
        }

        user = await user.save();
        const token = jwt.sign({ userId: user.id, firstName: user.firstName, lastname: user.lastName, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.json({ message: 'User updated successfully', token });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { getUserController, getUserUploadedResources, updateUserDetails };
