const authormodel = require('../models/authormodel')


let createauthor = async function (req, res) {
    try {
        let data = req.body
        // let regex =/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i
        let regex = /^[a-zA-Z ]{2,30}$/
        let emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

        // VALIDATION
        if (!data.fname) { return res.status(400).send({ status: false, msg: "FIRST NAME REQUIRED" }) }
        if (!data.lname) { return res.status(400).send({ status: false, msg: "LAST NAME REQUIRED  " }) }
        if (!data.title) { return res.status(400).send({ status: false, msg: "Add title" }) }
//         if(!data.title == "Mr" || "Mrs" || "Miss"){return res.status(400).send({ status: false, msg: "ONLY Mr,Mrs,Miss ARE VALID IN TITLE"}) }
        if (!data.email) { return res.status(400).send({ status: false, msg: "EMAIL CANT BE EMPTY" }) }
        if (!data.password) { return res.status(400).send({ status: false, msg: "PASSWORD CAN'T BE EMPTY" }) }
       
        // REGEX VALIDATION
        if (!data.fname.match(regex)) return res.status(400).send({ status: false, msg: "FIRSTNAME SHOULD ONLY CONATIN ALPHABATS AND LENTH MUST BE IN BETWEEN 2-30" })
        if (!data.lname.match(regex)) return res.status(400).send({ status: false, msg: "LASTNAME SHOULD ONLY CONATIN ALPHABATS AND LENTH MUST BE IN BETWEEN 2-30" })
        if (!data.email.match(emailregex)) return res.status(400).send({ status: false, msg: "EMAIL IS NOT IN VALID FORMAT" })
        
        const duplicate = await authormodel.findOne({ email: data.email })
        if (duplicate) {
            return res.status(400).send({ status: false, msg: "EMAIL ALREADY EXISTS" })
        }
        
        //LOGIC
        let save = await authormodel.create(data)
        res.status(201).send({ status:true,data: save })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}





module.exports = { createauthor }




//NOW DONT TOUCH
