const bodyParser = require('body-parser')
const express = require('express')
const app = express()
let users = []
const bodyparser = require('body-parser')
let userCount = 0

app.use(bodyparser.json())  //a middleware used to put data into req.body

//GET request
app.get('/api/users',(req,res) => {
    let status = 200
    res.status(status).json({
        data: users,
        message:'Listing users'
    })
})

//POST request
app.post('/api/users', (req,res) => {
    ++userCount;
    users.push({id:userCount,...req.body})
    res.status(201).json({
        data: users,
        message: 'New Message created'
    })

})

//PUT request
app.put('/api/users/:id', (req,res) => {
    let isUserPresent = users.filter(user => user.id == req.params.id)
    let message = 'User Updated';
    if (isUserPresent.length){
        users = users.map(user => {
            if(user.id == req.params.id){
                return {id:user.id,...req.body}
            }
            else{
                return user
            }
        })
    }
    else{
        ++userCount;
        users.push({id:userCount,...req.body})
        message = 'New user created';
    }
    // users.push({id:req.params.id,...req.body})
    res.status(201).json({
        data: users,
        message
    })

})

//PATCH request
app.patch('/api/users/:id', (req,res) => {
    let isUserPresent = users.filter(user => user.id == req.params.id)
    let message = 'User Updated';
    let status = 200
    if (isUserPresent.length){
        users = users.map(user => {
            if(user.id == req.params.id){
                return {id:user.id,...req.body}
            }
            else{
                return user
            }
        })
    }
    else{
        data = []
        message = "No such User exists"
        status = 404
    }

    res.status(status).json({
        data: users,
        message
    })

})

app.delete('/api/users/:id', (req,res) => {
    let isUserPresent = users.filter(user => user.id == req.params.id)
    let message = 'User Deleted';
    let status = 200
    if (isUserPresent.length){
        users = users.filter(user => user.id != req.params.id)
    }
    else{
        // users = [],
        message = "No such User",
        status = 404
    }
    res.status(status).json({
        data: isUserPresent,
        message
    })
})

app.listen(3000,() => {console.log('Serving started at http://localhost:3000')})


// REST APIs must give out data in same structure.No matter what, the format should not change.For ex. here 
// data:[]
// message:"xyz"