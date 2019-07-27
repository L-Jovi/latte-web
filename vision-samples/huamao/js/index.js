document.body.addEventListener('touchstart', function (e) {
    //console.log("target:"+e.target.className);
    e = e.changedTouches[0];
    onStart(e);
});

document.body.addEventListener('touchmove', function (e) {
    onMove(e.changedTouches[0], e);
});

document.body.addEventListener('touchend', function (e) {
    onEnd(e.changedTouches[0]);
});

// 翻转的绑定
// window.onorientationchange = orientationChange;

function initPage(){
    pageWidth = document.body.clientWidth || document.documentElement.clientWidth;
    pageHeight = document.body.clientHeight || document.documentElement.clientHeight;    
    pages = $(".wrap section");
    $(".bg .bg_sec").css({"height":pageHeight,"background-size":pageWidth+"px "+pageHeight+"px"});    
    var bg_sec_height = $('.bg .bg_sec').height();
    $(".svg").css("height",bg_sec_height*8);
    $(".wrap section").css({
        "width":pageWidth+"px",
        "height":pageHeight+"px"
    });

    secHeight = pageHeight * $(".wrap section").length;
    lineHeight = 832 * secHeight / pageHeight;

    $(".sec, .line").addClass("drag");
    animatePage(curPage);

}
// 以下是拖动效果
var startX = 0,
    startY = 0;
    margin = 0;
var pages = null;
var curPage = 0;
var pageWidth = 0,
    pageHeight = 0;
var lineHeight = 0, secHeight = 0;
var targetElement = null;
var scrollPrevent = false, movePrevent = false, touchDown = false;

$(document).ready(function(){
    initPage();
    document.onreadystatechange=function(){
        if(document.readyState == "complete"){//当页面加载状态 
            $(".loading").hide();
            $("#form_wrap").addClass("form-wrap-ani");
            $("form").addClass("form-ani");
        } 
    }
    $("#share").live("click",function(){        
        $("#shareWrap").removeClass("hide");
    });
    $("#closeshare").live("click",function(){       
        $("#shareWrap").addClass("hide");
    });
});

function onStart (e) {
    if(movePrevent == true){
        event.preventDefault();
        return false;
    }
    if($(e.target).parents("#container").length==1){
        scrollPrevent = true;
    }else{
        scrollPrevent = false;
    }

    $(".map").on('click', function(e){
        $(".map_show").addClass("show");
    })

    if(!$(e.target).parents("#container").length==1){
        $(".map_show").removeClass("show");
    }

    touchDown = true;

    // 起始点，页面位置
    startX = e.pageX;
    startY = e.pageY;

    $(".sec, .line").addClass("drag");

    margin = $(".sec").css("-webkit-transform");
    //margin = "matrix(1, 0, 0, 1, 0, -50)";
    margin = margin.replace("matrix(", "");
    margin = margin.replace(")", "");
    margin = margin.split(",");
    margin = parseInt(margin[5]);
}
function onMove (e, oe) {
    if(movePrevent == true || touchDown != true){
        event.preventDefault();
        return false;
    }
    event.preventDefault();
    if( scrollPrevent==false && e.pageY!=startY){
        var temp = margin + e.pageY - startY;
        $(".sec").css("-webkit-transform", "matrix(1, 0, 0, 1, 0, "+temp+")");
        var b =  lineHeight / secHeight * temp;
        $(".line").css("-webkit-transform", "matrix(1, 0, 0, 1, 0, "+b+")");
    }
}

function onEnd (e) {
    if(movePrevent == true){
        event.preventDefault();
        return false;
    }

    touchDown = false;

    if( scrollPrevent==false ){
        // 抬起点，页面位置
        endX = e.pageX;
        endY = e.pageY;
        // swip 事件默认大于50px才会触发，小于这个就将页面归回
        if( Math.abs(endY-startY)<=50) {
            animatePage(curPage);
        }else{
            if(endY>startY){
                prevPage();
            }else{
                nextPage();
            }
        }
    }

    $(".sec, .line").removeClass("drag");
}

function prevPage(){
    var newPage = curPage - 1;
    animatePage(newPage); 
}
function nextPage(){
    var newPage = curPage + 1;
    animatePage(newPage);
}

function animatePage( newPage ){
    if(newPage<0){
        newPage = 0;
    }
    if(newPage>$(".wrap section").length-1){
        newPage = $(".wrap section").length-1;
    }

    curPage = newPage;
    var newMarginTop = newPage * (-pageHeight);
    $(".sec").css({
        "-webkit-transform" : "matrix(1, 0, 0, 1, 0, "+newMarginTop+")"
    });

    var newTop = -parseInt(curPage*pageHeight*(lineHeight/secHeight));
    $(".line").css({
        "-webkit-transform" : "matrix(1, 0, 0, 1, 0, "+newTop+")"
    });

    movePrevent = true;
    setTimeout("movePrevent=false;", 300 );

    // 每页动画
    if( !$(pages[curPage]).hasClass("sec0" + (curPage+1) + "_show") ){
        $(pages[curPage]).addClass("sec0" + (curPage+1) + "_show");
    }
    $(pages[curPage-1]).removeClass("sec0" + (curPage) + "_show");
    $(pages[curPage+1]).removeClass("sec0" + (curPage+2) + "_show");
    if(curPage==0){     
        $(".bg01").addClass("showbg");      
    }else{
        $(".bg01").removeClass("showbg");
    }


}
var num1=-90;
var num2=90;

// 判断手机横竖屏状态： 
function checkDirect(){  
    if(window.orientation==180||window.orientation==0){  
        $(".msk").hide();       
    }  
    if(window.orientation==90||window.orientation==-90){  
        $(".msk").show();    
    }  
} checkDirect();
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", checkDirect, false);
window.addEventListener("resize", initPage, false);