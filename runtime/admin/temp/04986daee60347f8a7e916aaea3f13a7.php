<?php /*a:4:{s:40:"/var/www/html/view/admin/room/index.html";i:1684251969;s:35:"../view/admin/common/cssHeader.html";i:1684251969;s:34:"../view/admin/common/userItem.html";i:1684251969;s:34:"../view/admin/common/jsHeader.html";i:1684251969;}*/ ?>
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
<div class="wrapper wrapper-content animated fadeInRight">
    <!-- Panel Other -->
    <div class="ibox float-e-margins">
        <div class="ibox-content">
            <div class="row row-lg">
                <div class="col-sm-12">
                    <!-- Example Events -->
                    <div class="example-wrap">
                        <div class="btn-group hidden-xs form-inline">
                            推荐状态:<select class="form-control" id="is_hot">
                                <option value="0" <?php if($is_hot == 0): ?> echo selected="selected" <?php endif; ?>>否</option>
                                <option value="1" <?php if($is_hot == 1): ?> echo selected="selected" <?php endif; ?>>是</option>
                            </select>
                            是否隐藏:<select class="form-control" id="is_hide">
                            <option value="-1">全部</option>
                            <option value="0" <?php if($is_hide == 0): ?> echo selected="selected" <?php endif; ?>>否</option>
                            <option value="1" <?php if($is_hide == 1): ?> echo selected="selected" <?php endif; ?>>是</option>
                        </select>
                            是否封禁:<select class="form-control" id="is_block">
                            <option value="-1">全部</option>
                            <option value="0" <?php if($is_block == 0): ?> echo selected="selected" <?php endif; ?>>否</option>
                            <option value="1" <?php if($is_block == 1): ?> echo selected="selected" <?php endif; ?>>是</option>
                        </select>
                            &#12288
                            <select class="form-control" id="select_id">
                                <option value="">请选择房间类型&#12288&#12288</option>
                                <?php if(!empty($room_type_list)): if(is_array($room_type_list) || $room_type_list instanceof \think\Collection || $room_type_list instanceof \think\Paginator): $i = 0; $__LIST__ = $room_type_list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$lists): $mod = ($i % 2 );++$i;?>
                                <option value="<?php echo htmlentities($lists['id']); ?>" <?php if($lists['id']== $type): ?> echo selected="selected" <?php endif; ?>><?php echo htmlentities($lists['room_mode']); ?></option>
                                <?php endforeach; endif; else: echo "" ;endif; ?>
                                <?php endif; ?>
                            </select>
                            &#12288
                            <input class="form-control input-outline" type="text"
                                   oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                                   placeholder="请输入房间Id" value="<?php echo htmlentities($room_id); ?>" id="room_id">
                            &#12288
                            <input class="form-control input-outline" type="text"
                                   oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                                   placeholder="请输入用户ID" value="<?php echo htmlentities($user_id); ?>" id="user_id">
                            &#12288
                            <button type="button" class="btn btn-outline btn-success" style="float:right;" id="pretty_room_id">
                                <i aria-hidden="true"></i>房间靓号
                            </button>
                            <button type="button" class="btn btn-outline btn-success" style="float:right;" id="search">
                                <i aria-hidden="true"></i>搜索
                            </button>

                        </div>
                        <div class="example">
                            <table class="table table-hover table-responsive" id="data_table">
                                <thead>
                                <tr>
                                    <th class="text-center">房间Id</th>
                                    <th class="text-center">公会ID</th>
                                    <th class="text-center">房间靓号</th>
                                    <th class="text-center">房主Id</th>
                                    <th class="text-center">房间密码</th>
                                    <th class="text-center">房间名称</th>
                                    <th class="text-center">C端房间类型</th>
                                    <th class="text-center">背景图</th>
                                    <th class="text-center">人气值</th>
                                    <th class="text-center">手动热度值</th>
                                    <th class="text-center">是否推荐</th>
                                    <th class="text-center">首页是否展示</th>
                                    <th class="text-center" width="20%">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php if(!empty($list)): if(is_array($list) || $list instanceof \think\Collection || $list instanceof \think\Paginator): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$lists): $mod = ($i % 2 );++$i;?>
                                <tr>
                                    <td class="text-center rooms_id" id="rooms_id"><?php echo htmlentities($lists['id']); ?></td>
                                    <td class="text-center guild_id"><?php echo htmlentities($lists['guild_id']); ?></td>
                                    <td class="text-center " ><?php echo htmlentities($lists['pretty_room_id']); ?></td>
                                    <td class="text-center"
                                        onclick=on_user_item("<?php echo htmlentities($lists['user_id']); ?>",'/admin/memberItem')><?php echo htmlentities($lists['user_id']); ?>
                                    </td>
                                    <td class="text-center room_password"><?php echo htmlentities($lists['room_password']); ?></td>
                                    <td class="text-center room_name"><?php echo htmlentities($lists['room_name']); ?></td>
                                    <td class="text-center exit-roomType" value="<?php echo htmlentities($lists['room_type_id']); ?>">
                                        <?php echo htmlentities($lists['room_type']); ?>
                                    </td>
                                    <td class="text-center"><img src="<?php echo htmlentities($lists['background_image']); ?>" style="width: 50px;"></td>
                                    <input type="hidden" value="<?php echo htmlentities($lists['channel_id']); ?>" name="channel_id">
                                    <input type="hidden" class="text-center guild_id" name = "guild_id" value="<?php echo htmlentities($lists['guild_id']); ?>">
                                    <td class="text-center"><?php echo htmlentities($lists['visitor_users']); ?></td>
                                    <td class="text-center"><?php echo htmlentities($lists['visitor_externnumber']); ?></td>
                                    <td style="width: 20px;" class="text-center is_hot" value="<?php echo htmlentities($lists['hot_status']); ?>"><?php echo htmlentities($lists['is_hot']); ?></td>
                                    <td style="width: 20px;" class="text-center is_show" value="<?php echo htmlentities($lists['is_show']); ?>"><?php if($lists['is_show'] == 1): ?> 展示 <?php else: ?> 不展示 <?php endif; ?></td>
                                  <td class="text-center">
                                      <?php if(in_array('/admin/roomHideList',$user_role_menu)): ?>
                                      <button class="btn btn-primary J_menuItem" href="/admin/roomHideList?master_url=/admin/roomHideList&token=<?php echo htmlentities($token); ?>&room_id=<?php echo htmlentities($lists['id']); ?>" title="房间设置隐藏">房间隐藏</button>
                                      <?php endif; if(in_array('/admin/addRoomParty',$user_role_menu)): ?>
                                        <button class="btn btn-success room_channel">加入派对</button>
                                        <?php endif; if(in_array('/admin/vsitorExternnumberLists',$user_role_menu)): ?>
                                        <button class="btn btn-success visitor_externnumber">热度值设置</button>
                                        <?php endif; ?>
                                        <br>
                                        <?php if(in_array('/admin/editRoom',$user_role_menu)): ?>
                                        <button class="btn btn-success room_edit" tagid="<?php echo htmlentities($lists['tag_id']); ?>">编辑</button>
                                        <?php endif; if(in_array('/admin/roomOssFile',$user_role_menu)): ?>
                                        <button class="btn btn-success addGiftImage" id="ossFile">编辑背景图</button>
                                        <?php endif; if(in_array('/admin/roomBackgroundChoice',$user_role_menu)): ?>
                                        <button class="btn btn-primary"><a href="<?php echo htmlentities($admin_url); ?>/roomBackgroundChoice?master_url=/admin/roomBackgroundChoice&token=<?php echo htmlentities($token); ?>&master_url=/admin/roomBackgroundChoice&page=1&room_id=<?php echo htmlentities($lists['id']); ?>">房间背景选择</a></button>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                                <?php endforeach; endif; else: echo "" ;endif; else: ?>
                                <tr class="no-records-found">
                                    <td colspan="7" class="text-center">没有找到匹配的记录</td>
                                </tr>
                                <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <?php if($page['total_page'] > 1): ?>
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
<!--查看热度值列表-->
<div class="modal fade" id="selectVsitorExternnumber">
    <div class="modal-dialog" style="width:80%">
        <div class="modal-content">
            <div class="modal-header">
                <h3>房间热度</h3>
            </div>
            <div class="pull-right search form-inline" style="padding-right: 1%">

            </div>
            <?php if(in_array('/admin/addRoomVisitorExternnumber',$user_role_menu)): ?>
            <div class="btn-group hidden-xs" role="group" style="padding-left: 1%">
                <button type="button" class="btn btn-outline btn-success" id="addRoomVisitorExternnumber">
                    <i class="glyphicon glyphicon-plus" aria-hidden="true"></i>新增热度
                </button>
            </div>
            <?php endif; ?>
            <table class="table table-hover table-responsive" id="select_forum_reply_table">
                <thead>
                <tr>
                    <th class="text-center">热度Id</th>
                    <th class="text-center">房间Id</th>
                    <th class="text-center">热度值</th>
                    <th class="text-center">创建人</th>
                    <th class="text-center">状态</th>
                    <th class="text-center">开始时间</th>
                    <th class="text-center">结束时间</th>
                    <th class="text-center">操作</th>
                </tr>
                </thead>
                <tbody id="a_tbody">

                </tbody>
            </table>
        </div>
    </div>
