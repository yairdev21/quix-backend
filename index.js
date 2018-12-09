require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const sessionManagementConfig = require('./services/cookies.service');
sessionManagementConfig(app);

const bodyParser = require('body-parser');
const errorHendler = require('./error-service/errors.service');
const userRoute = require('./routes/user.route');
const templatesRoute = require('./routes/sites.route');

app.use(cors());
<<<<<<< HEAD
app.use(express.static('public'));
=======
>>>>>>> 357fb32b5f8ac260545d6658d2b693f12ab580c0
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/sites', templatesRoute );
app.use('/user', userRoute );
 
app.get('/', (req, res) => {
  res.json({message: 'server on line'})
});

app.use((req, res, next) => {
    let error = new Error('Not found');
    error.status = 404;

    next(error);
});

app.use(errorHendler);

const port = process.env.PORT || 3000
app.listen(port , () => console.log('on line, port:', port));