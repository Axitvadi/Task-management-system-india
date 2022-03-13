const mongoose = require('mongoose')
const USER = mongoose.model('user')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

exports.data = {
    signup: async (req, res) => {
        try {
            let userinfo = await USER.findOne({
                email: req.body.email
            });
            if (userinfo && userinfo.userverification == true) {
                const alert = {
                    message: "Alert! Email Already Registered!",
                    class: "show",
                    secondclass: "alert-danger"
                }
                return res.render('signup', {
                    alert
                })
            }
            if (userinfo && userinfo.username == req.body.username) {
                const alert = {
                    message: "Alert! Username Already Taken!",
                    class: "show",
                    secondclass: "alert-danger"
                }
                return res.render('signup', {
                    alert
                })
            }
            let obj = req.body
            // let Array = [];
            // obj.work = Array;
            const created = await USER.create(obj)
            if (!created) {
                const alert = {
                    message: "Alert! signup failed !",
                    class: "show",
                    secondclass: "alert-danger"
                }
                return res.render('signup', {
                    alert
                })
            } else {
                // ------------------send mail---------------------
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.email,
                        pass: process.env.password,
                    },
                })
                const emailSended = await transporter.sendMail({
                    from: "Test Web <abc@gmail.com>",
                    to: req.body.email,
                    subject: "Verify Your Account",
                    text: "We have received your forget password request",
                    html: `click here to verified your account
                           <a type="submit" href="https://task-management-system-india.herokuapp.com/verified?email=${req.body.email}">click here to verified your account</a>
                    `,
                })
                const info = {
                    secondclass:"alert-success",
                    class:"show",
                    message:"we send confirmation email, please confirm your email then login "
                }
                return res.render('login',{info})
            }
        } catch (err) {
            const alert = {
                message: err,
                class: "show",
                secondclass: "alert-danger"
            }
            return res.render('signup', {
                alert
            })
        }
    },
    login: async (req, res) => {
        try {
            let userinfo = await USER.findOne({
                email: req.body.username
            });
            if (userinfo) {
                if (userinfo.userverification == true) {
                    if (req.body.password !== userinfo.password) {
                        return res.json({
                            issuccess: false,
                            data: {
                                message: "password incorrect",
                            }
                        })
                    }
                    userinfo = JSON.parse(JSON.stringify(userinfo))
                    delete userinfo["password"]
                    // ------------create token----------------------
                    var token = jwt.sign(userinfo, process.env.secret, {
                        expiresIn: "20h"
                    })
                    res.cookie('jwttoken', `bearer ${token}`, {
                        expires: new Date(Date.now() + 9000000),
                        httpOnly: true
                    })
                    res.cookie('id', userinfo._id, {
                        expires: new Date(Date.now() + 9000000),
                        httpOnly: false
                    })
                    return res.json({
                        issuccess: true,
                        data: {
                            message: "you are logged in successfully",
                            userinfo
                        }
                    })


                } else {
                    return res.json({
                        issuccess: false,
                        data: {
                            message: "you are not verified user",
                        }
                    })
                }
            }
            return res.json({
                issuccess: false,
                data: {
                    message: "user not found",
                }
            })
        } catch (error) {
            return res.json({
                message: error.message
            })
        }
    },
    userverification: async (req, res) => {
        try {
            const finded = await USER.findOne({
                email: req.query.email
            })
            if (!finded) {
                return res.json({
                    message: 'user not found'
                })
            }
            finded.userverification = true
            await USER.findByIdAndUpdate({
                _id: finded._id
            }, {
                userverification: true
            })
            return res.render('verified')
        } catch (err) {
            return res.json({
                message: err
            })
        }
    },
    getlogin: (req, res) => {
        const bearerHeader = req.cookies.jwttoken
        if (!(typeof bearerHeader !== "undefined" && process.env.secret) || !bearerHeader) {
            const data = {
                message: "auth token not found..",
                issuccess: false
            }
            return res.render('login')
        }
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        jwt.verify(bearerToken, process.env.secret, async function (err, decoded) {
            if (err) {
                const data = {
                    message: "auth token not found..",
                    error: err,
                    issuccess: false,
                }
                return res.render('login')
            } else if (decoded.role == 'admin') {
                return res.render('admindashboard')
            } else if (decoded.role == 'user') {
                return res.render('admintabledemo')
            } else {
                const data = {
                    issuccess: true,
                    data: decoded
                }
                return res.json(data)
            }
        })
    },
    getsignup: async (req, res) => {
        const bearerHeader = req.cookies.jwttoken
        if (!(typeof bearerHeader !== "undefined" && process.env.secret) || !bearerHeader) {
            const data = {
                message: "auth token not found..",
                issuccess: false
            }
            const alert = "hello";
            return res.render('signup', {
                alert
            })
        }
        let result = await resultdata(bearerHeader)
        if (result.Result.role == 'admin') {
            return res.render('admindashboard')
        } else if (result.Result.role == 'user') {
            return res.render('admintabledemo')
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('jwttoken')
            res.redirect('/login')
        } catch (error) {
            return res, json(error)
        }
    }
}

function resultdata(bearerHeader) {
    return new Promise((resolve, reject) => {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        jwt.verify(bearerToken, process.env.secret, function (err, decoded) {
            if (err) {
                const data = {
                    message: "auth token not found..",
                    error: err,
                    issuccess: false,
                }
                resolve(data)
            } else {
                const data = {
                    issuccess: true,
                    Result: decoded
                }
                resolve(data)
            }
            resolve(false)
        })
    })
}