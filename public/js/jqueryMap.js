// 用以缓存jQuery对象
define(function (require, exports, module) {
    var $ = require("jQuery");


    module.exports = {
        // 上传文件的输入按钮
        "uploadFileBtn" : $("#uploadFile"),

        // 功能号按钮001
        "function001Btn" : $("#function001Btn")
    };
});