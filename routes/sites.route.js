const express = require('express');
const router = express.Router();
const hendleApi = require('../services/api.service');

router.route('/')
        .get(hendleApi.getTemplates)
        .post(hendleApi.addSite);
router.route('/name/:siteName')
        .get(hendleApi.getSingleTamplateByName);
// router.route('/user/:id')
//         .get(hendleApi.getUserTemplates);

router.route('/:id')
        .get(hendleApi.getSingleTamplate)
        .put(hendleApi.updateTamplate);
//         .delete( hendleApi.deleteMessage );

module.exports = router;