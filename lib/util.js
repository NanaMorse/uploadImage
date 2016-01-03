/**
 * Created by Nana on 2016/1/3.
 */
// 作为常用库

module.exports = {
    // 在对象或者数组上遍历，模仿jquery.each的实现
    "each" : function(obj, callback){
        var i = 0, len, value,
            isArray = this.isArrayLike(obj);

        if(isArray){
            for(len = obj.length; i < len; i++){
                value = callback.call(obj[i], i, obj[i]);
                if (value === false){
                    break;
                }
            }
        }else{
            for(i in obj){
                if(obj.hasOwnProperty(i)){
                    value = callback.call(obj[i], i, obj[i]);
                    if (value === false){
                        break;
                    }
                }
            }
        }
    },

    // 判断一个对象是否是数组或者是类数组
    "isArrayLike" : function(obj){
        var length = obj.length;

        if({}.toString.call(obj) === "[object Function]"){
            return false;
        }

        return Array.isArray(obj) || length === 0 ||
                typeof length === "number" && length > 0 && (length - 1) in obj;
    }
};