</div>
<!--添加热度值-->
<div class="modal fade" id="add_visitor_externnumber" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">手动设置热度值</h4>
            </div>
            <div class="modal-body" style="text-align: center">
                <label class="control-label">热度值生效时间范围:</label>
                <div class="form-group">
                    <input type="text" id="datetimeStart" readonly class="form_datetime"> --
                    <input type="text" id="datetimeEnd" readonly class="form_datetime">
                </div>
                <div class="form-group">
                    <label class="control-label">热度值:</label>
                    <input type="text" class="form-control" name='visitor_externnumber' id="visitor_externnumber_val">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="visitor_externnumber_modal()">保存</button>
            </div>
        </div>
    </div>
</div>
<!--编辑热度值-->
<div class="modal fade" id="edit_visitor_externnumber" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">手动修改热度值</h4>
            </div>
            <div class="modal-body" style="text-align: center">
                <label class="control-label">热度值生效时间范围:</label>
                <div class="form-group">
                    <input type="text" id="editstart" readonly class="form_datetime">
                    <input type="text" id="editend" readonly class="form_datetime">
                </div>
                <div class="form-group">
                    <label class="control-label">热度值:</label>
                    <input type="text" class="form-control" name='visitor_externnumber'
                           oninput="this.value = this.value.replace(/[^0-9]/g, '');" id="edit_visitor_externnumber_val">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="edit_visitor_externnumber_modal()">保存</button>
            </div>
        </div>
    </div>
</div>
<!--外联渠道(加入派对)-->
<div class="modal fade" id="room_channel_modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">加入派对</h4>
            </div>
            <div class="modal-body" style="text-align: center">
                <hr>
                <div class="form-group">
                    <?php if(!empty($party_room_type)): if(is_array($party_room_type) || $party_room_type instanceof \think\Collection || $party_room_type instanceof \think\Paginator): $i = 0; $__LIST__ = $party_room_type;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$data): $mod = ($i % 2 );++$i;?>
                    <input type="radio" value="<?php echo htmlentities($data['id']); ?>" name="checkbox_id" class="checkbox<?php echo htmlentities($data['id']); ?>">&nbsp;<?php echo htmlentities($data['room_mode']); ?>
                    &nbsp;
                    <?php endforeach; endif; else: echo "" ;endif; ?>
                    <?php endif; ?>
                </div>
                <div class="form-group">
                    <label class="control-label">加入公会ID:</label>
                    <input type="text" class="form-control" name='guild_id'
                           oninput="this.value = this.value.replace(/[^0-9]/g, '');" id="guild_id_val">
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <!--<button type="button" class="btn btn-primary" onclick="edit_channel()">保存</button>-->
                <button type="button" class="btn btn-primary" onclick="add_party_room()">保存</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="pretty_room_id_modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">设置房间靓号</h4>
            </div>
            <div class="modal-body" style="text-align: center">
                <div class="form-group">
                    房间ID:
                    <input type="text" class="form-control" name='guild_id' oninput="this.value = this.value.replace(/[^0-9]/g, '');" id="roomId">
                </div>
                <div class="form-group">
                    靓号:
                    <input type="text" class="form-control" name='guild_id' oninput="this.value = this.value.replace(/[^0-9]/g, '');" id="pretty_room_id_val">
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <!--<button type="button" class="btn btn-primary" onclick="edit_channel()">保存</button>-->
                <button type="button" class="btn btn-primary" onclick="add_room_pretty()">保存</button>
            </div>
        </div>
    </div>
</div>


<!--删除手动热度值-->
<div class="modal fade" id="del_v_e">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>删除操作</h3>
            </div>
            <div class="modal-body" style="text-align: center">
                <i class="fa fa-trash-o" id="del_v_e_msg"></i>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">关闭</button>
                <button class="btn btn-danger" data-btn-danger="modal" onclick="del_v_e_op()">确认</button>
            </div>
        </div>
    </div>
</div>

<!--修改房间信息-->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="editModalLabel">编辑房间信息</h4>
            </div>
            <div class="modal-body edit-append">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="edit_room_ok()">保存</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="uploadFileModal" tabindex="-1" role="dialog" aria-labelledby="uploadFileModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="upload-file-name">背景图片编辑</h4>
            </div>
            <div class="modal-body">
                <form id='uploads_files' method="post" enctype="multipart/form-data">
                    <input type="hidden" id="saveRoomId" value="">
                    <div class="form-group">
                        <label class="control-label">房间背景图[PNG]</label>
                        <input type="file" class="form-control background_image" name="avatar" id="background_image"  value="" required>
                    </div>
                    <div class='form-group'>
                    <label class='control-label'>赋予时间:</label>
                    <label class='radio-inline'>
                        <input type='radio' name='failure_time' checked value='3'> 三个月
                        </label>
                    <label class='radio-inline'>
                        <input type='radio' name='failure_time' value='6'> 六个月
                        </label>
                    <label class='radio-inline'>
                        <input type='radio' name='failure_time' value='8'> 八个月
                        </label>
                    <label class='radio-inline'>
                        <input type='radio' name='failure_time' value='12'> 一年
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="add_imgs()">保存</button>
            </div>
        </div>
    </div>
</div>

