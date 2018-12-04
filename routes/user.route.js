const express = require('express');
const router = express.Router();
const { signUp, signIn, logOut, getUser } = require('../services/user.service');

router.get( '/', getUser );
router.post( '/signup', signUp );
router.post( '/signin', signIn );
router.post( '/logout', logOut );

module.exports = router;