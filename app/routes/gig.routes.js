module.exports = (app) => {

    const gig = require('../controllers/gig.controller');

    app.get('/api/gigs', gig.getShows);
    app.get('/api/gigs/:gigId', gig.getGigById);

    app.post('/api/gigs', gig.createNewGig);

}