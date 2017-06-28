/*点击大图区域，实现图片的切换*/
/*轮播器的切换小按钮*/
/*var imgSBtn = $(".imgSBtn").children();
alert($("imgSBtn[1]").innerHTML);
for (var i = 0; i < imgSBtn.length; i++) {
    imgSBtn[i].onclick = function() {
        // alert(this.innerHTML);
    }
}
*/
/*轮播器右下角小按钮的切换功能*/
var maxZ = 1;
var currentImgN = 0;
$(".imgSBtn").children("span").click(function() {
    // 小按钮的点击，让其变为选中状态
    $(".imgSBtn").children("span").removeClass("active");
    $(this).addClass("active");

    // 获取所有小按钮里最大的z-index，从而实现平滑切换
    $(".mainZone_img").find("img").each(function() {
        if ($(this).css("z-index") > maxZ) maxZ = Number($(this).css("z-index"));
    });
    // 实现大图平稳切换，改变透明度的切换
    currentImgN = parseInt($(this).attr("class"));
    $(".mainZone_img").find("img").eq(currentImgN).css("z-index", ++maxZ).css("opacity", "0").animate({
        opacity: "1"
    }, 1000);
});
/*轮播器左右按钮的点击切换效果*/
// 没有点击右下角，直接点击左右切换
if (currentImgN == 0) {
    currentImgN = 4;
}
// 主要是为了点击左按钮，图片往前切换
currentImgN += 1000; //哈哈，你不可能打开个网页，玩轮播器点击一千次吧！！！
$(".switchBtn").click(function() {
        // 左右按钮的点击，就停止定时器的自动播放
        clearInterval(mainZone_timer);
        // 判断点击的是左右按钮，从而决定前、后切换
        if ($(this).hasClass("leftBtn")) {
            currentImgN--;
        }
        if ($(this).hasClass("rightBtn")) {
            currentImgN++;
        }
        allSwitch();
    })
    // 大图切换，及小图也切换
function allSwitch() {
    // 切换到下一张图片（即，让其层级最高），并透明度改变的
    $(".mainZone_img").find("img").eq(currentImgN % 5).css("z-index", ++maxZ).css("opacity", "0").animate({
        opacity: "1"
    }, 1000);
    // 大图的切换，也顺带着右下角小按钮的切换
    $(".imgSBtn").children("span").removeClass("active");
    $(".imgSBtn").children("span").eq(currentImgN % 5).addClass("active");
}
/*轮播器的自动播放*/
var mainZone_timer = setInterval(function() {
    // 只需要沿着一个方向自动播放就行
    currentImgN++;
    allSwitch();
}, 3000);

/*小米明星单品点击按钮左右切换*/
// 实现向前、向后切换的函数
function prevNext_switch() {
    if (parseInt($(".goods-list-ul").css("left")) < 0) {
        $(".goods-list-ul").animate({
            "left": "0"
        }, 500);
        $(".control-prev").removeClass("control-prev-choose");
        $(".control-next").addClass("control-next-choose");
    } else {
        $(".goods-list-ul").animate({
            "left": "-1240px"
        }, 500);
        $(".control").removeClass("control-next-choose");
        $(".control-prev").addClass("control-prev-choose");
    }
}
var starGoods_timer = setInterval(prevNext_switch, 3000);

// 鼠标移入按钮，取消定时器；移开按钮，定时器启动
$(".more,.goods-list-ul").hover(function() {
    clearInterval(starGoods_timer);
}, function() {
    starGoods_timer = setInterval(prevNext_switch, 3000);
})

// 点击左右按钮实现商品页的切换
$(".control").click(function() {
    if ($(this).hasClass("control-prev")) {
        if (parseInt($(".goods-list-ul").css("left")) < 0) {
            $(".goods-list-ul").animate({
                "left": "0"
            }, 500);
            $(".control").removeClass("control-prev-choose");
            $(".control-next").addClass("control-next-choose");
        }
    }
    if ($(this).hasClass("control-next")) {
        if (parseInt($(".goods-list-ul").css("left")) >= 0) {
            $(".goods-list-ul").animate({
                "left": "-1240px"
            }, 500);
            $(".control").removeClass("control-next-choose");
            $(".control-prev").addClass("control-prev-choose");
        }
    }
})
