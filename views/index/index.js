/**
 * Created 2017/3/22
 */
require(["vue", "common", "api", "dialog", "config", "dioMarquee"], function(Vue, app, api, dialog, c) {;
    let WIN = window,
        DOC = document;
    // console.log(WIN)
    // console.log(Marque)



    let vm = new Vue({
        el: "#vm",
        data: {
            title: c.title
        },
        mounted: function() {
            DOC.title = this.title; // 变更title
            // console.log(this.title)
            $('#marquee').Marquee()
            $('#marqueeUp').Marquee({
                direction: "up", //滚动方向，"left","right","up","down"
            })

            // console.log($)
        },
        methods: {

        },
        computed: {

        }

    });












});