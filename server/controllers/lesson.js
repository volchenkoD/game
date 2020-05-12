const Lesson = require('../models/Lesson');
const errorFunction = require('../utils/errorFunction');

module.exports.allLessonById = async function (req, res) {
    try {
        const lessons = await Lesson.find({
            thems: req.params.themId
        });
    }catch (e) {
        errorFunction(res, e)
    }
}


module.exports.lessonById = function (req, res) {
    try {

    }catch (e) {
        errorFunction(res, e)
    }
}