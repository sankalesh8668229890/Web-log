const authormodel = require('../models/authormodel')


let createauthor = async function(req,res){
    try{
        let data = req.body
        let duplicate = await authormodel.findOne({email:data.email})
        if(duplicate){
            return res.status(400).send({status:false,msg:"EMAIL ALREADY EXISTS"})
        }
    let save = await authormodel.create(data)
    res.status(200).send({msg:save})
}catch(error){
    res.status(500).send({status:false,msg : error.message})
}
}





module.exports={createauthor}
