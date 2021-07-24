const express = require('express');
const router = express.Router();

// controlador
const userController = require('./../controllers/userController');

//middlewares
//const multer = require('multer');
const fileUpload = require('../middlewares/userMulter');
const validationUser = require('../middlewares/validationUsers');
const guestMiddleware = require('../middlewares/onlyGuestMiddleware');
const userMiddleware = require('../middlewares/onlyUsersMiddleware');



// formulario de registro
router.get('/register' , guestMiddleware, userController.register);

// proceso de registro
router.post('/register',  fileUpload.single('userImage'), validationUser,  userController.storeRegister);

// formulario de login
router.get('/login' , guestMiddleware, userController.login);

// proceso de login
router.post('/login', userController.loginProcess);

// perfil del usuario
router.get('/profile', userMiddleware, userController.profile);

// logout
router.get('/logout', userMiddleware, userController.logout);


module.exports = router;