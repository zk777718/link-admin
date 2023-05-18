<?php

namespace app\admin\model;

use app\core\mysql\ModelDao;

class TurntableReUserGiftModel extends ModelDao
{
    protected $table = 'yyht_turntable_re_user_gift';
    protected $pk = 'id';
    protected static $instance;
    protected $serviceName = 'bi';

    //单例
    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new TurntableReUserGiftModel();
        }
        return self::$instance;
    }
}
