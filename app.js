const express = require('express')
const app = express()
const ejs = require('ejs')
const bodyParser = require('body-parser');
const session = require('express-session')
const nocache = require("nocache");
app.use(nocache());


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}))

const mainrouter = require("./controller/controll")


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use('/', mainrouter)
app.use('/public', express.static('public'));
app.use('/styles', express.static('styles'));


  

app.listen(3000, () => console.log('server started'))

