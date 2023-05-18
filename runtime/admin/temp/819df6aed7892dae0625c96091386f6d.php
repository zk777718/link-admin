<?php /*a:4:{s:49:"/var/www/html/view/admin/giftCollection/list.html";i:1684251969;s:35:"../view/admin/common/cssHeader.html";i:1684251969;s:33:"../view/admin/common/confirm.html";i:1684251969;s:34:"../view/admin/common/jsHeader.html";i:1684251969;}*/ ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mua语音 - 运营后台</title>
    <!--    全局css-->
    <link rel="shortcut icon" href="/admin/favicon.ico">
<link href="/admin/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
<link href="/admin/css/style.css?v=4.1.0" rel="stylesheet">
<link href="/admin/css/plugins/toastr/toastr.min.css" rel="stylesheet">
<link href="/admin/css/font-awesome.css?v=4.4.0" rel="stylesheet">
<link href="/admin/css/userItem.css" rel="stylesheet">
    <link href="/admin/css/bootstrap-datetimepicker.css" rel="stylesheet">
    <link href="/admin/css/plugins/toastr/toastr.min.css" rel="stylesheet">


    <style>
        .form-control:focus {
            border-color: #66afe9;
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
        }
        
        table {
            table-layout: fixed;
        }
        
        td {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    </style>

</head>

<body class="gray-bg">
    <!--数据表格-->
    <div class="wrapper wrapper-content animated fadeInRight">
        <!-- Panel Other -->
        <div class="ibox float-e-margins">
            <div class="ibox-content">
                <div class="row row-lg">
                    <div class="col-sm-12">
                        <!-- Example Events -->
                        <div class="example-wrap">
                            <div class="btn-group hidden-xs form-inline">
                                <!-- <div class="form-group">
                                    <label for="">集合名称：</label>
                                    <input class="form-control input-outline" type="text" placeholder="请输入集合名称" value="<?php echo htmlentities($title); ?>" id="title">
                                </div>
                                <div class="form-group">
                                    <label for="">状态：</label>
                                    <select class="form-control" id='is_show' name='is_show'>
										<option value="1" <?php if($is_show==1): ?> selected <?php endif; ?>>通过 </option>
										<option value="0" <?php if($is_show==0): ?> selected <?php endif; ?>>审核中 </option>
									</select>
                                </div>

                                <div class="form-group">
                                    <button type="button" class="btn btn-outline btn-success" id="search"><i aria-hidden="true"></i>搜索</button>
                                </div> -->
                            </div>
                        </div>
                        <div class="example-wrap">
                            <div class="form-group">
                                <button type="button" class="btn add btn-outline btn-success" id="add">
									<i class="glyphicon glyphicon-plus" aria-hidden="true"></i>添加礼物集合
								</button>
                                <button type="button" class="btn  btn-outline btn-success" id="online">
									<i class="glyphicon glyphicon-plus" aria-hidden="true"></i>更新配置
								</button>
                            </div>
                        </div>
                        <div class="example">
                            <div>
                                <table id="data_table" style="width:100%;">
                                    <thead>
                                        <tr>
                                            <th class="text-center">ID</th>
                                            <th class="text-center">合集名称</th>
                                            <th class="text-center">礼物数量</th>
                                            <th class="text-center">是否展示</th>
                                            <th class="text-center">排序</th>
                                            <th class="text-center">创建时间</th>
                                            <!-- <th class="text-center">修改时间</th> -->
                                            <th class="text-center">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php if(!empty($list)): if(is_array($list) || $list instanceof \think\Collection || $list instanceof \think\Paginator): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$item): $mod = ($i % 2 );++$i;?>
                                        <tr>
                                            <td class="text-center id"><?php echo htmlentities($item['id']); ?></td>
                                            <td class="text-center title"><?php echo htmlentities($item['title']); ?></td>
                                            <td class="text-center gift_count"><?php echo htmlentities($item['gift_count']); ?></td>

                                            <td class="text-center is_show" typeval="<?php echo htmlentities($item['is_show']); ?>">
                                                <?php if(!empty($item['is_show'] == 1)): ?> 是<?php else: ?> 否 <?php endif; ?>
                                            </td>
                                            <td class="text-center seq"><?php echo htmlentities($item['seq']); ?></td>
                                            <td class="text-center create_time"><?php echo htmlentities(date('Y-m-d H:i:s',!is_numeric($item['create_time'])? strtotime($item['create_time']) : $item['create_time'])); ?></td>
                                            <!-- <td class="text-center update_time"><?php echo htmlentities($item['update_time']); ?></td> -->
                                            <td class="text-center">
                                                <div class="btn-group hidden-xs form-inline ">
                                                    <button class="btn btn-primary detail" pid="<?php echo htmlentities($item['id']); ?> ">礼物详情</button>
                                                </div>
                                                <div class="btn-group hidden-xs form-inline">
                                                    <!-- "<?php echo json_encode($item)?>" -->
                                                    <button class="btn btn-success" pid="<?php echo htmlentities($item['id']); ?>" onclick='<?php echo "edit(".json_encode($item).")"?>'>编辑</button>
                                                </div>
                                                <?php if(!empty($item['status']==1 )): ?>
                                                <div class="btn-group hidden-xs form-inline ">
                                                    <button class="btn btn-danger delete " pid="<?php echo htmlentities($item['id']); ?> ">删除</button>
                                                </div>
                                                <?php endif; ?>
                                            </td>
                                        </tr>
                                        <?php endforeach; endif; else: echo "" ;endif; else: ?>
                                        <tr class="no-records-found ">
                                            <td colspan="7 " class="text-center ">没有找到匹配的记录</td>
                                        </tr>
                                        <?php endif; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <?php if($page['total_page']>1): ?>
                    <div id="Paginator" style="text-align: center">
                        <ul id="pageLimit"></ul>
                    </div>
                    <?php endif; ?>
                    <!-- End Example Events -->
                </div>
            </div>
        </div>
    </div>
    <!-- End Panel Other -->
    </div>
    <!--操作modal-->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"
							onclick="empty()">&times;</span>
					</button>
                    <h4 class="modal-title" id="addModalLabel">添加</h4>
                </div>
                <div class="modal-body add-append">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" onclick="add_info()">保存</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"
							onclick="empty()">&times;</span>
					</button>
                    <h4 class="modal-title" id="editModalLabel">编辑</h4>
                </div>
                <div class="modal-body edit-append">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" id="save">修改</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">确认信息</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button></div>
            <div class="modal-body confirm-append">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="second-confirm">确认</button>
            </div>
        </div>
    </div>
