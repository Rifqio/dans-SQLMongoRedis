const router = require('express').Router();
const { getUser, createUser, deleteUser, updateUser, getUserById } = require('../controller/UserController')

router.get('/', getUser);
router.get('/:id', getUserById)
router.post('/create', createUser);
router.patch('/update/:id', updateUser)
router.delete('/:id', deleteUser)
module.exports = router