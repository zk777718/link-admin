<?php
/**
 * @author ly
 * 帖子表
 * $date 2019
 */

namespace app\admin\model;

use app\core\mysql\ModelDao;

class RoomUserBlackModel extends ModelDao
{
    protected $table = 'zb_room_user_black';
    protected $pk = 'id';
    protected static $instance;
    protected $serviceName = 'commonMaster';

    //单例
    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new RoomUserBlackModel();
        }
        return self::$instance;
    }

}
