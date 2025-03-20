'use strict';

const express = require('express');
const router = express.Router();

const publicCommonMasterCtrl  = require('./controllers/public/commonmaster.js');
const dashboardCtrl  = require('./controllers/dashboard/dashboard.js');

// public  pages
router.get('/public/images/items/:brand_id/:file_id', publicCommonMasterCtrl.ImageFromDB);
router.post('/v1/public/viewnssql', publicCommonMasterCtrl.viewNSSQL);


module.exports = router;
