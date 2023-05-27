<?php
/**
 * Created by PhpStorm.
 * User: sh
 * Date: 2019/7/24
 * Time: 9:42
 */
return array(
    'Agora_appid' => 'e468e99e3ebc424b9575797f0886e3d6', //声网appid测试
    'APP_URL_image' => 'http://like-game-1318171620.cos.ap-beijing.myqcloud.com/', //域名地址oss
    'admin_url' => 'http://81.70.77.240/admin/',
    'socket_url' => 'http://py.ddyuyin.com/iapi/broadcast',
    'socket_url_base' => 'http://pyapi.jiawei6.cn/',
    'app_api_url' => 'http://php-api.jiawei6.cn/',
    'game_api_url' => 'http://pygame.fqparty.com/',

    'OSS' => [
        "ACCESS_KEY_ID" => 'LTAI5tAwKEs4qjyddQai4fz6', ////阿里云OSS  ID
        "ACCESS_KEY_SECRET" => 'L9bkb1ni0xJ6w4KMDiXhMJdYtxWB0Y', //阿里云OSS 秘钥
        "ENDPOINT" => 'http://oss-cn-beijing.aliyuncs.com', //阿里云OSS 地址
        "BUCKET" => 'yinka-resource', //oss中的文件上传空间
    ],
    'OSSMUAYY' => [
        "ACCESS_KEY_ID" => 'LTAI5tAwKEs4qjyddQai4fz6', ////阿里云OSS  ID
        "ACCESS_KEY_SECRET" => 'L9bkb1ni0xJ6w4KMDiXhMJdYtxWB0Y', //阿里云OSS 秘钥
        "ENDPOINT" => 'http://oss-cn-beijing.aliyuncs.com', //阿里云OSS 地址
        "BUCKET" => 'yinka-resource', //oss中的文件上传空间
    ],
    'redis' => [
        // 驱动方式
        'type' => 'redis',
        'host' => 'bj-crs-kxk9azol.sql.tencentcdb.com',
        'port' => 28660,
        'password' => 'vk_B34Tg)x@$5Rvb',
    ],
    'MQTT' => [
        'instanceId' => 'post-cn-mp91m5u8f09',
        'endPointIn' => 'post-cn-mp91m5u8f09.mqtt.aliyuncs.com',
        'endPoint' => 'post-cn-mp91m5u8f09.mqtt.aliyuncs.com',
        'accessKey' => 'LTAI4G1bUCQXqwjG8qo91u3b',
        'secretKey' => 'l1TZsfl9jls6OtjjsA4MFms7bRLPBV',
        'topic' => 'muatest',
        'groupId' => 'GID_muatest',
        'tokenurl' => 'https://mqauth.aliyuncs.com',
    ],

    'CLIENTOSS' => [
        'AccessKeyID' => 'LTAI5tJLJNUtKysavhVJQRft',
        'AccessKeySecret' => 'L9bkb1ni0xJ6w4KMDiXhMJdYtxWB0Y',
        'pathtop' => 'yinka-resource',
        'path' => 'online',
        'endpoint' => 'oss-cn-beijing.aliyuncs.com',
    ],

    //渠道投放
    'channelconf' => [
        "Vivo",
        "HuaWei",
        "YingYongBao",
        "Oppo",
        "XiaoMi",
        "GuanWang",
        "MoJi",
        "Q360",
        "QuDao1",
        "GW",
        "XXL1",
        "GuanWang2",
        "QuTouTiao",
        "QuDao10",
        "QuDao9",
        "Umeng",
        "yidong1",
        "XXL2",
        "XXL5",
        "QiJian",
        "ZhiHu5",
        "XXL3",
        "QuDao7",
        "QuDao4",
        "QuDao2",
        "XXL4",
        "yidong2",
        "ZhiHu",
        "QuDao5",
        "ZhiHu3",
        "ZhiHu7",
        "ZhiHu9",
        "ZhiHu6",
        "GuanWang1",
        "ZhiHu8",
        "yidong5",
        "ZhiHu4",
        "Ali",
        "ZhiHu2",
        "ZhiHu1",
        "yidong9",
        "BaiDu",
        "Samsung",
        "ZhiHu10",
        "YYX3",
        "YYX1",
        "XinLang",
        "KuaiShou01",
        "YYX2",
        "umeng",
        "WanDouJia",
        "appStore",
        'jglm',
        'ChaoFan',
        'WB_TouTiao',
        'TouTiao',
        'TouTiaoXY',
        'TouTiaoXY_CP',
        'FQ_XiaoShuo_CP',
        'FQ_KuaiShouKG_CP',
        'BiZhan',
    ],

    'getui' => [
        'appid' => 'yektrexMpx97bw36KYPsiA',
        'appkey' => 'qb2Xe0udav976L7CGidrH4',
        'mastersecret' => 'dBpseHNw8k57z0wP2k8PxA',
        'host' => 'http://sdk.open.api.igexin.com/apiex.htm',
        'loginurl' => 'https://openapi-gy.getui.com/v1/gy/ct_login/gy_get_pn',
    ],

    'yunxin' => [
        "Appkey" => '163e50c05b5890d12b0ab167ea8d422e',
        "Appsecret" => '9cb2e363dce3',
    ],
    'fq_assistant' => '104',

    'alipay_yuansheng' => [
        'app_id' => '2021003155623605',
        'notify_url' => 'http://api.ddyuyin.com/api/v1/appalinotify',
        'redpacket_notify_url' => 'http://api.ddyuyin.com/api/v1/api/v1/alipackets',
        'return_url' => '',
        'ali_public_key' => 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsSapDTz7JFjUr5whzvgRfHbxYlV7Sh3TWCuGgU1+8m76UdyMGoPThgUTo2itM00YrfW8EtSXW4OTCa9iYgzc7aMmRUwMPio2iHuszzNReWmxgdbykXVlGPK6+Lo1X7R9hRGT06tZZf4NqUFUeAZw0JFQrTi4K0FPteATRzG4Ykv71GvUYgmCUbcf/gBnlrOhZyn3gmLKYKY4ELTvxrggDXy6frEUUVjmOEoTVxL5dvocseujvhv5oJvuekLkqM3ggxJEmn2M4HGGkqKPD1U4uf3UoGZJtL0QNgnNncg5BanMjGu/AEhhg90vDT3XJfPm1vYsb7Lv1IiiOPuBU8oJrQIDAQAB',
        'private_key' => 'MIIEpQIBAAKCAQEA1EgBQUlv+0nsId4Ov8wFcu1AOkVhUk/jU1X4wmRrnjh4OZQPgcuGzw4YR2W0WL8n2mtp8x+2cO0qup4OeCKVd8kxruhzjf5A1ID1Ady+BxEig288wwzXgiT4dn+8MLN4YQ8ZMBzHio7I/Go6aYt1KodZorcG43isPCIwnSE3A4+SBQkLSQ8L6Nom47pFHOiamPmUblC0n8AiFQO1RGWyABDP6sYBAZF2p7xTvv2j0N2SRd/QBbLyEmRf4v6qEqrDJbWwgo3+lsU7HAiBKEgJgEmMOQvfuelqp29qCxrQQpTXytSAbqzvur9NjOHD3sIxHnNUTTkSlx8Bpcsc3ZtxFQIDAQABAoIBAQCL4KZzDqDrRFqENn4hg55TjGG2A+GNC3cPgqbX8LO5HhyaVCWjsSizZuY4pZugntTz57N4sHzXDHALZ/rAzokO1VQXnLQH7HFrlU3cXEga//9t++5d2ChpaVMPQjwPGzNHQVuniE8zzcJCEP1MbshVrboyrcesO+fB+AVwhGJrxQsJ2gPXVFBMXBdEutWS1WMpzOj4q4cLqY/7foGg9NvNw8lQal8MLXFjRcFIepSucX3IkuFDeWi2gj+cyTPQggHXkAnBZ05EBSuHCoIRioL6W16zEYEEUn7xkICr5y3O6KpdTljQGBxyQNMB+/BMJWM74hXLCAIwIPt2pbmdovwBAoGBAPbWG2T8Y/Nf9zW5+wHBMi2ud1chSrK38z7SUgJCJzqyorFKiUpjGgG4od1+qGDAIZISh/i72NtVqeUXpkuhFIsWYuIKF74QdVdLkUeb4LhfS6RtP1nUcFYsTHtGs3ZzfR3ETFNbAyt1C/Fe9tzNJPIBxqkY9JorTViI6G2qFowFAoGBANwpfe4XyeB5coX6T0dzXDAG9pqZorOETJTibi7iz2p7b0+LKJu81uPneRhcPlM7MMiPDyCqJ/u0mejru0s5+F/vWQ8OCLPLiDvDPuy+UJ74yQU1deab2T0NfkKKf6twTJkTwmCvNipE9T/lvjb6uMG2fVQmJdmwYG+Wqm/SUW3RAoGBALFzzW/1TrnptOSIFt71EGjs81jNU1FWk2YHd/OtsVwujm3cwwSaaFjyblO5Ob2MgtXrwprcGRPd6u0K6n+WhxlS97W/QcBfPqyKZCBR/OUvhUbpT1D6O+SHplg9xMkUT891jtWiKY41cGePOPQV+0iMZFCu4zJujQVoL4ifbeQtAoGAPCtezk5UDvRCF1mkhxuBC2MrzG7Gp5c1ss77W/cCxtA7SJr4my+N7zVYxA6ZvfeESpvGf5/hU4o1MhIS2ulZ9yYbyeCFAlZSwjqHHP6aXAgUMEc/FKptQaFJa3gckkcbuA5NZk0cWYsFF9R7Gt2E1vQ/5lqSp57rjDO6Gtt5A7ECgYEApfjjhEBzc2VENx0DX3mSwjwF7x2CIZ6K8zuowZyaIq/BaE7SMem3FoDSoPyERxk8ul5uVYsvK9QO5Ghe07DvQqFR+mUlANTdMA5m5UuN6LcsPzqEe1rslkVUB8Vvhim/X+dK3WjCmMZpOQhoER4NFhOUQz0NUzfVq0AF9pdAGtc=',
        'log' => '/tmp/alipay_yuansheng.log',
        'PARTNER' => '2088041031095832',
        'vip_notify_url' => 'http://api.ddyuyin.com/api/v1/appvipalinotify',
        'sign_notify_url' => 'http://api.ddyuyin.com/api/v1/autoSignAliNotify',
    ],

    'ali_sms' => [
        'ali_sms_accessKeyId' => 'LTAI5tQtFAbBc89h5dqLBTt5',
        'ali_sms_accessSecret' => 'un5CcjysGlbG7lqBY2sOnzJLSmnBUn',
        'ali_sms_product' => 'Dysmsapi',
        'ali_sms_action' => 'SendSms',
        'ali_sms_host' => 'dysmsapi.aliyuncs.com',
        'ali_sms_regionId' => 'cn-hangzhou',
        'ali_sms_signName' => '佳年互娱',
        'ali_sms_templateCode' => 'SMS_254750890',
    ],
    'app_version' => 'v2',
    'qq' => '1363995192',
    'service_email' => 'a17325993101@163.com', //封禁提示的客服邮箱
    'ampq_room' => [
        'host' => '172.31.48.10',
        'port' => 5672,
        'user' => 'fanqie',
        'password' => 'fanqie123',
        'queue_name' => 'q_py_bi_log',
    ],
    //用户召回活动的push类型
    'push_type' => ["getuipush", "chuanglansms", "rtdsms", "alivoice"],
    'push_type_mark' => ["getuipush" => "个推push", "chuanglansms" => "创蓝短信", "rtdsms" => "蓉通达短信", "alivoice" => "阿里语音"],
    'operate_black' => [993],

    'APP_TYPE_MAP' => [
        0 => ['source' => 'yinka', 'name' => '音咖', 'url' => 'http://landing.ddyuyin.com/channel.html'],
    ],

    'APP_TYPE_MAP_2' => [
        'yinka' => ['name' => '音咖', 'url' => 'http://landing.ddyuyin.com/channel.html'],
    ],

    'enter_room_url' => 'http://182.92.189.66:180/room_query',

    'filecipher' => ['key' => 'YmUjaGdqZ2FqbHNAI253YW5n', 'iv' => '2468013579123456'],
    'widthdrawalconfig' => [
        'xxx@qq.com' => [
            'gatewayUrl' => "https://openapi.alipay.com/gateway.do",
            'appId' => "2021003155639887",
            'alipayUserId' => "2088041031095832", //支付宝会员ID
            'rsaPrivateKey' => 'MIIEpQIBAAKCAQEAn8NT3JSR2CRWoqHNsBg/Wa3W2ygQUYn/olN2aWABm3S2kwKqG8pXEoysXJmJdzbRWfWsvBU8sI5lvaUhstVy7subyCtaaf51G9bPn32L3Mx+5AWkgk1IHaD3+XNLLwjgpjMo2q9Rt45B5HLlVVp1VcAE/1Ch4VtQikpiHwmpkrzmijTcs9FemzLDRxtDcoleTfaMc7kFGdYaITo9e3v8u6gVPUjLK5OeabH9wHg7GCayKzERcxqNPnZV5kXoq0ETue35fG+w32RxlMkF6X41inudkpoKhufXFBhlI9dOy2KwQ0SvMiIi6B4i1i9ORpSZY4f07xVclAIP2UOsFQfCCQIDAQABAoIBAQCA5Mvh6JOJ+DdVWoliCw4BQjlX8wjHYDi4M/ISrfxd+VnbXYj0htidBJWC1/SKE9XvaEAGNnQSVbBLwtBfQcpKUkbKxf9aCIte/H3hxR5z8yBkwxCod8U48kdeH+CGf/kO3bOWS1/4YXNT5kaUCDkmB5eAjQMtl8hw6fYj6F3BHhKwtppdxU7gC59vknVlq/DDcrxS2oOvaXNSS/ljQx/PTpRnBNdN0Q0bFIW78v10CQDWhTeXTCyvp9/qZ4Fb/CZN3Qlm5cFiSvX8R9SFNxXjIWKQgn6Ea1AJuxArON3INJh6j4OtNgZMFF0MIAp7K4WamsFRVLOWKyaMg1hDm/rJAoGBANxo6aZXCH5UhqXQtCcFRmXQ2juemXYsvvvdrilfIkus5zktIKOgTbsr0nImemC6ugWLVQ+oevX4DZMnFs6iwMH5h7Mmj/5FTgcIVf7hVIkBTOep8wFZ7e8P5vBBj360CQTHc4dnC3Jap+M/TnbU1mnXGypLrJWV5zselZhPROb3AoGBALmPdJ9+R/exkxr6T3+LocdZMoLeXeqyMLyoC36Gelk6JI02kJuTtxeAmnNIw4XpOzAboeCEUDnSRgTOPBuOVAQyeR9IWaYmGSBPR7qnY4lf2Pmp/uraQHKZobn0RuXTQ7RgifZCXElgHvxf4YktXlD8FR5SY2EUjpoqaFVpYV7/AoGBAI98HN8UuYrELAO2IhFk9bdCh09YqD6uUoZUghScwg7RuJUYM69RpEi89nspYXGnHYKOegl/fMyzduLdB5Ptj963Owf9iq/VHj6lxpXuysGF/zKxCGlQyfxfNdAiXe/19AkQbr0u79y596GQjNv/IrY0OpMGQIwA0k9CUdCdihVxAoGANGf0ivryPl0za6IYA7Cezxs87cL5iUgsBYv8Ow6lzT9jhVJMwvOT+RpEBJ0fQ1mccrjLHgqgUcQ2LDNGvI2U4t6SYKhhUVBfNkXNv0R5ExozwEcnjJJ5MyR6jXcU8uGYtH+zVw5k3AA+oA5ANyrOAVdAa6DfGlLg919UuhKaAmcCgYEAiiUmrAoO0zugrZS8U4ctm85M7CllSSvvyixIq/Bmzw8z4VEw98hWRagLTn1UZfPeY2RZjvr1cPhFE6jkgNJFsbnrvySbcMN4FKQsul0ww2i81rcCX8FKq5p+j2Vbe0ULfkDeFf5Iqffl7BgcEhMB8m54gbsCaxqYSh8xDMZTfBM=',
            'format' => "json",
            'charset' => "utf-8",
            'signType' => "RSA2",
            'appCertPath' => "/www/wwwroot/muamaster-tag/adminmua-config-prod/config/crt/appCertPublicKey_2021003155639887.crt",
            'alipayCertPath' => "/www/wwwroot/muamaster-tag/adminmua-config-prod/config/crt/alipayCertPublicKey_RSA2.crt",
            'rootCertPath' => "/www/wwwroot/muamaster-tag/adminmua-config-prod/config/crt/alipayRootCert.crt",
        ],
    ],

    //elasticsearch config
    'es_config' => [
        '172.31.48.10:9200',
    ],

    //聊天消息队列名
    'im_queue' => [
        'host' => '172.31.48.10',
        'port' => 5672,
        'user' => 'fanqie',
        'password' => 'fanqie123',
        'queue_name' => 'q_im_message',
    ],

    //派单
    'qrcodepromote_queue' => [
        'host' => '172.31.48.10',
        'port' => 5672,
        'user' => 'fanqie',
        'password' => 'fanqie123',
        'queue_name' => 'q_user_register_referee',
        'exchange' => 'ex_user_register_referee',
    ],

    //rabbitmq消息队列的基本配置
    "rabbitmq" => [
        'host' => '172.31.48.10',
        'port' => 5672,
        'user' => 'fanqie',
        'password' => 'fanqie123',
    ],
    "rabbitmq_exchange_name" => "ex_flow_message_bus", //转发用的交换机
);
