const User = require('../models/user')
const crud = require('./default/crud')

//crud comes with index, create, show, update, delete functions
const usersController = crud(User)

usersController.token = (req,res,next) => {
  const password = req.headers.authorization
  User.findOne({password},(err,foundUser)=>{
    if(err || !foundUser) return res.status(401).json({err:"Not Authorized"})
    res.json(foundUser)
  })
}

//user model unique authorization for login
usersController.authorize = (req,res,next) => {
  const {email,password} = req.body
  console.log(email,password);
  User.findOne({email},(err,foundUser)=>{
    if(err){
      console.log("Error occured finding client",err)
      return res.status(400).json({err})
    }
    if(!foundUser){
      console.log("User not found =>",email,"<=");
      return res.status(400).json({
        err: {
          email:"Email Not Found"
        }
      })
    }
    foundUser.authorize(password,(err,authorizedUser)=>{
      if(err){
        return res.status(401).json({
          err: {
            password:"Incorrect Password"
          }
        })
      }
      res.json(authorizedUser)
    })
  })
}

//overwrite create method with custom one to account for hashed password
usersController.create = (req,res,next) => {
  const {pkg} = req.body
  const newUser = new User(pkg)
  newUser.setPassword(pkg.password,(err,updatedNewUser)=>{
    if(err){
      console.log("Error setting password",err);
      return res.status(400).json({err})
    }
    updatedNewUser.save((err,savedUser)=>{
      if (err){
        console.log(`Error occurred creating user`,err)
        return res.status(400).json({err:prettyError(err)})
      }
      res.json(savedUser)
    })
  })

}


module.exports = usersController
