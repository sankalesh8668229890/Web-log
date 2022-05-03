const express = require('express');
const router = express.Router();
let authorcontroller = require('../controllers/authorController');
const { create } = require('../models/authormodel');
const blogController = require('../controllers/blogController')
const {login}=require('../controllers/newcontroller')
const {auth1,auth2}=require('../middlewares/commonMiddlewares')


//to register as a author
router.post('/login', login)

//to login as a author
router.post('/authors',authorcontroller.createauthor)

//to create blog
router.post ('/blogs',auth1,blogController.createBlog)

//to get blog list of all blog
router.get ('/blogs',auth1,blogController.getBlog)

// to update blog data
router.put('/blogs/:blogId',auth2,blogController.updateBlog)

//to delete blog by it's id 
router.delete('/blogs/:blogId',auth2,blogController.deleteBlog)

//to delete blog by it's properties (query)
router.delete('/blogs',auth1,blogController.deletebyquery)



module.exports = router;