</div>
    <input type='hidden' value='0' id='edit_id'>
    <input type="hidden" value="<?php echo !empty($page['page']) ? htmlentities($page['page']) :  0; ?>" id="page">
    <input type="hidden" value="<?php echo !empty($page['total_page']) ? htmlentities($page['total_page']) :  0; ?>" id="total_page">
    <input type="hidden" value="<?php echo htmlentities($token); ?>" name="token" id="token">
    <!-- 全局js -->
    <script src="/admin/js/jquery.min.js?v=2.1.4"></script>
<script src="/admin/js/bootstrap.min.js?v=3.3.6"></script>
<script src="/admin/js/plugins/toastr/toastr.min.js"></script>
<script src="/admin/js/plugins/pagination/bootstrap-paginator.js"></script>
<script src="/admin/js/user-item.js"></script>
    <script>
        function edit(obj) {
            console.log(obj);
            $(".edit-append").empty();
            $(".edit-append").prepend(
                "<form id='edit_form' method='post' >" +

                "<div class='form-group'>" +
                "<label class='control-label'>" + "合集名称:" + "</label>" +
                "<input type='text' class='form-control' name='title' value='" + obj.title + "' required='required'>" +
                "</div>" +

                // "<div class='form-group'>" +
                // "<label class='control-label'>" + "礼物描述:" + "</label>" +
                // "<input type='text' class='form-control' name='classification'  required='required'>" +
                // "</div>" +

                "<div class='form-group'>" +
                "<label class='control-label'>" + "排序:" + "</label>" +
                "<input type='text' class='form-control' name='seq' value='" + obj.seq + "' oninput=\"this.value = this.value.replace(/[^-?\\d+$]/g, '');\" required='required'>" +
                "</div>" +

                '<div class="form-group">' +
                '<label class="control-label">是否展示: </label>' +
                '<label class="radio-inline">' +
                '<input type="radio" name="is_show" class="is_show" checked value="1"> 是' +
                '</label>' +
                '<label class="radio-inline">' +
                '<input type="radio" name="is_show" class="is_show" value="0"> 否' +
                '</label>' +
                '</div>' +

                "<input type='hidden' value='" + obj.id + "' name='id'>" +
                "<input type='hidden' value='<?php echo htmlentities($token); ?>' name='token'>" +
                "<input type='hidden' value='/admin/giftCollectionSave' id='master_url' name='master_url'>" +
                "</form>"
            );

            $('#editModal').find("input:radio[name='is_show'][value='" + obj.is_show + "']").attr("checked", true);
            $('#editModal').modal('show');
        }

        //修改按钮
        $('#save').click(function() {
            var edit_info = $("#edit_form").serializeArray();
            $.ajax({
                async: false, //表示请求是否异步处理
                type: "post", //请求类型
                url: "/admin/giftCollectionSave", //请求的 URL地址
                token: $("#token").val(),
                dataType: "json", //返回的数据类型
                data: edit_info,
                success: function(rs) {
                    if (rs.code != 200) {
                        toastr.warning(rs.desc);
                        return false;
                    }
                    toastr.success(rs.desc);
                    setTimeout(location, 1000); //延迟5秒刷新页面
                },
                error: function(rs) {
                    toastr.warning('请求失败');
                }
            });

            function location() {
                window.location.href = window.location.href;
            }
            return false;

        })

        $('#pageLimit').bootstrapPaginator({
            currentPage: $("#page").val(),
            totalPages: $("#total_page").val(),
            size: "normal",
            bootstrapMajorVersion: 3,
            alignment: "right",
            numberOfPages: '5',
            pageUrl: function(type, page, current) {
                //是每个分页码变成一个超链接
                return '?page=' + page + '&master_url=/admin/giftCollectionList&token=' + $('#token').val() +
                    '&master_url=/admin/giftCollectionList&page=' + page + '&app_type=' + $('#app_type').val() +
                    '&is_show=' + $('#is_show').val() + '&stime=' + $('#stime').val() + '&etime=' + $('#etime')
                    .val() + '&title=' + $('#title').val();
            },
            itemTexts: function(type, page, current) {
                switch (type) {
                    case "first":
                        return "首页";
                    case "prev":
                        return "上一页";
                    case "next":
                        return "下一页";
                    case "last":
                        return "末页";
                    case "page":
                        return page;
                }
            }
        });

        //添加
        $('.add').on('click', function() {
            $(".add-append").empty();
            $(".add-append").prepend(
                "<form id='add_form' method='post' >" +

                "<div class='form-group'>" +
                "<label class='control-label'>" + "合集名称:" + "</label>" +
                "<input type='text' class='form-control' name='title'  required='required'>" +
                "</div>" +

                // "<div class='form-group'>" +
                // "<label class='control-label'>" + "礼物描述:" + "</label>" +
                // "<input type='text' class='form-control' name='classification'  required='required'>" +
                // "</div>" +

                "<div class='form-group'>" +
                "<label class='control-label'>" + "排序:" + "</label>" +
                "<input type='text' class='form-control' name='seq' oninput=\"this.value = this.value.replace(/[^-?\\d+$]/g, '');\" required='required'>" +
                "</div>" +

                '<div class="form-group">' +
                '<label class="control-label">是否展示: </label>' +
                '<label class="radio-inline">' +
                '<input type="radio" name="is_show" class="is_show" checked value="1"> 是' +
                '</label>' +
                '<label class="radio-inline">' +
                '<input type="radio" name="is_show" class="is_show" value="0"> 否' +
                '</label>' +
                '</div>' +

                "<input type='hidden' value='<?php echo htmlentities($token); ?>' name='token'>" +
                "<input type='hidden' value='/admin/giftCollectionAdd' id='master_url' name='master_url'>" +
                " </form>"
            );
            $('#addModal').modal('show');
        });


        //添加执行
        function add_info() {
            var data = $("#add_form").serializeArray();
            $.ajax({
                async: false, //表示请求是否异步处理
                type: "post", //请求类型
                url: "/admin/giftCollectionAdd", //请求的 URL地址
                token: $("#token").val(),
                dataType: "json", //返回的数据类型
                data: data,
                success: function(rs) {
                    if (rs.code != 200) {
                        toastr.warning(rs.desc);
                        return false;
                    }
                    toastr.success(rs.desc);
                    setTimeout(location, 1000); //延迟5秒刷新页面

                },
                error: function(rs) {
                    toastr.warning('请求失败');
                }
            });

            function location() {
                window.location.href = window.location.href;
            }

            return false;
        }

        $('.delete').on('click', function() {
            var pid = $(this).attr('pid');
            $(".confirm-append").empty();
            $(".confirm-append").prepend('<p id="delcfmMsg">您确认删除吗？</p>')
            $("#edit_id").attr('value', pid);
            $('#confirmModal').modal('show');
        });

        $('#second-confirm').click(function() {
            var pid = $("#edit_id").attr('value');
            $.ajax({
                async: false, //表示请求是否异步处理
                type: "post", //请求类型
                url: "/admin/giftCollectionSave", //请求的 URL地址
                token: $("#token").val(),
                dataType: "json", //返回的数据类型
                data: {
                    token: $('#token').val(),
                    master_url: '/admin/giftCollectionSave',
                    id: pid,
                    action: 'delete',
                },
                success: function(rs) {
                    if (rs.code != 200) {
                        toastr.warning(rs.desc);
                        return false;
                    }
                    toastr.success(rs.desc);

                    $("#edit_id").attr('value', 0);
                    setTimeout(location, 1000); //延迟5秒刷新页面
                },
                error: function(rs) {
                    toastr.warning('请求失败');
                }
            });

            function location() {
                window.location.href = window.location.href;
            }

            return false;
        })

        $("#online").click(function() {
            $.ajax({
                async: false, //表示请求是否异步处理
                type: "post", //请求类型
                url: "/admin/giftCollectionOnline", //请求的 URL地址
                token: $("#token").val(),
                dataType: "json", //返回的数据类型
                data: {
                    token: $('#token').val(),
                    master_url: '/admin/giftCollectionOnline'
                },
                success: function(rs) {
                    if (rs.code != 200) {
                        toastr.warning(rs.desc);
                        return false;
                    }
                    toastr.success(rs.desc);

                    $("#edit_id").attr('value', 0);
                    setTimeout(location, 1000); //延迟5秒刷新页面
                },
                error: function(rs) {
                    toastr.warning('请求失败');
                }
            });
        })
        $(".detail").click(function() {
            let coll_id = $(this).attr('pid');
            console.log(coll_id);
            window.location.href = "/admin/giftCollectionDetailList?token=" + $('#token').val() + '&master_url=/admin/giftCollectionDetailList' + "&coll_id=" + coll_id;
        })
    </script>
    <script src="/admin/js/datetimepicker/bootstrap-datetimepicker.js"></script>
    <script src="/admin/js/datetimepicker/bootstrap-datetimepicker.zh-CN.js"></script>
    <script>
        $('#search').click(function() {
            var token = $('#token').val();
            var page = $("#page").val();
            var is_show = $("#is_show").val();
            window.location.href = "/admin/giftCollectionList?token=" + token + '&master_url=/admin/giftCollectionList&page=' + page + '&is_show=' + is_show;
        })

        $("#datetimeStart").datetimepicker({
            weekStart: 1,
            todayBtn: true,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1,
            format: 'yyyy-mm-dd 00:00:00',
            minView: '3',
            language: 'zh-CN',
            autoclose: true,
            startDate: '-10y,-10m,-10d'
        }).on("click", function() {
            $("#datetimeStart").datetimepicker("setStartDate")
        });
        $("#datetimeEnd").datetimepicker({
            weekStart: 1,
            todayBtn: true,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1,
            format: 'yyyy-mm-dd 23:59:59',
            minView: '3',
            language: 'zh-CN',
            autoclose: true,
            startDate: '-10y,-10m,-10d'
        }).on("click", function() {
            $("#datetimeEnd").datetimepicker("setEndDate")
        });
    </script>