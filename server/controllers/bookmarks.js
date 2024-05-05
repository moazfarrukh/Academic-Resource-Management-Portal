const Bookmarks = require('../models/bookmarks')
const Resource = require('../models/resource')


const bookmarkResource = async(req, res)=>
{
    const { userID, resourceID } = req.body;

    try {
        
        let userBookmarks = await Bookmarks.findOne({ userID });

        if (!userBookmarks) {
            
            userBookmarks = new Bookmarks({ userID, bookmarks: [] });
        }

        
        userBookmarks.bookmarks.push(resourceID);
       
        await userBookmarks.save();

        res.status(200).json({ success: true, message: 'Resource bookmarked successfully.' });
    } catch (error) {
        console.error('Error bookmarking resource:', error);
        res.status(500).json({ success: false, message: 'Failed to bookmark resource.' });
    }
}

const getAllBookmarks = async (req, res) => {
    const { userID } = req.params;

    try {
        // Find the bookmarks document for the user
        const userBookmarks = await Bookmarks.findOne({ userID: { $regex: new RegExp(userID, "i") } });

        if (!userBookmarks) {
            return res.status(404).json({ success: false, message: 'Bookmarks not found for the user.' });
        }

        const bookmarksWithDetails = await Promise.all(userBookmarks.bookmarks.map(async (resourceID) => {
            const resource = await Resource.findById(resourceID);
            if (!resource) {
                return null; 
            }
            return {
                _id: resource._id,
                title: resource.title,
                description: resource.description,
                media:resource.media,
                category:resource.category,
                file_path:resource.file_path,
                user_id:resource.user_id,
                comments:resource.comments
            };
        }));

        // Filter out any null values (resources not found)
        const validBookmarks = bookmarksWithDetails.filter(bookmark => bookmark !== null);

        res.status(200).json({ success: true, bookmarks: validBookmarks });
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch bookmarks.' });
    }
};

module.exports = {bookmarkResource, getAllBookmarks}