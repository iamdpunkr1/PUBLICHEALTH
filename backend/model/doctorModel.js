const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const doctorSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase: true
    },
    address:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    hospitalName:{
        type:String,
        required:true
    },
    hospitalAddress:{
        type:String,
        required:true
    },
    hospitalContact:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },

})

// static SignUP method
doctorSchema.statics.signup=async function(name,dob,mobile,email,address,education,speciality,hospitalName,hospitalAddress,hospitalContact,password){
    if(!name || !dob || !mobile  || !email || !address || !education || !speciality || !hospitalName || !hospitalAddress || !hospitalContact || !password ){
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    // if(!validator.isStrongPassword(password)){
    //     throw Error("Password is not Strong")
    // }

    if(!validator.isAlpha(name,['en-US'], {'ignore': ' _-'})){
        throw Error("Name must contain only alphabets")
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error("Aadhar already in use")
    }

    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password, salt)
    const user= await this.create({name,dob,mobile,email,address,education,speciality,hospitalName,hospitalAddress,hospitalContact,password:hash}) 

    return user

}

doctorSchema.statics.login= async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Aadhar No')
    }

    const match= await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect Password")
    }

    return user
}

module.exports=mongoose.model('Doctor',doctorSchema)