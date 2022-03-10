"use strict";
const jwt = require("jsonwebtoken");

const allowedurl = ["/login"]
const ensureauthorized = ((roles) => (req, res, next) => {
    if (allowedurl.indexOf(req.path.toLowerCase()) !== -1) {
        return next()
    }

    const bearerHeader = req.cookies.jwttoken
    if (!(typeof bearerHeader !== "undefined" && process.env.secret) || !bearerHeader) {
        return res.redirect('/login')
    }
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    jwt.verify(bearerToken, process.env.secret, async function (err, decoded) {
        req.user = decoded
        if (err) {
            return res.redirect('/login')
        } else if (roles.find(x => decoded.role.includes(x))) {
            next()
        } else {
            return res.redirect('/login')
        }
    })
})

module.exports = {
    ensureauthorized
}