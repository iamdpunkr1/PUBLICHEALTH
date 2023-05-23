const Patient= require('../model/patientModel')
const jwt=require("jsonwebtoken")

const createToken= (_id)=>{
    return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})
}

//login a Patient
const loginPatient = async(req, res)=>{
    const {aadhar, password}=req.body

    try{
        const patient= await Patient.login(aadhar,password)
        const token= createToken(patient._id)
        res.status(200).json({patient,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//signUp a Patient
const signupPatient = async(req, res)=>{
    const {name,dob,mobile,aadhar,email,bloodgroup,address,password,disease}=req.body

    try{
        const patient= await Patient.signup(name,dob,mobile,aadhar,email,bloodgroup,address,password,disease)
        const token= createToken(patient._id)
        res.status(200).json({patient,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports={loginPatient, signupPatient}