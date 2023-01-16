const express = require('express');
const router = express.Router();
const {validatorLogin, validatorRegister} = require('../validators/auth');
const {registerCrtl, loginCtrl} = require('../controllers/auth');


//CRUD para auth
//http://localhost:3000/api/auth/login
//queremos 2 rutas
//una para login y otra para register
router.post('/register', validatorRegister, registerCrtl);
router.post('/login', validatorLogin, loginCtrl);


module.exports = router;