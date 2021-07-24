const express = require ('express');
const session= require('express-session');

const methodOverride= require('method-override');
const { urlencoded } = require('express');


const path = require ('path');

const app = express();

// configuracion de session como middleware a nivel aplicacion
app.use (session({
    secret: "Shhhh, It's a secret",
    resave: false,  
    saveUninitialized: false
}));
// configuracion de session como middleware a nivel aplicacion

//------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//------------

app.use(methodOverride('_method'));

app.use(express.static(path.resolve(__dirname , './public')));

app.listen(process.env.PORT || 3000, function(){
    console.log('Servidor corriendo en puerto 3000');
});

app.set('view engine' , 'ejs');


const indexRoutes = require('./src/routes/indexRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');














app.use('/' , indexRoutes);

app.use('/product' , productRoutes);

app.use('/users' , userRoutes);