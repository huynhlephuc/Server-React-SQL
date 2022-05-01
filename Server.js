const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
// thu vien gup ket noi react native
const cors = require('cors');
require('dotenv').config()



const app = express();
app.use(bodyParser.json());
app.use(cors());

// server cua db
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: '',
    port: process.env.PORT,
    database: process.env.DATABASE,
});

db.connect();

//xu li get (select)
app.get('/data',(req, res) => {
    var sql = 'select * from sanpham';
    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send(result);// gui ket qua cho react
    });
})


// xu li scan (select where)
app.get('/data/:id',(req, res) => {
    console.log(req.params.id);
    var sql = `select * from sanpham WHERE idsanpham = ${req.params.id}`;
    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send(result);// gui ket qua cho react
    });
})


// xu li post (insert)
app.post('/data',(req, res) => {
    console.log(req.body);
    // truyen vao tham so
    var data = {name:req.body.name, age:req.body.age, address:req.body.address};
    var sql = 'INSERT INTO sanpham SET ?';
    db.query(sql,data,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send({
            status: 'Du lieu da gui thanh cong',
            id: null,
            name: req.body.name, 
            age:req.body.age, 
            address:req.body.address
        });// gui ket qua cho react
    });
})

// thay doi dia chi ip cua mang
app.listen(3001,'192.168.1.15',()=>{
    console.log('server dang chay o cong 3001')
})