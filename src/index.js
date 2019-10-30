const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { mongoose } = require('./dababase')

// settings

app.set('port', process.env.PORT || 3000);

// Middleawares

app.use(morgan('dev'));
app.use(express.json());

// routes

app.use('/api/products', require('./routes/product.routes'));

// static files

app.use(express.static(path.join(__dirname, 'public')));


// startin server

app.listen(app.get('port'), () => {
    console.log(`Server listen on port ${app.get('port')}`);
});