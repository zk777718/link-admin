<?php
namespace app\admin\model;

use app\core\mysql\ModelDao;

class RoomPromotionStatsModel extends ModelDao
{
    protected $table = 'bi_days_room_promotion_stats';
    protected $pk = 'id';
    protected static $instance;
    protected $serviceName = 'bi';

    //单例
    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new RoomPromotionStatsModel();
        }
        return self::$instance;
    }

}
