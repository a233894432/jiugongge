/**
 * Created 2017/3/22
 */
require(["vue", "common", "api", "dialog", "config"], function(Vue, app, api, dialog, c) {;
    let WIN = window,
        DOC = document;

    console.log(c)
    let vm = new Vue({
        el: "#vm",
        data: {
            title: c.title
        },
        mounted: function() {
            DOC.title = this.title; // 变更title
            console.log(this.title)
        },
        methods: {},
        computed: {}

    });



});