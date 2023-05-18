<?php /*a:1:{s:51:"/var/www/html/view/admin/chart/roomconsumelist.html";i:1684251969;}*/ ?>
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
        房间内消费图表
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

            <div class="layui-input-inline" style="width:160px">
                <select name="modules" lay-verify="required" lay-search="" id="guild_id">
                    <option value="0">=选择工会=</option>
                    <?php if(is_array($guildList) || $guildList instanceof \think\Collection || $guildList instanceof \think\Paginator): $i = 0; $__LIST__ = $guildList;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$list): $mod = ($i % 2 );++$i;?>
                    <option value="<?php echo htmlentities($list['id']); ?>" <?php if($guild_id == $list['id']): ?> echo selected="selected" <?php endif; ?>> <?php echo htmlentities($list['nickname']); ?></option>
                    <?php endforeach; endif; else: echo "" ;endif; ?>
                </select>

            </div>


            <div class="layui-input-inline">
                <input type="text" id="room_id" name="room_id" value="<?php echo htmlentities($room_id); ?>" lay-verify="required"
                       placeholder="房间ID" autocomplete="off" class="layui-input">
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
                    <div id="main" style="width: 100%;height:<?php echo htmlentities($count); ?>px;"></div>
                    <script>
                        var chartDom = document.getElementById('main');
                        var myChart = echarts.init(chartDom);
                        var option;

                        option = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    // Use axis to trigger tooltip
                                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                                }
                            },
                            legend: {},
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'value'
                            },
                            yAxis: {
                                type: 'category',
                                data: JSON.parse('<?php echo json_encode($roomNameList); ?>'),
                            },
                            series: [
                                {
                                    name: '房间消费金额',
                                    type: 'bar',
                                    stack: 'total',
                                    barWidth: '30px',
                                    label: {
                                        show: true
                                    },
                                    emphasis: {
                                        focus: 'series'
                                    },
                                    data: JSON.parse('<?php echo json_encode($formatdata); ?>'),
                                },
                            ],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    crossStyle: {
                                        color: '#999',
                                        align: 'left'
                                    }
                                },
                                textStyle: {
                                    align: 'left'
                                },
                                formatter: function (params) {
                                    returnHtml = '';
                                    returnHtml = '<div class="layui-panel"><div class="layui-card-header">消费明细</div><div style="padding:10px;">';
                                    returnHtml += "<div style='margin:5px'>直送送礼:" + params[0].data.direct_money + "¥</div>";
                                    returnHtml += "<div style='margin:5px'>背包送:" + params[0].data.pack_money + "¥</div>";
                                    returnHtml += "</div></div>"
                                    return returnHtml
                                }
                            }
                        };

                        option && myChart.setOption(option);

                        myChart.on('click', function (params) {

                        })
                    </script>


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
        var guild_id = $("#guild_id").val();
        var room_id = $("#room_id").val();
        window.location.href = "/admin/roomConsumeList?master_url=/admin/roomConsumeList&token=<?php echo htmlentities($token); ?>&date_e=" + date_e + "&date_b=" + date_b + "&guild_id=" + guild_id + "&room_id=" + room_id;
    }
</script>

</body>
</html>
