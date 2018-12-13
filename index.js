require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const history = require('connect-history-api-fallback');

const sessionManagementConfig = require('./services/cookies.service');
sessionManagementConfig(app);

const bodyParser = require('body-parser');
const errorHendler = require('./error-service/errors.service');
const userRoute = require('./routes/user.route');
const templatesRoute = require('./routes/sites.route');
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/sites', templatesRoute );
app.use('/user', userRoute );
 
app.use(history());
app.use(express.static('public'));

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