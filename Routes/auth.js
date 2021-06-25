const router = require("express").Router();
const user = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//vlidation
const Joi = require("@hapi/joi");

// const schema=Joi.object({
//     name:Joi.string().min(6).required(),
//     email:Joi.string().min(6).required().email(),
//     password:Joi.string().min(6).required()
// })

router.post("/register", async (req, res) => {

    //lets validate the data before we a user
    // const validation= Joi.validate(req.body,schema)
    // res.send(validation)

    // Checking user existing in db
    const emailExist = await user.findOne({ email: req.body.email });
    if (emailExist) return res.status(401).send({ message: "Email đã được sử dụng! Vui lòng đăng ký bằng tài khoản email khác" })

    const User = new user({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    try {
        const saveUser = await User.save();
        res.status(200).send(saveUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/get-all-users", async (req, res) => {
    const User = await user.find({});
    res.send(User);
})

router.delete("/delete-user/:id", async (req, res) => {
    try {
        const User = await user.findByIdAndDelete(req.params.id);
        res.status(200).send(User);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/singIn", async (req, res) => {

    const token = jwt.sign({
        _id: user._id,
    }, process.env.JWT_SECRET, {
        expiresIn: "48h"
    });
    const singInUser = await user.findOne({ email: req.body.email });
    if (singInUser) {
        if (bcrypt.compareSync(req.body.password, singInUser.password)) {
            res.send({
                _id: singInUser.id,
                name: singInUser.name,
                email: singInUser.email,
                password: singInUser.password,
                role: singInUser.role,
                token: token
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });
})
module.exports = router;