const express = require('express');
const router = express.Router();

// controlador
const userController = require('./../controllers/userController');

//middlewares
const multer = require('multer');
const fileUpload = require('../middlewares/userMulter');
const validationUser = require('../middlewares/validationUsers');

// formulario de registro
router.get('/register' , userController.register);

// proceso de registro
router.post('/register' , fileUpload.single('userImage') , validationUser , userController.storeRegister);

// formulario de login
router.get('/login' , userController.login);

// proceso de login
router.post('/login', fileUpload.single('userImage'), userController.loginProcess);

// perfil del usuario
router.get('/profile' , userController.profile);

module.exports = router;