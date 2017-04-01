/**
 * @desc soduku 抽奖
 * @author diogo
 */

let $ = require('$')


let lottery = {
    obj: new Object,
    prefix: 'dio',
    index: -1, //当前转动到哪个位置，起点位置
    count: 0, //总共有多少个位置
    timer: null, //setTimeout的ID，用clearTimeout清除
    lastTime: 0,
    clearTime: 0,
    speed: 500, //初始转动速度
    times: 0, //转动次数
    cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1, //中奖位置

    rotateRight: [0, 1, 2, 5, 8, 7, 6, 3], // 向右转动的index
    rotateLeft: [0, 3, 6, 7, 8, 5, 2, 1], // 向左转动 index
    prizeList: [], //奖品信息
    prizeListID: [], // 奖品ID 
    /**
     * @desc 初始化 奖品信息
     * 
     */
    init: function(options) {
        let _this = this;
        _this.obj = $("#" + options.id);
        let $items = $("#" + options.id).find(".u-div");
        _this.count = $items.length;

        for (let i = 0; i < options.prizeList.length; i++) {
            if (i == 4) {
                _this.prizeList.push(0)
                    // _this.prizeListID.push(1)
            }
            _this.prizeList.push(options.prizeList[i])
        }


        // console.log(_this.count)

        $($items).each(function(index, item) {
            // console.log(item)
            if (index == 4) {
                return true
            }
            $(item).attr('id', _this.prefix + index)

            $(item).attr('aid', index)
            $(item).attr('name', _this.prizeList[index].name)

            $(item).css({ backgroundImage: 'url(' + _this.prizeList[index].img + ')' })

            $(item).attr('eid', _this.prizeList[index].id)
            $(item).text(_this.prizeList[index].id)
                // $(item).attr('name')

        })
        $('#' + _this.prefix + _this.index).addClass("active")

    },
    /**
     * @desc 转动
     */
    roll: function() {
        let _this = this;
        let index = _this.index;
        let count = _this.rotateRight.length;

        $('#' + _this.prefix + _this.rotateRight[index]).removeClass("active")

        index += 1;
        if (index > count - 1) {
            index = 0;
        };

        $('#' + _this.prefix + _this.rotateRight[index]).addClass("active")


        _this.index = index;

        // console.log("奖品位置" + _this.rotateRight[index])
        return false;
    },

    nextFrame: function(callback) {
        let _this = this;
        let currTime = +new Date,
            delay = Math.max(1000 / 60, 1000 / 60 - (currTime - _this.lastTime));
        _this.lastTime = currTime + delay;
        return setTimeout(callback, _this.speed);
    },
    play: function() {
        let _this = this;
        _this.times += 1;
        // _this.roll(); // 初始化

        lottery.timer = _this.nextFrame(function() {
            _this.roll();
            _this.play();
        })

        if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.rotateRight[_this.index]) {
            clearTimeout(lottery.timer);
            lottery.prize = -1;
            lottery.times = 0;
        } else {
            if (_this.times < lottery.cycle) {
                // console.log(_this.index)
                lottery.speed -= 40;
                // clearTimeout(lottery.timer);
            }

            if (lottery.speed < 40) {
                lottery.speed = 40;
            };
        }

        return false;
    },
    /**
     * @desc 停转
     */
    stop: function(str) {
        let _this = this;
        let attr = "div[eid='" + str + "']"
        let newindex = $(attr).attr('aid');
        console.log(newindex)
        _this.prize = newindex;
        return false;
    }
}




module.exports = lottery