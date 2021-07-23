const express = require ('express');
const app = express();
const path = require ('path');
const session= require('express-session');


const indexRoutes = require('./src/routes/indexRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const methodOverride= require('method-override');
const { urlencoded } = require('express');

// app.listen(3000, () => {
//     console.log('Servidor 3000 corriendo');
// })

// configuracion de session como middleware a nivel aplicacion
app.use (session({
    secret: "Shhhh, It's a secret",
    resave: false,  
    saveUninitialized: false
}));
// configuracion de session como middleware a nivel aplicacion


app.listen(process.env.PORT || 3000, function(){
    console.log('Servidor corriendo en puerto 3000');
});
app.use(express.static(path.resolve(__dirname , './public')));

//------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//------------

app.use(methodOverride('_method'));

app.set('view engine' , 'ejs');

app.use('/' , indexRoutes);

app.use('/product' , productRoutes);

app.use('/users' , userRoutes);