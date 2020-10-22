var box = $id('slider');
var width = box.offsetWidth;
var imgArr = box.children[0].children[0].children;

var sliderCtrl = box.children[1];
var prev = $id('prev');
var next = $id('next');
var index = 0;
for (var i = 0; i < imgArr.length; i++) {
    var newSpan = document.createElement('span');
    newSpan.className = 'slider-ctrl-con';
    newSpan.index = i;
    sliderCtrl.appendChild(newSpan, prev);
}
for (var i = 0; i < imgArr.length; i++) {
    imgArr[i].style.left = width + 'px';
}
imgArr[index].style.left = 0;
light();

sliderCtrl.onclick = function () {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.className.indexOf("slider-ctrl-con") > -1) {
        imgArr[target.index].style.opacity = 0;
        imgArr[index].style.left = -width + 'px';
        imgArr[target.index].style.left = 0 + 'px';

        animate(imgArr[target.index], { opacity: 100 });

        index = target.index;
        light();

    }
    if (target.className == "prev") {
        prevFn();
    }
    if (target.className == 'next') {
        nextFn();
    }
}

slider.timer = setInterval(nextFn, 2000)

slider.onmouseenter = function () {
    clearInterval(slider.timer)
}

slider.onmouseleave = function () {
    clearInterval(slider.timer);
    slider.timer = setInterval(nextFn, 2000);
}



function light() {
    var spanArr = sliderCtrl.children;
    for (var i = 2; i < spanArr.length; i++) {
        spanArr[i].className = 'slider-ctrl-con'
    }
    spanArr[index + 2].className = "slider-ctrl-con current";
}

function prevFn() {
    var current = index - 1;
    if (current < 0) {
        current = imgArr.length - 1
    }
    imgArr[current].style.opacity = 0;
    imgArr[current].style.left = 0 + 'px';
    imgArr[index].style.left = width + "px";
    imgArr[index].style.opacity = 0;
    animate(imgArr[current], { opacity: 100 });
    index = current;
    light();
}
function nextFn() {
    var current = index + 1;
    if (current > imgArr.length - 1) {
        current = 0;
    }
    imgArr[current].style.opacity = 0;
    imgArr[current].style.left = 0 + 'px';
    imgArr[index].style.left = -width + "px";
    imgArr[index].style.opacity = 0;

    animate(imgArr[current], { opacity: 100 });

    //更新总的索引
    index = current;
    //点亮小圆点
    light();
}

function logoMove() {
    var logo = document.getElementsByClassName("logo")[0];
    var logoL = $id("logo_l");
    var logoH = $id("logo_h");
    logo.onmouseenter = function () {


        animate(logoL, { left: 55 });
        animate(logoH, { left: 0 })
    }
    logo.onmouseleave = function () {

        animate(logoL, { left: 0 });
        animate(logoH, { left: -55 })
    }
}
logoMove();


function lbtt() {
    $.ajax({
        type: "get",
        url: "../json/sg.json",
        dataType: "json",
        cache: false,
        async: false,
        success: function (data) {
            $.each(data, function (i, item) {
                $(".lbt").append(`
                <div class="swiper-slide ">
                <a href="./details.html?userku=sg.json&howMany=${i}" class="swiper-slide-box">
                    <img src=".${item.imgpath}" alt="">
                    <h3>${item.h3}</h3>
                    <p class="desc">${item.des}</p>
                    <p class="price">
                        <span>${item.price}</span>元
                        <del>${item.del}元</del>
                    </p>
                </a>
            </div>
                `)
            })
        }
    })
}

lbtt();

//swiper函数
function swiperFn() {
    var mySwiper = new Swiper('.swiper-container', {
        speed: 1000,
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 14,
        autoplay: {
            delay: 3000,//1秒切换一次
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }

    })
}
swiperFn();



function kuku() {
    var arr = ['ulLixiaomii0.json', 'ulLixiaomii1.json', 'ulLixiaomii2.json', 'ulLixiaomii3.json', 'ulLixiaomii4.json', 'ulLixiaomii5.json', 'ulLixiaomii6.json']
    for (var j = 0; j < $(".navMenu-box").length; j++) {

        $.ajax({
            type: "get",
            url: `../json/${arr[j]}`,
            dataType: "json",
            async: false,
            success: function (data) {
                $.each(data, function (i, item) {
                    $(".navMenu-box").eq(j).append(`<a href="./details.html?userku=${arr[j]}&howMany=${i}" class="l goods">
                <div><img src=.${item.imgpath} alt=""></div>
                <h4>${item.name}</h3>
                    <p>
                        <span>${item.price}元</span>
                    </p>
            </a> `);
                })
            }
        });
    }
}
kuku();


function showTime() {
    var nowTime = new Date();
    var y = nowTime.getFullYear();
    var m = nowTime.getMonth();
    var d = nowTime.getDate();

    var target = new Date(y, m, d + 1);

    nowTime = nowTime.getTime();
    target = target.getTime();

    var differentTime = target - nowTime;

    differentTime = parseInt(differentTime / 1000);

    var day = differentTime / (24 * 60 * 60);
    day = Math.floor(day);

    var afterHours = differentTime - day * 24 * 60 * 60;
    var hours = parseInt(afterHours / 3600);

    var afterMinutes = afterHours - hours * 3600;

    var minutes = Math.floor(afterMinutes / 60);

    var seconds = afterMinutes - minutes * 60;

    var arr = [
        parseInt(hours / 10), hours % 10,
        parseInt(minutes / 10), minutes % 10,
        parseInt(seconds / 10), seconds % 10,
    ]

    $('.djsbox>span:nth-of-type(1)').text(arr[0].toString() + arr[1]);
    $('.djsbox>span:nth-of-type(2)').text(arr[2].toString() + arr[3]);
    $('.djsbox>span:nth-of-type(3)').text(arr[4].toString() + arr[5]);
}
showTime();
setInterval(function () {
    showTime()
}, 1000);



$(function () {
    $(window).scroll(function () {  //只要窗口滚动,就触发下面代码

        var scrollt = document.documentElement.scrollTop + document.body.scrollTop; //获取滚动后的高度

        if (scrollt > 200) {  //判断滚动后高度超过200px,就显示

            $("#back_top").fadeIn(400); //淡入

        } else {

            $("#back_top").stop().fadeOut(400); //如果返回或者没有超过,就淡出.必须加上stop()停止之前动画,否则会出现闪动

        }

    });

    $("#back_top").click(function () { //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部

        $("html,body").animate({ scrollTop: "0px" }, 200);

    });

});

function getname() {
    document.cookie;
    console.log(getCookie("username"))
    var ck = getCookie("username")
    console.log(ck)
    if (ck) {
        $(".login").empty().html(`<a href="#">${ck}</a>`)
    }

}
getname();

