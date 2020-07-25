const http = require('http');
const express = require('express');
const parser = require('body-parser');

const app=express();

app.use(parser.urlencoded());

app.use('/',(req,res,next)=>{
    console.log('This always runs');
    next();
});

app.use('/add-Product', (req,res, next)=>{
    console.log('another middelware');
    res.send('<form action="/product" method="POST"><input type="text" name="title"> <button type="submit">Add Product</button></form>');
});

app.use('/product',(req,res,next)=>{
    console.log('This always runs',req.body);    
    res.redirect('/');
 
})


app.use('/', (req,res, next)=>{
    console.log('another middelware');
    res.send('<h1>Hello from express</h1>');
});


app.listen(3000);
