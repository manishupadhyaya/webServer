const express = require('express')
const hbs = require("hbs")
const fs = require('fs')

const port = process.env.PORT  || 3000//Stores all the environment variables

hbs.registerPartials(__dirname + '/views/partials')

var app = express();

app.use((req,res,next)=>{
    let now = new Date().toString();
    if(req.originalUrl === '/favicon.ico')
    {
        res.status(204).json({nope: true})
    }
    else
    {
        var log = `${now}: ${req.method} ${req.url}`
        fs.appendFile('server.log',log,(error)=>{
            if(error)
            {
                console.log("Unable to write log")
            }
        })
        next();
    }
})

// app.use('/',(req,res,next)=>{
//     res.render('maintenance.hbs')
//     next()
// })
app.use(express.static(__dirname + "/public"))
hbs.registerHelper('getCurrentYear', ()=>{
     return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.get('/',(req,res)=>{
    res.render('home.hbs', {
        pageTitle: "Welcome Home",
        welcomeMessage: "Surely, Welcome Home!"
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: "About Page",
    })
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: "Bad Response"
    })
})
app.get('/projects',(req,res,next)=>{
    res.render('projects.hbs',{
        pageTitle: 'Project Page'
    })
})
app.listen(port,()=>{
    console.log("Server is up on port 3000")
});