<style>
    table {
        table-layout: fixed;
    }

    td {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .modal-header h3{
        float: left;
        margin-right: 20px;
        float: left;
        margin-right: 20px;
        line-height: 36px;
        padding: 0 10px;
    }
    .equipmentList li{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80px;
        margin-left: 10px;
        position: relative;
    }
    .equipmentList li img{
        margin: 10px 0;
        width: 73px;
        height: 78px;
    }
    .equipmentList{
        display: flex;
        flex-wrap: wrap;
        padding: 0 20px;
    }
    .change_action{
        background: #1c84c6;
        color: #ffffff;
        border-radius: 5px;
    }
    .equipmentDetails{
        width: 300px;
        height: 170px;
        background: #ffffff;
        position: absolute;
        top: 0px;
        left: 0px;
        padding: 0 10px;
        z-index: 999;
        box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
    }
    .equipmentDetails_title{margin-top: 10px;margin-left: 10px}
    .equipmentDetails_title p{
        margin-bottom: 5px;
    }

</style>
<!--个人信息-->
<div class="modal fade" id="user_item">
    <div class="modal-dialog" style="width:55%">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="userInfoBtn change_action">个人信息</h3>
                <h3 class="loginUserInfo ">最后登录信息</h3>
                <h3 class="equipmentManagement">装备管理</h3>
            </div>
            <div class="common-user-info-box">
                <div class="common-box-top">
                    <!-- 左侧 -->
                    <div class="common-box-top-left">
                        <div class="common-user-img">
                            <img class="common-user-image avatar" src="" alt="">
                        </div>
                        <button class="common-botton-btn ban-user blacks" style="display: none;">封禁</button>
                        <button class="common-botton-btn ban-user unsealings" style="display: none;">解封</button>
<!--                        <button class="common-botton-btn ban-user threeblacks" style="display: none;">三封</button>-->
<!--                        <button class="common-botton-btn ban-user undothree1" style="display: none;">解三封</button>-->
                        <button class="common-botton-btn historydongtai-record">历史动态</button>
                        <button class="common-botton-btn receiving-giftdongtai"><span style="text-decoration:underline;" href="" class="J_menuItem" title="收礼记录">收礼记录</span></button>
                        <button class="common-botton-btn giving-gift"><span style="text-decoration:underline;" href=""  class="J_menuItem" title="送礼记录">送礼记录</span></button>
                        <button class="common-botton-btn entry-records">登录记录</button>
                        <button class="common-botton-btn forbid-records">封禁记录</button>
                        <button class="common-botton-btn clear-attention">清空实名</button>
                    </div>
                    <!-- 右侧 -->
                    <div class="common-box-top-right">
                        <div class="commom-right-top-box">
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">ID：</label>
                                <div class="commontop-right-list-divv id">&nbsp;</div>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">靓号：</label>
                                <div class="commontop-right-list-divv pretty_id">&nbsp;</div>
                                <button class="common-botton-btn-exit exit-pretty">修改</button>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">昵称：</label>
                                <div class="commontop-right-list-divv nickname">&nbsp;</div>
                                <button class="common-botton-btn-exit exit-nickname">修改</button>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">手机号：</label>
                                <div class="commontop-right-list-divv username">&nbsp;</div>
                                <button class="common-botton-btn-exit exit-phone">修改</button>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">个性签名：</label>
                                <div class="commontop-right-list-divv intro">&nbsp;</div>
                                <button class="common-botton-btn-exit exit-intro">修改</button>
                            </div>
                            <!--<div class="commontop-right-list">
                                <label class="commontop-right-list-labell">头像框：</label>
                                <div class="commontop-right-list-divv pretty_avatar">&nbsp;</div>
                                <br><br>
                                <button class="common-botton-btn-exit exit-pretty-avatar">地址修改</button>
                            </div>-->
                            <!--<div class="commontop-right-list">
                                <label class="commontop-right-list-labell">修改头像：</label>
                                <div class="commontop-right-list-divv avatar">&nbsp;</div>
                                <form id='uploads_files' method="post" enctype="multipart/form-data">
                                    <input type="hidden" id="gifts_id" value="">
                                    <div classss="form-group" class="commontop-right-list-divv"  >
                                        <input type="file" class="form-control gift_image" name="avatar" id="avatar"  value=""  required>
                                    </div>
                                </form>
                                <button type="button" class="common-botton-btn-exit exit-avatar" onclick="add_imgs()">修改</button>
                                <button type="button" class="common-botton-btn-exit exit-avatar">修改</button>-->
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">性别：</label>
                                <div class="commontop-right-list-labell sex">&nbsp;</div>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">最后登录时间：</label>
                                <div class="commontop-right-list-labell login_time">&nbsp;</div>
                            </div>

                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">最后离线时间：</label>
                            <div class="commontop-right-list-labell leavetime"></div>
                        </div>

                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">注册时间：</label>
                                <div class="commontop-right-list-divv register_time">&nbsp;</div>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">IP地址：</label>
                                <div class="commontop-right-list-divv login_ip">&nbsp;</div>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">注册设备唯一标识：</label>
                                <div class="commontop-right-list-divv imei">&nbsp;</div>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">注册设备id：</label>
                                <div class="commontop-right-list-divv deviceid">&nbsp;</div>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">所属工会：</label>
                                <div class="commontop-right-list-divv guild">&nbsp;</div>
                            </div>
							<div class="commontop-right-list">
                                <label class="commontop-right-list-labell">邀请码：</label>
                                <div class="commontop-right-list-divv  invitcode">&nbsp;</div>
                            </div>
                        </div>
                        <div class="common-right-bottom-box">
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell" style="color:#F06E57;">钱包</label>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">M豆豆：</label>
                                <div class="commontop-right-list-divv coin">&nbsp;</div>
                                <button class="common-botton-btn user-pay" style="background: #ed5565;">充值</button>
                                <button class="common-botton-btn user-pay-list" style="background: #1c84c6;">充值记录</button>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">游戏积分：</label>
                                <div class="commontop-right-list-divv">&nbsp;</div>
                                <button class="common-botton-btn user-score" style="background: #ed5565;">添加</button>
                                <!-- <button class="common-botton-btn user-score-list" style="background: #1c84c6;">添加记录</button> -->
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">钻石：</label>
                                <div class="commontop-right-list-divv diamond">&nbsp;</div>
                                <button class="common-botton-btn user-diamond-add-list" style="background: #ed5565;">添加</button>
                                <button class="common-botton-btn user-diamond-lessent-list" style="background: #ed5565;">减少</button>
                            </div>
                            <div class="commontop-right-list">
                                <label class="commontop-right-list-labell">金币：</label>
                                <div class="commontop-right-list-divv gold_coin">0</div>
                                <button class="common-botton-btn user-gold" style="background: #ed5565;">充值</button>
                            </div>
                        </div>
                    </div>
                </div>

            <div class="equipment-management-box" style="display: none">
                <div style="position: relative">
                    <ul class="equipmentList" id="equipmentLists">
                        <!--头像框-->

                        <!--                        <li>-->
                        <!--                            <img width="80px" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1107263072,1224997471&fm=26&gp=0.jpg" alt="">-->
                        <!--                            <button class="btn btn-default Details_btn">查看详情</button>-->
                        <!--                            &lt;!&ndash;详情框&ndash;&gt;-->
                        <!--                            <div class="equipmentDetails0">-->
                        <!--                                <div style="display: flex;width: 80%;margin-top: 10px;justify-content: space-between">-->
                        <!--                                    <img width="80px" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1107263072,1224997471&fm=26&gp=0.jpg" alt="">-->
                        <!--                                    <div class="equipmentDetails_title">-->
                        <!--                                        <p>获得渠道</p>-->
                        <!--                                        <p>获得时间</p>-->
                        <!--                                        <p>价值</p>-->
                        <!--                                        <p>有效期</p>-->
                        <!--                                    </div>-->
                        <!--                                </div>-->
                        <!--                                <div style="display: flex;justify-content: space-between">-->
                        <!--                                        <button style="border: none" class="btn-danger">删除</button>-->
                        <!--                                        <button style="border: none" class="btn-primary">佩戴</button>-->
                        <!--                                        <button style="border: none" class="btn-primary">放入背包</button>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                        </li>-->

                    </ul>
                    <button style="display:block;margin: 0 auto;margin-bottom: 30px;border:none;padding:5px 15px;background: #1c84c6" class="btn-primary give_pack_list">赠送装备</button>
                </div>
            </div>

            <div class="modal-footer  login-info-box" style="display: none">
                <div class="common-box-top">
                    <!-- 左侧 -->
                    <div class="common-box-top-left">
                        <div class="common-user-img">
                            <img class="common-user-image avatar" src="" alt="">
                        </div>

                    </div>
                    <!-- 右侧 -->
                    <div class="common-box-top-right">
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">用户id：</label>
                            <div class="commontop-right-list-divv div-user_id" >&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">登录ip：</label>
                            <div class="commontop-right-list-divv div-login_ip">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">登录渠道：</label>
                            <div class="commontop-right-list-divv div-channel">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">登录设备：</label>
                            <div class="commontop-right-list-divv div-device">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">登录设备id：</label>
                            <div class="commontop-right-list-divv div-deviceid">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">登录设备系统版本：</label>
                            <div class="commontop-right-list-divv div-platform">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">登录版本号：</label>
                            <div class="commontop-right-list-divv div-version">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">imei：</label>
                            <div class="commontop-right-list-divv div-imei">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">idfa：</label>
                            <div class="commontop-right-list-divv div-idfa">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">登录app标识：</label>
                            <div class="commontop-right-list-divv div-appid">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">登录app来源：</label>
                            <div class="commontop-right-list-divv div-source">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">登录模拟器信息：</label>
                            <div class="commontop-right-list-divv div-simulator_info">&nbsp;</div>
                        </div>
                        <div class="commontop-right-list">
                            <label class="commontop-right-list-labell">更新时间：</label>
                            <div class="commontop-right-list-divv div-update_time">&nbsp;</div>
                        </div>

                    </div>
                    <div class="common-right-bottom-box">

                    </div>
                </div>
            </div>

                <div class="modal-footer">
                    <button class="btn btn-default" data-dismiss="modal">关闭</button>
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
            <br>
            <div class="modal-body" style="text-align:left">
                <textarea cols = "50" maxlength="100" placeholder="（必填）请输入理由" id="desc"></textarea>
<!--                <button class="btn btn-outline btn-success del_black" type="button" value="1800">-->
<!--                    <i class="fa fa-trash-o"></i>-->
<!--                    封禁30分钟-->
<!--                </button>-->
<!--                <button class="btn btn-outline btn-primary del_black" type="button" value="7200">-->
<!--                    <i class="fa fa-trash-o"></i>-->
<!--                    封禁2小时-->
<!--                </button>-->
<!--                <button class="btn btn-outline btn-danger del_black" type="button" value="21600">-->
<!--                    <i class="fa fa-trash-o"></i>-->
<!--                    封禁6小时-->
<!--                </button>-->
<!--                <button class="btn btn-outline btn-success del_black" type="button" value="43200">-->
<!--                    <i class="fa fa-trash-o"></i>-->
<!--                    封禁12小时-->
<!--                </button>-->
<!--                <button class="btn btn-outline btn-danger del_black" type="button" value="86400">-->
<!--                    <i class="fa fa-trash-o"></i>-->
<!--                    封禁24小时-->
<!--                </button>-->

<!--                <button class="btn btn-outline btn-success del_black" type="button" value="259200">-->
<!--                    <i class="fa fa-trash-o"></i>-->
<!--                    封禁3天-->
<!--                </button>-->

<!--                <button class="btn btn-outline btn-danger del_black" type="button" value="604800">-->
<!--                    <i class="fa fa-trash-o"></i>-->
<!--                    封禁7天-->
<!--                </button>-->


<!--                <button class="btn btn-outline btn-success del_black" type="button"  value="2592000">-->
<!--                    <i class="fa fa-trash-o"></i>-->
<!--                    封禁30天-->
<!--                </button>-->

<!--                <button class="btn btn-outline btn-danger del_black" type="button" value="永久">-->
<!--                    <i class="fa fa-trash-o"></i>-->
<!--                    永久封禁-->
<!--                </button>-->
                <select class="form-control del_black" id="head_frame" style="width:200px;">
                    <option value="1800">==选择封禁时长==</option>
                    <option value="1800">封禁30分钟</option>
                    <option value="7200">封禁2小时</option>
                    <option value="21600">封禁6小时</option>
                    <option value="43200">封禁12小时</option>
                    <option value="86400">封禁24小时</option>
                    <option value="259200">封禁3天</option>
                    <option value="604800">封禁7天</option>
                    <option value="2592000">封禁30天</option>
                    <option value="-1">永久封禁</option>
                </select>
            </div>

            <div class="modal-footer">
                <button class="btn btn-info" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<!--封禁确认-->
<div class="modal fade" id="is_ok">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>封禁确认</h3>
            </div>
            <div class="modal-body" style="text-align: center">
                <i class="fa fa-trash-o" id="is_ok_msg"></i>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">关闭</button>
                <button class="btn btn-danger" data-btn-danger="modal" onclick="is_ok_black()">确认</button>
            </div>
        </div>
    </div>
</div>




<div class="modal fade" id="operations1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>你要如何操作呢？</h3>
            </div>
            <br>
            <div style="text-align: center">
                <textarea cols = "50" maxlength="100" placeholder="（必填）请输入理由" id="reason"></textarea>
            </div>
            <div class="modal-footer">
                <button class="btn btn-info" data-dismiss="modal">关闭</button>
                <button class="btn btn-danger" data-btn-danger="modal" onclick="is_ok_black3()">确认</button>
            </div>
        </div>
    </div>
</div>


<!--解封-->
<div class="modal fade" id="del_unsealings">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>解封操作</h3>
            </div>
            <div class="modal-body" style="text-align: center">
                <i class="fa fa-trash-o" id="unsealings_msg"></i>
            </div>
            <div style="text-align: center">
                <textarea cols = "50" maxlength="100" placeholder="（必填）请输入理由" id="descs"></textarea>
            </div>
            <br>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">关闭</button>
                <button class="btn btn-danger" data-btn-danger="modal" onclick="del_unsealings()">确认</button>
            </div>
        </div>
    </div>
</div>

<!--解三封-->
<div class="modal fade" id="undothree">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>解封操作</h3>
            </div>
            <div class="modal-body" style="text-align: center">
                <i class="fa fa-trash-o" id="undothree_msg"></i>
            </div>
            <br>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">关闭</button>
                <button class="btn btn-danger" data-btn-danger="modal" onclick="undothree()">确认</button>
            </div>
        </div>
    </div>
</div>


<!--修改用户信息-->
<div class="modal fade" id="edit_member">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>修改用户信息</h3>
            </div>
            <br>
            <div class="form-group" style="text-align: center">
                <label class="control-label edit_member_msg"></label>
               <!-- <form id='uploads_files' method="post" enctype="multipart/form-data">
                    <input type="hidden" id="gifts_id" value="">
                    <div classss="form-group" class="commontop-right-list-divv"  >
                        <input type="file" class="form-control gift_image" name="avatar" id="avatar"  value=""  required>
                    </div>
                </form>-->
                <input type="text"  id="member_val" >
                <input type="hidden" id="old_val">
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">关闭</button>
                <button class="btn btn-danger" data-btn-danger="modal" onclick="edit_member_ok()">确认</button>
            </div>
        </div>
    </div>
</div>

<!--修改用户头像信息-->
<div class="modal fade" id="edit_avatar">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>修改用户信息</h3>
            </div>
            <br>
            <div class="form-group" style="text-align: center">
                <label class="control-label edit_member_msg"></label>
                <input type="text"  id="member_val" >
                <input type="hidden" id="old_val">
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">关闭</button>
                <button class="btn btn-danger" data-btn-danger="modal" onclick="edit_member_ok()">确认</button>
            </div>
        </div>
    </div>
</div>

<!--清除用户实名信息-->
<div class="modal fade" id="edit_member_attention">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>清除用户实名信息</h3>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">关闭</button>
                <button class="btn btn-danger" data-btn-danger="modal" onclick="edit_member_attention()">确认</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="historical_dynamics">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3>历史动态</h3>
            </div>
            <table class="table table-hover table-responsive" id="historical_dynamics_table" style="table-layout: auto;">
                <thead>
                <tr>
                    <th class="text-center">Id</th>
                    <th class="text-center">昵称</th>
                    <th class="text-center">用户Id</th>
                    <th class="text-center">内容</th>
                    <th class="text-center">图片</th>
                    <th class="text-center">语音</th>
                </tr>
                </thead>
                <tbody id="historical_dynamics_tbody">

                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" id="coin_detail_receiving">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3 >送礼列表</h3>
            </div>
            <table class="table table-hover table-responsive" id="coin_detail_receiving_table" style="table-layout: auto;">
                <thead>
                <tr>
                    <th class="text-center">Id</th>
                    <th class="text-center">送礼房间Id</th>
                    <th class="text-center">送礼类型</th>
                    <th class="text-center">送礼人Id</th>
                    <th class="text-center">礼物Id</th>
                    <th class="text-center">礼物数量</th>
                    <th class="text-center">礼物名称</th>
                    <th class="text-center">送礼时间</th>
                </tr>
                </thead>
                <tbody id="coin_detail_receiving_tbody">

                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" id="coin_detail_giving">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3 >收礼列表</h3>
            </div>
            <table class="table table-hover table-responsive" id="coin_detail_giving_table">
                <thead>
                <tr>
                    <th class="text-center">Id</th>
                    <th class="text-center">收礼房间Id</th>
                    <th class="text-center">收礼类型</th>
                    <th class="text-center">送礼人Id</th>
                    <th class="text-center">礼物Id</th>
                    <th class="text-center">礼物数量</th>
                    <th class="text-center">礼物名称</th>
                    <th class="text-center">收礼时间</th>
                </tr>
                </thead>
                <tbody id="coin_detail_giving_tbody">

                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="modal fade" id="use_pay">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3>充值</h3>
            </div>

            <div class="btn-group  form-inline user_pay_div" style="width: 50%">
                　
                <input class="form-control input-outline" type="text" oninput="this.value = this.value.replace(/[^(\-)0-9]/g, '');" placeholder="请输入充值金额" value="" id="use_pay_money" required="required">
                <input class="form-control input-outline" type="text" placeholder="请输入充值备注" value="" id="use_pay_desc"  style="width: 55%" required="required">
                　
                <button type="button" class="btn btn-outline btn-success" style="float:right;" id="user_pay_add">
                    <i aria-hidden="true"></i>添加
                </button>
            </div>


           <table class="table table-hover table-responsive" id="use_pay_table">
               <thead>
               <tr>
                   <th class="text-center">Id</th>
                   <th class="text-center">充值金额</th>
                   <th class="text-center">充值理由</th>
                   <th class="text-center">充值时间</th>
                   <th class="text-center">+/-</th>
                   <th class="text-center">操作人</th>
               </tr>
               </thead>
               <tbody id="use_pay_tbody">

               </tbody>
           </table>
        </div>
    </div>
</div>

<div class="modal fade" id="user_score">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3>游戏积分</h3>
            </div>

            <div class="btn-group  form-inline user_score_div" style="width: 50%">
                　
                <input class="form-control input-outline" type="text" oninput="this.value = this.value.replace(/[^(\-)0-9]/g, '');" placeholder="请输入积分数量" value="" id="user_score_money" required="required">
                <input class="form-control input-outline" type="text" placeholder="请输入备注" value="" id="user_score_desc"  style="width: 55%" required="required">
                　
                <button type="button" class="btn btn-outline btn-success" style="float:right;" id="user_score_add">
                    <i aria-hidden="true"></i>添加
                </button>
            </div>


           <table class="table table-hover table-responsive" id="user_score_table">
               <thead>
               <tr>
                   <th class="text-center">Id</th>
                   <th class="text-center">积分数量</th>
                   <th class="text-center">添加理由</th>
                   <th class="text-center">添加时间</th>
                   <th class="text-center">+/-</th>
                   <th class="text-center">操作人</th>
               </tr>
               </thead>
               <tbody id="user_score_tbody">

               </tbody>
           </table>
        </div>
    </div>
</div>

<div class="modal fade" id="use_gold">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3>充值</h3>
            </div>

            <div class="btn-group  form-inline user_gold_div" style="width: 50%">
                　
                <input class="form-control input-outline" type="text" oninput="this.value = this.value.replace(/[^(\-)0-9]/g, '');" placeholder="请输入充值金额" value="" id="use_gold_money" required="required">
                <input class="form-control input-outline" type="text" placeholder="请输入充值备注" value="" id="use_gold_desc"  style="width: 55%" required="required">
                　
                <button type="button" class="btn btn-outline btn-success" style="float:right;" id="user_gold_add">
                    <i aria-hidden="true"></i>添加
                </button>
            </div>


           <table class="table table-hover table-responsive" id="use_gold_table">
               <thead>
               <tr>
                   <th class="text-center">Id</th>
                   <th class="text-center">充值金额</th>
                   <th class="text-center">充值理由</th>
                   <th class="text-center">充值时间</th>
                   <th class="text-center">+/-</th>
                   <th class="text-center">操作人</th>
               </tr>
               </thead>
               <tbody id="use_gold_tbody">

               </tbody>
           </table>
        </div>
    </div>
</div>


<div class="modal fade" id="use_pay_list">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3>充值</h3>
            </div>


            <table class="table table-hover table-responsive" id="use_pay_list_table">
                <thead>
                <tr>
                    <th class="text-center">Id</th>
                    <th class="text-center">平台</th>
                    <th class="text-center">金额</th>
                    <th class="text-center">充值时间</th>
                </tr>
                </thead>
                <tbody id="use_pay_list_tbody">

                </tbody>
            </table>
        </div>
    </div>
</div>



<div class="modal fade" id="user_diamond">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3>充值</h3>
            </div>

            <div class="btn-group  form-inline user_diamond_div" style="width: 50%">
                　
                <input class="form-control input-outline" type="text" oninput="" placeholder="请输入金额" value="" id="user_diamond_money">
                <input class="form-control input-outline" type="text" placeholder="请输入充值备注" value="" id="user_diamond_desc"  style="width: 55%">
                　
                <button type="button" class="btn btn-outline btn-success" style="float:right;" id="user_diamond_add">
                    <i aria-hidden="true"></i>添加
                </button>
            </div>


           <table class="table table-hover table-responsive" id="user_diamond_add_table">
               <thead>
               <tr>
                   <th class="text-center">Id</th>
                   <th class="text-center">充值金额</th>
                   <th class="text-center">充值理由</th>
                   <th class="text-center">充值时间</th>
                   <th class="text-center">+/-</th>
                   <th class="text-center">操作人</th>
               </tr>
               </thead>
               <tbody id="user_diamond_tbody">

               </tbody>
           </table>
        </div>
    </div>
</div>
<!--用户删除装备-->
<div class="modal fade" id="del_pack_model">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>删除装备</h3>
            </div>
            <div class="modal-body" style="text-align: center">
                <i class="fa fa-trash-o" id="del_pack_model_msg"></i>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">关闭</button>
                <button class="btn btn-danger" data-btn-danger="modal" onclick="del_pack_model_on()">确认</button>
            </div>
        </div>
    </div>
</div>
<!--用户佩戴装备-->
<div class="modal fade" id="adorn_pack_model">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3>佩戴装备</h3>
            </div>
            <div class="modal-body" style="text-align: center">
                <i class="glyphicon glyphicon-open" id="adorn_pack_model_msg"></i>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default" data-dismiss="modal">关闭</button>
                <button class="btn btn-danger" data-btn-danger="modal" onclick="adorn_pack_model_on()">确认</button>
            </div>
        </div>
    </div>
</div>

<!--用户登录记录列表-->
<div class="modal fade" id="login_detail_receiving">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3 >登录记录</h3>
            </div>
            <table class="table table-hover table-responsive" id="login_detail_receiving_table" style="table-layout: auto;">
                <thead>
                <tr>
                    <th class="text-center">Id</th>
                    <th class="text-center">登录ip</th>
                    <th class="text-center">设备标识</th>
                    <th class="text-center">设备id</th>
                    <th class="text-center">渠道</th>
                    <th class="text-center">登录时间</th>
                </tr>
                </thead>
                <tbody id="login_detail_receiving_tbody">

                </tbody>
            </table>
        </div>
    </div>
</div>

<!--用户封禁记录列表-->
<div class="modal fade" id="forbid_detail">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3>封禁记录</h3>
            </div>
            <table class="table table-hover table-responsive" id="forbid_detail_table" style="table-layout: auto;">
                <thead>
                <tr>
                    <th class="text-center">用户id</th>
                    <th class="text-center">类型</th>
                    <th class="text-center">封禁时长</th>
                    <th class="text-center">封禁原因</th>
                    <th class="text-center">操作日期</th>
                    <th class="text-center">操作人</th>
                </tr>
                </thead>
                <tbody id="forbid_detail_tbody">

                </tbody>
            </table>
        </div>
    </div>
</div>

<!--管理员赠送用户装备列表-->
<div class="modal fade" id="give_gift">
    <div class="modal-dialog" style="width:70%">
        <div class="modal-content">
            <div class="modal-header">
                <h3>赠送装备</h3>
            </div>
            <div class="btn-group  form-inline user_pay_div" style="width: 80%">
                <input class="form-control input-outline" type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '');" placeholder="请输入赠送礼物ID" value="" id="give_gift_id">
                <input class="form-control input-outline" type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '');" placeholder="请输入赠送时间(天)0为永久有效" value="" id="give_gift_time">
                <input class="form-control input-outline"  type="text" placeholder="请输入赠送事由" value="" id="give_gift_desc"  style="width: 30%">
                <button type="button" class="btn btn-outline btn-success" style="float:right;" id="gift_submit">
                    <i aria-hidden="true"></i>赠送
                </button>
            </div>
            <table class="table table-hover table-responsive" id="give_gift_table">
                <thead>
                <tr>
                    <th class="text-center">序号</th>
                    <th class="text-center">装备ID</th>
                    <th class="text-center">装备价值(单价)</th>
                    <th class="text-center">赠送理由</th>
                    <th class="text-center">赠送时间</th>
                    <th class="text-center">创建时间</th>
                    <th class="text-center">创建人</th>
                </tr>
                </thead>
                <tbody id="give_gift_tbody">

                </tbody>
            </table>
        </div>
    </div>
