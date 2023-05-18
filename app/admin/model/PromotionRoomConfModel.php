<?php
namespace app\admin\model;

use app\core\mysql\ModelDao;

class PromotionRoomConfModel extends ModelDao
{
    protected $table = 'zb_promote_room_conf';
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
