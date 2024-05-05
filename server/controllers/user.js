const User =  require("../models/user.js");
const Resource = require('../models/resource.js')
const jwt = require('jsonwebtoken');
const {hashPassword} = require('../utils/auth_utils.js')

// Import the necessary modules or dependencies

// Define the controller function
const getUserController = async (req, res) => {
    try {
        // Retrieve the user ID from the request parameters or query string
        const userId = req.params.id || req.query.id;

        // Fetch the user data from the database
        const user = await User.findById(userId);

        // Return the user data as a JSON response
        res.status(200).json(user);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Failed to retrieve user" });
    }
};

const getUserUploadedResources = async (req, res)=>
{
    const {id} = req.body;
    console.log(id)
    try {
        const resources = await Resource.find({user_id:id})
        res.status(200).json(resources)
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Failed to retrieve resources" });
    }
}

const updateUserDetails = async(req, res)=>{
    const { userID, data } = req.body;

    try {
        // Find the user by ID
        let user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Update the user data if provided
        if (data.firstName) user.firstName = data.firstName;
        if (data.lastName) user.lastName = data.lastName;
        if (data.newPassword) 
        {   
            const hashedPassword = hashPassword(data.newPassword);
            user.password = hashedPassword;
        }

        // Save the updated user
        user = await user.save();
        const token = jwt.sign({ userId: user.id, firstName: user.firstName, lastname: user.lastName, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.json({ message: 'User updated successfully', token });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Export the controller function
module.exports = { getUserController, getUserUploadedResources, updateUserDetails };

