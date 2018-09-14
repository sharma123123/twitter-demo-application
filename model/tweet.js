
var mongoose = require('mongoose');
var validator = require('validator');
var Tweet=mongoose.model('Tweet',{
email : {
  type : String,
  require : true
},
message : {
  type : String,
  require : true
},
date :
 { type: Date,
   required: true,
    default: Date.now
   }
})
module.exports={
Tweet
}
