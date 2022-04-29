const authormodel=require('../models/authormodel')
const jwt = require('jsonwebtoken')

const login = async function (req, res) {
  let email = req.body.email
  let password = req.body.password
  let get = await authormodel.findOne({email:email,password:password})
  if (!get){return res.status(400).send({status:false,msg:"YOUR EMAIL OR PASSWORD IS INCORRECT"})}
  let token = jwt.sign({authorId:get._id.toString()},"ProjectBlog")
  res.setHeader("x-auth-token",token)
  res.status(200).send({status:true,msg:"YOU ARE SUCCESFULLY LOGGED IN"})
}
module.exports.login=login