const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// const validator = require('validator')

const Schema = mongoose.Schema

const adminSchema= new Schema({

    email:{
        type: String,
        required:true,
        unique:true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
})

// static SignUP method
// adminSchema.statics.signup=async function(email, password){
//     if(!name || !dob || !mobile || !aadhar || !email || !bloodgroup || !address || !password || !disease){
//         throw Error("All fields must be filled")
//     }

//     if(!validator.isEmail(email)){
//         throw Error("Email is not valid")
//     }

    // if(!validator.isStrongPassword(password)){
    //     throw Error("Password is not Strong")
    // }

//     if(!validator.isAlpha(name,['en-US'], {'ignore': ' _-'})){
//         throw Error("Name must contain only alphabets")
//     }

//     const exists = await this.findOne({aadhar})

//     if(exists){
//         throw Error("Aadhar already in use")
//     }

//     const salt= await bcrypt.genSalt(10)
//     const hash= await bcrypt.hash(password, salt)
//     const user= await this.create({name,dob,mobile,aadhar,email,bloodgroup,address,password:hash,disease}) 

//     return user

// }

adminSchema.statics.login= async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email')
    }

    const match= await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect Password")
    }

    return user
}

module.exports=mongoose.model('Admin',adminSchema)