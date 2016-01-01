/**
 * Created by nana on 2015/12/25.
 */
seajs.config({
    "base" : "./",

    "alias" : {
        "jQuery" : "lib/jquery/1.11.1/jquery"
    }
});

seajs.use("js/shell", function(shell){
    shell.init();
});

/*
* 代码结构与功能规划
* starter.js：配置seajs，启动shell.js
* shell.js：进行页面事件绑定与数据统筹操作，提供init方法
* jqueryMap.js: 获取并缓存页面DOM对象对应的jQuery对象，后期根据HTML功能模块进行目录细分
* modal.js: 在页面中展示一个模态框，提供基本的操作API诸如填充数据、启动、设置控件事件、隐藏等等
* service.js : ajax服务接口
* */



/*
* 关于seajs的疑惑
*     模块化是无疑可以极大改善js的依赖管理，在模块化的开发模式下，程序员倾向于把web应用的每个功能
* 都独立出来进行模块化编写，但这也同时造成了一个问题：这个过程中，很容易就造成“过度设计”，产生大量
* 碎片化的模块文件。
*     对于这些模块文件，目前尚且没有一个很好的方法将它们进行合并，当一个大型web应用在初始化的时候，
* 各个模块的交叉加载所造成的请求过多的现象毫无疑问会降低用户体验，对于这个问题，是我想太多了呢，还
* 是确实存在呢？
* */