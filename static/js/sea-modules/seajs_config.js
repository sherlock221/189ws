/**
 * Created with IntelliJ IDEA.
 * User: aobo
 * Date: 14-1-8
 * Time: 上午10:59
 * seajs 的配置文件
 */
seajs.config({
    base: "../static/js/",
    //设置别名
    alias: {
        "$": "sea-modules/jquery/1.9.1/jquery.min.js",
        "_" : "sea-modules/underscore/1.6.0/underscore-min.js",
        "mouse" : "sea-modules/mouse/jquery.mousewheel.js"
    },

    //更新时间戳
    'map': [
//        [ /^(.*\.(?:css|js))(.*)$/i, '$1?20110801' ]
    ],
    // 变量配置
    vars: {
        'locale': 'zh-cn'
    },

    //预先加载
    preload: ["$"],
    // 调试模式
    debug: false,
    // 文件编码
    charset: 'utf-8'
});

