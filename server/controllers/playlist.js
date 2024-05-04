const Playlist = require('../models/playlist');

// Create playlist controller
const createPlaylist = async (req, res) => {
    try {
        const { user_id, name, description } = JSON.parse(req.body.playlist);
        console.log(req.body.playlist)
        const playlist = new Playlist({
            userId:user_id,
            name,
            description,
            resources: []
        });

        await playlist.save();

        res.status(201).json(playlist);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create playlist' });
    }
};

const addToPlaylist = async (req, res) => {
    try {
        const { playlistId, resourceId } = req.body;

        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        playlist.resources.push(resourceId);
        await playlist.save();

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add to playlist' });
    }
};

const getPlaylistById = async (req, res) => {
    try {
        const playlistId = req.params.id || req.query.id;
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get playlist' });
    }
};

const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find();

        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get playlists' });
    }
};

module.exports = {
    createPlaylist,
    addToPlaylist,
    getPlaylistById,
    getAllPlaylists
};