const db = require('../index');

// file needs to be updated to work for this application

exports.getShows = (req, res) => {
    res.send("not implemented")
    // var { userId, songId, gigId } = req.body;

    // if ((typeof userId !== 'string')
    //     || (typeof songId !== 'string')
    //     || (typeof gigId !== 'string')) {
    //     res.status(400).send({
    //         message: "You are missing required data",
    //         body: req.body
    //     })
    //     return;
    // }

    // const script = `
    //     INSERT INTO next_song.song_requests
    //         (user_id, song_id, gig_id)
    //     VALUES
    //         (?, ?, ?);
    // `

    // let pValues = [userId, songId, gigId]

    // db.query(script, pValues, (err, results) => {
    //     if (err) {
    //         res.status(500).send({
    //             message: 'There was a problem saving your ORM',
    //             err
    //         })
    //         return;
    //     } else {
    //         res.send({
    //             message: 'Your one rep max was saved in the database'
    //         })
    //         return;
    //     }
    // })
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