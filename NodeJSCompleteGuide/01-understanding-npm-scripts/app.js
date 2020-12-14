const http = require('http');
const express = require('express');
const parser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { stat } = require('fs');
const app = express();
const path = require('path');

app.use(parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    console.log('Catch any request that isnt defined in the routes ');
    res.status(404).sendFile(path.join(__dirname,'views','not-found.html')); 
});

app.listen(80);
