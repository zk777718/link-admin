<?php /*a:1:{s:56:"/var/www/html/view/admin/chart/registeruserprovince.html";i:1684251969;}*/ ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mua语音 - 运营后台</title>
    <!--    全局css-->
    <script type="text/javascript" src="/admin/layui/layui.js"></script>
    <link rel="stylesheet" href="/admin/layui/css/layui.css">
    <script type="text/javascript" src="/admin/js/echarts.js"></script>
    <script src="/admin/js/jquery.min.js"></script>
    <script src="/admin/js/china.js"></script>
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

<style>
    .top-panel {
        border: 1px solid #eceff9;
        border-radius: 5px;
        text-align: center;
    }

    .top-panel > .layui-card-body {
        height: 60px;
    }

    .top-panel-number {
        line-height: 60px;
        font-size: 30px;
        border-right: 1px solid #eceff9;
    }

    .top-panel-tips {
        line-height: 30px;
        font-size: 12px
    }
</style>

<div style="margin:15px 5px 0px 15px;">
    <blockquote class="layui-elem-quote" style="padding:10px;margin:1px;">
        用户归属城市分布图
    </blockquote>
    <form class="layui-form" onsubmit="return false;" id="myform">
        <div class="layui-inline">
            <div class="layui-input-inline">
                <input type="text" name="date" id="date_b" lay-verify="date" placeholder="日期开始" autocomplete="off"
                       class="layui-input" value="<?php echo htmlentities($date_b); ?>">
            </div>
            <div class="layui-input-inline">
                <input type="text" name="date" id="date_e" lay-verify="date" placeholder="日期结束" autocomplete="off"
                       class="layui-input" value="<?php echo htmlentities($date_e); ?>">
            </div>


            <div class="layui-inline">
                <select name="modules" lay-verify="required" lay-search="" id="type">
                    <option value="0" <?php if($type == 0): ?> echo selected="selected" <?php endif; ?>>注册用户</option>
                    <option value="1" <?php if($type == 1): ?> echo selected="selected" <?php endif; ?>>登录用户</option>
                </select>
            </div>

        </div>

        <button class="layui-btn" data-type="reload" onclick="mysearch()">搜索</button>
    </form>

</div>


<div class="layui-fluid">
    <div class="layuimini-main welcome">
        <!--用户充值分直充代充-->
        <div class="layui-row layui-col-space1">
            <div class="layui-col-xs12 layui-col-md12">
                <div class="layui-card top-panel">
                    <div id="main" style="width:100%;height:600px;margin-top: 10px"></div>
                    <script>


                        var optionMap = {
                            backgroundColor: '#FFFFFF',
                            title: {
                                text: '全国区域用户<?php echo htmlentities($mark); ?>量对比',
                                subtext: '',
                                x: 'center'
                            },
                            tooltip: {
                                trigger: 'item'
                            },

                            //左侧小导航图标
                            visualMap: {
                                show: true,
                                x: 'left',
                                y: 'center',
                                splitList: JSON.parse('<?php echo json_encode($colorNode); ?>'),
                                color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
                            },

                            //配置属性
                            series: [{
                                name: '<?php echo htmlentities($mark); ?>量',
                                type: 'map',
                                mapType: 'china',
                                roam: false,
                                label: {
                                    normal: {
                                        show: true  //省份名称
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                },
                                data: JSON.parse('<?php echo json_encode($collectList); ?>')  //数据
                            }]
                        };
                        //初始化echarts实例
                        var myChart = echarts.init(document.getElementById('main'));

                        //使用制定的配置项和数据显示图表
                        myChart.setOption(optionMap);


                    </script>


                    <blockquote class="layui-elem-quote" style="margin-bottom:0px">
                        <button class="layui-btn layui-btn-primary layui-border-black"
                                id="register_user_total">总<?php echo htmlentities($mark); ?>量<?php echo htmlentities($total_numbers); ?></button>
                        <button class="layui-btn layui-btn-primary layui-border-black"
                                id="regiser_user_add_money">男性:<?php echo htmlentities($man_numbers); ?></button>
                        <button class="layui-btn layui-btn-primary layui-border-black"
                                id="regiser_user_charge">女性:<?php echo htmlentities($woman_numbers); ?></button>
                    </blockquote>

                    <table class="layui-table" lay-filter="charge-add-table">
                        <thead>
                        <tr>
                            <th lay-data="{field:'2'}"><?php echo htmlentities($mark); ?>地区</th>
                            <th lay-data="{field:'3'}"><?php echo htmlentities($mark); ?>人数</th>
                            <th lay-data="{field:'6'}">男性人数</th>
                            <th lay-data="{field:'7'}">男性占比</th>
                            <th lay-data="{field:'4'}">女性人数</th>
                            <th lay-data="{field:'5'}">女性占比</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php if(is_array($resList) || $resList instanceof \think\Collection || $resList instanceof \think\Paginator): $i = 0; $__LIST__ = $resList;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$list): $mod = ($i % 2 );++$i;?>
                        <tr>
                            <td><?php echo htmlentities($list['province']); ?></td>
                            <td><?php echo htmlentities($list['people_numbers']); ?></span></td>
                            <td><?php echo htmlentities($list['man_numbers']); ?></span></td>
                            <td><span style="color: darkred"><?php echo htmlentities($list['man_rate']); ?></span></td>
                            <td><?php echo htmlentities($list['woman_numbers']); ?></span></td>
                            <td><span style="color: #2D93CA"><?php echo htmlentities($list['woman_rate']); ?></span></td>
                        </tr>
                        <?php endforeach; endif; else: echo "" ;endif; ?>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>


    </div>
</div>


<script>

    layui.use(['jquery', 'form', 'layer', 'element', 'laydate', 'table'], function () {
        var $ = layui.jquery
            , layer = layui.layer
            , laydate = layui.laydate
            , form = layui.form
            , table = layui.table;

        var element = layui.element;

        //日期
        laydate.render({
            elem: '#date_b'
        });

        laydate.render({
            elem: '#date_e'
        });

        //转换静态表格
        table.init('charge-table', {
            height: 288 //设置高度
        });

        //转换静态表格
        table.init('charge-add-table', {
            //height: 288 //设置高度
            limit: 2000
        });


    });


    function mysearch() {
        var date_e = $("#date_e").val();
        var date_b = $("#date_b").val();
        var type = $("#type").val();
        window.location.href = "/admin/registeruserprovince?master_url=/admin/registeruserprovince&token=<?php echo htmlentities($token); ?>&date_e=" + date_e + "&date_b=" + date_b + '&type='+type;
    }


</script>


</body>
</html>
