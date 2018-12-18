const express = require('express');
const { json } = require('body-parser');
require('dotenv').config();
const session = require('express-session');
const { read } = require('./controllers/swag_controller');

const {checkSession} = require('./middlewares/checkForSession');
const {login, register, signout, getUser} = require('./controllers/auth_controller');
const {add, remove, checkout} = require('./controllers/cart_controller');
const {search} = require('./controllers/search_controller');


const {SERVER_PORT} = process.env;
const app = express();

app.use(json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(checkSession);
app.use( express.static( `${__dirname}/../build` ) );



app.get('/api/swag', read);
app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);
app.get('/api/user', getUser);
app.post('/api/cart', add);
app.post('/api/cart/checkout', checkout);
app.delete('/api/cart', remove);
app.get( '/api/search', search );

app.listen(SERVER_PORT, ()=> console.log(`Listening on Port ${SERVER_PORT}`));