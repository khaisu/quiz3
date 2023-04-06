const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.post('/login', (req,res) =>{
    console.log(req.body)
    
    res.send('login')
})

app.get('/', (req, res) => {
  res.send('DRAGON IS COMING!')
})

app.get('/bruh', (req, res) => {
    res.send('GOODBYE')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})