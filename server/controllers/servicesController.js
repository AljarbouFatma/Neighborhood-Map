const {addToMailList} = require('../services/mailChimp')
const {sendMail} = require('../services/nodeMailer')

const mailList = (req,res,next) => {
  const {email} = req.body
  if(!email){
    res.sendStatus(422)
  } else {
    addToMailList(email,results=>{
      if(!results){
        res.json({"status":"success"})
      } else {
        res.json({"status":results.title})
      }
    })
  }
}

const contact = (req,res,next) => {
  const {email,message,name,subject} = req.body
  if(!email){
    res.json({status:"error",error:"email"})
  } else if(!name) {
    res.json({status:"error",error:"name"})
  } else {
    sendMail({email,message,name,subject})
    res.json({status:"success"})
  }
}


module.exports = {
  mailList,contact
}
