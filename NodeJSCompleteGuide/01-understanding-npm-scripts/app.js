const http = require('http');
const express = require('express');

const app=express();
app.use((req,res, next)=>{
    console.log('in the middelware');
    next(); //esta prop te permite que vaya al proximo middleware,
    // si no ponemos esa propiedad, se finaliza el req-.
});

app.use((req,res, next)=>{
    console.log('another middelware');
    //.. response 
    res.send('<h1>Hello from express</h1>');
});
const server = http.createServer(app);



server.listen(3000);
