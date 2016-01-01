/**
 * Created by Nana on 2015/12/31.
 */


module.exports = middleware;

function middleware(req, res, next){
    // 获取功能号数值，将内容转发至具体对应的处理函数
    var receiveData = req.body;
    var funcNo = receiveData.funcNo;
    require("./funcs/function" + funcNo)(receiveData, res);
}