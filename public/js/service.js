define(function (require, exports, module) {
    "use strict";
    var $ = require("jQuery");

    function getServiceFunction(setParam){
        return function(param, callback){
            $.extend(true, param, setParam);
            $.post("/functions", param, callback);
        }
    }

    // 功能号001测试
    var function001 = getServiceFunction({
        "funcNo" : "001"
    });

    // 获取数组格式的base64数据集合，进行ajax上传
    var postImageData = getServiceFunction({
        "funcNo" : "002"
    });

    module.exports = {
        "postImageData" : postImageData,
        "function001" : function001
    };
});