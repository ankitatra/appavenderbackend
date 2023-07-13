const mongoose = require("mongoose")


const BlogSchema = mongoose.Schema({
    title : {type:String , required:true},
    blog : {type:String , required:true},
    userID : {type:String , required:true}
},{
    versionKey:false
})

const BlogModel = mongoose.model("blog" , BlogSchema)

module.exports={
    BlogModel
}