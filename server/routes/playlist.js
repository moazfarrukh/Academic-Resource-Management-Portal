const express = require('express');
const playlistController = require('../controllers/playlist');

const router = express.Router();

router.get('/', playlistController.getAllPlaylists);

router.get('/:id', playlistController.getPlaylistById);

router.post('/',playlistController.createPlaylist);

router.post('/add/resource',playlistController.addToPlaylist);


module.exports = router;