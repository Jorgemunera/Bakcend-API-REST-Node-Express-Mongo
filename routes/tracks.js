const express = require('express');
const {getItems, getItem, deleteItem, updateItem, createItem} = require('../controllers/tracks');
const {validatorCreateItem, validatorGetItem} = require('../validators/tracks');
const authMiddleware = require('../middlewares/session');
const checkRol = require('../middlewares/rol');

const router = express.Router();


//CRUD para tracks
router.get('/', 
    authMiddleware, 
    checkRol(["admin","user"]), 
    getItems
);

router.get('/:id', 
    authMiddleware, 
    checkRol(["admin","user"]), 
    validatorGetItem, 
    getItem
);

router.post('/', 
    authMiddleware, 
    checkRol(["admin","user"]), 
    validatorCreateItem, 
    createItem
);

router.put('/:id', 
    authMiddleware, 
    checkRol(["admin","user"]), 
    validatorGetItem, 
    validatorCreateItem, 
    updateItem
);

router.delete('/:id', 
    authMiddleware, 
    checkRol(["admin","user"]), 
    validatorGetItem, 
    deleteItem
);

module.exports = router;