module.exports = (app) => {

    const songs = require('../controllers/songRequest.controller');

    app.post('/api/requests', songs.createNewRequest);
    // app.get('/api/songs/user/:userId', songs.getUsersSongLibrary);
    // app.get('/api/songs/user/:userId/recent', songs.getAllRequests);
    // app.get('/api/songs/user/:userId/recent/:songId', songs.getSongRequest);
    // app.get('/api/songs/user/:userId/song/:songId', songs.getSongRequestHistory);

    // app.put('/api/songs/', orms.updateRequests);

    // app.delete('/api/orms/:id', orms.deleteRequests);
}
