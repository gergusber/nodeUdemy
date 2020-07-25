const express = require('express');

const router = express.Router();
// /admin/add-product => GET
router.get('/add-Product', (req,res, next)=>{
    console.log('another middelware');
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"> <button type="submit">Add Product</button></form>');
});


// /admin/add-product =>  POST
router.post('/add-product',(req,res,next)=>{
    console.log('This always runs',req.body);    
    res.redirect('/');
})

module.exports = router;
