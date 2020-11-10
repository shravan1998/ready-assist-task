const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    username: 'root',
    password: 'password',
    database:"readyassist"
});

connection.connect(function(err){
    if(err){
        console.log(err);
    }
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/'));
app.use(cors());

let router  = express.Router();

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Allow-Access-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Allow-Access-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    res.setHeader("Access-Control-Allow-Credentials",true);
    next();
});

app.post('/post',function(req,res){
    let sqlinsert = "INSERT INTO `users`(`username`,`first_name`,`last_name`,`created_at`,`is_active`) VALUES(?,?,?,NOW(),true)";
    connection.query(sqlinsert,
        [req.body.username,req.body.first_name,req.body.last_name],
        (err,data)=>{
            if(err){
                res.send(err);
            }
            else{
                
                console.log(data);
            }
        })
});

app.get('/get/all',function(req,res){
    let sqldisplayall = "SELECT * FROM `users` WHERE is_active=true LIMIT 10";
    connection.query(sqldisplayall,
        (err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.send(data);
                console.log(data);
            }
        
    });

});

app.get('/get/:id',function(req,res){
    let id = req.params.id;
    console.log(id)
    let sqldisplay = "SELECT * FROM `users` WHERE is_active=true AND `id`="+id+"";
    connection.query(sqldisplay,
        (err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.send(data);
                console.log(data);
            }
        
    });
})

app.patch('/update/:id',function(req,res){
    let id = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    if(last_name==null){
        last_name='';
    }
    let sqlupdate = "UPDATE `users` SET `first_name`='"+first_name+"',`last_name`='"+last_name+"',updated_at=NOW() "+
     "WHERE `id`="+id+"";
     connection.query(sqlupdate,
        (err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.send(data);
                console.log(data);
            }
        
    });
});

app.patch('/restore',function(req,res){
    let sqlRestore = "UPDATE `users` SET is_active=true";
    connection.query(sqlRestore,
        (err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.send(data);
                console.log(data);
            }
        });
})

app.delete('/delete/:id',function(req,res){
    let id = req.params.id;
    let sqldelete = "UPDATE `users` SET is_active=false WHERE id="+id+"";
    connection.query(sqldelete,
        (err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.send(data);
                console.log(data);
            }
        });
});


app.listen(8000,function(){
    console.log("Runs at 8000");
});