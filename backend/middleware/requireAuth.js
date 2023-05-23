const jwt = require('jsonwebtoken')
const Patient = require('../model/patientModel')

const requireAuth = async (req,res, next) =>{
    //verify user is authenticated
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token =  authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await Patient.findOne({_id})
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth