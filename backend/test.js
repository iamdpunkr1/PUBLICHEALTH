const bcrypt = require('bcrypt')

const passGen=async()=>{
    const password="admin123"
    const salt= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password, salt)
   
    console.log(hash)
}

passGen()