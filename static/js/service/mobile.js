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


    var MobileEvent = {

        init: function () {




            var wrapper_scroll = new Scroller('#wp', {
                Scontainer : '.screen-all',
                hScroll : false,
                vScroll : true,
                momentum : true,
                bounce : false,
                snap: true,
                scrollBefore: function(name, e){

                },
                onScroll: function(name, obj){
                },
                onTouchEnd: function(name, obj){
                },
                scrollEnd: function(index){
                    console.log(index);
                    var pages = this.$li;

                    //从下往上
//                    if(result.dy > 0){
//                        Cons.currentIndex++;
//                    }
//                    //从上往下
//                    else{
//                        Cons.currentIndex--;
//                    }
//                    Cons.currentIndex = currentIndexSlice(Cons.currentIndex);
//                    toggleDot(Cons.currentIndex);


//                    for (var i = 0; i < pages.length; i++) {
//                        halo.util.addClass(pages[i].querySelector('.content'), 'hide');
//                    };
//                    halo.util.removeClass(pages[index].querySelector('.content'), 'hide');

                    var $screen = UI.ScreenAll.find(".screen");
                    var node = $screen.filter("[id='screen"+index+"']");


                    for (var i = 0; i < $screen.length; i++) {
                        var $sc = $($screen[i]);
                        $sc.find(".main").addClass("hide");
                    };
                    node.find(".main").removeClass("hide");

                }
            });



            UI.dowLoad.click(function(){

                if(isMobile.iOS()){
                    window.location.href='https://itunes.apple.com/us/app/xiao-yuan-yun/id905913921?l=zh&ls=1&mt=8';
                }
                else{
                    window.location.href='http://t.xy189.cn/twoDimenSign.action';
                }

            });






//            //自适应高度
//            var $screen = UI.ScreenAll.find(".screen");
//
//            //首次初始化高度
//            var winh = UI.ScreenAll[0].offsetHeight;
//            Cons.LayerHeight = winh;
//            //修改每个的高度
//            $screen.css("height", Cons.LayerHeight + "px");
//            //事件初始化
//            MobileEvent.button();



            $(window).resize(function(){
                alert("浏览器变化");
              // window.location.href =  window.location.href;
            });

        },
        button: function () {

            var $screen = UI.ScreenAll.find(".screen");
            Cons.LastIndex = $screen.size() -1;






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
    MobileEvent.init();
});