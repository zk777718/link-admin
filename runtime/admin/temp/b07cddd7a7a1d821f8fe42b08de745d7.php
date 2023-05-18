<?php /*a:3:{s:40:"/var/www/html/view/admin/user/login.html";i:1684251969;s:35:"../view/admin/common/cssHeader.html";i:1684251969;s:34:"../view/admin/common/jsHeader.html";i:1684251969;}*/ ?>
<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mua运营后台 | 登录</title>
    <!--    全局css-->
    <link rel="shortcut icon" href="/admin/favicon.ico">
<link href="/admin/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
<link href="/admin/css/style.css?v=4.1.0" rel="stylesheet">
<link href="/admin/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="/admin/css/font-awesome.css?v=4.4.0" rel="stylesheet">
<link href="/admin/css/userItem.css" rel="stylesheet">
</head>
<body class="gray-bg">
<div class="middle-box text-center loginscreen animated fadeInDown">
    <div>
        <div>
            <h1 class="logo-name">Mua</h1>
        </div>
        <h3>Mua运营后台</h3>
        <form id="director-form"  method="post" onsubmit="return buttons();">
            <div class="form-group">
                <input type="text" class="form-control" placeholder="用户名" required="" name = 'username'>
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="密码" required="" name = 'password'>
            </div>
            <input type="hidden" name ="master_url" value="<?php echo htmlentities($master_url); ?>">
            <button type="botton" class="btn btn-primary block full-width m-b" >登录</button>
        </form>
    </div>
</div>

<!-- Mainly scripts -->
<script src="/admin/js/jquery.min.js?v=2.1.4"></script>
<script src="/admin/js/bootstrap.min.js?v=3.3.6"></script>
<script src="/admin/js/plugins/toastr/toastr.min.js"></script>
<script src="/admin/js/plugins/pagination/bootstrap-paginator.js"></script>
<script src="/admin/js/user-item.js"></script>
<script>
    function buttons(){
        var datas = $('form').serializeArray();
        $.ajax({
            async : false,    //表示请求是否异步处理
            type : "post",    //请求类型
            url : "/admin/login",//请求的 URL地址
            dataType : "json",//返回的数据类型
            data:datas,
            success: function (rs) {
                if(rs.code !== 200){
                    toastr.warning(rs.msg);
                    return false;
                }
                var token = rs.data.token;
                toastr.success(rs.msg);
                window.location.href = '/admin/index?master_url=/admin/index&token='+token;
            },
            error:function (rs) {
                toastr.warning('请求失败');
            }
        });
        return false;
    }
</script>
</body>
</html>
