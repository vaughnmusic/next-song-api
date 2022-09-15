module.exports = (app) => {

    const spotify = require('../controllers/spotify.controller')

    app.get('/api/login', spotify.login);
    app.get('/api/callback', spotify.callback);
    app.get('/api/refresh_token', spotify.refreshToken);

}