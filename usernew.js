var mongoose =require('mongoose');
var User=mongoose.model('User',{
name : {
  type : String,
  required : true
},
age : {
  type : String
}
})
module.exports={
  User
}
