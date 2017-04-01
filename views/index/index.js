/**
 * Created 2017/3/22
 */
require(["vue", "common", "api", "dialog", "config", "sudoku_lottery", "testApi", "dioMarquee"], function(Vue, app, api, dialog, c, slottery, tapi) {;
    let WIN = window,
        DOC = document;
    // console.log(WIN)
    // console.log(Marque)

    tapi.sudokuConfig(111).done(
        data => {
            console.log(data)
            slottery.init({
                id: 'm-lottery',
                prizeList: data.list
            })
        }
    )
    console.log(slottery)



    // slottery.play()
    let vm = new Vue({
        el: "#vm",
        data: {
            title: c.title,
            state: true //游戏状态
        },
        mounted: function() {
            DOC.title = this.title; // 变更title
            // console.log(this.title)
            $('#marquee').Marquee()
            $('#marqueeUp').Marquee({
                direction: "up", //滚动方向，"left", "up" 
            })

            // console.log($)
        },
        methods: {
            doPlayGame: function() {
                if (!vm.state) {
                    return false
                }
                vm.state = false;
                slottery.play()
                tapi.doLottery(2).done(
                    data => {
                        console.log(data)
                        slottery.stop(data.data.id)
                        setTimeout(function() {
                            vm.state = true
                        }, 3000)
                    }
                )


            },
            stopPlay: function() {
                console.log('stopPlay')

                vm.state = true;
            }
        },
        computed: {

        }

    });












});