</div>
<input type="hidden" value="" id="op_id">
<input type="hidden" value="" id="op_time">
<input type="hidden" value="" id="desc_msg">
<input type="hidden" value="" id="reason">
<input type="hidden" value="" id="type_val">
<input type="hidden" value="" id="diamond_type">
<input type="hidden" value="" id="userPackGift">
<input type="hidden" value="" id="ops_id">
<input type="hidden" value="/admin/avatarOssFile" name="master_url" id="master_url">
<!-- 全局js -->
<script src="/admin/js/jquery.min.js?v=2.1.4"></script>
<script src="/admin/js/trap/fileinput.js" type="text/javascript"></script>
<script src="/admin/js/trap/fileinput_locale_zh.js" type="text/javascript"></script>
<script>

    function add_imgs(){
        //if($("#user_id").val() == ""){
            //toastr.warning('未获得用户ID');
            //return false;
        //}
        if($('#avatar')[0].files[0]){
            var gift_imageType = $('#avatar')[0].files[0].name.split('.');
            if(gift_imageType[1] != 'png'){
                toastr.warning('请选择png格式文件');
                return false;
            }
        }
        var formData = new FormData();
        formData.append("id", $("#user_id").val());
        formData.append("token", $("#token").val());
        formData.append("master_url", $("#master_url").val());
        formData.append("avatar", $('#avatar')[0].files[0]);
        $.ajax({
            async: false,    //表示请求是否异步处理
            cache: false,
            processData: false,
            contentType: false,
            type: "post",    //请求类型
            url: "/admin/avatarOssFile",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: formData,
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

	function openNewWindow(url, gift_type) {
		let a = document.createElement("a");
		$(gift_type).append(a);
		a.style = "display: none";
		a.target = "_blank";
		a.href = url;
		a.click();
		$(gift_type).empty();
	}

    $('.giving-gift').on('click',function(){
        var uid = $('#op_id').val();
        var master_url = '/admin/getCoinDetailGivingList'
        var token = $('#token').val();
		// openNewWindow("/admin/getConsumeList?master_url=/admin/getConsumeList&token="+token+"&user_id="+uid + "&event_id=10002",'.giving-gift');

		window.location.href="/admin/getConsumeList?master_url=/admin/getConsumeList&token="+token+"&user_id="+uid + "&event_id=10002" + "&is_show=1";
		return false;
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: '/admin/getCoinDetailGivingList',//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: { master_url: master_url, uid: uid,token: token},
            success: function (rs) {
                if (rs.code == 200) {
                    window.location.href="/admin/userCoin?master_url=/admin/userCoin&token="+rs.token+"&user_id="+rs.uid;
                }
            },

        });
    })
    $('.receiving-giftdongtai').on('click',function(){
        var uid = $('#op_id').val();
        var master_url = '/admin/getCoinDetailReceivingList'
        var token = $('#token').val();
		// openNewWindow("/admin/getConsumeList?master_url=/admin/getConsumeList&token="+token+"&user_id="+uid + "&event_id=10003",'.receiving-giftdongtai');
		window.location.href="/admin/getConsumeList?master_url=/admin/getConsumeList&token="+token+"&user_id="+uid + "&event_id=10003" + "&is_show=1";
		return false;
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: '/admin/getCoinDetailReceivingList',//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: { master_url: master_url, uid: uid,token: token},
            success: function (rs) {
                if (rs.code == 200) {
                    window.location.href="/admin/userGetCoin?master_url=/admin/userGetCoin&token="+rs.token+"&user_id="+uid;
                }
            },

        });
    })
