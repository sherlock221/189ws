/**
 * mobile js
 */




    var UI = {
       ScreenAll : $("#screen-all"),
       dowLoad  :  $("#btnDow")
    };

    var Cons = {
        LayerHeight: 0,
        currentIndex : 0,
        LastIndex   : 0
    };


//下载链接
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    }
};


    var Event = {

        init: function () {





            UI.dowLoad.click(function(){

                if(isMobile.iOS()){
                    window.location.href='https://itunes.apple.com/us/app/xiao-yuan-yun/id905913921?l=zh&ls=1&mt=8';
                }
                else{
                    window.location.href='http://t.xy189.cn/twoDimenSign.action';
                }

            });



            var scroll=function(e){
                console.log("滚动条初始化。。。");
                window.location.href =  window.location.href;
            }
            window.onscroll=scroll;



            //自适应高度
            var $screen = UI.ScreenAll.find(".screen");

            //首次初始化高度
            var winh = UI.ScreenAll[0].offsetHeight;
            Cons.LayerHeight = winh;
            //修改每个的高度
            $screen.css("height", Cons.LayerHeight + "px");
            //事件初始化
            Event.button();



            $(window).resize(function(){
                alert("浏览器变化");
              // window.location.href =  window.location.href;
            });

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






            function toggleDot(index){
                //改变效用
                var node = $screen.filter("[id='screen"+index+"']");
                transformLayer(index);
                    setTimeout(function(){

                        $screen.forEach(function(t){
                            $(t).find(".main").addClass("hide");
                        });
                        node.find(".main").removeClass("hide");
                    },500);



            };





        }



    };






    //竖向滑动层
    function transformLayer(index) {
        var height = Cons.LayerHeight * index;
        UI.ScreenAll.css({
            "-webkit-transform" : "translate3d(0px, -" + height + "px,0px)"
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