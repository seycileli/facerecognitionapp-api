const handleSignin = (knex, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('invalid form submission')
    }

    knex.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            console.log(data[0])
            const isValid = bcrypt.compareSync(password, data[0].hash);
            console.log(isValid);
            if (isValid) {
                return knex.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        console.log(user[0]);
                        res.json(user[0]);
                    })
                    .catch(() => res.status(400).json('unable to get user'));
            } else {
                res.status(400).json('wrong credentials');
            }
        })
        .catch(() => res.status(400).json('wrong credentials'));
    //catching error here but because it isn't being used, we'll replace with ()
    //to get rid of any warnings
}

module.exports = {
    handleSignin: handleSignin
}
