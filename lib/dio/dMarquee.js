(function(factory) {

    // 如果要兼容 CMD 等其他标准，可以在下面添加条件，比如：
    // CMD: typeof define === 'function' && define.cmd
    // UMD: typeof exports === 'object'
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['$'], factory);
    } else {
        factory(Zepto || jQuery);
        // 如果要兼容 Zepto，可以改写，比如使用：factory(Zepto||jQuery)
    }
}(function($) {
    'use strict';


    console.log($)

}));