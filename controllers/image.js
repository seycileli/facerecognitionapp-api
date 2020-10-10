const Clarifai = require('clarifai');

//our API
const app = new Clarifai.App({
    apiKey: '23037553394245a2bbf8a1cfb88deaca'
});

// const handleApiCall = (req, res) => {
//     app.models
//         .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
//         .then(data => {
//             res.json(data);
//         })
//         .catch(() => res.status(400).json('unable to work with api'))
// }

/* UPDATE:
* */

//testing
// works ✅
const handleApiCall = (req, res) => {
    app.models
        .predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(() => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, knex) => {
    const {id} = req.body;

    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            console.log(entries[0]);
            res.json(entries[0]);
        })
        .catch(() => res.status(400)
            .json('enable to get entries'));
}

module.exports = {handleImage, handleApiCall}
