/**
 * Created by Nana on 2016/1/1.
 */
// 001功能号处理函数
// 保存用户信息到mongodb
module.exports = function(param, res){
    //todo 保存信息到mongodb
    res.json({
        "error_no" : 0,
        "error_info" : "success",
        "results" : "成功保存数据" + param.userName
    });
};