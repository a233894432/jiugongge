fis.th({
    name: "Sudoku", //项目名，可选
    version: "0.0.1", //版本号,可选
    paths: { //配置第三方组件
        $: "lib/zepto/zepto.min.js",
        vue: "lib/vue/vue.2.13.js",
        dial: 'components/widget/dial.js',
    },
    shim: {
        /* 'weui': {//配置第三方组件的依赖
         deps: ['$']/!*,
         exports: 'myFunc'*!/
         },*/
    },
    framework: {
        cache: false, //开启localstorage缓存
        combo: false, // 开启合并
        comboPattern: "",
        urlPattern: "", // 静态资源加载路径模式
        urlPrefix: "" // 静态资源加载路径模式
    },
    base: ['views/setfont.js', "lib/scrat/scrat.js", "lib/dio/dio.css"], //所有页面都会加载的资源，可以是js，css
    domain: "", //配置共有静态资源域名
    deploy: "F:\\taihe_iot\\" //发布路径
});