const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/articles', require('./articles'));
router.use('/topics', require('./topics'));
router.use('/user', require('./user'));
router.use('/article', require('./article'));

module.exports = router;