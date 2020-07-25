const express = require('express');

const router = express.Router();

router.get('/add-Product', (req,res, next)=>{
    console.log('another middelware');
    res.send('<form action="/product" method="POST"><input type="text" name="title"> <button type="submit">Add Product</button></form>');
});

router.post('/product',(req,res,next)=>{
    console.log('This always runs',req.body);    
    res.redirect('/');
 
})

module.exports = router;
