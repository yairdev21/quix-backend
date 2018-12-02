const express = require('express');
const router = express.Router();
const hendleApi = require('../services/api.service');

router.route('/')
        .get( hendleApi.getTamplates )
        .post( hendleApi.addSite );

router.route('/:id')
        .get( hendleApi.getSingleTamplate )
//         .put( hendleApi.updateMessage )
//         .delete( hendleApi.deleteMessage );

module.exports = router;