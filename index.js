require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const sessionManagementConfig = require('./services/cookies.service');
sessionManagementConfig(app);

const bodyParser = require('body-parser');
const errorHendler = require('./error-service/errors.service');
const userRoute = require('./routes/user.route');
const tamplatesRoute = require('./routes/sites.route');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/sites', tamplatesRoute );
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
// app.use((error, req, res, next ) => {
//   console.log('inside!!!!!');
//   console.log(error);
  
//   res.status(error.status || 500).json({
//       message: error.message || 'Try again later'
//   })
// })
 
app.listen(process.env.PORT , () => console.log('on line'));