const express = require('express');
const controller = require('../controllers/thems');
const router = express.Router();

router.post('/', controller.getAll);
router.post('/:id', controller.getById);


module.exports = router;