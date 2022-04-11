const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
// thu vien gup ket noi react native
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// server cua db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'test',
});

db.connect();

//xu li get (select)
app.get('/data',(req, res) => {
    var sql = 'select * from sinhvien';
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
    var sql = 'INSERT INTO sinhvien SET ?';
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
app.listen(3001,'192.168.56.1',()=>{
    console.log('server dang chay o cong 3001')
})