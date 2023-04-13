const express = require('express')
const app = express()
const port = 3000
var jwt = require('jsonwebtoken');

app.get('/',verifytoken, (req, res) => {
  res.send('DRAGON IS COMING!')
})

app.get('/bruh',verifytoken, (req, res) => {
    res.send('GOODBYE')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.json())

app.post('/login', (req,res) =>{
    console.log(req.body)
    
let result = login(req.body.username,req.body.password)

let token = generatetoken(result)
    res.send(token)
    //res.send('login')
    //res.send(result)
  
})

//app.use(express.json())
app.post('/register', (req,res) =>{
    console.log(req.body)
    
    let result = register(req.body.username,req.body.password,req.body.name,req.body.email)
    //res.send('login')
    res.send(result)
})

let dbUsers=[

  {
      username:"khairul",
      password:"1234",
      name:"Khairul",
      email:"khairul0425@gmail.com"
  },

  {
      username:"zaid",
      password:"1111",
      name:"Zaid",
      email:"zaid@gmail.com"
  },

  {
      username:"lan",
      password:"1234",
      name:"Fadzlan",
      email:"lan@gmail.com"
  }
]

function login(reqUsername, reqPassword)
{
let matchUser = dbUsers.find(user => user.username == reqUsername)

if(!matchUser) return "User not found"
if(matchUser.password == reqPassword)
{

  return matchUser
}
else
{
    return" invalid"
}

}

function register(reqUsername,reqPassword,reqName,reqEmail)
{

    dbUsers.push({username:reqUsername,
        password : reqPassword,
        name : reqName,
        email:reqEmail
      }
    )
}

function generatetoken(userdata){
  const token = jwt.sign(
    userdata,'inipassword',
    {expiresIn: 60}
  );
  return token
}

function verifytoken(req,res,next) {
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token,'inipassword', function(err,decoded){
    if(err){
      res.send("Invalid token")
    }

    req.user = decoded
    next()
  });
}