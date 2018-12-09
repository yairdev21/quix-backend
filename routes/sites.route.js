const express = require('express');
const router = express.Router();
const hendleApi = require('../services/api.service');

router.route('/')
        .get( hendleApi.getTemplates )
        .post( hendleApi.addSite );

router.route('/:id')
        .get( hendleApi.getSingleTamplate )
        .put( hendleApi.updateTamplate );
//         .delete( hendleApi.deleteMessage );

module.exports = router;