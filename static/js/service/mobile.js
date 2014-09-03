/**
 * mobile js
 */




    var UI = {
       ScreenAll : $("#screen-all")
    };

    var Cons = {
        LayerHeight: 0,
        currentIndex : 0,
        lastIndex   : 0
    };



    var Event = {

        init: function () {

            //自适应高度
            var $screen = UI.ScreenAll.find(".screen");

            //首次初始化高度
            var winh = $(window).height();
            Cons.LayerHeight = winh;
            //修改每个的高度
            $screen.css("height", Cons.LayerHeight + "px");
            //事件初始化
            Event.button();

        },
        button: function () {

            var $screen = UI.ScreenAll.find(".screen");

                UI.ScreenAll.on("swipeUp",function(){
                    alert("up!!");
                });



            var core = 1;

//            //导航条展开按钮
//            UI.collapsenNav.bind("click",function(){
//                var $this = $(this);
//                var status = $this.attr("status");
//                if(status == '0'){
//                    UI.NavList.show();
//                    status = 1;
//                }
//                else{
//                    UI.NavList.hide();
//                    status =0;
//                }
//                $this.attr("status",status);
//            });


            //上下滑动部分
           var  args={
                iniL:30,//X方向滑动的最小距离
                iniT:50,//Y方向滑动的最大距离
                eCallback:function(tPoint){
                    alert(tPoint.direction);
                    switch(tPoint.direction){
                        case "left":
                            alert("left");
                            break;
                        case "right":
                            alert("right");
                    }
                }
            };



            function toggleDot(index){
                //改变效用
                var node = $screen.filter("[id='screen"+index+"']").addClass("trans").siblings().removeClass("trans");
                transformLayer(index);
            };







        }



    };






    //竖向滑动层
    function transformLayer(index) {
        var height = Cons.LayerHeight * index;
        UI.FixRelative.css("transform", "translate(0px, -" + height + "px)");

    }

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




$(function(){
    Event.init();
});