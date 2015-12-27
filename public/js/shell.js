/**
 * Created by nana on 2015/12/25.
 */
define(function(require, exports, module){
    // 获取缓存的jquery对象
    var jqueryMap = require("./jqueryMap");

    function init(){
        bindPageEvent();
    }

    // 绑定事件
    function bindPageEvent(){
        // input内容改变事件
        jqueryMap.uploadFileBtn.bind("change", function(e){
            var i, file, fileReader,
                results = [],
                files = e.target.files,
                count = files.length;
            for(i = 0; (file = files[i]) != null; i++){
                fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                (function(i){
                    fileReader.onload = function(e){
                        results[i] = e.target.result;
                        count--;
                        if(count === 0){
                            // 在此处将结果传递给modal模块，用于显示modal框，确认图片上传
                            console.log(results);
                        }
                    }
                })(i);
            }
        });
    }
    

    module.exports = {
        "init" : init
    }
});
