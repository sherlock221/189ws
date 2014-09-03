/**
 * 首页js
 */


define(function (require, exports, module) {

    require("mouse")($);

    var UI = {
        FixRelative: $("#xy-fixrelative"),
        Dot: $("#xy-dot-main"),
        DotList: $("#xy-dot"),
        Header: $("#xy-header"),
        collapsenNav : $("#collapsedNav"),
        NavList   :  $(".xy-nav-main")
    };

    var Cons = {
        LayerHeight: 720,
        currentIndex : 0
    };

    var timer;

    var isIE;

    var Event = {

        init: function () {
            //检测浏览器
            isIE = checkIe9();

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

            //图片自动轮播事件
            var discover = $(".xy-discover-transform");
            var core = 1;


            //导航条展开按钮
            UI.collapsenNav.bind("click",function(){
                var $this = $(this);
                var status = $this.attr("status");
                if(status == '0'){
                    UI.NavList.show();
                    status = 1;
                }
                else{
                    UI.NavList.hide();
                    status =0;
                }
                $this.attr("status",status);
            });

            function toggleDot(index){
                //改变效用
                var xyList = UI.FixRelative.find(".xy-figure");
                var node = xyList.filter("[id='figph"+index+"']").addClass("trans").siblings().removeClass("trans");

                var dom = UI.DotList.find("[tabid='"+index+"']").addClass("active");
                dom.siblings().removeClass("active");

                //改变导航背景色
                setTimeout(function () {
                    //判断是否需要反色
                    if (index == "2" || index == "4")
                        toggleInverse(true);
                    else
                        toggleInverse(false);
                }, 0);
                transformLayer(index);
            };

            //圆点切换事件
            UI.Dot.on("click", ".xy-dot li", function () {
                console.log("....");
                var $this = $(this);
                var index = $this.attr("tabid");
                console.log(index);
                Cons.currentIndex = index;
                toggleDot(index);
            });

            var isAnimate = false;

           //绑定鼠标滚轮事件
           UI.FixRelative.bind("mousewheel", function(event, delta, deltaX, deltaY) {

               var $this = $(this),
                   timeoutId = $this.data('timeoutId');
               if (timeoutId) {
                   clearTimeout(timeoutId);
               }
               $this.data('timeoutId', setTimeout(function() {

                   console.log(delta);

                   $this.removeData('timeoutId');
                   $this = null

                   if (delta < 0) {
                       Cons.currentIndex++;
                       Cons.currentIndex = currentIndexSlice(Cons.currentIndex);

                   } else {
                       Cons.currentIndex--;
                       Cons.currentIndex = currentIndexSlice(Cons.currentIndex);
                   }

                   toggleDot(Cons.currentIndex);


               }, 100));
               return false;

            });


        }



    };




    //检测ie9下
    function checkIe9(){

        if(window.navigator.appName == "Microsoft Internet Explorer" && window.navigator.appVersion.match(/7./i)=="7.")
        {
            return  2;
        }
        else if(window.navigator.appName == "Microsoft Internet Explorer" && window.navigator.appVersion.match(/8./i)=="8.")
        {
            return  1;
        }
        else if(window.navigator.appName == "Microsoft Internet Explorer" && window.navigator.appVersion.match(/9./i)=="9.")
        {
            return  1;
        }
        else if(window.navigator.appName == "Microsoft Internet Explorer")
        {
            return  2;
        }
        else{
            return 0;
        }
    };



    //竖向滑动层
    function transformLayer(index) {
        var height = Cons.LayerHeight * index;

        if(isIE == 0){
            //webkit moz
            UI.FixRelative.css("transform", "translate(0px, -" + height + "px)");
        }
        else{
            //ie8 9
            $('html,body').animate({scrollTop: height+'px'}, 800);
        }

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
