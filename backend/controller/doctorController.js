const Doctor= require('../model/doctorModel')
const jwt=require("jsonwebtoken")

const createToken= (_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})
}

//login a Doctor
const loginDoctor = async(req, res)=>{
    const {email, password}=req.body

    try{
        const doctor= await Doctor.login(email,password)
        const token= createToken(doctor._id)
        res.status(200).json({doctor,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//signUp a Doctor
const signupDoctor = async(req, res)=>{
    const {name,dob,mobile,email,address,education,speciality,hospitalName,hospitalAddress,hospitalContact,password}=req.body

    try{
        const doctor= await Doctor.signup(name,dob,mobile,email,address,education,speciality,hospitalName,hospitalAddress,hospitalContact,password)
        const token= createToken(doctor._id)
        res.status(200).json({doctor,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports={loginDoctor, signupDoctor}