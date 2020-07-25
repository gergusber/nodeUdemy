const express = require('express');
const path = require('path');
const router = express.Router();


// /admin/add-product => GET
router.get('/add-Product', (req,res, next)=>{
    console.log('another middelware');
    res.sendFile(path.join(__dirname,'../','views','add-product.html'));
});


// /admin/add-product =>  POST
router.post('/add-product',(req,res,next)=>{
    console.log('This always runs',req.body);    
    // res.redi(path.join(__dirname,'../','views','add-product.html'));
    res.redirect('/');
})

module.exports = router;
