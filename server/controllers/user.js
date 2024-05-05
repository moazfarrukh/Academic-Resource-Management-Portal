const User =  require("../models/user.js");
const Resource = require('../models/resource.js')

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

// Export the controller function
module.exports = { getUserController, getUserUploadedResources };

