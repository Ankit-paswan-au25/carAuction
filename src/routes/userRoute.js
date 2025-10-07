const express = require('express');
const router = express.Router();
const userController = require('../controllers/users/index');
const routeGuard = require('../middleWare/routeGuard')

router.route('/')
    .get(routeGuard, userController.getAllUsers);
router.route('/:id')
    .get(userController.getSingleUsers)
    .put(routeGuard, userController.updateUsers)
    .delete(routeGuard, userController.deleteUsers);

module.exports = router