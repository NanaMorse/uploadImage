/**
 * Created by nana on 2015/12/25.
 */
define(function(require, exports, module){
    "use strict";
    // 获取缓存的jquery对象
    var jqueryMap = require("./jqueryMap"),
        uploader = require("./uploader");

    function init(){
        bindPageEvent();
    }

    // 绑定事件
    function bindPageEvent(){
        // input内容改变事件
        jqueryMap.uploadFileBtn.bind("change", function(e){
            var i, file, fileReader, fileName,
                results = [],
                files = e.target.files,
                count = files.length;
            for(i = 0; (file = files[i]) != null; i++){
                fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileName = file.name;
                console.log(file);
                (function(i, fileName){
                    fileReader.onload = function(e){
                        results[i] = {
                            "fileName" : fileName,
                            "dataUrl" : e.target.result.split(",")[1]
                        };
                        count--;
                        if(count === 0){
                            // 全部上传完毕后重置input
                            resetInputFile(jqueryMap.uploadFileBtn[0]);
                            //todo 在此处将结果传递给modal模块，用于显示modal框，确认图片上传
                            // 直接启动上传
                            uploader.postImageData({
                                "imageData" : results
                            });
                        }
                    }
                })(i, fileName);
            }
        });
    }

    // 重置input
    function resetInputFile(file){
        file.value = "";
        // 在IE11以下中无法清除input内容
        if(file.value){
            var fakeFrom = document.createElement("form"),
                realForm = file.parentNode,
                afterFile = file.nextSibling;
            fakeFrom.appendChild(file);
            fakeFrom.reset();
            realForm.insertBefore(file, afterFile);
        }
    }
    

    module.exports = {
        "init" : init
    }
});
