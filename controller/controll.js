const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const validate = require('../public/signup')
let users = JSON.parse(fs.readFileSync("./model/model.json"))

router.get('/', (req, res) => {
    
    if(req.session.name){
        res.redirect('/index')
    }
    else{
        res.render("signup",{message:null})
    }
})
router.get('/login',(req,res)=>{

    if(req.session.name){
        res.redirect('/index')
    }else{
        res.render('login',{ message: req?.session?.message })

    }
})
router.get('/index',(req,res)=>{
    if(req.session.name){
        res.render('index')
    }else{
        res.redirect('/login')

    }
})



router.post('/signup', passworderror, (req, res) => {
    const { username, email, password } = req.body

    console.log(req.body);

    let users = JSON.parse(fs.readFileSync(path.join(__dirname,'../model/model.json')))
    
    if (!password || !email || !username) {
        res.redirect('/')
        
    }
    else {
       
        const already=users.find((e)=>{
            return e.username===username && e.email===email
        })
        if(already)
        {
            res.redirect('/login')
            
        }
        else{
            const newUser=req.body
            users.push(newUser)
            req.session.name="username"
            console.log(req.session.name);
            console.log(users);
            fs.writeFile(path.join(__dirname,'../model/model.json'),JSON.stringify(users),(err) => {
                        if (err) {
                            res.redirect('/')
                        } 
                        else {
                            console.log('calling next')
                            res.redirect('/index')
                            

                        }
            })    

        

        }
        
    }
})



function passworderror(req, res, next) {
    const Pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const check = Pattern.test(req.body.password)
    console.log(check);
    console.log(req.body.password);
    if (!check) {
        res.redirect('/')
    }
    else {
        next()
    }
}




router.post('/login', (req, res) => {
    const check1 = users.find((e) => {
        return e.password == req.body.password && e.username == req.body.username
    })
    if (check1) {
        req.session.name="username"
        res.redirect('/index')
      console.log(req.session.name);
    }
    else {
        req.session.message ='incorrect password try again!'
        res.redirect('/login')
    }
})
router.get("/logout",(req,res)=>{
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.sendStatus(500);
      } else {
        res.redirect('/login');
         }
    });
  })

module.exports = router;