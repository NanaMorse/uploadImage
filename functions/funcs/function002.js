/**
 * Created by Nana on 2016/1/1.
 */
// 002功能号处理函数
// 保存上传的图片到本地
var fs = require("fs");
var util = require("../../lib/util");

module.exports = function(param, res){
    // 开始保存图片
    savingImagesData(param.imagesData, null, function(){
        res.json({
            "error_no" : 0,
            "error_info" : "success",
            "results" : "图片已保存完毕"
        });
    });
};

/**
 * @param receiveData Array 要保存的图片的信息
 * receiveData[i] :
 * {
 *      data     : 图片的base64数据 Y
 *      fileName : 图片保存的文件名，包含格式名 Y
 * }
 * @param dst String 图片存储的路径
 * @param callback Function 回调函数
* */
function savingImagesData(receiveData, dst, callback){
    var count = receiveData.length;
    dst = dst ? dst : "./";
    fs.existsSync(dst) || fs.mkdirSync(dst);
    util.each(receiveData, function(index, imgItem){
        savingSingleImage(dst + imgItem.fileName, imgItem.data, "base64", function(){
            count--;
            if(count === 0 && typeof callback === "function"){
                callback();
            }
        });
    });
}

function savingSingleImage(path, data, type, callback){
    fs.writeFile(path, data, type, function(err){
        if(err){
            throw err;
        }else{
            console.log(path + "已存储完毕");
            if(typeof callback === "function"){
                callback();
            }
        }
    });
}

