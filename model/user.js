
var mongoose = require('mongoose');
var validator = require('validator');


var Registration=mongoose.model('Registration',{
name: {
    type: String,
    require : true,
   trim : true
    },
email: {
    type : String,
    required : true,
    minlength : 1,
    trim : true,
    unique : true,
    validate : {
     validator : validator.isEmail,
     message : '{VALUE} is not valid email'
    }
      },
 password :{
    type : Number,
    required : true,

  }
})
module.exports={
Registration
}
