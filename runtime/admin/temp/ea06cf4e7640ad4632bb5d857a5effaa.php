<?php /*a:1:{s:40:"/var/www/html/view/admin/menu/index.html";i:1684251969;}*/ ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mua - 运营后台</title>
    <!--    全局css-->
    <link rel="shortcut icon" href="favicon.ico">
    <link href="/admin/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="/admin/css/font-awesome.css?v=4.4.0" rel="stylesheet">
    <link href="/admin/css/plugins/jsTree/style.min.css" rel="stylesheet">
    <link href="/admin/css/animate.css" rel="stylesheet">
    <link href="/admin/css/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="/admin/css/style.css?v=4.1.0" rel="stylesheet">
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content  animated fadeInRight">
    <div class="row">
        <div class="col-sm-6">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>菜单列表</h5>
                    <div class="ibox-tools">
                        <a class="collapse-link">
                            <i class="fa fa-chevron-up"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="form-group">
                        <button class="btn btn-outline btn-primary" type="button" data-toggle="modal"
                                data-target="#addModal">添加顶级节点
                        </button>
                        <button class="btn btn-outline btn-success" type="button" onclick="window.location.reload();">
                            刷新树
                        </button>
                    </div>
                    <div id="jstree"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--添加顶级节点modal-->
<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="exampleModalLabel">添加顶级节点</h4>
            </div>
            <div class="modal-body">
                <form id='add_form' method="post">
                    <div class="form-group">
                        <label class="control-label">节点名称:</label>
                        <input type="text" class="form-control" name='name' required="required">
                    </div>
                    <div class="form-group">
                        <label class="control-label">所属节点:</label>
                        <input type="text" class="form-control" disabled placeholder="顶级节点" id="to_menu">
                    </div>
                    <div class="form-group">
                        <label class="control-label">接口地址:</label>
                        <input type="text" class="form-control" name="router" value="#" required>
                    </div>
                    <div class="form-group">
                        <label class="control-label">是否是菜单项：</label>
                        <select class="form-control" name="operations" required="" aria-required="true">
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">是否启动：</label>
                        <select class="form-control" name="status" required="" aria-required="true">
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">菜单排序:</label>
                        <input type="text" class="form-control" name="seq" value="1" >
                    </div>
                    <input type="hidden" value="<?php echo htmlentities($master_url); ?>" name="master_url">
                    <input type="hidden" value="<?php echo htmlentities($token); ?>" name="token" id="token">
                    <input type="hidden" name='parent' value="0" id="parent">
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="add_info()">保存</button>
            </div>
        </div>
    </div>
</div>
<!--编辑节点modal-->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="editModalLabel">编辑节点</h4>
            </div>
            <div class="modal-body">
                <form id='edit_form' method="post">
                    <div class="form-group">
                        <label class="control-label">节点名称:</label>
                        <input type="text" class="form-control" name='name' required="required" id="edit_name">
                    </div>
                    <div class="form-group">
                        <label class="control-label">所属节点:</label>
                        <input type="text" class="form-control" disabled placeholder="" id="edit_to_menu">
                    </div>
                    <div class="form-group">
                        <label class="control-label">接口地址:</label>
                        <input type="text" class="form-control" name="router" value="#" required id="edit_router">
                    </div>
                    <div class="form-group">
                        <label class="control-label">是否是菜单项：</label>
                        <select class="form-control edit_operations" name="operations" required="" aria-required="true">
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="control-label">是否启动：</label>
                        <select class="form-control edit_status" name="status" required="" aria-required="true">
                            <option value="1">是</option>
                            <option value="2">否</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="control-label">菜单排序:</label>
                        <input type="text" class="form-control" name="seq" value="#" required id="edit_sort">
                    </div>

                    <input type="hidden" value="/admin/editMenuItems" name="master_url">
                    <input type="hidden" value="<?php echo htmlentities($token); ?>" name="token">
                    <input type="hidden" name='id' id="edit_id">
                    <input type="hidden" name='type' value="2">
                    <input type="hidden" name='master_name' value="" id="master_name">

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="edit_info()">保存</button>
            </div>
        </div>
    </div>
</div>
<!--操作modal-->
<div class="modal fade" id="operations">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>你要如何操作呢？</h3>
            </div>
            <div class="modal-body" style="text-align: center">
                <button class="btn btn-outline btn-success" type="button" id="addMenu">
                    <i class="fa fa-plus"></i>
                    添加子节点
                </button>
                <button class="btn btn-outline btn-primary" type="button" id="editMenu">
                    <i class="fa fa-edit"></i>
                    编辑节点
                </button>
                <button class="btn btn-outline btn-danger" type="button" id="delMenu">
                    <i class="fa fa-trash-o"></i>
                    删除节点
                </button>
            </div>
            <div class="modal-footer">
                <button class="btn btn-info" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="confirms">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>删除操作</h3>
            </div>
            <div class="modal-body" style="text-align: center">
                <i class="fa fa-trash-o" id="del_msg"></i>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">关闭</button>
                <button class="btn btn-info" data-btn-danger="modal" onclick="del_menu()">确认</button>
            </div>
        </div>
    </div>
