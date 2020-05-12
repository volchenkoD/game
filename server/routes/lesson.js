const express = require('express');
const passport = require('passport');


const controller = require('../controllers/lesson');
const router = express.Router();

router.get('/',passport.authenticate('jwt', {session: false}), controller.allLessonById);
router.get('/:id', controller.lessonById);


module.exports = router;