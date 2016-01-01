/**
 * Created by nana on 2015/12/25.
 */
define(function(require, exports, module){
    "use strict";
    // 获取缓存的jquery对象
    var jqueryMap = require("./jqueryMap"),
        service = require("./service");

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
                            service.postImageData({
                                "imagesData" : results
                            }, function(data){
                                console.log(data);
                            });
                        }
                    }
                })(i, fileName);
            }
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
