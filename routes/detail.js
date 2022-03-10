const express = require('express')
const router = express.Router()
const details = require('../controllers/DetailController')

router.get('/alluserdetailswithoutpagination',(req,res)=>details.data.GetallDetailswithoutpagination(req,res));
router.get('/alluserdetails',(req,res)=>details.data.GetallDetails(req,res));
router.post('/GetoneDetail',(req,res)=>details.data.GetoneDetail(req,res));
router.post('/findDetailByStatus',(req,res)=>details.data.findDetailsByStatus(req,res));
router.post('/findByName',(req,res)=>details.data.findDetailsByname(req,res));
router.post('/updateDetail',(req,res)=>details.data.updateDetail(req,res));
router.delete('/DeleteDetail/:id',(req,res)=>details.data.DeleteDetail(req,res));

module.exports = router 
