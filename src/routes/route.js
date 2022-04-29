const express = require('express');
const router = express.Router();
let authorcontroller = require('../controllers/authorController');
const { create } = require('../models/authormodel');
const blogController = require('../controllers/blogController')
const {login}=require('../controllers/newcontroller')
const {auth1,auth2}=require('../middlewares/commonMiddlewares')



router.post('/login', login)
router.post('/authors',authorcontroller.createauthor)
router.post ('/createBlog',blogController.createBlog)

router.get ('/getBlog',auth1,blogController.getBlog)

router.put('/updateBlog/:blogId',auth2,blogController.updateBlog)



router.delete('/deleteBlog/:blogId',auth2,blogController.deleteBlog)
router.delete('/deletebyquery',auth1,blogController.deletebyquery)



module.exports = router;


