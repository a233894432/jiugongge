/**
 * Created 2017/3/22
 */
require(["vue", "common", "api", "dialog", "config", "testApi"], function(Vue, app, api, dialog, c, tapi) {;
    let WIN = window,
        DOC = document;

    tapi.userInfo(11).done(
            data => {
                console.log(data)
            }
        )
        // console.log(c)
    let vm = new Vue({
        el: "#footer",
        data: {
            tel: c.tel,
            isShowFooter: c.isShowFooter,
            kfCustom: c.kfCustom,
            backgroundStyle: c.backgroundStyle,
            fontColor: c.fontColor
        },
        mounted: function() {
            // 变更footer
        },
        methods: {},
        computed: {},
        filters: {
            strTotel: function(n) {
                return "tel:" + n;
            }
        }

    });


});