const Admin= require('../model/adminModel')
const jwt=require("jsonwebtoken")

const createToken= (_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})
}

//login a Patient
const loginAdmin = async(req, res)=>{
    const {email, password}=req.body

    try{
        const admin= await Admin.login(email,password)
        const token= createToken(admin._id)
        res.status(200).json({admin,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}



module.exports={loginAdmin}