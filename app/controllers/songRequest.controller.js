const db = require('../index');
const { v4: uuid } = require('uuid');

// file needs to be updated to work for this application

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
            (id, song_id, gig_id)
        VALUES
            (?, ?, ?);
    `

    let pValues = [uuid(), songId, gigId]

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem saving your song request.',
                err
            })
            return;
        } else {
            res.send({
                message: 'Your song request was saved in the database.'
            })
            return;
        }
    })
}

exports.getPerformersFullCatalogue = (req, res) => {

    const { userId } = req.params;

    // let script = `
    //     SELECT 
    //         id, performer_id, song_id
    //     FROM catalogue
    //     INNER JOIN one_rep_maximums
    //         ON exercises.id = one_rep_maximums.exercise_id
    //     WHERE (user_id = ?)
    //     ORDER BY one_rep_maximums.date DESC;
    // `

    db.query(script, [userId], (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was an error submitting the request',
                err
            })
            return;
        } else if (results.length == 0) {
            res.status(404).send(
                'There are no saved requests'
            )
            return;
        } else {
            res.send(results)
            return;
        }
    })
}

exports.getAllSongs = (req, res) => {

    // const { userId } = req.params;

    // let script = `
    //     SELECT t1.id, t1.exercise_id, exercises.name, t1.max_weight as maxWeight, t1.date
    //     FROM one_rep_maximums as t1
    //     LEFT JOIN one_rep_maximums as t2
    //         ON t1.exercise_id = t2.exercise_id
    //         AND t1.max_weight < t2.max_weight
    //         AND t1.user_id = t2.user_id

    //     INNER JOIN exercises
    //         ON exercises.id = t1.exercise_id

    //     WHERE t1.user_id = ?
    //         AND t2.id IS  NULL

    //     ORDER BY t1.date DESC;
    // `

    db.query(script, [userId], (err, results) => {
        if (err) {
            res.status(500).send({
                message: "There was an error getting your PRs"
            })
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "No PRs found for this user",
                userId
            })
            return;
        } else {
            res.send(results)
            return;
        }
    })
}

// exports.getPrForOneExercise = (req, res) => {

//     let { userId, exerciseId } = req.params;

//     let script = `
//         SELECT t1.id, t1.exercise_id, exercises.name, t1.max_weight as maxWeight, t1.date
//         FROM one_rep_maximums as t1
//         LEFT JOIN one_rep_maximums as t2
//             ON t1.exercise_id = t2.exercise_id
//             AND t1.max_weight < t2.max_weight
//             AND t1.user_id = t2.user_id

//         INNER JOIN exercises
//             ON exercises.id = t1.exercise_id

//         WHERE t1.user_id = ?
//             AND t2.id IS  NULL
//             AND t1.exercise_id = ?

//         ORDER BY t1.date DESC;
//     `

//     db.query(script, [userId, exerciseId], (err, results) => {

//         if (err) {
//             res.status(500).send({
//                 message: 'There was an error getting your recent one rep maximums',
//                 err
//             })
//         } else if (results.length == 0) {
//             res.status(404).send({
//                 message: 'No recent one rep maximums found for this user',
//                 userId
//             })
//         } else {
//             res.send(results)
//         }
//         return;
//     })
// }

exports.getRequestHistory = (req, res) => {

    let { userId, songId } = req.params;

    // let script = `
    //     SELECT 
    //         one_rep_maximums.id, exercise_id, name, max_weight as maxWeight, date
    //     FROM exercises
    //     INNER JOIN one_rep_maximums
    //         ON exercises.id = one_rep_maximums.exercise_id
    //     WHERE user_id = ?
    //         AND exercise_id = ?
    //     ORDER BY one_rep_maximums.date DESC;
    // `

    let pValues = [userId, exerciseId];

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was an error getting your recent one rep maximums for this exercise',
                userId, exerciseId
            })
        } else if (results.length == 0) {
            res.status(404).send({
                message: 'No recent one rep maximums found for this user',
                userId
            })
        } else {
            res.send(results)
        }
        return;
    })
}

// TODO: fix this. getting 500 error
exports.updateRequests = (req, res) => {

    //     var { maxWeight, id } = req.body;

    //     const script = `
    //         UPDATE max_lifts.one_rep_maximums
    //         SET (max_weight = ?)
    //         WHERE (id = ?)
    //     `

    //     let pValues = [maxWeight, id];

    //     db.query(script, pValues, (err, results) => {
    //         if (err) {
    //             res.status(500).send({
    //                 message: 'There was an error updating your maximums',
    //                 err
    //             })
    //             return;
    //         } else if (results.length == 0) {
    //             res.status(404).send({
    //                 message: 'No exercises to update found'
    //             })
    //             return;
    //         } else {
    //             res.send(results)
    //             return;
    //         }
    //     })
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