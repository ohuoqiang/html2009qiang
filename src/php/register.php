<?php
/* 
    如果要用register.php处理登陆
    传入用户名必须使用username这个键
    传入密码必须使用password这个键
*/
include './base.php';

$uname = $_POST['userId'];//获取前端传递的用户名
$upass = $_POST['userPassword'];//获取前端传递的密码
echo $uname;
echo $upass;
$conn = mysqli_connect('localhost','root','root','shop');
$sql = "INSERT INTO `aaa` VALUES ('$uname','$upass')";
$res = mysqli_query($conn,$sql);
mysqli_close($conn);

if($res){
    header('location:../pages/login.html');
}else{
    echo "服务器错误";
}

?>