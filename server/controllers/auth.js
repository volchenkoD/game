const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
    //проверям пароль, пользователь найден
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult){
        //    генерируем токен, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60});
            res.status(200).json({
                token: `Bearer ${token}`
            })
        }else {
            //пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают, попробуйте снова'
            })
        }
    } else {
    //пользователь не найден
        res.status(404).json({
            message: "Пользователь не найден"
        })
    }
}


module.exports.register = async function (req, res) {

    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        //    пользователь существует, отдаем ошибку
        res.status(409).json({
            message: "Такой email уже занят"
        })
    } else {
        //    создаем пользователя
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            //    обработка ошибок
        }
    }
}