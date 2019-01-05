const Article = require('../models/article')
const crud = require('./default/crud')

const articlesController = crud(Article)
// override articlescontroller items here
//example: articlesController.index = (req,res,next) => {...}
module.exports = articlesController
