<?php
//对账数据

namespace app\admin\model;

use app\core\mysql\ModelDao;

class AnchorCpPromotionModel extends ModelDao
{
    protected $table = 'bi_anchor_cp_promotion';
    protected $pk = 'id';
    protected static $instance;
    protected $serviceName = 'bi';

    //单例
    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

}
