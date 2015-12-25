/*
* Created By Nana Morse
* */

"use strict";
var express = require("express");
var app = express();

// 设置固定端口号
app.set("PORT", 8888);

// 设置静态资源目录
app.use(express.static(__dirname + '/public'));

// 设置路由
app.get("/", function(req, res){
    res.redirect("/index.html");
});

// 404
app.use(function(req, res){
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});

// 500
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type("text/plain");
    res.status(500);
    res.send("500 - Server Error");
});

// 启动应用
app.listen(app.get("PORT"), function(){
    console.log("web server started at " + app.get("PORT"));
});

