/**
 * Created by pdc on 2016/10/18.
 */
require("$");
const URL = _LINK_, //框架自动生成页路径对应表
    dialog = require("dialog"),
    rword = /[, ]+/g,
    DOC = document;
__inline("host-config"); //插入host配置
let Loading = (function() {
    let count = 0,
        div,
        html = `<div class='ui-loading-bg'></div>
                <div class='ui-loading-box'>
                    <div class='ui-loading'>
                        <div class='ui-loading-icon ui-loading-icon-0'></div>
                        <div class='ui-loading-icon ui-loading-icon-1'></div>
                        <div class='ui-loading-icon ui-loading-icon-2'></div>
                        <div class='ui-loading-icon ui-loading-icon-3'></div>
                        <div class='ui-loading-icon ui-loading-icon-4'></div>
                        <div class='ui-loading-icon ui-loading-icon-5'></div>
                        <div class='ui-loading-icon ui-loading-icon-6'></div>
                        <div class='ui-loading-icon ui-loading-icon-7'></div>
                        <div class='ui-loading-icon ui-loading-icon-8'></div>
                        <div class='ui-loading-icon ui-loading-icon-9'></div>
                        <div class='ui-loading-icon ui-loading-icon-10'></div>
                        <div class='ui-loading-icon ui-loading-icon-11'></div>
                    </div>
                    <p class='ui-loading-p'>数据加载中</p>
            </div>`;
    //页面内容显示LOADIN
    let Content = {
        show: function() {
            if (count < 1) {
                if (!div) {
                    div = DOC.createElement("div");
                    div.className = "ui-loading-wrap";
                    div.innerHTML = html
                }
                DOC.body.appendChild(div);
            }
            count++;
        },
        hide: function() {
            if (count <= 1) {
                div && DOC.body.removeChild(div)
            }
            count--;
        }
    }
    return {
        show: function(type = "content") {
            if (type == "content") {
                Content.show()
            }
        },
        hide: function(type = "content") {
            if (type == "content") {
                Content.hide()
            }
        }
    }
})();

