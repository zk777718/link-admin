<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 控制台配置
// +----------------------------------------------------------------------
return [
    // 指令定义
    'commands' => [
        //定时任务
        'MemberBlackCommand' => 'app\admin\script\MemberBlackCommand',
        'vsitorExternnumberCommand' => 'app\admin\script\VsitorExternnumberCommand',
        'noticeTimingCommand' => 'app\admin\script\NoticeTimingCommand',
        'bIDataCommand' => 'app\bI\script\BIDataCommand', //统计数据
        'BIDataTestCommand' => 'app\bI\script\BIDataTestCommand', //统计数据
        'twoDataCommand' => 'app\bI\script\TwoDataCommand', //次日留存
        'sanDataCommand' => 'app\bI\script\SanDataCommand', //三日留存
        'qiDataCommand' => 'app\bI\script\QiDataCommand', //七日留存

        'roomTountCommand' => 'app\admin\script\RoomTountCommand', //房间内数据统计脚本前一天
        'roomuserTountCommand' => 'app\admin\script\RoomUserTountCommand', //房间内用户数据统计
        'channelDataCommand' => 'app\bI\script\ChannelDataCommand', //渠道数据统计
        'bIChargeCommand' => 'app\admin\script\BIChargeCommand', //充值率统计数据
        'UserCardCommand' => 'app\admin\script\UserCardCommand',
        'BillDetailCommand' => 'app\admin\script\BillDetailCommand',
        'AttireActiveCommand' => 'app\admin\script\AttireActiveCommand',
        'ChannelDataTestCommand' => 'app\admin\script\ChannelDataTestCommand',
        'ChannelKeepCommand' => 'app\bI\script\ChannelKeepCommand',
        'TestCommand' => 'app\admin\script\TestCommand',

        'ReYunCommand' => 'app\admin\script\ReYunCommand', //热云数据
        'ReYunNewCommand' => 'app\admin\script\ReYunNewCommand', //热云数据30分钟刷
        'ReYunListCommand' => 'app\admin\script\ReYunListCommand', //热云渠道列表数据
        'ReYunListNewCommand' => 'app\admin\script\ReYunListNewCommand', //热云渠道数据30分钟刷
        'UsersRetainedCommand' => 'app\admin\script\UsersRetainedCommand', //用户留存
        'UsersRetainedNewCommand' => 'app\admin\script\UsersRetainedNewCommand', //用户留存new
        'BannerOpenCommand' => 'app\admin\script\BannerOpenCommand', //Banner自动上下架
        'PromoteDataCommand' => 'app\admin\script\PromoteDataCommand', //跑量留存
        'SyncAssetLogCommand' => 'app\admin\script\SyncAssetLogCommand', //重构同步数据脚本
        'SyncRewardAndTaskCommand' => 'app\admin\script\SyncRewardAndTaskCommand',
        'SyncUserAttireCommand' => 'app\admin\script\SyncUserAttireCommand',
        'SyncUserGiftWallCommand' => 'app\admin\script\SyncUserGiftWallCommand',
        'SyncChargeDetailCommand' => 'app\admin\script\SyncChargeDetailCommand',
        'SyncChargeDataCommand' => 'app\admin\script\SyncChargeDataCommand',
        'SyncUserEggCommand' => 'app\admin\script\SyncUserEggCommand',
        'CalculateUserGetAndSendGiftsCommand' => 'app\admin\script\CalculateUserGetAndSendGiftsCommand',
        'CalculateUserGetAndSendGiftsByGiftTypeCommand' => 'app\admin\script\CalculateUserGetAndSendGiftsByGiftTypeCommand',
        'DiffDataCommand' => 'app\admin\script\DiffDataCommand',
        'FixUserAttireDataCommand' => 'app\admin\script\FixUserAttireDataCommand',
        'CalcultePromoteRoomDataCommand' => 'app\admin\script\CalcultePromoteRoomDataCommand',
        'CalcultePromoteRoomDataByDayCommand' => 'app\admin\script\CalcultePromoteRoomDataByDayCommand',
        'CalculateStatsByRegChannelCommand' => 'app\admin\script\CalculateStatsByRegChannelCommand',
        'CalculateUserStatsByFiveMinutesCommand' => 'app\admin\script\CalculateUserStatsByFiveMinutesCommand',
        'CalculateUserStatsByIdCommand' => 'app\admin\script\CalculateUserStatsByIdCommand',
        'CalculateUserStatsByDayCommand' => 'app\admin\script\CalculateUserStatsByDayCommand',
        'CalcultePromoteRoomTimesDataCommand' => 'app\admin\script\CalcultePromoteRoomTimesDataCommand',
        'CalculateUserBox2Command' => 'app\admin\script\CalculateUserBox2Command',
        'CalculateUserBox1Command' => 'app\admin\script\CalculateUserBox1Command',
        'CalculateUserBoxCommand' => 'app\admin\script\CalculateUserBoxCommand', //旧版砸蛋数据统计
        'BoxOutputCommand' => 'app\admin\script\BoxOutputCommand',
        'FixUserSourceCommand' => 'app\admin\script\FixUserSourceCommand',
        'CalculateStatsByRegChannelAndSourceCommand' => 'app\admin\script\CalculateStatsByRegChannelAndSourceCommand',
        'CalcultePromoteCodeRoomDataCommand' => 'app\admin\script\CalcultePromoteCodeRoomDataCommand',
        'CalculteDowloadDataCommand' => 'app\admin\script\CalculteDowloadDataCommand',
        'FixInvitcodeCommand' => 'app\admin\script\FixInvitcodeCommand',
        'CalculateUserTaojinCommand' => 'app\admin\script\CalculateUserTaojinCommand',
        'CalculatePaoliangCommand' => 'app\admin\script\CalculatePaoliangCommand',
        'CalculateMarketChannelStatsCommand' => 'app\admin\script\CalculateMarketChannelStatsCommand',
        'CalculteUserDataByDayCommand' => 'app\admin\script\CalculteUserDataByDayCommand',
        'TurntableOutputCommand' => 'app\admin\script\TurntableOutputCommand',
        'FixUserDatasCommand' => 'app\admin\script\FixUserDatasCommand',
        'FixUserStatsByFiveMinutesCommand' => 'app\admin\script\FixUserStatsByFiveMinutesCommand',
        'CalculateUserStateByAnaly' => 'app\admin\script\CalculateUserStateByAnaly',
        'CalculateUserRetentionCommand' => 'app\admin\script\CalculateUserRetentionCommand',
        'FixCalculateUserStatsByIdCommand' => 'app\admin\script\FixCalculateUserStatsByIdCommand',
        'NewDailyDayCommand' => 'app\admin\script\NewDailyDayCommand', //新的日活留存统计
        'NewHuaweiChannel' => 'app\admin\script\NewHuaweiChannel', //华为注册包的基础数据
        'NewHwChannelAndSourceCommand' => 'app\admin\script\NewHwChannelAndSourceCommand', //以华为包渠道号任务id为维度的日活数据
        'FixInvitcodeByIpCommand' => 'app\admin\script\FixInvitcodeByIpCommand', //修复苹果绑定用户
        'CalculateMarketChannelDatasCommand' => 'app\admin\script\CalculateMarketChannelDatasCommand', //1v1渠道数据统计
        'CalculateMarketChannelDatasNewCommand' => 'app\admin\script\CalculateMarketChannelDatasNewCommand', //1v1渠道数据统计NEW
        'NewAppstoreChannelAndSourceCommand' => 'app\admin\script\NewAppstoreChannelAndSourceCommand', //以ios包广告组id,关键词为维度的日活数据
        'NewParseUserStatsByIdCommand' => 'app\admin\script\NewParseUserStatsByIdCommand', //新的5分钟和每天的统计脚本
        'NewCheckCommand' => 'app\admin\script\NewCheckCommand', //验证脚本
        'NewTempCommand' => 'app\admin\script\NewTempCommand', //跑量的脚本临时用得
        'NewFirstChargeCommand' => 'app\admin\script\NewFirstChargeCommand', //每日首冲数据
        'FixTaoJinCommand' => 'app\admin\script\FixTaoJinCommand', //跑量的脚本临时用得
        'CalculateUserGopherCommand' => 'app\admin\script\CalculateUserGopherCommand', //跑量的脚本临时用得
        'NewDayUserChargeCommand' => 'app\admin\script\NewDayUserChargeCommand', //统计每天充值脚本
        'NewOmitUserStateByIdCommand' => 'app\admin\script\NewOmitUserStateByIdCommand', //金流数据遗漏修复脚本(暂停使用)
        'NewConsumerAssetLogCommand' => 'app\admin\script\NewConsumerAssetLogCommand', //用消息队列来消费金流数据(暂停使用)
        'NewDayUserGiftCommand' => 'app\admin\script\NewDayUserGiftCommand', //每日房间收送礼
        'NewUserStatsByTimeCommand' => 'app\admin\script\NewUserStatsByTimeCommand', //金流数据依赖时间段
        'UserStatsByTimeCommand' => 'app\admin\script\UserStatsByTimeCommand', //可以跑历史金流
        'UserActivityGiftRewardCommand' => 'app\admin\script\UserActivityGiftRewardCommand', //礼物id产出统计
        'RoomSpecialCommand' => 'app\admin\script\RoomSpecialCommand', //房间推荐
        'UserKeepDayCommand' => 'app\admin\script\UserKeepDayCommand', //用户维度留存的基础数据
        'RoomConsumeCommand' => 'app\admin\script\RoomConsumeCommand', //房间消费消息判断在麦时长
        'UserRoomMicCommand' => 'app\admin\script\UserRoomMicCommand', //统计用户在麦时长
        'SolveCodeLoseCommand' => 'app\admin\script\SolveCodeLoseCommand', //解决金流脚本中invitcode丢失问题
        'UserRegisterByAreaCommand' => 'app\admin\script\UserRegisterByAreaCommand', //解析注册用户的区域
        'RoomCloseCommand' => 'app\admin\script\RoomCloseCommand', //封禁房间脚本
        'RoomHideCommand' => 'app\admin\script\RoomHideCommand', //房间隐藏脚本
        'RoomEverydayConsumeCommand' => 'app\admin\script\RoomEverydayConsumeCommand', //统计每日房间消费
        'UserIpDeviceidExceptionCommand' => 'app\admin\script\UserIpDeviceidExceptionCommand', //查找异常用户
        'UserExceptionCommand' => 'app\admin\script\UserExceptionCommand', //查找异常用户
        'PromoteIosUserCommand' => 'app\admin\script\PromoteIosUserCommand', //推广中的ios用户的提取
        'AsaPromoteCommand' => 'app\admin\script\AsaPromoteCommand', //asa引流数据推广
        'AsaKeywordDayCommand' => 'app\admin\script\AsaKeywordDayCommand', //asa关键词汇总
        'AnchorBindUserSendGiftCommand' => 'app\admin\script\AnchorBindUserSendGiftCommand', //主播cp直刷礼物
        'IdentifyWithdrawalCommand' => 'app\admin\script\IdentifyWithdrawalCommand', //身份证验证
        'ActivityCommand' => 'app\admin\script\ActivityCommand', //活动自动开启脚本
        'SetInvitcodeCommand' => 'app\admin\script\SetInvitcodeCommand', //统计每日房间消费
        'CheckImConsumeCommand' => 'app\admin\script\CheckImConsumeCommand', //私聊消息推送到es里面
        'RoomConsumeKeepDayCommand' => 'app\admin\script\RoomConsumeKeepDayCommand', //房间消费留存
        'AnchorPromotePointCommand' => 'app\admin\script\AnchorPromotePointCommand', //(派单)房间消费用户白名单积分
        'QrcodePromoteConsumeCommand' => 'app\admin\script\QrcodePromoteConsumeCommand', //(派单)标签码派单绑定用户
        'QrcodeBindUserDataCommand' => 'app\admin\script\QrcodeBindUserDataCommand', //(派单)标签码绑定用户跑量数据
        'AsaChannelAndSourceCommand' => 'app\admin\script\AsaChannelAndSourceCommand', //asa优化脚本替换之前
        'SyncLogToEsCommand' => 'app\admin\script\SyncLogToEsCommand', //金流同步ES
        'UserAssetLogInesByTimeCommand' => 'app\admin\script\UserAssetLogInesByTimeCommand', //user_asset_log 同步到es
        'NewUserByRegChannelAndSourceCommand' => 'app\admin\script\NewUserByRegChannelAndSourceCommand', //分包源脚本
        'UserAssetLogInesCheckCommand' => 'app\admin\script\UserAssetLogInesCheckCommand', //验证脚本
        'NewOppoChannelAndSourceCommand' => 'app\admin\script\NewOppoChannelAndSourceCommand', //Oppo归因数据统计脚本
        'CreateTableNameCommand' => 'app\admin\script\CreateTableNameCommand', //创建分表的脚本
        'LoginDetailConsumeCommand' => 'app\admin\script\LoginDetailConsumeCommand', //用户登录详情消费
        'UserExceptionChannelCommand' => 'app\admin\script\UserExceptionChannelCommand', //渠道用户的异常用户
        'BindInvitcodeCommand' => 'app\admin\script\BindInvitcodeCommand', //渠道绑定邀请码
        'ConsumeOnMicCommand' => 'app\admin\script\ConsumeOnMicCommand', //消费上下麦数据
        'ConsumeEnterRoomCommand' => 'app\admin\script\ConsumeEnterRoomCommand', //消费用户进房间
        'ConsumeRoomChatCommand' => 'app\admin\script\ConsumeRoomChatCommand', //消费房间公屏消息
        'ConsumeLoginDetaiCommand' => 'app\admin\script\ConsumeLoginDetaiCommand', //用户登录详情消费
        'UserRoomOnMicCommand' => 'app\admin\script\UserRoomOnMicCommand', //新的在麦时长统计

    ],
];