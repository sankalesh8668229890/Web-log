const authormodel = require('../models/authormodel')


let createauthor = async function (req, res) {
    try {
        let data = req.body
        // let regex =/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i
        let regex = /^[a-zA-Z ]{2,30}$/
        let emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

        // VALIDATION

        
        if (!data.firstName) { return res.status(400).send({ status: false, msg: "FIRST NAME REQUIRED" }) }
        if (!data.lastName) { return res.status(400).send({ status: false, msg: "LAST NAME REQUIRED  " }) }
        if (!data.title) { return res.status(400).send({ status: false, msg: "Add title" }) }
        if (!data.email) { return res.status(400).send({ status: false, msg: "EMAIL CANT BE EMPTY" }) }
        if (!data.password) { return res.status(400).send({ status: false, msg: "Password cant be empty" }) }
       
// REGEX VALIDATION
        if (!data.firstName.match(regex)) return res.status(400).send({ status: false, msg: "FIRSTNAME HAS SOME PROPERTIES VISIT OUR WEBSITE" })
        if (!data.lastName.match(regex)) return res.status(400).send({ status: false, msg: "LASTNAME HAS SOME PROPERTIES VISIT OUR WEBSITE" })
        if (!data.email.match(emailregex)) return res.status(400).send({ status: false, msg: "EMAIL IS NOT IN VALID FORMAT" })
        let duplicate = await authormodel.findOne({ email: data.email })
        if (duplicate) {
            return res.status(400).send({ status: false, msg: "EMAIL ALREADY EXISTS" })
        }
        //LOGIC
        let save = await authormodel.create(data)
        res.status(200).send({ msg: save })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}





module.exports = { createauthor }




//NOW DONT TOUCH
