/**
 * Created by Diogo on 2017年3月28日10:14:00.
 * 
 */

require("$");
let mock = require('mock'),
    dialog = require('dialog');
var WIN = window,
    DOC = document,
    rword = /[, ]+/g,
    debug = true;
var host = {
    port: "testAPI/",
    prefix: "_test_"
}


//调试信息打印
function log() {
    if (window.console && debug) {
        Function.apply.call(console.log, console, arguments)
    }
}


function useApi(apiName, apiSource) {
    var source = apiSource || {},
        apiObj = source[apiName];
    if (!apiObj) {
        log("未找到" + apiName + "接口相关数据");
        return false;
    }
    var competence = apiObj.competence || true;
    if (competence) {
        return {
            url: host.port + apiObj.url,
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
            type: apiObj.type || "post",
            async: apiObj.async || true
        }
    } else {
        apiObj.error && apiObj.error();
    }
}

//MODULE生成对应返回接口工厂函数
function moduleFactory(data) {
    var obj = {};
    WIN.$.each(data, function(name, value) {
        obj[name] = function() {
            var api = useApi(name, data);
            if (data[name].fn) {
                return data[name].fn.call(this, api.url, api.data.apply(this, arguments))
            } else {
                return loadAjax({
                    url: api.url,
                    data: api.data.apply(this, arguments),
                    type: api.type,
                    async: api.async,
                    cache: false
                })
            }
        }
    })
    return obj;
}

//封装ajax请求
function loadAjax(param) {
    return WIN.$.ajax({
        type: param.type || "post",
        url: param.url,
        data: param.data,
        dataType: 'json',
        cache: false,
        async: param.async || true
    }).done(
        function(data) {
            return data
        }
    ).fail(
        function(data) {
            if (data.msg) {
                dialog.tipDialog(data.msg)
            }
        }
    ).always(
        function(date) {
            param.complete && param.complete(date);
        }
    )
}


var apidata = {
    userInfo: { //获取微信用户信息
        url: "cloud2.member.api/wx/userInfo.json",
        param: "code"
    },
    sudokuConfig: {
        url: "cloud2.member.api/wx/sudokuConfig.json",
        param: "code"
    },
    doLottery: {
        url: "cloud2.member.api/wx/doLottery.json"
    }
}

//mock 初始化
mock.setup({
    timeout: '200-600'
})
mock.Random.string(5)
mock.Random.color();

/**
 * @desc 扩展插件
 */

mock.Random.extend({
    randomid: function(date) {
        let eid = [32, 21, 12, 574, 554, 1112, 221, 12]
        return this.pick(eid)
    },
    moreColor: function(date) {
        let eid = ['c679f2', '79f2a3', 'f279b3', 'f2ea79', 'f28079', '79f2b3', '22f2a3', '69f2a3']
        return this.pick(eid)
    }
})


mock.mock(/\/userInfo.json?([^# ]*)/ig, {
    'name': {
        frist: 'ddd'
    },
    'regexp': /[a-z][A-Z][0-9]/
})
mock.mock(/\/sudokuConfig.json?([^# ]*)/ig, {
    'list': [{
            'id': 56,
            'name': '@string("lower", 5)',
            'img': mock.Random.image('120x110', '@moreColor', '+'),
            'color': '@color()'
        },
        {
            'id': 58,
            'name': '@string("lower", 5)',
            'img': mock.Random.image('120x110', '@moreColor', '+'),
            'color': '@color()'
        }, {
            'id': 61,
            'name': '@string("lower", 5)',
            'img': mock.Random.image('120x110', '@moreColor', '+'),
            'color': '@color()'
        },
        {
            'id': 62,
            'name': '@string("lower", 5)',
            'img': mock.Random.image('120x110', '@moreColor', '+'),
            'color': '@color()'
        }, {
            'id': 64,
            'name': '@string("lower", 5)',
            'img': mock.Random.image('120x110', '@moreColor', '+'),
            'color': '@color()'
        },
        {
            'id': 66,
            'name': '@string("lower", 5)',
            'img': mock.Random.image('120x110', '@moreColor', '+'),
            'color': '@color()'
        }, {
            'id': 67,
            'name': '@string("lower", 5)',
            'img': mock.Random.image('120x110', '@moreColor', '+'),
            'color': '@color()'
        }, {
            'id': 68,
            'name': '@string("lower", 5)',
            'img': mock.Random.image('120x110', '@moreColor', '+'),
            'color': '@color()'
        }
    ]
})


mock.mock(/\/doLottery.json?([^# ]*)/ig, {
    'msg': "成功",
    'code': "200",
    'data': {
        'id|1': [56, 58, 61, 62, 64, 66, 67, 68]
    }
})




module.exports = moduleFactory(apidata)