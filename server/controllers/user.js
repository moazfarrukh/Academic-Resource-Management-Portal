const User =  require("../models/user.js");
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

// Export the controller function
module.exports = getUserController;
