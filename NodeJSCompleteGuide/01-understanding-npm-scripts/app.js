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
    console.log('another middelware ');
});
app.listen(3000);
