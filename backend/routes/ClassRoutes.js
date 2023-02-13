const router = require('express').Router();
const { getClass } = require('../controller/ClassController')

router.get('/', getClass);

module.exports = router;