//设置cookie
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    DOC.cookie = c_name + "=" + decodeURI(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

//获取cookie
function getCookie(cookieName) {
    var start = DOC.cookie.indexOf(cookieName + "=");
    if (start == -1) { return ""; }
    start = start + cookieName.length + 1;
    var end = DOC.cookie.indexOf(";", start);
    if (end == -1) { end = DOC.cookie.length; }
    return decodeURIComponent(DOC.cookie.substring(start, end));
}
//存储键值对
function storeValue(key, value, type = "url", expiredays = "") {
    switch (type) {
        case "url":
            return "&" + encodeURIComponent(key) + "=" + encodeURIComponent(value);
        case "local":
            window.localStorage && localStorage.setItem(HOST.prefix + key, value);
            break;
        case "session":
            window.sessionStorage && sessionStorage.setItem(HOST.prefix + key, value);
            break;
        case "cookie":
            setCookie(HOST.prefix + key, value, expiredays);
            break;

    }
};
//提取值
function getValue(key, type = "url") {
    switch (type) {
        case "url":
            return getParamValue(key);
            break;
        case "local":
            return localStorage.getItem(HOST.prefix + key);
            break;
        case "session":
            return sessionStorage.getItem(HOST.prefix + key);
            break;
        case "cookie":
            return getCookie(HOST.prefix + key);
            break;
    }
};
//删除值
function deleteValue(key, type) {
    var type = type || "all";
    if (!key) {
        localStorage.clear();
        sessionStorage.clear();
        return;
    }
    switch (type) {
        case "all":
            localStorage.removeItem(HOST.prefix + key);
            sessionStorage.removeItem(HOST.prefix + key);
            setCookie(HOST.prefix + key, "", -1);
            break;
        case "local":
            localStorage.removeItem(HOST.prefix + key);
            break;
        case "session":
            sessionStorage.removeItem(HOST.prefix + key);
            break;
        case "cookie":
            setCookie(HOST.prefix + key, "", -1);
            break;
    }
};

//url中提取值辅助函数
function getUrlparams() {
    var src = window.location.search,
        arr = src.substr(1, src.length - 1).split("&"),
        returnObj = {};
    if (arr !== null) {
        for (var i = 0, l = arr.length; i < l; i++) {
            var value = arr[i].split("=");
            if (value && value.length > 1) { returnObj[decodeURIComponent(value[0])] = decodeURIComponent(value[1]) }
        }
    }
    return returnObj;
};
//url中提取值
function getParamValue(name) {
    var param = getUrlparams();
    if (param[name]) {
        return param[name];
    }
    return null;
}

function type(obj) {
    var t;
    if (obj == null) {
        t = String(obj);
    } else {
        t = Object.prototype.toString.call(obj).toLowerCase();
        t = t.substring(8, t.length - 1);
    }
    return t;
}

function linkTo(name, obj, location) {
    if (URL[name]) {

        let Url = URL[name];
        if (obj) {
            Url += "?";
            let _type = type(obj);
            switch (_type) {
                case "string":
                    Url += encodeURIComponent(obj);
                    break;
                case "object":
                    for (var _name in obj) {
                        Url += "&" + encodeURIComponent(_name) + "=" + encodeURIComponent(obj[_name]);
                    }
                    break;
            }
        }

        window.location.href = location ? location + Url : Url;
    }
}

//接口调用控制
function useApi(apiName, apiSource) {
    var source = apiSource || {},
        apiObj = source[apiName];
    if (!apiObj) {
        console.log("未找到" + apiName + "接口相关数据");
        return false;
    }
    return {
        url: HOST.port + apiObj.url,
        data: function() {
            var str = apiObj.param,
                _data = {};
            if (str) {
                str = str.split(rword);
                var len = str.length,
                    pop = Array.prototype.pop;
                while (str[len - 1]) {
                    var name = str[len - 1],
                        value = pop.apply(arguments);
                    _data[name] = value == "undefined" ? "" : value;
                    len--;
                }
            }
            return _data;
        },
        type: apiObj.type || "get",
        async: apiObj.async || true
    }
}

//封装带有loading图标的ajax请求
function loadAjax(param, showLoading = true) {
    showLoading && Loading.show();
    let dtd = $.Deferred();
    return $.ajax({
        type: param.type || "post",
        url: param.url,
        data: param.data,
        async: param.async || true
    }).done(
        function(data) {
            if (data.code == 601) {
                let callBackUrl = window.location.href;
                linkTo("login", { callBackUrl: callBackUrl });
            }
        }
    ).fail(
        function(data) {
            if (data.msg) {
                dialog.tipDialog(data.msg)
            }
        }
    ).always(
        function(date) {
            showLoading && Loading.hide();
            param.complete && param.complete(date);
        }
    )
}

//MODULE生成对应返回接口工厂函数
function moduleFactory(data) {
    let obj = {};
    Object.keys(data).forEach(function(name) {
        obj[name] = function() {
            let api = useApi(name, data);
            if (data[name].fn) {
                return data[name].fn.call(this, api.url, api.data.apply(this, arguments))
            } else {
                return loadAjax({
                    url: api.url,
                    data: api.data.apply(this, arguments),
                    type: api.type,
                    async: api.async
                })
            }
        }
    });
    return obj;
}

function loadImage(array, suc, fai) {
    var l = array.length,
        i = 0,
        j = 0; //j----加载图片的总数（包括成功和失败的）；i----加载成功的图片张数
    while (l) {
        const image = new Image();
        image.src = array[l - 1];
        const fn = (function(l) {
            return function() {
                i += 1;
                j += 1;
                suc && suc.call(this, j, image, array[l - 1], l)
            }
        })(l);
        if (image.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            fn();
        } else {
            image.onload = fn;
            image.onerror = (function(l) {
                return function() {
                    j += 1;
                    console.log("资源 " + array[l] + " 未能加载成功，请检查网络或者是否加载正确地址")
                    fai && fai.call(this, j, i, array[l - 1], l)
                }
            })(l);
        }
        l--
    }
}

//对数字进行分割
function divisionNum(str, section, separator) {
    var section = section || 3,
        separator = separator || ",",
        reg = new RegExp('(\\d)(?=(?:\\d{' + section + '})+$)', 'g');
    str = (str + "").replace(reg, '$1' + separator)
    return str;
}
//对不足位数进行填充
function intercept(str, section, separator) {
    var section = section || 3,
        separator = separator || "0",
        l = (str + "").length,
        ary = new Array(section - 0 + 1).join(separator);
    if (l >= section) {
        return (str + "").substr(l - section)
    } else {
        return ary.substr(0, section - l) + str;
    }
}
//替换原字符中的指定元素
function digita(str, separator) {
    var separator = separator || ",",
        reg = new RegExp(separator, 'g')
    return (str + "").replace(reg, "")
}
var num = {
    division: divisionNum,
    intercept: intercept,
    digita: digita
};
//日期处理
Date.prototype.format = function(str) {
    var week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        time = {
            "y+": this.getFullYear(),
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "w": this.getDay(),
            "W": week[this.getDay()]
        },
        str = str || "yyyy-MM-dd HH:mm:ss";
    for (var i in time) {
        var reg = new RegExp('(' + i + ')', 'g');
        str = str.replace(reg, function() { return intercept(time[i], (i == "w" || i == "W") ? time[i].length : arguments[1].length) })
    }
    return str;
}

//通用处理创建树形结构数据
function creatTree(data, idName, parentName, startValue, cb) {
    var array = [],
        temp;
    for (var i = 0, l = data.length; i < l; i++) {
        if (data[i][parentName] == startValue) {
            array.push(data[i]);
            temp = creatTree(data, idName, parentName, data[i][idName], cb);
            data[i].children = temp.length > 0 ? temp : [];
            cb && cb.call(this, data[i])
        }
    }
    return array;
}

module.exports = {
    storeValue: storeValue,
    getValue: getValue,
    deleteValue: deleteValue,
    useApi: useApi,
    linkTo: linkTo,
    moduleFactory: moduleFactory,
    num: num,
    creatTree: creatTree,
    loadImage: loadImage
}