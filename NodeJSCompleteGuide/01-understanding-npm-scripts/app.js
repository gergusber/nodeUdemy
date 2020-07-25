const http = require('http');
const express = require('express');
const parser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const app = express();

app.use(parser.urlencoded({ extended: false }));
app.use(adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    console.log('Catch any request that isnt defined in the routes ');
    res.send('<h1>Route not Defined</h1>');
});
app.listen(3000);
