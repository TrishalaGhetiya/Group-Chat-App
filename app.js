const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const data = [];

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/login', (req, res, next) => {
    res.send(`<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/chat" method="GET">
    <input type="text" id="username" name="username">
    <br>
    <button type= "submit">LOGIN</button><form>`);
})

app.get('/chat', (req, res, next) => {
    //console.log(req.body);
    try{
        const data = fs.readFileSync("message.txt");
        res.send(`${data.toString()}<form action="/chat" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method = "POST">
        <input type="hidden" name="username" id="username">
        <input type="text" name="message">
        <br>
        <button type= "submit">SEND</button><form>`);
    }catch(err){
        console.log(err);
    }
    
})

app.post('/chat', (req, res, next) => {
    data.push(`${req.body.username}:${req.body.message}`);
    console.log(data);
    fs.appendFile("message.txt", `${req.body.username} : ${req.body.message}`, (err) => {
        if(err)
            console.log(err);
    })
    res.redirect('/chat');
})



app.listen(4000);