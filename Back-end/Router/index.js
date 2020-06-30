const express = require('express');
const router = express.Router();
const imageCtrl = require('./imageControllers');
const bodyParser = require('body-parser');

const multer = require('../middleware/multer.config');

router.get('/file/image/:nameFile', bodyParser.json(), imageCtrl.sendImage);
router.post('/file/upload', bodyParser.json(), multer, imageCtrl.registerImage);

module.exports = router;
