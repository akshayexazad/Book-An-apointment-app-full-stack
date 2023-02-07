const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./DB');
const User = require('./createusertable');

app.use(express.static('public'))


app.use(bodyparser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join('/index.html'))

})
app.post('/add-user',async(req,res)=>{
    const name = req.body.name;
    const email= req.body.email;
    const mobile= req.body.mobile;
    console.log(name,email,mobile)

    const data =await User.create({name:name,email:email,mobile:mobile});
    res.status(201).json({newuser:data})


})

app.get('/get-user', async (req,res,next)=>{
    const users = await User.findAll();
    res.status(200).json({alluser:users})
});

app.delete('/delete-user:id',async(req,res)=>{
    try{
  const uid = req.params.id;
  await User.destroy({where:{id:uid}});
  res.sendStatus(200)

    }catch(err){
        console.log(err);
        
    }
});
// User.sync();











app.listen(5000,()=>{
    console.log('port running on 5000')
})