const express = require('express');
const router = express.Router();
const { signUp, signIn, logOut } = require('../services/user.service');

router.post( '/signup', signUp );
router.post( '/signin', signIn );
router.post( '/logout', logOut );

module.exports = router;