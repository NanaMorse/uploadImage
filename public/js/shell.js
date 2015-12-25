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
        jqueryMap.uploadFileBtn.bind("change", function(e){
            var i, file,
                files = e.target.files,
                fileReader;
            for(i = 0; (file = files[i++]) != null; ){
                fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = function(e){
                    console.log(e);
                }
            }
        });
    }

    module.exports = {
        "init" : init
    }
});