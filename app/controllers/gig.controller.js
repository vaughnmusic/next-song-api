const db = require('../index');

// file needs to be updated to work for this application

exports.getShows = (req, res) => {

    const query = `
        SELECT * FROM gigs;
    `;

    db.query(query, (err, results) => {

        if (err) {
            res.status(500).send({
                error: err,
                message: "There was a problem getting gigs"
            });
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "No gigs found :("
            });
            return;
        } else {
            res.send(results);
        }
    });
}

exports.getGigById = (req, res) => {

    let { gigId } = req.params;

    const query = `
        SELECT * FROM gigs
        WHERE id = ?;
    `;

    let pValues = [gigId];


    db.query(query, pValues, (err, results) => {

        if (err) {
            res.status(500).send({
                error: err,
                message: "There was a problem getting gigs"
            });
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "No gigs found :("
            });
            return;
        } else {
            res.send(results[0]);
        }
    });
}


exports.createNewGig = (req, res) => {

    var { playlistId, location } = req.body;

    if ((typeof playlistId !== 'string')
        || (typeof location !== 'string')) {
        res.status(400).send({
            message: "You are missing required data",
            body: req.body
        })
        return;
    }

    const script = `
        INSERT INTO next_song.gigs
            (id, spotify_playlist_id, location)
        VALUES
            (uuid(), ?, ?);
    `

    let pValues = [playlistId, location]

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem saving your gig',
                err
            })
            return;
        } else {
            res.send({
                message: 'Your gig was created!'
            })
            return;
        }
    })
}