const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.postLogin);

router.get('/login', userController.getLogin);
router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister);
router.get('/logout', userController.logout);
router.get('/:id/edit', userController.getUpdateUser);
router.get('/:id', userController.getUser);
router.put('/:id/update', userController.updateUser);

module.exports = router;