</div>
<input type="hidden" value="" id="operations_id">
<input type="hidden" value="" id="operations_name">
<input type="hidden" value="<?php echo htmlentities($menu_list); ?>" id='menu_list'>
<!--全局js-->
<script src="/admin/js/jquery.min.js?v=2.1.4"></script>
<script src="/admin/js/bootstrap.min.js?v=3.3.6"></script>
<script src="/admin/js/content.js?v=1.0.0"></script>
<script src="/admin/js/plugins/toastr/toastr.min.js"></script>
<script src="/admin/js/plugins/jsTree/jstree.min.js"></script>
<style>
    .jstree-open > .jstree-anchor > .fa-folder:before {
        content: "\f07c";
    }

    .jstree-default .jstree-icon.none {
        width: 0;
    }
</style>

<script>
    $(document).ready(function () {
        var menu_list = $("#menu_list").val();
        $('#jstree').jstree({
            'core': {
                'data': JSON.parse(menu_list)
            }
        }).on("select_node.jstree", function (e, data) {
            // console.log("3~" + data.node.id + ":" + data.node.text);
            //打开操作模态框
            $('#operations').modal('show')
            $('#operations_id').val(data.node.original.iid);
            $('#operations_name').val(data.node.original.text);
        });
    });

    $('#delMenu').click(function () {
        $('#confirms').modal('show')
        $("#del_msg").html(' 您确定要删除节点：' + operationsItem().operations_name + ' ? (此节点如有子类则一起删除)')
    });

    function del_menu() {
        var menu_id = operationsItem().operations_id;
        var master_url = '/admin/delMenuItems'
        var token = $('#token').val()
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/delMenuItems",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: {id: menu_id, master_url: master_url, token: token},
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }
                toastr.success(rs.msg);
                setTimeout(location(), 1000);   //延迟5秒刷新页面

            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });

        function location() {
            window.location.href = window.location.href;
        }

        return false;
    }

    $('#editMenu').click(function () {
        //查询当前节点详情
        var menu_id = operationsItem().operations_id
        $.ajax({
            type: "post",  // 请求方式
            url: "/admin/editMenuItems",  // 目标资源
            data: {id: menu_id, type: 1, master_url: '/admin/editMenuItems', token: $("#token").val()}, // 请求参数
            dataType: "json",  // 服务器响应的数据类型
            success: function (data) {  //
                if (data.code !== 200) {
                    toastr.warning(data.msg);
                    return false;
                }

                $('#edit_name').val(data.data.name)
                $('#edit_to_menu').val(data.data.p_name)
                $('#edit_router').val(data.data.router)
                $('#edit_sort').val(data.data.seq)
                $(".edit_operations").val(data.data.operations);
                $(".edit_status").val(data.data.status);
                $("#edit_parent").val(data.data.p_id);
                $("#edit_id").val(data.data.id);
                $("#master_name").val(data.data.name);
                $('#editModal').modal('show')
                $('#operations').modal('hide')
            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });
    });

    function edit_info(){
        var edit_info = $("#edit_form").serializeArray();
        if (edit_info[0].value == '') {
            toastr.warning('节点名称不可为空！');
            return false;
        }
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/editMenuItems",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: edit_info,
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }
                toastr.success(rs.msg);
                setTimeout(location, 1000);   //延迟5秒刷新页面

            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });

        function location() {
            window.location.href = window.location.href;
        }

        return false;
    }
    //添加子节点操作
    $('#addMenu').click(function () {
        $("#to_menu").val(operationsItem().operations_name)
        $("#parent").val(operationsItem().operations_id)
        $('#addModal').modal('show')
        $('#operations').modal('hide')
    });

    function add_info() {
        var add_info = $("#add_form").serializeArray();
        if (add_info[0].value == '') {
            toastr.warning('节点名称不可为空！');
            return false;
        }
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/addMenuItems",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: add_info,
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }
                toastr.success(rs.msg);
                setTimeout(location, 1000);   //延迟5秒刷新页面

            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });

        function location() {
            window.location.href = window.location.href;
        }

        return false;
    }


    function operationsItem() {
        var operationsItem = {};
        operationsItem.operations_id = $("#operations_id").val();
        operationsItem.operations_name = $("#operations_name").val();
        return operationsItem;
    }
</script>
</body>

</html>

