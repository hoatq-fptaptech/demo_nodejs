const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port,function () {
    console.log("Server is running...");
})

const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // xampp: "", mamp: "root"
    database: "T2204M",
    port: 3306
});

app.get("/",function (req,res) {
    res.send("Hello world!");
})
app.get("/bong-da",function (req,res) {
    res.send("Bóng đá 24h");
});
// api danh sach category
app.get("/api-get-category",function (req,res) {
    const sql_txt = "select * from category";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
});
// api ds product with join
app.get("/api-get-product",function (req,res) {
    const sql_txt = "select product.id,product.name,product.price,category.name as category_name from product left join category on product.categoryId = category.id;";
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
});
app.get("/api-product-by-category",function (req,res) {
    const categoryId = req.query.categoryId;
    const sql_txt = "select * from product where  categoryId= "+categoryId;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
});
app.get("/search-product",function (req,res) {
    const q = req.query.q;
    const sql_txt = `select * from product where name like '%${q}%'`;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else res.send(data);
    })
})
app.get("/detail-product",function (req,res) {
    const id = req.query.id;
    const sql_txt = "select * from product where id = "+id;
    conn.query(sql_txt,function (err,data) {
        if(err) res.send("Error");
        else if(data.length ==0)
                res.send("404 not found");
        else
            res.send(data[0]);
    })
})
