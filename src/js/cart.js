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

showData()
function showData() {
    $.ajax({
        url: '../interface/showlist.php',
        success: function (res) {
            if (res.code) {

                var arr = res.data;
                if (res.data) {
                    $(".noGoos").hide()
                    $('.list-head').show();
                    $('.bigBox').empty();

                    var price = 0;
                    var num = 0;
                    $.each(arr, function (index, item) {
                        num += parseInt(item.product_num)
                        $(".bigBox").append(`
                        <div class="item-box" id="${item.product_id}">
                        <div class="col col-check">
                            <input type="checkbox" checked>
                        </div>
                        <div class="col col-img">
                            <img src="${item.product_img}" alt="">
                        </div>
                        <div class="col col-name">
                        ${item.product_name}
                        </div>
                        <div class="col col-price">${item.product_price}元</div>
                        <div class="col col-num">
                            <div class="numwrap">
                                <span class='jian'>-</span>
                                <span class="num">${item.product_num}</span>
                                <span class="add">+</span>
                            </div>
                        </div>
                        <div class="col col-total">${item.product_price * item.product_num}元</div>
                        <div class="col col-action "><i class="del">X</i></div>
                    </div>
                            `);
                        price += parseInt(item.product_price * item.product_num);
                        $('.section-left>span>i').text(num);

                    });
                    $(".total-price>span>em").text(price)

                }

            } else {

                $('.list-head').hide();
                $(".noGoos").show();
                $(".total-price>span>em").text(price)
            }
        },
        dataType: 'json',
        cache: false
    })
}


$('.bigBox').click(function (e) {
    var target = e.target;
    if ((target.className == "add") || (target.className == "jian")) {
        $.ajax({
            url: "../interface/updatewq.php",
            data: {
                type: target.className,
                id: $(target).parents('.item-box').attr('id')
            },
            success: function (res) {
                console.log(res)
                if (res.code) {
                    showData()
                }
            },
            dataType: 'json'
        })
    } else if (target.className == "del") {
        console.log(target)
        $.ajax({
            url: "../interface/delwq.php",
            data: {
                id: $(target).parents('.item-box').attr('id')
            },
            success: function (res) {
                if (res.code) {
                    showData()
                }
            },
            dataType: 'json'
        })
    }
})