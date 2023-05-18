<?php
namespace app\admin\script;
use app\admin\model\BiAsaUserModel;
use app\admin\model\BiHwDailyDayModel;
use app\admin\model\BiUserStats1DayModel;
use app\common\ParseUserStateByUniqkey;
use app\common\ParseUserStateDataCommmon;
use app\common\RedisCommon;
use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\Output;
use think\facade\Db;
use think\facade\Log;


//统计每天的日常数据量 日活 新增 充值人数 充值总金额
class NewHwChannelAndSourceCommand extends Command
{
    //可以自定义修改配置 保证数据库建立好对应的字段即可
    protected $config =
        [
            //新增用户留存  对应数据库字段 keep_login_xx
            'keepLoginNewUser' =>
                [
                    1 => "keep_login_1",
                    7 => 'keep_login_7',
                    15 => 'keep_login_15',
                    30 => 'keep_login_30',
                    60 => 'keep_login_60'
                ],

            //新增充值用户留存  对应数据库字段 keep_charge_xx
            'keepLoginNewChargeUser' => [
                1 => "keep_charge_1",
                3 => 'keep_charge_3',
                7 => 'keep_charge_7',
                15 => 'keep_charge_15',
                30 => 'keep_charge_30',
                60 => 'keep_charge_60',
            ],

            //新增用户付费总额 对应数据库字段 fee_register_xx
            'sumLoginNewChargeUser' => [
                7 => 'fee_register_7',
                30 => 'fee_register_30',
                60 => 'fee_register_60',
                90 => 'fee_register_90',
                //120 => 'fee_register_120',
                //150 => 'fee_register_150',
            ]
        ];


    const  UPDATE_TABLE_NAME = 'bi_hw_daily_day';
    const  UPDATE_LIMIT = 1000;
    const COMMAND_NAME = "NewHwChannelAndSourceCommand";


    protected function configure()
    {
        // 指令配置
        $this->setName('NewHwChannelAndSourceCommand')
            ->setDescription('NewHwChannelAndSourceCommand')
            ->addArgument('start_time', Argument::OPTIONAL, "start_time", date('Y-m-d'))
            ->addArgument('end_time', Argument::OPTIONAL, "end_time", date('Y-m-d',strtotime("+1 days")))
            ->addArgument('history_time', Argument::OPTIONAL, "history_time", '');
    }

    /**
     *处理每日数据
     */
    protected function dealTodayData($start)
    {
        $res = BiUserStats1DayModel::getInstance()->getModel()->alias('us')
            ->field('us.register_channel, us.source,hw.hw_taskid,hw.hw_channel')
            ->join("bi_channel_huawei hw","us.uid = hw.user_id")
            ->where('date', $start)
            ->where('promote_channel', 0)
            ->group('register_channel, source,hw_taskid,hw_channel')
            ->select()
            ->toArray();

        return $res;
    }



    protected function execute(Input $input, Output $output)
    {
        //日期	日活 	新增	新增充值人数 	新增用户次留 	七留 	十五留 	三十留	六十留	次留（新充值用户）	三留	七留	十五留	三十留	六十留
        //日期	日活	新增	新增充值人	新增充值金额	新增充值率	新增ARPU(当日新增充值金额/当日新增)	   新增ARPPU(当日新增充值金额/新增充值人数)
        //总充值人数	总充值金额
        //代冲(额)	代冲(人)	vip	充值率	ARPU(总充值金额/日活)	ARPPU(总充值金额/总充值人数)	七日付费金额	三十日付费金额
        //六十日付费  90日付费	120日付费	150日
        //end_time 应该是当前的时间节点 也就是凌晨过后的日期节点
        //如果支持每天不定时多次调用 可以调整 getTimeNode函数以及keepRecodeinit的时间节点


        $start_time = $input->getArgument('start_time');
        $end_time = $input->getArgument('end_time');
        $history_time = $input->getArgument('history_time');
        //因为间隔1个小时执行 要确保不要遗漏数据在0点过后要执行前一天的数据
        $currenthours = date('H');
        if($currenthours>= "00" and $currenthours <= "03"){
            $start_time = date("Y-m-d",strtotime("-1days"));
        }

        $dates = $this->getTimeNode($start_time, $end_time); //start_time=2021-07-10 end_time = 2021-07-11  [2021-07-10]
        $redis = RedisCommon::getInstance()->getRedis(['select' => 8]);
        $commandLockName = SELF::COMMAND_NAME . ":Lock";
        //防止定时任务重复调用
        if (!$redis->set($commandLockName, 1, ["nx", "ex" => 3600*24])) {
            Log::info(SELF::COMMAND_NAME . ":lock exists");
            return;
        }


        try {
            foreach ($dates as $date) {
                //以channel source hw_channel hw_taskid 维度的数据统计
                $lists = $this->dealTodayData($date);
                foreach($lists as $item){
                    $this->baseExecute($item,$date, date('Y-m-d', strtotime("+1days", strtotime($date))));
                }
            }

            if ($history_time) { //是否跑历史数据
                $hdate = explode('#', $history_time);
                if (!empty($hdate)) {
                    $history_dates = $this->getTimeNode($hdate[0], $hdate[1]); //start_time=2021-07-10 end_time = 2021-07-11  [2021-07-10]
                    array_push($history_dates, $hdate[1]);
                    rsort($history_dates);
                    foreach ($history_dates as $his_item) {
                        $this->keepRecodeinit($his_item);
                    }
                }

            }else{
                $this->keepRecodeinit($end_time);
            }

            $this->assSummary($start_time, $end_time);

        } catch (\Throwable $e) {
            Log::info("CalculateStatsByHwChannelAndSourceCommand:exception".$e->getMessage());
        } finally {
            $redis->del($commandLockName);
        }

    }


