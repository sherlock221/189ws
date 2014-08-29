/**
 * 首页js
 */
define(function (require, exports, module) {

    require("mouse")($);

    var UI = {
        FixRelative: $("#xy-fixrelative"),
        Dot: $("#xy-dot-main"),
        DotList: $("#xy-dot"),
        Header: $("#xy-header")
    };

    var Cons = {
        LayerHeight: 720,
        currentIndex : 0
    };

    var timer;

    var Event = {

        init: function () {
            //自适应高度
            var $targetFig = UI.FixRelative.find(".xy-figure");
            //首次初始化高度
            var winh = $(window).height();
            Cons.LayerHeight = winh > 720 ? winh : 720;
            //修改每个的高度
            $targetFig.css("height", Cons.LayerHeight + "px");

            //窗口发生变化改变
            $(window).resize(function () {
                winh = $(window).height();
                Cons.LayerHeight = winh > 720 ? winh : 720;
                $targetFig.css("height", Cons.LayerHeight + "px");
            });

            //事件初始化
            Event.button();

        },
        button: function () {
            //圆点切换事件
            UI.Dot.on("click", ".xy-dot > li", function () {
                var $this = $(this);
                var index = $this.attr("tabid");
                //添加trans
                var xyList = UI.FixRelative.find(".xy-figure");
                xyList.removeClass("trans");
                var node = xyList.filter("[id='figph"+index+"']").addClass("trans");
                $this.addClass("active").siblings().removeClass("active");

                Cons.currentIndex = index;

                setTimeout(function () {
                    //判断是否需要反色
                    if (index == "2" || index == "4")
                        toggleInverse(true);
                    else
                        toggleInverse(false);
                }, 0);

                transformLayer(index);


            });

//           //绑定鼠标滚轮事件
//           UI.FixRelative.bind("mousewheel", function(event, delta, deltaX, deltaY) {
//                if (timer) {
//                    window.clearTimeout(timer)
//                }
//               console.log(delta);
//
//                timer = window.setTimeout(function() {
//                    if (delta < 0) {
//                        Cons.currentIndex++;
//                        Cons.currentIndex = currentIndexSlice(Cons.currentIndex);
//                        transformLayer(Cons.currentIndex);
//                    } else {
//                        Cons.currentIndex--;
//                        Cons.currentIndex = currentIndexSlice(Cons.currentIndex);
//                        transformLayer(Cons.currentIndex);
//                    }
//                }, 500)
//            });
        }

    };

    //竖向滑动层
    function transformLayer(index) {
        var height = Cons.LayerHeight * index;
        UI.FixRelative.css("transform", "translate(0px, -" + height + "px)");
    }

    //反向颜色
    function toggleInverse(inverse) {
        if (inverse == true) {
            //圆点反色
            UI.DotList.addClass("inverse");
            //导航反色
            UI.Header.addClass("inverse");
        }
        else {
            //圆点反色
            UI.DotList.removeClass("inverse");
            //导航反色
            UI.Header.removeClass("inverse");
        }

    };

    //滚动范围判断
    function currentIndexSlice(index){
        var LastIndex = UI.DotList.find("li").size()-1;
        if(index > LastIndex )
              index = LastIndex;
        else if(index < 0 ){
            index = 0;
        }
        return index;
    };

    Event.init();

});
