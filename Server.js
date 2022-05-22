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

//xu li get all lo sp
app.get('/data',(req, res) => {
    var sql = 'select * from losp';
    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log("🚀 ~ file: Server.js ~ line 31 ~ db.query ~ result", result)
        res.send(result);// gui ket qua cho react
    });
})


// xu li lohaisan id 
app.get('/data/:id',(req, res) => {
    console.log("🚀 ~ file: Server.js ~ line 39 ~ app.get ~ req.params.id", req.params.id)
    var sql = `SELECT * FROM losp INNER JOIN lohaisan ON losp.idlo = lohaisan.idlo WHERE losp.idlo =  ${req.params.id}`;
    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        console.log("🚀 ~ file: Server.js ~ line 43 ~ db.query ~ result", result)
        res.send({
            data: result
        });// gui ket qua cho react
    });

})
/* app.get('/data/sanpham/:id',(req, res) => {
    console.log(req.params.id);
    var sql = `SELECT * FROM sanpham  WHERE idsanpham =  ${req.params.id}`;
    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send(result);// gui ket qua cho react
    });

})
 */
app.get('/data/daily/:id',(req, res) => {
    console.log(req.params.id);
    var sql = `SELECT * FROM daily WHERE iddaily =  ${req.params.id}`;
    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.json(
             result
        );// gui ket qua cho react
    });

})

app.get('/data/donvinuoi/:id',(req, res) => {
    console.log(req.params.id);
    var sql = `SELECT * FROM donvinuoi WHERE idnuoi =  ${req.params.id}`;
    db.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.json(
             result
        );// gui ket qua cho react
    });

})



// xu li post (insert)
/* app.post('/data',(req, res) => {
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
}) */

// thay doi dia chi ip cua mang
app.listen(3001,'192.168.1.16',()=>{
    console.log('server dang chay o cong 3001')
})