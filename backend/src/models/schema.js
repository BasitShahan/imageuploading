const mongoose=require('mongoose')

const schema=new mongoose.Schema({
name:{type:String,required:true},
   image:{
    type:String,
    required:true
 }
},{timestamps:true})
const User=mongoose.model('upload',schema)
module.exports=User;