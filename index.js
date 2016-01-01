/*
* Created By Nana Morse
* */

"use strict";
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// 功能号中间件
var funcMiddleware = require("./functions/func_middleware");

// 设置固定端口号
app.set("PORT", 8888);

app.use(express.static(__dirname + '/public'));
// 设置body中间件，用于读取post数据
app.use(bodyParser.json({"limit" : "50mb"}));
app.use(bodyParser.urlencoded({"extended" : true, "limit" : "50mb"}));

// 功能号请求
app.post("/functions", funcMiddleware);

// 404
app.use(function(req, res){
    res.type("text/plain");
    res.status(404);
    res.send("404 - Not Found");
});

// 500
app.use(function(err, req, res, next){
    res.type("text/plain");
    res.status(500);
    res.send("500 - Server Error");
});

// 启动应用
app.listen(app.get("PORT"), function(){
    console.log("web server started at " + app.get("PORT"));
});
