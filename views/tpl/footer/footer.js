/**
 * Created 2017/3/22
 */
require(["vue", "common", "api", "dialog", "config"], function(Vue, app, api, dialog, c) {;
    let WIN = window,
        DOC = document;

    let vm = new Vue({
        el: "#footer",
        data: {
            tel: c.tel,
            isShowFooter: c.isShowFooter,
            kfCustom: c.kfCustom
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