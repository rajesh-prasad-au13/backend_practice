const express = require('express')
const app = express()
const path = require('path')
const bodyparser = require('body-parser')
const users = []

app.set('view engine','hbs');       //setting up template engine
app.use(express.static(path.join(__dirname,'assests')));    //hosting static files
   
app.use(bodyparser.json())      //parses req info and put it into req.body
app.use(bodyparser.urlencoded({extended:true}))     //parses req info and put it into req.body

// users = [{
//     id:1,
//     fname:"rajesh",
//     sname:"prasad",
//     type:"human"
// },
// {
//     id:2,
//     fname:"ramesh",
//     sname:"powar",
//     type:"alien"
// },
// {
//     id:3,
//     fname:"sachin",
//     sname:"tendulkar",
//     type:"legend"
// }
// ]


app.get('/home',(req,res) => {
    const homeFilePath = path.join(__dirname,'home.hbs')
    const data = {
        isLoggedIn: true,
        name:"Rajesh",
        title:"Welcome",
        people: [
            "Big Show",
            "Undertaker",
            "Kane",
          ]
    }
    res.render(homeFilePath,data)
})

app.get('/signup',(req,res) => {
    const signingFilePath = path.join(__dirname,'signup.hbs')
    const data = {
        name: '',
        email: '',
        address: ''
      }
    res.render(signingFilePath,data);
})

app.post('/signup-post',(req,res) => {
    console.log(req.body);
    const error = {}
    const signUPFilePath = path.join(__dirname,'signup.hbs')
    const data = {
        title:"SignUP",
        ...req.body
    }
    if(!req.body.name){
        error.name = 'Please Enter Name'
        res.render(signUPFilePath,{...data,error})
        return
    }
    users.push(req.body);
    res.redirect('/users')
})

// app.get('/users',(req,res) => {
//     // console.log(users)
//     res.json(users)
// })

app.get('/users', (req,res)=>{
    const userPath = path.join(__dirname,'users.hbs')
    const data = {
        title:'user-Listing',
        users
    }
    res.render(userPath,data)
})

app.get('/users/:userId/abc/:type?',(req,res) => {
    const user = users.filter(i => i.id == req.params.userId && i.type == req.params.type)

    // console.log(req.params, req.params.userId)
    // console.log(user,user.length)
    // console.log(req.query)

    if(user.length){            //0 means false
        res.json(user[0])
    }
    else{
        res.json({message:'user not found'})
    }
})

app.get('/contact',(req,res) => {
    // console.log(users)
    // res.sendFile('C:/Users/Rajesh/Documents/Practice/template_engines/contact.html')
    const contactFilePath = path.join(__dirname,'./contact.html')
    console.log(contactFilePath)

    res.sendFile(contactFilePath)
})


//error handling using middleware
app.use((error,req,res,next) => {
    console.log('Error:handler',error)  // we have handled the error actually even thogh terminal shows alot of garbage, but NOTE our server hasn't stopped.
    res.send(error)
})

app.listen(3000,() => console.log("server running at localhost:3000")) 

