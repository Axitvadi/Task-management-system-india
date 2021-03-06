const express = require('express')
const router = express.Router()
const accountcontroller = require('../controllers/AccountController')
const usercontroller = require('../controllers/AccountController')
const admin = require('./admin')
const user = require('./user')
const detail = require('./detail')
const { ensureauthorized } = require("../middleware/auth")

router.use('/admin', admin)
router.use('/user', user)
router.use('/detail', detail)

// ---------------------get-method-------------------------------
router.get('/about-us', (req, res) => {
    return res.render('about-us.ejs')
});
router.get('/contact-us', (req, res) => {
    return res.render('contact-us.ejs')
});
router.get('/', (req, res) => {
    return res.render('index.ejs');
});
router.get('/login', (req, res) => accountcontroller.data.getlogin(req, res));

router.get('/logout', (req, res) => accountcontroller.data.logout(req, res));

router.get('/our-services', (req, res) => {
    return res.render('our-services.ejs')
})

router.get('/signup', (req, res) => accountcontroller.data.getsignup(req, res));

router.get('/admin/dashboard', ensureauthorized(['admin']), (req, res) => res.render('admindashboard'))
router.get('/user', ensureauthorized(['user']), (req, res) => { res.render('admintabledemo') })
router.get('/admin/record', ensureauthorized(['admin']), (req, res) => res.render('record'))
router.get('/admin/pending_task', ensureauthorized(['admin']), (req, res) => res.render('panding_task'))
router.get('/admin/completed_task', ensureauthorized(['admin']), (req, res) => res.render('completed_task'))
router.get('/admin/Running_task', ensureauthorized(['admin']), (req, res) => res.render('running_task'))

router.get('/logout', (req, res) => accountcontroller.data.logout(req, res))
router.get('/verified', (req, res) => usercontroller.data.userverification(req, res))
// ------------------------------------post-method----------------------------------
router.post('/signup', (req, res) => {
    return accountcontroller.data.signup(req, res)
})
router.post('/login', (req, res) => accountcontroller.data.login(req, res))

module.exports = router;