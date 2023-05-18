<?php

namespace app\admin\service;

use app\admin\model\GiftCollectionListModel;

class GiftCollectionListService
{
    protected static $instance;

    protected $pagenum = 20;
    //单例
    public static function getInstance()
    {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function addOrUpdate($data, $where = [])
    {
        if (empty($where)) {
            $res = GiftCollectionListModel::getInstance()->getModel()->insertAll($data);
        } else {
            $res = GiftCollectionListModel::getInstance()->getModel()->where([$where])->update($data);
        }
        return $res;
    }

    //推广渠道列表
    public function getList($page, $where)
    {
        $offset = ($page - 1) * $this->pagenum;
        $count = GiftCollectionListModel::getInstance()->getModel()->where($where)->count();
        $list = GiftCollectionListModel::getInstance()->getModel()
            ->where($where)
            ->order('id desc')
            ->limit($offset, $this->pagenum)
            ->select()
            ->toArray();
        $page_array['page'] = $page;
        $page_array['total_page'] = ceil($count / $this->pagenum);
        return ['page_array' => $page_array, 'list' => $list];
    }
}