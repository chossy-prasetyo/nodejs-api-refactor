const express = require('express')
const usersController = require('../controllers/users')
const router = express.Router()

router.get('/', usersController.get_users)
router.post('/', usersController.post_user)
router.patch('/:id', usersController.patch_user)
router.delete('/:id', usersController.delete_user)

module.exports = router