/**
 * Created by Nana on 2016/1/1.
 */
// 002功能号处理函数
// 保存上传的图片到本地
var fs = require("fs");

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
    var i, imgInfo, data, fileName,
        count = receiveData.length;
    for(i = 0; (imgInfo = receiveData[i]) != null; i++){
        dst = dst ? dst : "";
        data = imgInfo.data;
        fileName = imgInfo.fileName;
        (function(fileName){
            fs.writeFile((dst ? dst : "") + fileName, data, "base64", function(err){
                if(err) throw err;
                else {
                    console.log(fileName + "已存储至" + (dst ? dst : "当前目录") + "下。");
                    count = count - 1;
                    if(count === 0){
                        callback();
                    }
                }
            });
        })(fileName);
    }
}