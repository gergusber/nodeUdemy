const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../Util/path');
router.get('/', (req, res, next) => {
    console.log('another middelware');
    res.sendFile(path.join(rootDir,'views','shop.html'));
});

module.exports = router;