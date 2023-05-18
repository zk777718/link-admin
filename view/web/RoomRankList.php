<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<title>Mua家族争霸赛</title>
		<script src="/web/js/mui.min.js"></script>
		<link href="/web/css/mui.min.css" rel="stylesheet" />
		<link href="/web/css/new_file.css" rel="stylesheet" type="text/css" />
		<!-- <script src="lottie.js"></script> -->
		<script type="text/javascript" charset="utf-8">
			mui.init();
		</script>
		<style type="text/css">
			.notScroll{overflow: hidden;position:fixed;left:0;top:0;}
			.scroll{overflow-y:auto;position: static;}
			.ov{overflow: hidden;}
		</style>		
		<style type="text/css">
			.mui-table-view:before {
				position: absolute;
				right: 0;
				left: 0;
				height: 0px !important;
				content: '';
				-webkit-transform: scaleY(.5);
				transform: scaleY(.5);
				background-color: #c8c7cc;
				top: -1px;
			}
			
			.flex-container {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				width: 89%;
				margin: 0 auto;
			}
			
			.flex-container .flex-item {
				width: 37%;
				margin: 1vw 0;
				margin-left: 8vw;
				/* background-color:lightsalmon; */
			}
			
			.mui-col-sm-4 {
				height: 38vw;
			}
			
			.mui-table-view:after {
				position: absolute;
				right: 0;
				bottom: 0;
				left: 0;
				height: 0px !important;
				content: '';
				-webkit-transform: scaleY(.5);
				transform: scaleY(.5);
			}
			
			img {
				display: block;
			}
			
			.mui-table-view-cell:after {
				height: 0
			}
		</style>
	</head>

	<body>
		<!-- banner -->
		<div class="banner">
			<img class="bannerbg" src="{$url}/shiyi/banner.png" />
			<button type="button" onclick="dianwo()" class="button">规则与奖励</button>
		</div>
		<!-- 排行榜 -->
		<img class="bordertop" src="{$url}/shiyi/title.png" />
		<div class="taskRules">
			<div class="itemul">
				<!-- 排行榜第一名 -->
				<div style="margin-top: 0vw;height: 62vw;">
					<img src="{$url}/shiyi/top1.png" alt="" class="ranking-img" />
					<div class="task3" style="float: left;margin-top: 15%;width: 22vw;margin-left: 37%;height: 31vw;position: relative;">
                        <img class="taskRules-hean-img" src="{$url}/shiyi/banner.png" />
						<div>
							<p class="taskRules-hean-font">啦拉拉啦啦啦</p>
						</div>
						<div class="taskRules-hean-box">
							1.28万
						</div>
					</div>
				</div>
				<!--排行榜前九名-->
                {foreach $list as $key=>$vo }
                    <div class="task4">
                        <div class="task-list-number">{$key}</div>
                        <img class="task-list-img" src="{$vo.room_image}" alt="" />
                        <div class="task-list-name1">{$vo.room_name}</div>
                        <div class="task-list-name">{$vo.room_id}</div>
                        <div class="task-list-integrals">{$vo.coin}积分</div>
                    </div>
                {/foreach}
				<!--<div class="task4">
					<div class="task-list-number">03</div>
					<img class="task-list-img" src="/web/images/banner.png" alt="" />
					<div class="task-list-name1">啦啦啦啦啦啦</div>
					<div class="task-list-name">ID：22222</div>
					<div class="task-list-integrals">12000积分</div>
				</div>
				<div class="task4">
					<div class="task-list-number">04</div>
					<img class="task-list-img" src="/web/images/banner.png" alt="" />
					<div class="task-list-name1">啦啦啦啦啦啦</div>
					<div class="task-list-name">ID：22222</div>
					<div class="task-list-integrals">12000积分</div>
				</div>
				<div class="task4">
					<div class="task-list-number">05</div>
					<img class="task-list-img" src="/web/images/banner.png" alt="" />
					<div class="task-list-name1">啦啦啦啦啦啦</div>
					<div class="task-list-name">ID：22222</div>
					<div class="task-list-integrals">12000积分</div>
				</div>
				<div class="task4">
					<div class="task-list-number">06</div>
					<img class="task-list-img" src="/web/images/banner.png" alt="" />
					<div class="task-list-name1">啦啦啦啦啦啦</div>
					<div class="task-list-name">ID：22222</div>
					<div class="task-list-integrals">12000积分</div>
				</div>
				<div class="task4">
					<div class="task-list-number">07</div>
					<img class="task-list-img" src="/web/images/banner.png" alt="" />
					<div class="task-list-name1">啦啦啦啦啦啦</div>
					<div class="task-list-name">ID：22222</div>
					<div class="task-list-integrals">12000积分</div>
				</div>
				<div class="task4">
					<div class="task-list-number">08</div>
					<img class="task-list-img" src="/web/images/banner.png" alt="" />
					<div class="task-list-name1">啦啦啦啦啦啦</div>
					<div class="task-list-name">ID：22222</div>
					<div class="task-list-integrals">12000积分</div>
				</div>
				<div class="task4">
					<div class="task-list-number">09</div>
					<img class="task-list-img" src="/web/images/banner.png" alt="" />
					<div class="task-list-name1">啦啦啦啦啦啦</div>
					<div class="task-list-name">ID：22222</div>
					<div class="task-list-integrals">12000积分</div>
				</div>
				<div class="task4">
					<div class="task-list-number">10</div>
					<img class="task-list-img" src="/web/images/banner.png" alt="" />
					<div class="task-list-name1">啦啦啦啦啦啦</div>
					<div class="task-list-name">ID：22222</div>
					<div class="task-list-integrals">12000积分</div>
				</div>-->
			</div>
		</div>
		<img class="bordertop" src="/web/images/bottom_star.png" />
		</div>
		<!-- 排行榜结束 -->
		<!-- 弹窗 -->
		<div class="zhezhao" id='zhezhao' style="display: none;">
			<div class="tankuang" style="overflow: hidden;height: 100%;">
				<img class="bordertop" src="/web/images/top_popup.png" />
				<!-- 规则与奖励 -->
				<!-- 1、指定礼物 -->
				<div id="header" style="height: 74%;width: 99.8%; padding-top: 5vw;" class="mui-row1 popup ov">
					<span class="text-t"><span class="li1">1</span>指定礼物</span>		
						<img class="imgift" src="/web/images/gift2.png" />
					<div class="flex-container">
						<div class="flex-item">
							<p style="text-align: center; color: #000000; font-size: 3vw;">70周年</p>
						</div>
						<div class="flex-item">
							<p style="text-align: center; color: #000000; font-size: 3vw;">庆国庆</p>
						</div>
					</div>
					<p class="text-p"><span class="li2"></span>活动不需要报名，收指定礼物即可</p>
					<p class="text-p"><span class="li2"></span>房间收取指定礼物即可参加比赛，1M豆=1积分</p>
					<p class="text-p" style="color: #ff013c;"><span class="li3"></span>10月1日收礼双倍积分，1M豆等于2积分</p>
					<p class="text-p" style="color: #ff013c; margin-bottom: 5vw;"><span class="li3"></span>10月7日礼积分减半，1M豆=0.5积分</p>
					<!-- 活动奖励 -->
					<span class="text-t"><span class="li1">2</span>活动奖励</span>
					<img class="imgift" src="/web/images/gift.png" />
					<p class="text-p" style="margin-bottom: 5vw;"><span class="li2"></span>第一名：房间靓号8888+10万人民币+定制奖杯（万元定制）</p>

					<!-- 注意事项 -->
					<span class="text-t"><span class="li1">3</span>注意事项</span>
					<p class="text-p"><span class="li2"></span>奖励将发送至参加比赛房间，不可更换</p>
					<p class="text-p"><span class="li2"></span>该活动只统计指定礼物，（其余礼物送、收无效，但不影响正常收益）</p>
					<p class="text-p" style="padding-bottom: 5vw;"><span class="li2"></span>严禁利用bug等恶意刷榜，一经发现直接取消比赛资格</p>
				</div>
				<img class="bordertop" src="/web/images/bottom_popup.png"/>
				<div id="header-right" onclick="hidder()"><img class="bordertop" src="/web/images/close.png"/></div>
			</div>
		</div>
		<!-- 弹窗结束 -->
		<div style="font-size: 3vw;text-align: center;padding: 3vw;color: rgba(255,255,255,0.8);">本活动与苹果公司无关</div>
	</body>
    <script type="text/javascript">
		document.getElementById('zhezhao').style.display = "none";

		function dianwo() {
			document.getElementById('zhezhao').style.display = "block";
			// 遮罩出来后让body不可滚动  
		    mui('body,html')[0].classList.add('notScroll');
		    mui('#header')[0].classList.remove('ov');
		    mui('#header')[0].classList.add('scroll');
		}

		function hidder() {
			document.getElementById('zhezhao').style.display = "none";
			// 遮罩去掉之后body 可滚动  
		    mui('body,html')[0].classList.remove('notScroll');
		    mui('#header')[0].classList.remove('scroll');
		    mui('#header')[0].classList.add('ov');
		}
		

		//----------------------------  

		
	</script>
</html>