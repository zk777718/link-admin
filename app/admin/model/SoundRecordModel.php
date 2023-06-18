<?php

namespace app\admin\model;

use app\core\mysql\ModelDao;

class SoundRecordModel extends ModelDao
{
    protected $table = 'zb_sound_record';
    protected $pk = 'id';
    protected static $instance;
    protected $serviceName = 'commonMaster';

    //单例
    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new SoundRecordModel();
        }
        return self::$instance;
    }

    public function getByWhere($where, $field)
    {
        return $this->getModel()->field($field)->where($where)->find();
    }

    public function addSoundRecord($data)
    {
        return $this->getModel()->insert($data);
    }

    public function soundRecordList($where, $offset, $limit)
    {
        return $this->getModel()->where($where)->order('id', 'desc')->limit($offset, $limit)->select()->toArray();
    }
    public function exitSoundRecord($where, $data)
    {
        return $this->getModel()->where($where)->update($data);
    }
}
