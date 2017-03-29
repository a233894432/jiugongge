/**
 * Created by pdc on 2016/12/30.
 */

//隐藏微信右上角的分享 禁止[会员中心]
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    //通过下面这个API显示右上角按钮
    WeixinJSBridge.call('hideOptionMenu');
});


/*var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?9640473c3b4f60c203346c9df3ef4164";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();*/

window.innerWidth < 768 ? document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 375 * 20 + 'px' : document.getElementsByTagName('html')[0].style.fontSize = 16 / 1.4 + 'px';