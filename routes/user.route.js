const express = require('express');
const router = express.Router();
const { signUp, signIn, isAuthorize } = require('../services/user.service');

router.get( '/', isAuthorize );
router.post( '/signup', signUp );
router.post( '/signin', signIn );

module.exports = router;