    //执行的基本的数据统计 不包括次留等数据
    //item 是以channel source hw_taskid hw_channel
    public function baseExecute($item,$start_time = '', $end_time = '')
    {
        $condition = [];
        $condition[] = ['date', '=', $start_time];
        $condition[]=['promote_channel','=',0];
        $condition[]=['source','=',$item['source']];
        $condition[]=['register_channel','=',$item['register_channel']];
        $condition[]=['hw_taskid','=',$item['hw_taskid']];
        $condition[]=['hw_channel','=',$item['hw_channel']];
        $currentTotalRes = ParseUserStateByUniqkey::getInstance()->parseMulData($condition, $start_time . "-hwall"); //所有的数据
        $condition[] = ['register_time', '>=', $start_time . " 00:00:00"];
        $condition[] = ['register_time', '<', $end_time . " 00:00:00"];
        $currentRegisterRes = ParseUserStateByUniqkey::getInstance()->parseMulData($condition, $start_time . "-hwregister");//新增的数据
        $data = [];
        $data['date'] = $start_time;
        $data['source'] = $item['source'];
        $data['register_channel'] = $item['register_channel'];
        $data['hw_taskid'] = $item['hw_taskid'];
        $data['hw_channel'] = $item['hw_channel'];
        $data['register_user_charge_num'] = 0;
        $regchargeUser = ParseUserStateByUniqkey::getInstance()->getChargeUsers($currentRegisterRes, 'charge');
        $regagentchargeUser = ParseUserStateByUniqkey::getInstance()->getChargeUsers($currentRegisterRes, 'agentcharge');
        $data['register_user_charge_num'] = count(array_unique(array_merge($regchargeUser, $regagentchargeUser)));//新增充值用户个数
        //$data['register_user_charge_num'] += ParseUserStateByUniqkey::getInstance()->getChargeSum($currentRegisterRes, 'charge');
        $data['register_user_charge_amount'] = 0;
        $regchargeamount = ParseUserStateByUniqkey::getInstance()->getChargeSum($currentRegisterRes, 'charge');
        $regagentchargeamount = ParseUserStateByUniqkey::getInstance()->getAgentChargeSum($currentRegisterRes, 'agentcharge');
        $data['register_user_charge_amount'] = $regchargeamount + $regagentchargeamount; //新增充值总额度
        $data['charge_money_sum'] = 0;
        $chargeamount = ParseUserStateByUniqkey::getInstance()->getChargeSum($currentTotalRes, 'charge');
        $agentchargeamount = ParseUserStateByUniqkey::getInstance()->getAgentChargeSum($currentTotalRes, 'agentcharge');
        $data['charge_money_sum'] = $chargeamount + $agentchargeamount; //充值总金额
        $data['charge_people_sum'] = 0;
        $chargeUser = ParseUserStateByUniqkey::getInstance()->getChargeUsers($currentTotalRes, 'charge');
        $agentchargeUser = ParseUserStateByUniqkey::getInstance()->getChargeUsers($currentTotalRes, 'agentcharge');
        $data['charge_people_sum'] = count(array_unique(array_merge($chargeUser, $agentchargeUser))); //充值总人数
        $data['agentcharge_amount'] = ParseUserStateByUniqkey::getInstance()->getAgentChargeSum($currentTotalRes, 'agentcharge'); //代充总金额
        $data['agentcharge_people_num'] = ParseUserStateByUniqkey::getInstance()->getChargeCount($currentTotalRes, 'agentcharge'); //代充总人数
        $data['directcharge_money_sum'] = ParseUserStateByUniqkey::getInstance()->getChargeSum($currentTotalRes, 'charge'); //直冲总金额
        $data['vip_money_sum'] = ParseUserStateByUniqkey::getInstance()->getChargeVipSum($currentTotalRes, 'charge'); //vip总金额
        $data['directcharge_people_num'] = ParseUserStateByUniqkey::getInstance()->getChargeCount($currentTotalRes, 'charge'); //直充总人数
        $today_register_user = ParseUserStateByUniqkey::getInstance()->getArrayKeyValue($currentRegisterRes, 'active_users');
        $data['register_people_num'] = count($today_register_user); //今日注册总人数
        $data['today_register_user'] = implode(",", $today_register_user); //注册用户id
        $data['daily_life'] = count(ParseUserStateByUniqkey::getInstance()->getArrayKeyValue($currentTotalRes, 'active_users')); //日活
        $data['recharge_rate'] = $this->divedFunc($data['daily_life'],$data['register_user_charge_num']); //充值人数/日活
        $data['arpu'] = $this->divedFunc($data['register_user_charge_amount'],$data['register_people_num']);
        //当日新增充值金额/新增充值人数
        ParseUserStateByUniqkey::getInstance()->insertOrUpdateModel(BiHwDailyDayModel::getInstance()->getModel(),[$data], ["date","source","register_channel","hw_taskid","hw_channel"]);
    }

