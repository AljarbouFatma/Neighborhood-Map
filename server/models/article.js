const mongoose = require('mongoose');

const {Schema} = mongoose

const ArticleSchema = new Schema({
  name:{ type:String, required:true },
  description:{ type:String, required:true },
	image:{type:String },
	visible:{type:Boolean,default:true },
	category:{type:String, 
		enum:["inspirational","non-inspirational","kinda-inspirational"]
	},
	quoteDate:{type:Number },
  created: { type:Number, default: Date.now()}
})

const Article = mongoose.model('article',ArticleSchema)

module.exports = Article
