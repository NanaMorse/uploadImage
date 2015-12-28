define(function (require, exports, module) {
    "use strict";
    var $ = require("jQuery");

    // 获取数组格式的base64数据集合，进行ajax上传
    function postImageData(dataArr){
        $.post("/uploadImage", dataArr, function(data){
            console.log(data);
        });
    }

    module.exports = {
        "postImageData" : postImageData
    };
});