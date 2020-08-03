const express = require('express');
const path = require('path');
const router = express.Router();


const rootDir = require('../Util/path');

// /admin/add-product => GET
router.get('/add-Product', (req,res, next)=>{
    console.log('another middelware');
    res.sendFile(path.join(rootDir,'views','add-product.html'));
});


// /admin/add-product =>  POST
router.post('/add-product',(req,res,next)=>{
    console.log('This always runs',req.body);    
    res.redirect('/');
})

module.exports = router;
