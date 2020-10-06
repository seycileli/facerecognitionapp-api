const handleProfile = (knex) => (req, res) => {
    const {id} = req.params;

    knex.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                console.log(user[0]);
                res.json(user[0]);
            } else {
                res.status(400).json('User not found');
            }
        })
        .catch(() => res.status(400).json('error retrieving user'));
}

module.exports = {
    handleProfile: handleProfile
}
