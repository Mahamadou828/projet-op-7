const express = require('express');
const router = express.Router();
const imageCtrl = require('../controllers/imageCtrl');
const bodyParser = require('body-parser');

const multer = require('../middleware/multer.config');

router.get('/file/image/:nameFile', bodyParser.json(), imageCtrl.sendImage);
router.post('/file/upload', bodyParser.json(), multer, imageCtrl.registerFile);
router.get('/file/video/:nameFile', bodyParser.json(), imageCtrl.sendVideo);

module.exports = router;
