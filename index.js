/*
* Created By Nana Morse
* */

"use strict";
var express = require("express");
var app = express();

// ���ù̶��˿ں�
app.set("PORT", 8888);

// ���þ�̬��ԴĿ¼
app.use(express.static(__dirname + '/public'));

// ����·��
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

// ����Ӧ��
app.listen(app.get("PORT"), function(){
    console.log("web server started at " + app.get("PORT"));
});

