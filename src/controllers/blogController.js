let authorModel = require("../models/authormodel");
let BlogModel = require("../models/Blogmodel");
const mongoose = require("mongoose");


 const isValidObjectId = (objectId) => mongoose.Types.ObjectId.isValid(objectId);

const createBlog = async function (req, res) {
  try {
    let data = req.body;
    
    if (!isValidObjectId(data.authorId)) {
      return res.send("NOT A VALID AUTHOR ID");
    }
    let condition = await authorModel.findById(data.authorId);
    if (condition) {
      if (data.isPublished == true) {
        data.publishedAt = Date.now();

        let savedData = await BlogModel.create(data);
        res.status(201).send({ status: true, msg: savedData });
      } else {
        let savedData = await BlogModel.create(data);
        res.status(201).send({ status: true, msg: savedData });
      }
    } else {
      res.status(400).send({ status: false, msg: "authorId is not present" });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const getBlog = async function (req, res) {
  try {
    let data = req.query;
    let getData = await BlogModel.find({
      $and: [{ isDeleted: false }, { isPublished: true }, data],
    }).populate("authorId");

    if (getData.length === 0) {
      return res.status(400).send({
        status: false,
        error: "Page not found",
        msg: "EITHER DELETED OR NOT PUBLISHED", 
      });
    }

    res.status(200).send({ status: true, data: getData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

//3rd update data api
const updateBlog = async function (req, res) {
  try {


    let getId = req.params.blogId;
    let data = req.body;
    console.log(data)
    let checkId = await BlogModel.findById(getId); //wa can use findOne also
    if (checkId) {
      if (checkId.isDeleted === false) {
        //ispublished true add krnapdega
        
        let check = await BlogModel.findByIdAndUpdate(
          getId,
          {
            $push: { tags:data.tags, subcategory:data.subcategory},
            title: data.title,
            body: data.body,
            category: data.category,
            isPublished: true,
            publishedAt: Date.now(),
          },
          { new: true }
        );
        //console.log(check);
        let a = check.tags.flat(); 
        let b = check.subcategory.flat();
        console.log(a);
        let check2 = await BlogModel.findByIdAndUpdate(
          getId,
          {
            tags: a,
            subcategory: b,
          },
          { new: true }
        );


        res.status(200).send({ status: true, msg: check2 });
      } else {
        res
          .status(400)
          .send({ status: false, msg: "CANT UPDATE , IT IS DELETED" });
      }
    } else {
      res
        .status(400)
        .send({ status: false, msg: "Please enter valid Blog id" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//delete
const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    if (!blogId) {
      return res.status(404).send("KINDLY ADD BLOG ID");
    }
    let blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(404).send("NOT A VALID BLOG ID");
    }
    if (blog.isDeleted == false) {
      let save = await BlogModel.findOneAndUpdate(
        { _id: blogId },
        {
          $set: { isDeleted: true, deletedAt: Date.now(), isPublished: false },
        },
        { new: true }
      );

      return res.status(200).send({ msg: save });
    } else {
      res.status(404).send({ status: false, msg: "AlREADY DELETED" });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

//delet by query
const deletebyquery = async function (req, res) {
  try {
    data = req.query; //catched data

     let decodedtoken=req.decodedtoken;
    

    let findblog = await BlogModel.find({
      $and: [data, { authorId: decodedtoken.authorId }],
    });
    if (findblog.length == 0)
      return res.send({ status: false, msg: "NO CRITERIA MATCHES" });
    //console.log(findblog)

    let findauthor = findblog[0].authorId;
    //console.log(findauthor.toString())

    if (decodedtoken.authorId == findauthor.toString()) {
      let allblog = await BlogModel.updateMany(
        {
          $and: [
            data,
            { authorId: decodedtoken.authorId },
            { isDeleted: false },
          ],
        },
        { isDeleted: true, deletedAt: Date.now() }
      );

      if (allblog.modifiedCount == 0) {
        return res.status(400).send({ status: false, msg: "No blog to be deleted" });
      } else res.status(200).send({ status: true, data: allblog });
    } else {
      res.send({ status: false, msg: "author is not valid" });
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};
module.exports = { createBlog, getBlog, updateBlog, deleteBlog, deletebyquery };

/*line 51 : findone = findById
    line no 18 : else if ki jagaha else
    line no 55: new added ==> isPublished:true,publishedAt:Date.now()
    line 127 : findone ==>findMany
*/
