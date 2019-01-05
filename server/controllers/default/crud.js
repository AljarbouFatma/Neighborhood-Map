const prettyError = require('../../helpers/prettyError')

module.exports = resource => ({
  index(req,res,next) {
    const {query} = req
    resource.find(query,(err,foundItem)=>{
      if (err) {
        console.log(`Error occurred finding ${resource}`,err)
        return res.status(400).json({err})
      }
      res.json(foundItem)
    })
  },
  create(req,res,next) {
    const {pkg} = req.body
    const newItem = new resource(pkg)
    newItem.save((err,savedItem)=>{
      if (err){
        console.log(`Error occurred creating ${resource}`,err)
        return res.status(400).json({err:prettyError(err)})
      }
      res.json(savedItem)
    })
  },
  update(req,res,next) {
    const options = {
      runValidators:true,
      new:true
    }
    const {changes,_id} = req.body
    resource.findOneAndUpdate({_id},changes,options,(err,updatedItem)=>{
      if (err){
        console.log(`Error occurred updating ${resource}`,err);
        return res.status(422).json({err})
      }
      res.json(updatedItem)
    })
  },
  show(req,res,next){
    const {id} = req.params
    resource.findOne({_id:id},(err,foundItem)=>{
      if(err) {
        console.log(`Error occurred find ${resource}`,err);
        return res.status(400).json({err})
      }
      res.json(foundItem)
    })
  },
  destroy(req,res,next){
    //destroy
    const {_id} = req.body
    resource.findOneAndRemove({_id},(err,deletedItem)=>{
      if(err){
        console.log(`Error occured deleting ${resource}`,err)
        return res.status(400).json({err})
      }
      res.json({_id:deletedItem._id})
    })
  }
})
