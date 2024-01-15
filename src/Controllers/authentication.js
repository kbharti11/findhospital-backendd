const users = require("../Models/users")
const jwt=require("jsonwebtoken")

exports.register = async (req,res) =>{
    const{ name, number ,email,password } = req.body
    
    const _user = new users({name,number,email, password})
    const eUser = await users.findOne({email})
    if(!eUser){
        _user.save().then(newuser => {
            return  res.status(201).json({newuser, message:"Account Created"})
          }).catch(error=>{
              return res.status(400).json({error,message:"Error Occurred"})
      
          })

    }else{
        return res.status(400).json({message:"Account already exists"})
    }
// to save
   
    console.log(req.body)
}

exports.login = async ( req,res)=>{
    const { email, password} = req.body
    const eUser = await users.findOne({email})

    if(eUser){
        
        if(eUser.authenticate(password)``){
            const token= jwt.sign({
            id:eUser._id
        },"MYSECRETKEY@",{
            expiresIn:"1d"

        })
        res.status(200).json({token,message:"login succesfull"})
        }else{
            return res.status(401).json({message:"email or password is incorrect"})
        }


    }else{
        return res.status(404).json({message:"user not found"})
    }
}
exports.findUser =async (req,res) =>{
    const user = await users.findById(req.id)
    return res.status(200).json({user})
}