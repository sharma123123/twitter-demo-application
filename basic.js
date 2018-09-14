var express=require('express');
var app=express();
var {User}=require('./usernew')
var {mongoose} =require('./db/mongoose');
var bodyParser=require('body-parser')
app.use(bodyParser.json());
const _ =require('lodash');

//----------------------get api--------------
app.get('/',(req,res)=>{
  try{
    User.find().then((doc)=>{
      res.send(doc);
    }).catch((e)=>{
      res.send(e)
    })
  }
  catch(e){
    res.status(400).send(e)
  }
})

app.listen(4000,()=>{
  console.log('our application is running on port no 4000')
})



//------------------post------------------------------------
app.post('/',(req,res)=>{
  console.log("-------------",req.body)
var user=new User({
  name : req.body.name,
  age : req.body.age
});

user.save().then((doc)=>{
  res.send(doc);
},(e)=>{
  res.send(e)
})
})

///delete --------------------------
app.delete('/home/:id',(req,res)=>{
 var _id=req.params.id;
 console.log('------------id',_id)
 User.findByIdAndRemove(_id).then((doc)=>{
   if(doc)
   res.send(doc)
   else{
     res.send('user doesnot exists')
   }
 }).catch((e)=>{
   res.send(e);
 })

//update-----------------

app.patch('/login/:id',(req,res)=>{
  var _id = req.params.id;
  var body=_.pick(req.body,['name','age']);
  console.log("body--------------",body)
  User.findByIdAndUpdate(_id,{$set : body },{new : true}).then((doc)=>{
    if(!doc){
    return  res.status(400).send();
    }
    res.send(doc)
  }).catch((e)=>{
    res.send(e)
  })

})







})
