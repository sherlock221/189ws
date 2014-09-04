/**
 * mobile js
 */




    var UI = {
       ScreenAll : $("#screen-all")
    };

    var Cons = {
        LayerHeight: 0,
        currentIndex : 0,
        LastIndex   : 0
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
            Cons.LastIndex = $screen.size() -1;

            $("body").touchwipe({
                listen : 'y',
                start  :  function(result){
                    console.log("开始滑动...");
                },
                move   : function(result){

                },
                stop   : function(result){
                    //从下往上
                    if(result.dy > 0){
                        Cons.currentIndex++;
                    }
                    //从上往下
                    else{
                        Cons.currentIndex--;
                    }
                    Cons.currentIndex = currentIndexSlice(Cons.currentIndex);
                    toggleDot(Cons.currentIndex);
                }

            });



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
        var tranPx = "translate(0px, -" + height + "px)";
        UI.ScreenAll.css({
            "-webkit-transform" : "translate(0px, -" + height + "px)"

        });

    }

    //滚动范围判断
    function currentIndexSlice(index){
        var LastIndex = Cons.LastIndex;
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