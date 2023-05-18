<?php /*a:4:{s:53:"/var/www/html/view/admin/dataManagement/indexnew.html";i:1684251969;s:35:"../view/admin/common/cssHeader.html";i:1684251969;s:34:"../view/admin/common/userItem.html";i:1684251969;s:34:"../view/admin/common/jsHeader.html";i:1684251969;}*/ ?>
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
    <link rel="stylesheet" type="text/css" href="/time/daterangepicker.css">
    <script type="text/javascript" src="/admin/layui/layui.js"></script>
    <link rel="stylesheet" href="/admin/layui/css/layui.css">
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
                            <div class="form-group">
                                <input type="text" value="<?php echo htmlentities($demo); ?>" id="demo" readonly class="form_datetime form-control input-outline" style="width:190px;">
                            </div>
                            <button type="button" class="btn btn-outline btn-success" style="float:right;" id="daochu">
                                <i aria-hidden="true"></i>导出
                            </button>
                            <button type="button" class="btn btn-outline btn-success" style="float:right;" id="search">
                                <i aria-hidden="true"></i>搜索
                            </button>
                        </div>
                        <div class="example">
                            <table class="table table-hover table-responsive" id="data_table">
                                <thead>
                                <tr>
                                    <th class="text-center" width="100px" style="color: #40bf57">日期</th>
                                    <th class="text-center" style="color: #40bf57">日活</th>
                                    <th class="text-center" style="color: #40bf57">新增</th>
                                    <th class="text-center" style="color: #40bf57">新增充值</th>
                                    <th class="text-center" style="color: #40bf57">新充值人</th>
                                    <th class="text-center" style="color: #40bf57">新充值率</th>
                                    <th class="text-center" style="color: #7d90ef;">直(额)</th>
                                    <th class="text-center" style="color: #7d90ef;">直(人)</th>
                                    <th class="text-center" style="color: #7d90ef;">直+代(额)</th>
                                    <th class="text-center" style="color: #7d90ef;">直+代(人)</th>
                                    <th class="text-center" style="color: #fc401b;">vip</th>
                                    <th class="text-center" style="color: #40bf57;">svip</th>
                                    <th class="text-center" style="color: #fc401b;">充值率</th>
                                    <th class="text-center" style="color: #7d90ef;">ARPU</th>
                                    <th class="text-center" style="color: #7d90ef;">ARPPU</th>
                                    <th class="text-center">D3付费</th>
                                    <th class="text-center">D7付费</th>
                                    <th class="text-center">D15付费</th>
                                    <th class="text-center">D2留存</th>
                                    <th class="text-center">D3留存</th>
                                    <th class="text-center">D7留存</th>
                                    <th class="text-center">D15留存</th>
                                    <!-- <th class="text-center">操作</th>-->
                                </tr>
                                </thead>
                                <tbody>
                                <?php if(!empty($list)): if(is_array($list) || $list instanceof \think\Collection || $list instanceof \think\Paginator): $i = 0; $__LIST__ = $list;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$data): $mod = ($i % 2 );++$i;?>
                                <tr>
                                    <td class="text-center" class="riq" id="riq" style="color: #40bf57"><?php echo htmlentities($data['date']); ?></td>
                                    <td class="text-center">
                                        <!--<span href="/admin/userdailychannel?master_url=/admin/userdailychannel&token=<?php echo htmlentities($token); ?>&master_url=/admin/userdailychannel&riqi=<?php echo htmlentities($data['date']); ?>"  class="J_menuItem" title="日活数据"><?php echo htmlentities($data['daily_life']); ?> </span>-->
                                        <span style="text-decoration:underline;" href="/admin/userdailysearch?master_url=/admin/userdailysearch&token=<?php echo htmlentities($token); ?>&date_b=<?php echo htmlentities($data['date']); ?>&date_e=<?php echo htmlentities($data['date']); ?>&data_type=daily"  class="J_menuItem" title="用户日活"><?php echo htmlentities($data['daily_life']); ?> </span>
                                    </td>
                                    <td class="text-center">
                                        <span style="text-decoration:underline;" href="/admin/userdailysearch?master_url=/admin/userdailysearch&token=<?php echo htmlentities($token); ?>&date_b=<?php echo htmlentities($data['date']); ?>&date_e=<?php echo htmlentities($data['date']); ?>&data_type=register"  class="J_menuItem" title="用户注册"><?php echo htmlentities($data['register_people_num']); ?> </span>
                                    </td>
                                    <td class="text-center">
                                        <span style="text-decoration:underline;" href="/admin/userchargeNewsearch?master_url=/admin/userchargeNewsearch&token=<?php echo htmlentities($token); ?>&date_b=<?php echo htmlentities($data['date']); ?>&date_e=<?php echo htmlentities($data['date']); ?>&data_type=chargenew"  class="J_menuItem" title="新增用户充值"><?php echo htmlentities($data['register_user_charge_amount']); ?> </span>
                                    </td>
                                    <td class="text-center" style="color: #40bf57"><?php echo htmlentities($data['register_user_charge_num']); ?></td>
                                    <td class="text-center" style="color: #40bf57"><?php echo htmlentities($data['reg_pay_rate']); ?>%</td>
                                    <td class="text-center" style="color: #7d90ef;"><?php echo htmlentities($data['directcharge_money_sum']); ?></td>
                                    <td class="text-center" style="color: #7d90ef;"><a href="#" riq="<?php echo htmlentities($data['date']); ?>" beancredit="0" class="getCzrs"><?php echo htmlentities($data['directcharge_people_num']); ?></a></td>
                                    <td class="text-center">

                                        <span style="text-decoration:underline;" href="/admin/userchargeNewsearch?master_url=/admin/userchargeNewsearch&token=<?php echo htmlentities($token); ?>&date_b=<?php echo htmlentities($data['date']); ?>&date_e=<?php echo htmlentities($data['date']); ?>&data_type=charge"  class="J_menuItem" title="用户充值"><?php echo htmlentities($data['charge_money_sum']); ?></span>

                                    </td>
                                    <td class="text-center" style="color: #7d90ef;"><a href="#" riq="<?php echo htmlentities($data['date']); ?>" beancredit="1" class="getCzrs"><?php echo htmlentities($data['agentcharge_people_num'] + $data['directcharge_people_num']); ?></a></td>
                                    <td class="text-center" style="color: #fc401b;"><?php echo htmlentities($data['vip_money_sum']); ?></td>
                                    <td class="text-center" style="color:#40bf57;"><?php echo htmlentities($data['svip_money_sum']); ?></td>
                                    <td class="text-center" style="color: #fc401b;"><?php echo htmlentities($data['pay_rate']); ?>%</td>
                                    <td class="text-center"><?php echo htmlentities($data['arpu']); ?></td>
                                    <td class="text-center"><?php echo htmlentities($data['arppu']); ?></td>

                                    <td class="text-center"><?php echo htmlentities($data['fee_register_3']); ?></td>
                                    <td class="text-center"><?php echo htmlentities($data['fee_register_7']); ?></td>
                                    <td class="text-center"><?php echo htmlentities($data['fee_register_15']); ?></td>
                                    <td class="text-center">
                                        <span style="text-decoration:underline;" href="/admin/userkeepList?master_url=/admin/userkeepList&token=<?php echo htmlentities($token); ?>"  class="J_menuItem" title="用户留存"><?php echo htmlentities($data['retention_1']); ?>%</span>
                                    </td>
                                    <td class="text-center"><?php echo htmlentities($data['retention_3']); ?>%</td>
                                    <td class="text-center"><?php echo htmlentities($data['retention_7']); ?>%</td>
                                    <td class="text-center"><?php echo htmlentities($data['retention_15']); ?>%</td>
                                    <td class="text-center">
                                        <!-- <?php if(in_array('/admin/retention',$user_role_menu)): ?>
                                        <button class="btn btn-success" onclick="select_retention('<?php json_encode($data)?>')">留存</button>
                                        <?php endif; ?> -->
                                        <!-- <br> -->
                                        <?php if(in_array('/admin/userbiDetail',$user_role_menu)): ?>
                                        <!--<button class="btn btn-primary"><a href="<?php echo htmlentities($admin_url); ?>/userbiDetail?master_url=/admin/userbiDetail&token=<?php echo htmlentities($token); ?>&master_url=/admin/userbiDetail&page=1&riqi=<?php echo htmlentities($data['date']); ?>">详情</a></button>-->
                                        <?php endif; ?>
                                    </td>
                                </tr>
                                <?php endforeach; endif; else: echo "" ;endif; else: ?>
                                <tr class="no-records-found">
                                    <td colspan="9" class="text-center">没有找到匹配的记录</td>
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
<!--查看留存详情-->
<div class="modal fade" id="selectRate">
    <div class="modal-dialog" style="width:80%">
        <div class="modal-content">
            <div class="modal-header">
                <h3>详情</h3>
            </div>
            <table class="table table-hover table-responsive" id="select_forum_reply_table">
                <thead>
                <tr>
                    <th class="text-center">id</th>
                    <th class="text-center">次日留存</th>
                    <th class="text-center">三日留存</th>
                    <th class="text-center">七日留存</th>
                </tr>
                </thead>
                <tbody id="member_tbody">

                </tbody>
            </table>
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
<input type="hidden" value="<?php echo htmlentities($user_role_menu_input); ?>" id="user_role_menu">
<!-- 全局js -->
<script src="/admin/js/jquery.min.js?v=2.1.4"></script>
<script src="/admin/js/bootstrap.min.js?v=3.3.6"></script>
<script src="/admin/js/plugins/toastr/toastr.min.js"></script>
<script src="/admin/js/plugins/pagination/bootstrap-paginator.js"></script>
<script src="/admin/js/user-item.js"></script>
<script src="/admin/js/fileinput/fileinput.js" type="text/javascript"></script>
<script src="/admin/js/fileinput/zh.js" type="text/javascript"></script>
<script src="/admin/js/plugins/toastr/toastr.min.js"></script>
<script src="/time/moment.min.js"></script>
<script src="/time/daterangepicker.min.js"></script>
<script src="/admin/js/date-select.js"></script>
<script>
    $(document).on('click','.getCzrs',function () {
        var timeVal = $(this).attr('riq');
        var beancredit = $(this).attr('beancredit');
        var time1 = timeVal+' 00:00:00'
        var time2 = timeVal+' 23:59:59'
        var demo = $('#demo').value()
        if(beancredit == 0){
            window.location.href = "/admin/userPay?token=" + $("#token").val()  + '&master_url=/admin/userPay'+'&demo=' + demo + '&daochu=0'
        }else{
            window.location.href = "/admin/userPayBeancredit?token=" + $("#token").val()  + '&master_url=/admin/userPayBeancredit'+'&demo=' + demo + '&daochu=0'
        }
    })
    $('body').on('hidden.bs.modal', '#selectRate', function () {
        $("#member_tbody tr").remove();
    });

    $('#pageLimit').bootstrapPaginator({
        currentPage: $("#page").val(),
        totalPages: $("#total_page").val(),
        size: "normal",
        bootstrapMajorVersion: 3,
        alignment: "right",
        numberOfPages: '5',
        pageUrl: function (type, page, current) {
            //是每个分页码变成一个超链接
            return '?page=' + page + '&master_url=/admin/dataManagement/indexNew&token=' + $("#token").val() + '&demo='+ $("#demo").val();
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
    });
    $('#search').click(function () {
        var strtime = $('#datetimeStart').val();
        var endtime = $('#datetimeEnd').val();
        var demo = $('#demo').val();
        var token = $('#token').val();
        var page = $("#page").val();
        if(strtime > endtime){
            toastr.warning('开始时间不能大于结束时间');
            return false;
        }
        window.location.href = "/admin/dataManagement/indexNew?token=" + token + '&master_url=/admin/dataManagement/indexNew&page='+ page +'&demo=' + demo;
    })
    $('#daochu').click(function () {
        var strtime = $('#datetimeStart').val();
        var endtime = $('#datetimeEnd').val();
        var demo = $('#demo').val();
        var token = $('#token').val();
        var page = $("#page").val();
        if(strtime > endtime){
            toastr.warning('开始时间不能大于结束时间');
            return false;
        }
        window.location.href = "/admin/dataManagement/indexNew?token=" + token + '&master_url=/admin/dataManagement/indexNew&page='+ page +'&demo=' + demo + '&daochu=1';
    })
    $("#datetimeStart").datetimepicker({
        weekStart: 1,
        todayBtn: true,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        format: 'yyyy-mm-dd',
        minView: '3',
        language: 'zh-CN',
        autoclose: true,
        startDate: '-10y,-10m,-10d'
    }).on("click", function () {
        $("#datetimeStart").datetimepicker("setStartDate")
    });
    $("#datetimeEnd").datetimepicker({
        weekStart: 1,
        todayBtn: true,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        format: 'yyyy-mm-dd ',
        minView: '3',
        language: 'zh-CN',
        autoclose: true,
        startDate: '-10y,-10m,-10d'
    }).on("click", function () {
        $("#datetimeEnd").datetimepicker("setEndDate")
    });

    var data = JSON.parse('<?php echo json_encode($list)?>');

    function select_retention(obj) {
        console.log(obj)
    }
    //留存详情
    $(".select_retention").click(function () {
        var riq= $(this).parents("tr").find("#riq").text();
        $.ajax({
            async: false,    //表示请求是否异步处理
            type: "post",    //请求类型
            url: "/admin/retention",//请求的 URL地址
            dataType: "json",//返回的数据类型
            data: {
                riq: riq,
                master_url: '/admin/retention',
                token: $("#token").val(),
            },
            success: function (rs) {
                if (rs.code !== 200) {
                    toastr.warning(rs.msg);
                    return false;
                }
                //if (rs.data.length > 0) {
                //$(rs.data).each(function (i, n) {
                $("#member_tbody").prepend("<tr class = " + rs.data.id + ">" +
                    "<td class='text-center'>" + rs.data.id + "</td>" +
                    "<td class='text-center'>" + rs.data.cirlc + "</td>" +
                    "<td class='text-center'>" + rs.data.sanrlc + "</td>" +
                    "<td class='text-center'>" + rs.data.qirlc + "</td>" +
                    "</tr>"
                );
                //});
                //} else {
                //$("#member_tbody").prepend("<tr class='no-records-found'><td colspan='9' class='text-center'>没有找到匹配的记录</td></tr>");
                //}
                $('#selectRate').modal('show')
            },
            error: function (rs) {
                toastr.warning('请求失败');
            }
        });
        return false;
    });

</script>


<script>
    layui.use(['jquery','form','layer'], function(){
        var $ = layui.jquery,
            layer = layui.layer,
            form = layui.form;

        ///预览
        $('.preview').on('click',function() {

            var w = ($(window).width() * 0.7);
            var h = ($(window).height() - 50);
            var url = ($(this).attr("alt"))

            layer.open({
                resize: true,
                maxmin: true,
                title: '预览',
                shadeClose: true,
                area: [w + 'px', h + 'px'],
                type: 2,
                content: url,
                /* success: function(layero,index){
                     //在回调方法中的第2个参数“index”表示的是当前弹窗的索引。
                     //通过layer.full方法将窗口放大。
                     layer.full(index);
                 }*/
            });
        });
    });


    layui.use(['jquery'],function(){
        $('.J_menuItem').on('click', function () {
            parent.childMenu(this)
        });
    })


</script>


</body>
</html>
