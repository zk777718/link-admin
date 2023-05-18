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

use think\facade\Env;

return [
    // 默认使用的数据库连接配置
    'default' => Env::get('database.driver', 'bi'),
    // 自定义时间查询规则
    'time_query_rule' => [],

    // 自动写入时间戳字段
    // true为自动识别类型 false关闭
    // 字符串则明确指定时间字段类型 支持 int timestamp datetime date
    'auto_timestamp' => false,

    // 时间字段取出后的默认时间格式
    'datetime_format' => 'Y-m-d H:i:s',

    // 数据库连接配置信息
    'connections' => [
        'userMaster1' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rm-2ze7oqeviq2tmw5xj.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'user1'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'userSlave1' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rr-2ze59716535en5m7r.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'user1'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'userMaster2' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rm-2ze7oqeviq2tmw5xj.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'user2'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'userSlave2' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rr-2ze59716535en5m7r.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'user2'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'userMaster3' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rm-2ze7oqeviq2tmw5xj.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'user3'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'userSlave3' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rr-2ze59716535en5m7r.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'user3'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'userMaster4' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rm-2ze7oqeviq2tmw5xj.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'user4'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'userSlave4' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rr-2ze59716535en5m7r.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'user4'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'roomMaster1' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rm-2ze7oqeviq2tmw5xj.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'common'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'roomSlave1' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rr-2ze59716535en5m7r.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'common'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'commonMaster1' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rm-2ze7oqeviq2tmw5xj.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'common'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'commonSlave1' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rr-2ze59716535en5m7r.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'common'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'bi' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rm-2ze7oqeviq2tmw5xj.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'bi'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],

        'biSlave1' => [
            // 数据库类型
            'type' => Env::get('database.type', 'mysql'),
            // 服务器地址
            'hostname' => Env::get('database.hostname', 'rr-2ze59716535en5m7r.mysql.rds.aliyuncs.com'),
            // 数据库名
            'database' => Env::get('database.database', 'bi'),
            // 用户名
            'username' => Env::get('database.username', 'php_admin'),
            // 密码
            'password' => Env::get('database.password', '9vgvzgSPU72hLump'),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8mb4'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', ''),
            // 数据库调试模式
            'debug' => Env::get('database.debug', true),
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy' => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate' => false,
            // 读写分离后 主服务器数量
            'master_num' => 1,
            // 指定从服务器序号
            'slave_no' => '',
            // 是否严格检查字段是否存在
            'fields_strict' => true,
            // 是否需要断线重连
            'break_reconnect' => true,
        ],
    ],
];
