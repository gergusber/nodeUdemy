const http = require('http');
const express = require('express');
const parser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { stat } = require('fs');
const app = express();

app.use(parser.urlencoded({ extended: false }));
app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    console.log('Catch any request that isnt defined in the routes ');
    res.status(404).send('<h1>Page Not found</h1>');
});
app.listen(3000);
