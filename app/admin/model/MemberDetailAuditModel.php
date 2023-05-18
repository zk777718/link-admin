<?php
/**
 * User: li
 * Date: 2019
 * 金币
 */
namespace app\admin\model;

use app\core\mysql\ModelDao;

class MemberDetailAuditModel extends ModelDao
{

    protected $table = 'zb_member_detail_audit';
    protected $pk = 'id';
    protected static $instance;
    protected $serviceName = 'commonMaster';

    //单例
    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

}
