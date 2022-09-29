module.exports = (app) => {

    const songs = require('../controllers/songRequest.controller');

    app.post('/api/requests', songs.createNewRequest);

    // define a GET request for 'reqeusts' by gigId
    app.get('/api/requests/:gigId', songs.createNewRequest);

}
