/**
 * Created by Nana on 2016/1/3.
 */
// ��Ϊ���ÿ�

module.exports = {
    // �ڶ�����������ϱ�����ģ��jquery.each��ʵ��
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

    // �ж�һ�������Ƿ������������������
    "isArrayLike" : function(obj){
        var length = obj.length;

        if({}.toString.call(obj) === "[object Function]"){
            return false;
        }

        return Array.isArray(obj) || length === 0 ||
                typeof length === "number" && length > 0 && (length - 1) in obj;
    }
};