    public function keepRecodeinit($end_time)
    {
        $init_where = [];
        $init_where[] = ['date', '<', $end_time];
        $page = 1;
        $historyRes = BiHwDailyDayModel::getInstance()->getModel()->where($init_where)->page($page, self::UPDATE_LIMIT)->select();
        while (!$historyRes->isEmpty()) {
            foreach ($historyRes as $item) {
                $item_date = $item['date'];
                $real_date = strtotime("-1 days", strtotime($end_time));
                $diff_day = ParseUserStateByUniqkey::getInstance()->getDiffDays(date('Y-m-d', $real_date), $item_date);
                //keepLoginNewUser  keepLoginNewChargeUser  sumLoginNewChargeUser
                //新增用户留存  对应数据库字段 keep_login_xx
                $updates = [];
                if (in_array($diff_day, array_keys($this->config['keepLoginNewUser']))) {
                    $targeDay = date("Y-m-d", $real_date);
                    $condition = [];
                    $condition[] = ['date', '=', $targeDay];
                    $condition[] = ['uid', 'in', $item['today_register_user']];
                    $condition[] = ['hw_taskid', '=', $item['hw_taskid']];
                    $condition[] = ['hw_channel', '=', $item['hw_channel']];
                    $condition[] = ['source', '=', $item['source']];
                    $condition[] = ['register_channel', '=', $item['register_channel']];
                    $condition[] = ['promote_channel','=',0];
                    $parseRegisterUserRes = ParseUserStateByUniqkey::getInstance()->parseMulData($condition, $item_date . "-login");
                    //新增用户留存的数量
                    $active_user_count = count(ParseUserStateByUniqkey::getInstance()->getArrayKeyValue($parseRegisterUserRes, 'active_users'));
                    $updates[$this->config['keepLoginNewUser'][$diff_day]] = $active_user_count;
                }

                //新增充值用户的再次登录的留存   keep_charge_1
                if (in_array($diff_day, array_keys($this->config['keepLoginNewChargeUser']))) {
                    $where = [];
                    $where[] = ['date', '=', $item['date']];
                    $where[] = ['uid', 'in', $item['today_register_user']];
                    $parseRegisterUserChargeRes = ParseUserStateByUniqkey::getInstance()->parseMulData($where, $item_date . "-charge");
                    $item_agentchargeUser = ParseUserStateByUniqkey::getInstance()->getChargeUsers($parseRegisterUserChargeRes, 'agentcharge');
                    $item_chargeUser = ParseUserStateByUniqkey::getInstance()->getChargeUsers($parseRegisterUserChargeRes, 'charge');
                    //获取充值用户
                    $item_charge_user_arr = array_unique(array_merge($item_chargeUser, $item_agentchargeUser));
                    $targeDay = date("Y-m-d", $real_date);
                    $condition = [];
                    $condition[] = ['date', '=', $targeDay];
                    $condition[] = ['uid', 'in', implode(",", $item_charge_user_arr)];
                    $parseRegisterUserRes = ParseUserStateByUniqkey::getInstance()->parseMulData($condition, $item_date . "-login");
                    $active_user_count = count(ParseUserStateByUniqkey::getInstance()->getArrayKeyValue($parseRegisterUserRes, 'active_users'));
                    $updates[$this->config['keepLoginNewChargeUser'][$diff_day]] = $active_user_count;

                }

                //新增用户的付费总额
                if (in_array($diff_day, array_keys($this->config['sumLoginNewChargeUser']))) {
                    $targeDay = date("Y-m-d", $real_date);
                    $condition = [];
                    $condition[] = ['date', '<=', $targeDay];
                    $condition[] = ['date', '>=', $item['date']];
                    $condition[] = ['uid', 'in', $item['today_register_user']];
                    $condition[] = ['hw_taskid', '=', $item['hw_taskid']];
                    $condition[] = ['hw_channel', '=', $item['hw_channel']];
                    $condition[] = ['source', '=', $item['source']];
                    $condition[] = ['register_channel', '=', $item['register_channel']];
                    $condition[] = ['promote_channel','=',0];
                    $parseRegisterUserRes = ParseUserStateByUniqkey::getInstance()->parseMulData($condition, $item_date . "-newregister");
                    $charge_amount = ParseUserStateByUniqkey::getInstance()->getChargeSum($parseRegisterUserRes, 'charge');
                    $agent_charge_amount = ParseUserStateByUniqkey::getInstance()->getAgentChargeSum($parseRegisterUserRes, 'agentcharge');
                    $amount = $charge_amount + $agent_charge_amount;
                    if ($amount > 0) {
                        $updates[$this->config['sumLoginNewChargeUser'][$diff_day]] = $amount;
                    }
                }


                //充值总今额 因为不知道数据起点 所以现在先不统计
                 $pay_amount_where=[];
                 $pay_amount_where[]= ['date','>=','2021-09-17']; //华为包的数据是从2021-09-17开始统计的
                 $pay_amount_where[]= ['date','<=',$end_time];
                 $pay_amount_where[]= ['uid','in',$item['today_register_user']];
                 $parseRegisterUserRes = ParseUserStateByUniqkey::getInstance()->parseData($pay_amount_where, $item_date . "-payment");
                 $charge_payment_up_now_amount = ParseUserStateByUniqkey::getInstance()->getChargeSum($parseRegisterUserRes, 'charge');
                 $agentcharge_payment_up_now_amount = ParseUserStateByUniqkey::getInstance()->getAgentChargeSum($parseRegisterUserRes, 'agentcharge');
                 $pay_amount_up_now = $charge_payment_up_now_amount + $agentcharge_payment_up_now_amount;
                 $updates['pay_amount_up_now'] = $pay_amount_up_now;

                if ($updates) {
                   BiHwDailyDayModel::getInstance()->getModel()->where("id", $item['id'])->update($updates);
                }

            }
            $page++;
            $historyRes = BiHwDailyDayModel::getInstance()->getModel()->where($init_where)->page($page, self::UPDATE_LIMIT)->select();
        }
    }


