/**
 * Created by Nana on 2015/12/31.
 */


module.exports = middleware;

var fs = require("fs");
var util = require("../lib/util");

function middleware(req, res, next){
    // 获取功能号数值，将内容转发至具体对应的处理函数
    var receiveData = req.body;
    var funcNo = receiveData.funcNo;
    checkFuncNo(funcNo, function(err){
        if(err){
            res.json(err);
        }else{
            require("./funcs/function" + funcNo)(receiveData, res);
        }
    });
}


var errorResponse = {
    // 若功能号为空
    "emptyFuncNo" : function(funcNo, errorNo, errorMsg){
        if(funcNo == null){
            return {
                "errorNo" : errorNo,
                "errorMsg" : errorMsg
            }
        }
    },
    // 若没有对应的处理函数
    "noProcessFunc" : function(funcNo, errorNo, errorMsg){
        // 在中间中查询路径或文件是否存在，传入的相对路径参数必须已调用该中间件的主模块的位置为基准
        if(!fs.existsSync("./functions/funcs/function" + funcNo + ".js")){
            return {
                "errorNo" : errorNo,
                "errorMsg" : errorMsg
            }
        }
    }
};

function checkFuncNo(funcNo, callback){
    var checkType = [
            {
                "checkName" : "emptyFuncNo",
                "errorNo" : -1,
                "errorMsg" : "功能号不能为空"
            },
            {
                "checkName" : "noProcessFunc",
                "errorNo" : -2,
                "errorMsg" : "不存在对应的处理函数"
            }
        ],
        result;
    util.each(checkType, function(index, resultInfo){
        result = errorResponse[resultInfo.checkName](funcNo,
            resultInfo.errorNo,
            resultInfo.errorMsg);
        if(result){
            callback(result);
            return false;
        }
    });
    if(!result){
        callback();
    }
}























