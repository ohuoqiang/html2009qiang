<?php
/* 
    如果要用login.php处理登陆
    传入用户名必须使用username这个键
    传入密码必须使用password这个键
*/

include './base.php';

$uname = $_GET['username'];//获取前端传递的用户名
$upass = $_GET['password'];//获取前端传递的密码
$expires = $_GET['expires'];//获取前端传递的免登陆时间

$conn = mysqli_connect('localhost','root','root','shop');
$sql = "SELECT * FROM `aaa` WHERE `userId`='$uname' AND `userPassword`='$upass'";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($res);
mysqli_close($conn);
if($row){
    //如果登陆成功
    //并且$expires有值
    if($expires){
        //给浏览器写入cookie,有效期是10天
        setcookie('name',$uname,time()+10*24*60*60);
    }else{
        //给浏览器写入cookie,会话时效
        setcookie('name',$uname);
    }
    
    header('location:../pages/mi_index.html');
}else{
    echo "用户名或密码错误!";
}




?>