    /**
     * 获取时间节点列表
     * @param $start
     * @return array
     */
    public function getTimeNode($start, $enddate)
    {
        if (empty($start) || empty($enddate)) {
            return [];
        }
        if ($enddate) {
            $days = (strtotime($enddate) - strtotime($start)) / (24 * 3600);
        } else {
            $days = (strtotime(date('Y-m-d')) - strtotime($start)) / (24 * 3600);
        }

        $list = [];
        for ($i = 0; $i < $days; $i++) {
            $list[] = date('Y-m-d', strtotime($start . " +$i days"));
        }

        return $list;
    }


    //相除
    public  function divedFunc($param1,$param2,$decimal=2){
        $param2 = $param2==false ? 1 : floatval($param2) ;
        return round($param1/$param2,$decimal);
    }



    //数据汇总
    public function assSummary($begin_date,$end_date)
    {

        $dateList = ParseUserStateDataCommmon::getInstance()->getTimeNode($begin_date,$end_date);
        foreach ($dateList as $node) {
            echo $node.PHP_EOL;
            $res = BiHwDailyDayModel::getInstance()->getModel()
                ->field('today_register_user,hw_taskid,date')
                ->where('date', '=', $node)
                ->where('today_register_user', '<>', '')
                ->select()->toArray();


            foreach ($res as $item) {
                $uids = explode(",", $item['today_register_user']);
                $insertRes = [];
                $taskid =  $item['hw_taskid'] ?? 0;
                foreach ($uids as $uid) {
                    $insertRes[] = [
                        'uid' => $uid,
                        'date' => $item['date'],
                        'source' => 'huawei',
                        "iad_keyword_id"=> $taskid,
                    ];
                }
                ParseUserStateByUniqkey::getInstance()->insertOrUpdateModel(BiAsaUserModel::getInstance()->getModel(),$insertRes,["id", "uid", "date"]);
            }
        }


    }





}
