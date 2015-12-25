/**
 * Created by nana on 2015/12/25.
 */
seajs.config({
    "base" : "./",

    "alias" : {
        "jQuery" : "lib/jquery/1.11.1/jquery"
    }
});

seajs.use("js/main", function(main){
    main.init();
});