</script>

<input type="hidden" value="<?php echo htmlentities($token); ?>" id="token">
<input type="hidden" value="<?php echo !empty($page['page']) ? htmlentities($page['page']) :  0; ?>" id="page">
<input type="hidden" value="<?php echo !empty($page['total_page']) ? htmlentities($page['total_page']) :  0; ?>" id="total_page">
<input type="hidden" value="" id="to_id">
<input type="hidden" value="" id="to_roomid">
<input type="hidden" value="<?php echo htmlentities($user_role_menu_input); ?>" id="user_role_menu">
<input type="hidden" value="<?php echo htmlentities($roomType); ?>" id="roomType">
<input type="hidden" value="<?php echo htmlentities($channels_id); ?>" id="channels_id">
<!-- 全局js -->
<script src="/admin/js/jquery.min.js?v=2.1.4"></script>
<script src="/admin/js/bootstrap.min.js?v=3.3.6"></script>
<script src="/admin/js/plugins/toastr/toastr.min.js"></script>
<script src="/admin/js/plugins/pagination/bootstrap-paginator.js"></script>
<script src="/admin/js/user-item.js"></script>
<script src="/admin/js/datetimepicker/bootstrap-datetimepicker.js"></script>
<script src="/admin/js/datetimepicker/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="/admin/js/trap/fileinput.js" type="text/javascript"></script>
<script src="/admin/js/trap/fileinput_locale_zh.js" type="text/javascript"></script>
<script>
    $('body').on('hidden.bs.modal', '#editModal', function () {
        $("#editModal form").remove();
    });
    $('body').on('hidden.bs.modal', '#selectVsitorExternnumber', function () {
        $("#a_tbody tr").remove();
    });
    $('body').on('hidden.bs.modal', '#room_channel_modal', function () {
        $("input[name='checkbox_id']").attr("checked", false);
    });
    $('.visitor_externnumber').click(function () {
        //查询当前房间存在的未执行的热度设置
        var id = $(this).parents("tr").find("#rooms_id").text();
        $('#to_id').val(id);
        $('#to_roomid').val(id);
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/vsitorExternnumberLists",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: {
                id: id,
                master_url: '/admin/vsitorExternnumberLists',
                token: $("#token").val(),
                page: 1,
            },
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }
                if (rs.data.length > 0) {
                    $(rs.data).each(function (i, n) {
                        $("#a_tbody").prepend(
                            "<tr class = " + n.id + ">" +
                            "<td class='text-center'>" + n.id + "</td>" +
                            "<td class='text-center'>" + n.room_id + "</td>" +
                            "<td class='text-center' id='visitor_externnumbers'>" + n.visitor_externnumber + "</td>" +
                            "<td class='text-center'>" + n.created_user + "</td>" +
                            "<td class='text-center' id='status_name'>" + n.status_name + "</td>" +
                            "<td class='text-center' id='start_times'>" + n.start_time + "</td>" +
                            "<td class='text-center' id='end_times'>" + n.end_time + "</td>" +
                            "<td class='text-center'>" +
                            "<button class='btn btn-success edit_op' onclick=edit_op(" + n.id + ")>修改</button>" +
                            "<button class='btn btn-danger del_op' onclick=del_op(" + n.id + ")>删除</button>" +
                            "</td>" +
                            "</tr>"
                        );
                        if (n.status == 2) {
                            $('.' + n.id).find(".edit_op").remove();
                        }
                    });
                    var user_role_menu = $("#user_role_menu").val();
                    var user_role_menus = user_role_menu.split(",")
                    var index = $.inArray("/admin/editRoomVisitorExternnumber", user_role_menus);   //结果：index=1
                    if (index <= 0) {
                        $(".edit_op").remove();
                    }
                    var indexs = $.inArray("/admin/delRoomVisitorExternnumber", user_role_menus);   //结果：index=1
                    if (indexs <= 0) {
                        $(".del_op").remove();
                    }

                } else {
                    $("#a_tbody").prepend("<tr class='no-records-found'><td colspan='8' class='text-center'>没有找到匹配的记录</td></tr>");
                }
                $('#selectVsitorExternnumber').modal('show')
            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });
    })

    $('#pageLimit').bootstrapPaginator({
        currentPage: $("#page").val(),
        totalPages: $("#total_page").val(),
        size: "normal",
        bootstrapMajorVersion: 3,
        alignment: "right",
        numberOfPages: '5',
        pageUrl: function (type, page, current) {
            //是每个分页码变成一个超链接
            return '?page=' + page + '&master_url=/admin/roomList&token=' + $("#token").val() + '&id=' + $("#search_id").val() + '&type=' + $("#select_id").val() + '&is_hot='+$("#is_hot").val()+ '&pretty_room_id_select='+$("#pretty_room_id_select").val() + '&is_hide='+$("#is_hide").val()+'&is_block='+$("#is_block").val();
        },
        itemTexts: function (type, page, current) {
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
        /*   onPageClicked:function (event, originalEvent, type, page) {
               location.href = "?page="+page;
           }*/
    });

    $('#search').click(function () {
        var type = $('#select_id').val();
        var room_id = $('#room_id').val();
        var token = $('#token').val();
        var is_hot = $('#is_hot').val();
        var user_id = $('#user_id').val();
        var is_hide = $('#is_hide').val();
        var is_block = $('#is_block').val();
        window.location.href = "/admin/roomList?token=" + token + '&master_url=/admin/roomList&page=1&type=' + type + '&room_id=' + room_id + '&user_id=' + user_id + '&is_hot=' + is_hot+ '&pretty_room_id_select=' + $('#pretty_room_id_select').val() + '&is_hide='+is_hide+'&is_block='+is_block;
    });

    function del_op($id) {
        $("#del_v_e").modal('show');
        $("#to_id").val($id);
        $("#del_v_e_msg").html(' 您确定要删除手动热度值Id：' + $id + ' ? ')
    }

    function del_v_e_op() {
        var id = $("#to_id").val();
        var master_url = '/admin/delRoomVisitorExternnumber';
        var token = $("#token").val();
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/delRoomVisitorExternnumber",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: {
                id: id,
                master_url: master_url,
                token: token,
            },
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }
                toastr.success(rs.msg)
                //删除成功后删除class
                $('#del_v_e').modal('hide')
                $("." + id).remove();
                if ($("#a_tbody > tr").length == 0) {
                    $("#a_tbody").prepend("<tr class='no-records-found'><td colspan='8' class='text-center'>没有找到匹配的记录</td></tr>");
                }
            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });
    }

    function visitor_externnumber_modal() {
        var visitor_externnumber_val = $('#visitor_externnumber_val').val();

        if(visitor_externnumber_val > 1000000){
            toastr.warning('热度值不能超过1000000');
            return false;
        }
        if (isNaN(visitor_externnumber_val)) {
            toastr.warning('热度值必须为数字');
            return false;
        }
        var id = $("#to_roomid").val();
        var start_time = $("#datetimeStart").val();
        var end_time = $("#datetimeEnd").val();
        var master_url = '/admin/addRoomVisitorExternnumber';
        var token = $("#token").val();
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/addRoomVisitorExternnumber",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: {
                id: id,
                master_url: master_url,
                token: token,
                visitor_externnumber: visitor_externnumber_val,
                start_time: start_time,
                end_time: end_time
            },
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }

                toastr.success(rs.msg);
                $(".no-records-found").remove();
                $("#add_visitor_externnumber").modal('hide');
                //成功后 ajax 获取该条数据 写入到 模态框中
                $.ajax({
                    async: false,    //表示请求是否异步处理
                    type: "post",    //请求类型
                    url: "/admin/vsitorExternnumberLists",//请求的 URL地址
                    dataType: "json",//返回的数据类型
                    data: {
                        v_id: rs.data,
                        master_url: master_url,
                        token: token,
                    },
                    success: function (rss) {

                        if (rss.code !== 200) {
                            toastr.warning(rss.msg);
                            return false;
                        }
                        $(rss.data).each(function (i, ns) {
                            $("#a_tbody").prepend("<tr class = " + ns.id + ">" +
                                "<td class='text-center'>" + ns.id + "</td>" +
                                "<td class='text-center'>" + ns.room_id + "</td>" +
                                "<td class='text-center id='visitor_externnumbers'>" + ns.visitor_externnumber + "</td>" +
                                "<td class='text-center'>" + ns.created_user + "</td>" +
                                "<td class='text-center' id='status_name'>" + ns.status_name + "</td>" +
                                "<td class='text-center' id='start_times'>" + ns.start_time + "</td>" +
                                "<td class='text-center' id='end_times'>" + ns.end_time + "</td>" +
                                "<td class='text-center'>" +
                                "<button class='btn btn-success edit_op' onclick=edit_op(" + ns.id + ")>修改</button>" +
                                "<button class='btn btn-danger del_op' onclick=del_op(" + ns.id + ")>删除</button>" +
                                "</td>" +
                                "</tr>"
                            );
                            if (ns.status == 2) {
                                $('.' + ns.id).find(".edit_op").remove();
                            }
                        });
                        var user_role_menu = $("#user_role_menu").val();
                        var user_role_menus = user_role_menu.split(",")
                        var index = $.inArray("/admin/editRoomVisitorExternnumber", user_role_menus);   //结果：index=1
                        if (index <= 0) {
                            $(".edit_op").remove();
                        }
                        var indexs = $.inArray("/admin/delRoomVisitorExternnumber", user_role_menus);   //结果：index=1
                        if (indexs <= 0) {
                            $(".del_op").remove();
                        }

                    },
                    error: function (rs) {
                        toastr.warning('请求失败');
                    }
                });
            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });
        return false;
    }

    $('#addRoomVisitorExternnumber').click(function () {
        $("#add_visitor_externnumber").modal('show')
    })

    function edit_op($id) {
        $("#to_id").val($id);
        //查询该id数据
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/vsitorExternnumberLists",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: {
                v_id: $id,
                master_url: '/admin/vsitorExternnumberLists',
                token: $("#token").val(),
                page: 1,
            },
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }
                var data = rs.data[0];
                $("#editstart").val(data.start_time);
                $("#editend").val(data.end_time);
                $("#edit_visitor_externnumber_val").val(data.visitor_externnumber);
                $("#edit_visitor_externnumber").modal('show');
            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });
    }

    function edit_visitor_externnumber_modal() {
        var id = $("#to_id").val();
        var start_time = $("#editstart").val();
        var end_time = $("#editend").val();
        var visitor_externnumber = $("#edit_visitor_externnumber_val").val();
        if(visitor_externnumber < 0){
            toastr.warning('热度值不能为负数');
            return false;
        }
        if(visitor_externnumber > 1000000){
            toastr.warning('热度值不能超过1000000');
            return false;
        }
        if (isNaN(visitor_externnumber)) {
            toastr.warning('热度值必须为数字');
            return false;
        }
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/editRoomVisitorExternnumber",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: {
                id: id,
                master_url: '/admin/editRoomVisitorExternnumber',
                token: $("#token").val(),
                start_time: start_time,
                end_time: end_time,
                visitor_externnumber: visitor_externnumber,
            },
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }
                toastr.success(rs.msg);
                $('.' + id).find("#visitor_externnumbers").text(visitor_externnumber);
                $('.' + id).find("#start_times").text(start_time);
                $('.' + id).find("#end_times").text(end_time);
                if (rs.data == 1) {
                    $('.' + id).find("#status_name").text('开始中');
                    $('.' + id).find(".edit_op").remove();
                } else if (rs.data == 2) {
                    $('.' + id).find("#status_name").text('未开始');
                }
                $("#edit_visitor_externnumber").modal('hide');

            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });
    }

    $(".exit-roomType").on('click', function () {
        var user_role_menu = $("#user_role_menu").val();
        var user_role_menus = user_role_menu.split(",");
        var index = $.inArray("/admin/exitRoomType", user_role_menus);   //结果：index=1
        if (index <= 0) {
            return false;
        } else {
            var oldType = $(this).attr('value'); //修改之前的值
            var oldTpyeName = $(this).text();
            $(this).html('');
            $(this).prepend("<select class='form-control' id='select_ids'>"
                + "<option class='text-center'>请选择房间类型</option>"
                + "</select>");
            $(this).unbind('click'); //绑定click事件
            var roomType = $("#roomType").val().split(',');
            var roomList = new Array(roomType.length);
            for (var i = 0; i < roomType.length; i++) {
                var temp = new Array(2);
                temp = roomType[i].split('-');
                roomList[i] = new Array(temp.length);
                for (var j = 0; j < temp.length; j++) {
                    roomList[i][j] = temp[j];
                }
            }
            $(roomList).each(function (i, n) {
                $("#select_ids").prepend("<option class='text-center' value=" + n[0] + " >" + n[1] + "</option>");
            });
            var child = $(this).children('select');
            var that = $(this);
            var newType = '';
            var newTypeName = '';
            $("#select_ids").change(function () {
                newType = $("#select_ids option:selected").val();//修改之后的值
                newTypeName = $("#select_ids option:selected").text();
            });
            child.blur(function () {
                var room_id = $(this).parents("tr").find("#rooms_id").text(); //修改的工会ID
                var field = 'room_type'; //修改的字段
                var master_url = '/admin/exitRoomType';
                var token = $('#token').val();
                if (newType == oldType) {
                    that.text(oldTpyeName);
                    history.go(0);
                    return;
                } else if (newType == "") {
                    that.text(oldTpyeName);
                    history.go(0);
                    return;
                } else {
                    that.text(newTypeName);
                }
                $.ajax({
                    async: false,    //表示请求是否异步处理
                    type: "post",    //请求类型
                    url: "/admin/exitRoomType",//请求的 URL地址
                    dataType: "json",//返回的数据类型
                    data: {value: newType, field: field, room_id: room_id, master_url: master_url, token: token},
                    success: function (rs) {
                        if (rs.code !== 200) {
                            toastr.warning(rs.msg);
                            return false;
                        }
                        toastr.success(rs.msg);
                        setTimeout(location, 500);   //延迟5秒刷新页面
                    },
                    error: function (rs) {
                        toastr.warning('修改失败');
                        setTimeout(location, 500);   //延迟5秒刷新页面
                    }
                });
            });
        }
        that.remove('select');

        function location() {
            window.location.href = window.location.href;
        }
    });

    $('.room_channel').click(function () {
        var id = $(this).parents("tr").find("#rooms_id").text();
        $('#to_id').val(id);
        var channel = $(this).parents("tr").find(":input").val();
        if (channel) {
            var channels = channel.split(",")
            $.each(channels, function (index, value) {
                $(".checkbox" + value).prop("checked", true)
            });
        }
        $("#room_channel_modal").modal('show');
    });

    $('#pretty_room_id').click(function () {
        $("#pretty_room_id_modal").modal('show');
    });

    function add_party_room() {
        var id = $('#to_id').val();
        var check_id = 0;
        $("input[name='checkbox_id']:checked").each(function (i) {
            check_id += Number($(this).val());
        });
        if(check_id==0){
            toastr.warning('房间类型不可为空');
            return false;
        }
        var guild_id = $('#guild_id_val').val();
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            //url: "/admin/exitRoomChannel",//请求的 URL地址
            url: "/admin/addRoomParty",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: {
                id: id,
                //master_url: '/admin/exitRoomChannel',
                master_url: '/admin/addRoomParty',
                token: $("#token").val(),
                check_id: check_id,
                guild_id: guild_id,
            },
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }
                toastr.success(rs.msg);
                setTimeout(location, 200);   //延迟5秒刷新页面

            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });

        function location() {
            window.location.href = window.location.href;
        }

    }
    //添加房间靓号
    function add_room_pretty() {
        var pretty_room_id_val = $('#pretty_room_id_val').val();
        var roomId = $('#roomId').val();
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/addRoomPretty",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: {id: roomId,master_url: '/admin/addRoomParty',token: $("#token").val(),pretty_room_id_val: pretty_room_id_val,},
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }
                toastr.success(rs.msg);
                setTimeout(location, 200);   //延迟5秒刷新页面

            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });

        function location() {
            window.location.href = window.location.href;
        }

    }

    //添加或更改图片
    $('.room_edit').on('click',function(){
        $(".edit-append").prepend(
                "<form id='add_form' method=\"post\" enctype=\"multipart/form-data\">"+
                " <div class=\"form-group\">"+
                "<label class=\"control-label\">"+"房间名称"+"</label>"+
                "<input type=\"text\" class=\"form-control \" name='room_name' id=\"room_name\" required=\"required\">"+
                "</div>"+
                " <div class=\"form-group\">"+
                "<label class=\"control-label\">"+"公会ID"+"</label>"+
                "<input type=\"text\" class=\"form-control \" name='guild_id' id=\"guild_id\" required=\"required\">"+
                "</div>"+

                "<div class=\"form-group\">"+
                    "<label class=\"control-label\">"+"是否推荐"+"</label>"+
                    "<label class='radio-inline'>"+
                    "<input type='radio' name='is_hot' class='is_hot'  value='1'>"+" 是"+
                    "</label>"+
                    "<label class='radio-inline'>"+
                    "<input type='radio' name='is_hot' class='is_hot'  value='0'>"+" 否"+
                    "</label>"+
                "</div>"+

                "<div class=\"form-group\">"+
                    "<label class=\"control-label\">"+"首页是否展示"+"</label>"+
                    "<label class='radio-inline'>"+
                    "<input type='radio' name='is_show' class='is_show'  value='1'>"+" 首页展示"+
                    "</label>"+
                    "<label class='radio-inline'>"+
                    "<input type='radio' name='is_show' class='is_show'  value='2'>"+" 首页不展示"+
                    "</label>"+
                "</div>"+

                "<div class=\"form-group\" id='tag-div'>"+
                "<label class=\"control-label\">"+"标签地址[ JPEG & PNG ]"+"</label>"+
                "<select class='form-control' id='tag_id' name='tag_id'>"+
                "<option value='' >---------请选择个性标签--------</option>"+
                "</select>"+
                "</div>"+
                " <input type='hidden' value='/admin/editRoom' name='master_url'>"+
                " <input type='hidden' id='editRoom-room-id' name='room_id'>"+
                "<input type='hidden' value='<?php echo htmlentities($token); ?>' name='token'>"+
                " </form>"
        );
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "get",    //请求类型
            url: "/admin/getRoomTag",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: {token:$('#token').val(),master_url:'/admin/editRoom'},
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning('获取标签失败');
                    return false;
                }
                if (rs.data.length > 0) {
                    $(rs.data).each(function (i, n) {
                        $("#tag_id").append(
                            "<option value='"+n.id+"' >---------"+n.tag_name+"--------</option>"
                        );
                    });
                } else {
                    $("#tag-div").prepend("<tr class='no-records-found'><td colspan='7' class='text-center'>获取的是礼物失败，请联系小董同学解决问题</td></tr>");
                }
            },
            error: function (rs) {
                toastr.warning('获取标签失败');
            }
        });
        $("#tag_id option[value='"+$(this).attr('tagid')+"']").attr("selected","select");
        var room_id = $(this).parents("tr").find(".rooms_id").text();
        $("#room_name").val($(this).parents("tr").find(".room_name").text());
        $("#guild_id").val($(this).parents("tr").find(".guild_id").text());
        var is_hot = $(this).parents("tr").find(".is_hot").attr('value');
        $(":radio[name='is_hot'][value="+is_hot+"]").attr("checked","checked");
        var is_show = $(this).parents("tr").find(".is_show").attr('value');
        $(":radio[name='is_show'][value="+is_show+"]").attr("checked","checked");
        $("#editRoom-room-id").val(room_id);

        $('#editModal').modal('show');
    })

    function edit_room_ok() {
        var edit_info = $("#add_form").serializeArray();
        if($("#room_name").val() ==  ""){
            toastr.warning('房间名称不能为空');
            return false;
        }

        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/editRoom",//请求的 URL地址
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

    //图片上传
    $(document).on("change",".images_tags",function(){
        var $this = $(this)
        if($this[0].files[0]){
            var animationType = $this[0].files[0].name.split('.');
            if (animationType[1] != "bmp"&&animationType[1] != "png"&&animationType[1] != "gif" && animationType[1]!="jpg" && animationType[1]!="jpeg" && animationType[1] != "svga") {
                toastr.warning("不支持文件");
                return false;
            }
        }
        var imagename = $(this).attr('imagename');
        var $this = $(this);
        var formData = new FormData();
        formData.append("token", $("#token").val());
        formData.append("master_url", '/admin/giftConfAdd');
        formData.append("image", $this[0].files[0]);
        $.ajax({
            async: false,    //表示请求是否异步处理
            cache: false,
            processData: false,
            contentType: false,
            type: "post",    //请求类型
            url: "/admin/ossAttireFile",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: formData,
            success: function (rs) {
                if (rs.status !== 1) {
                    toastr.warning(rs.msg);
                    return false;
                }
                toastr.success(rs.msg);
                $this.parent().append("<input type='hidden' name="+imagename+"  value="+rs.image+">");
            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });
    });

    //添加或更改图片
    $('.addGiftImage').on('click',function(){
        $("#saveRoomId").val($(this).parents("tr").find(".rooms_id").text());
        $('#uploadFileModal').modal('show');
    })

    function add_imgs(){
        if($("#saveRoomId").val() == ""){
            toastr.warning('未获得房间ID');
            return false;
        }
        if($('#background_image')[0].files[0]){
            var gift_imageType = $('#background_image')[0].files[0].name.split('.');
            if(gift_imageType[1] != 'png'){
                toastr.warning('请选择png格式文件');
                return false;
            }
        }
        var formData = new FormData();
        formData.append("id", $("#saveRoomId").val());
        formData.append("failure_time", $( "input[name='failure_time']").val());
        formData.append("token", $("#token").val());
        formData.append("master_url", $("#master_url").val());
        formData.append("background_image", $('#background_image')[0].files[0]);
        $.ajax({
            async: false,    //表示请求是否异步处理
            cache: false,
            processData: false,
            contentType: false,
            type: "post",    //请求类型
            url: "/admin/roomOssFile",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: formData,
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

</script>
<script src="/admin/js/laydate/laydate.js"></script>
<script>
    //执行一个laydate实例
    laydate.render({
        elem: '#datetimeStart',
        type: 'datetime',
        value: getRecentDay(18,0)
    });

    laydate.render({
        elem: '#datetimeEnd',
        type: 'datetime',
        value: getRecentDay(24,0)
    });

	laydate.render({
        elem: '#editstart',
        type: 'datetime',
        value: $("#edidStart").val()
    });

    laydate.render({
        elem: '#editend',
        type: 'datetime',
        value: $("#editend").val()
    });

    /**获取近N小时*/
    function getRecentDay(hour,second){
        var today = new Date();
        var start=new Date(today.toLocaleDateString()).getTime() + 1000*60*60*hour - second;

        console.log(formatDate(start))
        return formatDate(start);
    }

    function formatDate(time){
        date = new Date(time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;//注意这个“+1”
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second=date.getSeconds();
        second=second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    }



    $(function(){

            $('.J_menuItem').on('click', function () {
                parent.childMenu(this)
            });

    })
</script>
</body>
</html>
