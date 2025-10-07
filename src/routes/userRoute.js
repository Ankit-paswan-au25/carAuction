const express = require('express');
const router = express.Router();
const userController = require('../controllers/users/index');

router.route('/')
    .get(userController.getAllUsers);
router.route('/:id')
    .get(userController.getSingleUsers)
    .put(userController.updateUsers)
    .delete(userController.deleteUsers);

module.exports = router