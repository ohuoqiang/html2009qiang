function onc() {
    var aArr = document.querySelectorAll('.nav-tabs>a');
    var contentArr = document.querySelectorAll('.login_area');
    for (var j = 0; j < aArr.length; j++) {
        aArr[j].index = j;
        aArr[j].onclick = function () {
            for (var i = 0; i < aArr.length; i++) {
                aArr[i].className = "";
                contentArr[i].style.display = "none"
            }
            this.className = "onc";
            contentArr[this.index].style.display = "block";
        }
    }
}
onc();


function login() {

    var unameInput = document.getElementsByTagName('input')[0];//用户名输入框
    var pwInput = document.getElementsByTagName('input')[1];//密码输入框
    var form = document.getElementsByTagName('form')[0];//form表单

    form.onsubmit = function (e) {
        //阻止浏览器的默认跳转动作
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        setCookie("username", unameInput.value)
        location.href = "../php/login.php?username=" + unameInput.value + "&password=" + pwInput.value + "&expires=10";

    }
}
login();