

var mySwiper = new Swiper('.swiper-container', {
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

var params = getData();
var userku = params.userku;
var howMany = params.howMany;
function getData() {
    var search = location.search;	//获取location的search属性，保存在search中
    var params = {};		//创建空对象params
    if (search != "") {		//如果search不是空字符串
        search.slice(1).split("&").forEach(	//?username=zhangdong&pwd=123456;//search去开头?，按&切割为数组，forEach
            function (val) {
                var arr = val.split("=");		//将当前元素值按=切割，保存在arr中
                params[arr[0]] = arr[1];		//向params中添加一个元素,属性名为arr[0],值为arr[1]
            }
        );
    }
    return params;		//返回params
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



function showdata() {
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
                        <span>${item.price}</span>
                    </p>
            </a> `);
                })
            }
        });

    }
}
showdata();



function againShow() {
    $.ajax({
        type: "get",
        url: `../json/${userku}`,
        dataType: "json",
        success: function (data) {
            data = data[howMany];
            $(".product-con>h2").text(data.name);
            $(".nav-bar>h2").text(data.name);
            $(".sale-desc").html(data.inrtodution);
            $(".price-info>span").text(data.price + "元");
            $(".total-price").text("总计：" + data.price + "元");
            $(".selected-list>p").text(data.name);
            $(".id").text(data.id);
            $(".swiper-slide:nth-child(1)>img").attr('src', data.detailsImg);
            // console.log(data.detailsImg)

        }
    })
}
againShow();


function showChoose() {
    $(".product-con>ul").click(function (e) {
        var target = e.target;
        if ($(target).hasClass("active")) {
            $(target).parent().children().removeClass('activee')
            $(target).addClass('activee')
        };
        $(".selected-list>p").text(
            $(".product-con>h2").text() + ' ' + $(".activee").eq(0).text() + ' ' + $(".activee").eq(1).text()
        );


    }
    )
}
showChoose();



$(".sale-btn:nth-child(1)>a").click(function () {
    var str = $(".price-info>span").text();
    var num = parseInt(str);
    var imgPath = $(".swiper-slide>img").eq(0).attr("src");
    // console.log($(".swiper-slide>img").eq(0).attr("src"))
    $.ajax({
        url: '../interface/addwq.php',
        data: {
            id: $(".id").text(),
            name: $(".selected-list>p").text(),
            price: num,
            img: imgPath,
            num: 1
        },
        success: function (res) {
            console.log(res);
            alert("加入购物车成功")
        }
    })
})

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
