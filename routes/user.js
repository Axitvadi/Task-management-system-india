const express = require('express')
const router = express.Router()
const details = require('../controllers/UserController')

// router.post('/create',(req,res)=>details.data.Create(req,res));
router.get('/alldetails',(req,res)=>details.data.Getall(req,res));
router.post('/detail',(req,res)=>details.data.Getbyid(req,res));
router.post('/updateUser',(req,res)=>details.data.updateuser(req,res));

// router.delete('/delete/:id',(req,res)=>details.data.Delete(req,res));

module.exports = router 