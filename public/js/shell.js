/**
 * Created by nana on 2015/12/25.
 */
define(function(require, exports, module){
    "use strict";
    // 获取缓存的jquery对象
    var $ = require("jQuery"),
        jqueryMap = require("./jqueryMap"),
        service = require("./service");

    function init(){
        bindPageEvent();
    }

    // 绑定事件
    function bindPageEvent(){
        // input内容改变事件
        jqueryMap.uploadFileBtn.bind("change", function(e){
            var fileReader, fileName,
                results = [],
                files = e.target.files,
                count = files.length;
            $.each(files, function(index, file){
                fileReader = new FileReader();
                fileName = file.name;
                fileReader.readAsDataURL(file);
                (function(i, fileName){
                    fileReader.onload = function(e){
                        results[i] = {
                            "fileName" : fileName,
                            "data" : e.target.result.split(",")[1]
                        };
                        count--;
                        if(count === 0){
                            // 全部上传完毕后重置input
                            resetInputFile(jqueryMap.uploadFileBtn[0]);
                            //todo 在此处将结果传递给modal模块，用于显示modal框，确认图片上传
                            // 直接启动上传
                            service.postImageData({
                                "imagesData" : results
                            }, function(data){
                                console.log(data);
                            });
                        }
                    }
                })(index, fileName);
            });
        });

        // 功能号按钮1的点击事件
        jqueryMap.function001Btn.bind("click", function(){
            var param = {
                "userName" : "morse"
            };
            service.function001(param, function(data){
                console.log(data);
            });
        });
    }

    // 重置input
    function resetInputFile(file){
        file.value = "";
        // 在IE11以下中无法清除input.value
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
