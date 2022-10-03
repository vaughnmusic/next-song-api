const db = require('../index');
const { v4: uuid } = require('uuid');

exports.createNewRequest = (req, res) => {

    var { songId, gigId } = req.body;

    if ((typeof songId !== 'string')
        || (typeof gigId !== 'string')) {
        res.status(400).send({
            message: "You are missing required data",
            body: req.body
        })
        return;
    }

    const script = `
        INSERT INTO next_song.song_requests
            (song_id, gig_id)
        VALUES
            (?, ?);
    `;

    let pValues = [songId, gigId]

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem submitting your song request',
                err
            })
            return;
        } else {
            res.send({
                message: 'Your song request was submitted!'
            })
            return;
        }
    })
}

// create a function to GET all requests for some gig
// returns arr of data as response

exports.getRequestsForGig = (req, res) => {
    var { songId, gigId } = req.body;

    if ((typeof songId !== 'string')
        || (typeof gigId !== 'string')) {
        res.status(400).send({
            message: "You are missing required data",
            body: req.body
        })
        return;
    }

    const query = `
    SELECT * FROM next_song.song_requests
    WHERE gig_id = ?;
    `;

    let pValues = [songId, gigId]

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem finding your song requests',
                err
            })
            return;
        } else {
            res.send({
                message: 'We have found your song requests!'
            })
            return;
        }
    })


    // function getExerciseHistory(user_id, exercise_id) {
    //     return axios.get(`${URL}/orms/user/${user_id}/exercise/${exercise_id}`)
    // }
}

exports.deleteRequest = (req, res) => {

    let { id } = req.params;

    let script = `
        DELETE FROM next_song.song_requests
        WHERE (id = ?)
    `

    db.query(script, [id], (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was an error deleting your maximum',
                err
            })
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: 'No exercises to delete found'
            })
            return;
        } else {
            res.send({
                message: "Excercise deleted successfully"
            })
            return;
        }
    })
}