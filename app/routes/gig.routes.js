module.exports = (app) => {

    const gig = require('../controllers/gig.controller');

    app.get('/api/gigs', gig.getShows);

    app.post('/api/gigs', gig.createNewGig);

}