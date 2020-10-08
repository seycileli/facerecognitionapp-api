const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'user',
        password: '',
        database: 'smart-brain'
    }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('It is working!')});

app.post('/signin', signin.handleSignin(knex, bcrypt));

app.post('/register', register.handleRegister(knex, bcrypt));

app.get('/profile/:id', profile.handleProfile(knex));

app.put('/image', image.handleImage(knex));

app.post('./imageurl',
    (req, res) =>
    {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`App is running on port: ${process.env.PORT}`);
})

/*
    The general structure of our backend:

    / --> res this is working
    /signin --> POST = success /OR fail
    /register --> POST = user
    /profile/:userid --> GET = user
    /image --> PUT --> user
*/
