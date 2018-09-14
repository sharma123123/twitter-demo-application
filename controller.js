var express=require('express');
var {mongoose} =require('./db/mongoose');
var app=express();
var {ObjectID}=require('mongodb')
var {Registration}=require('./model/user')
var {Tweet}=require('./model/tweet')
var validator=require('validator')
const _ =require('lodash');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//   res.status(200).send('mapping is done');
// })
//----------------------------
// app.get('/',(req,res)=>{
//   res.status(200).send(res);
// })

var usersProtection={
  __v : false,
//  password : false,
  _id : false
};
app.get('/registration',(req,res)=>{
  Registration.find({},usersProtection1).then((doc)=>{
    res.send(doc);
  }).catch((e)=>{
    res.send(e);
  })
})

//------------------------registration------------------------------------------
app.post('/registration', (req,res)=> {

  console.log('body--', req.body);

  var body=_.pick(req.body,['name','email','password'])
  var user=new Registration(body);
console.log('body is------',body);
user.save().then((doc)=>{
  res.send(doc);

}).catch((e)=>{
  console.log('cccccccccccccccccccc')
  res.status(400).send(e);
})
})
//----------------login----------------------------------

var usersProtection={
  __v : false,
  password : false,
  _id : false
};

app.post('/registration/login',(req,res)=>{
var body=_.pick(req.body,['email','password'])
var email1=body.email;
console.log('email-----',email1)
Registration.find({email : email1},usersProtection).then((user)=>{

  //console.log('email-----------',user[0])
  if((user[0 ])){
console.log("user-----------",user)
    res.send(user);
  }
  else{
    res.status(403).send('user doesnot exists')
  }
}).catch((e)=>{
  res.status(400).send();
})
})


var usersProtection1={
  __v : false
//  _id : false
};
// list out tweets for particualar emails---- recent comes first-------------
// app.get('/:email',(req,res)=>{
//   var email=req.params.email;
//   console.log(email)
// Tweet.find({email : email},usersProtection1).sort({date : -1}).then((doc)=>{
//   res.send(doc)
// }).catch((e)=>{
//   res.send(e);
// })
// })


///lista out all tweets--------------
app.get('/',(req,res)=>{

  if((req.query.email)==null)
  {
    Tweet.find({},usersProtection1).then((doc)=>{
      res.send(doc);
    }).catch((e)=>{
      res.send(e);
    })
  }
  else {
    var query=req.query.email;
    Tweet.find({email : query},usersProtection1).sort({date : -1}).then((doc)=>{
      res.send(doc)
    }).catch((e)=>{
      res.send(e);
    })
  }

})

// tweet post
app.post('/',(req,res)=>{
  var body=_.pick(req.body,['email','message'])
  var tweet=new Tweet(body);
  tweet.save().then((doc)=>{
    res.send(doc);
  }).catch((e)=>{
res.send(e);
  })
})

///-------------tweet delete--------------------------

app.delete('/:id',(req,res)=>{
  var _id=req.params.id;
//  console.log(id);

Tweet.findOneAndDelete(_id).then((doc)=>{      //findByIdAndRemove
  if(!doc){
    return res.status(404).send();
  }
  res.send(doc);
}).catch((e)=>{
  console.log("unable to fetch",e);
})
})

//=-------patch-----------------------

app.patch('/home/:id',(req,res)=>{
  var _id=req.params.id;
  var body=_.pick(req.body,['message'])

console.log(body);

Tweet.findByIdAndUpdate(_id,{$set : body},{new : true}).then((doc)=>{
  if(!doc){
    return res.status(404).send();
  }
  res.send({doc});
}).catch((e)=>{
  res.status(400).send();
})

})







app.listen(3001,()=>{
  console.log('application is running in port 3001')
})
