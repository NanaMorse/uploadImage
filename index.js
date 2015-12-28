/*
* Created By Nana Morse
* */

"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

// 设置固定端口号
app.set("PORT", 8888);

// 设置静态资源目录
app.use(express.static(__dirname + '/public'));
// 设置body中间件，用于读取post数据
app.use(bodyParser.json({"limit" : "50mb"}));
app.use(bodyParser.urlencoded({"extended" : true, "limit" : "50mb"}));

// 设置路由
app.get("/", function(req, res){
    res.redirect("/index.html");
});

// 处理图片上传请求
app.post("/uploadImage", function(req, res){
    var i, imgInfo,
        receiveData = req.body.imageData;
    for(i = 0; (imgInfo = receiveData[i]) != null; i++){
        savingImageData("./receives/images/", imgInfo.dataUrl, imgInfo.fileName);
    }
    res.send("upload success!");
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

// 写入数据到本地
function savingImageData(dst, data, fileName){
    //todo 如何将base64转换为readStream数据？
    fs.writeFile((dst ? dst : "") + fileName, data, "base64", function(err){
        if(err) throw err;
        else {
            console.log(fileName + "已存储至" + (dst ? dst : "当前目录") + "下。");
        }
    });
}

