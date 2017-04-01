/**
 * @classDescription 模拟Marquee，无间断滚动内容
 * @author diogo
 * @DOM
 *  	<div id="marquee">
 *  		<ul>
 *   			<li></li>
 *   			<li></li>
 *  		</ul>
 *  	</div>
 * @CSS
 *  	#marquee {overflow:hidden;width:200px;height:50px;}
 * @Usage
 *  	$("#marquee").Marquee(options);
 * @options
 *		isEqual:true,		//所有滚动的元素长宽是否相等,true,false
 *  	loop:0,				//循环滚动次数，0时无限
 *		direction:"left",	//滚动方向，"left","right","up","down"
 *		scrollAmount:1,		//步长
 *		scrollDelay:20		//时长
 */
var $ = require('$');



$.fn.Marquee = function(options) {
    var opts = $.extend({}, $.fn.Marquee.defaults, options);

    return this.each(function() {
        // var $marquee = $(this); //滚动元素容器

        // var _scrollObj = $marquee.get(0); //滚动元素容器DOM
        // var scrollW = $marquee.width(); //滚动元素容器的宽度
        // var scrollH = $marquee.height(); //滚动元素容器的高度
        // var $element = $marquee.children(); //滚动元素
        // var $kids = $element.children(); //滚动子元素
        // var scrollSize = 0; //滚动元素尺寸

        // //滚动类型，1左右，0上下
        // var _type = (opts.direction == "left" || opts.direction == "right") ? 1 : 0;

        // //防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
        // $element.css(_type ? "width" : "height", '100%');

        // //获取滚动元素的尺寸
        // if (opts.isEqual) {
        //     console.log($kids)
        //     scrollSize = $kids['0'].clientWidth * $kids.length;
        // } else {
        //     $kids.each(function() {
        //         scrollSize += $(this)[_type ? "outerWidth" : "outerHeight"]();
        //     });
        // };

        // //滚动元素总尺寸小于容器尺寸，不滚动
        // if (scrollSize < (_type ? scrollW : scrollH)) { return; };

        // //克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
        // // $element.append($kids.clone()).css(_type ? "width" : "height", scrollSize * 2);
        // $element.append($kids.clone());


        // new one


        var $items = $(this),
            $element = $(this).children(),
            // $kids = $element.children(),
            lastTime = 0,
            nextFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                var currTime = +new Date,
                    delay = Math.max(1000 / 60, 1000 / 60 - (currTime - lastTime));
                lastTime = currTime + delay;
                return setTimeout(callback, delay);
            },
            cancelFrame = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout,

            scrollX = 0, // 横向
            scrollY = 0, // 竖向
            itemW = $items.children().eq(0).width(),
            itemH = $items.children().eq(0).height(),
            targetX = 0,
            targetY = 0,
            timer = null;

        targetX = itemW * $items.children().length;
        targetY = itemH * $items.children().length;


        $items.append($element.clone());



        function ainit() {
            timer = nextFrame(function() {
                scrollX += 1;
                scrollX >= targetX && (scrollX = 0);
                $items.scrollLeft(scrollX);
                ainit();
            });
        }


        if (opts.direction == 'up') {
            autoScroll($items)
        } else {
            ainit();
        }



        function autoScroll(obj) {
            var liH = $(obj).find("li").height()
            setInterval(function() {
                $(obj).animate({
                    marginTop: -liH
                }, 500, function() {
                    $(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
                })
            }, opts.scrollDelay);

        }




        // console.log($element)
        // console.log(opts)



    });
};

$.fn.Marquee.defaults = {
    isEqual: true, //所有滚动的元素长宽是否相等,true,false
    loop: 0, //循环滚动次数，0时无限
    direction: "left", //滚动方向，"left","right","up","down"
    scrollAmount: 1, //步长
    scrollDelay: 2000 //时长

};

$.fn.Marquee.setDefaults = function(settings) {
    $.extend($.fn.Marquee.defaults, settings);
};