const req = require("express/lib/request");
const authormodel = require("../models/authormodel");
const Blogmodel = require("../models/Blogmodel");
const mongoose = require("mongoose");
const isValidObjectId = (objectId) => mongoose.Types.ObjectId.isValid(objectId);
const jwt = require("jsonwebtoken");

const auth1 = async function (req, res, next) {
  
  
  let token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(400).send({ status: false, msg: "KINDLY ADD TOKEN" });
  }
  let decodedtoken = jwt.verify(token, "ProjectBlog");

  //res.locals.decodedtoken = JSON.stringify(decodedtoken);
  req.decodedtoken = decodedtoken;

  next();
};

const auth2 = async function (req, res, next) {
  let blogId = req.params.blogId;
  let get = await Blogmodel.findById(blogId).select({ authorId: 1, _id: 0 });
  if(!get){return res.status(400).send({ status: false, msg: "Please enter valid Blog id" });}
  
  let token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(400).send({ status: false, msg: "KINDLY ADD TOKEN" });
  }
  let decodedtoken = jwt.verify(token, "ProjectBlog");
  if (decodedtoken.authorId != get.authorId) {
    return res.status(403).send({ status: false, msg: "NOT AUTHORISED" });
  }
  next();
};
module.exports = { auth1, auth2 };
