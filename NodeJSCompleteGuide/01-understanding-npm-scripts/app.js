const http = require('http');
const express = require('express');

const app=express();


app.use('/',(req,res,next)=>{
    console.log('This always runs');
    next();
})
app.use('/addProduct', (req,res, next)=>{
    console.log('another middelware');
    res.send('<h1>Hello from Products</h1>');
});

app.use('/', (req,res, next)=>{
    console.log('another middelware');
    res.send('<h1>Hello from express</h1>');
});


app.listen(3000);
