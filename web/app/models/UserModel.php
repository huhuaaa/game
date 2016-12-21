<?php
use Phalcon\Mvc\Model\Behavior\SoftDelete;

class UserModel extends Phalcon\Mvc\Model {

    protected $id; //用户ID
    public $username;
    protected $password; //密码加密串
    public $salt; //密码混淆加密串
    public $nickname; //用户昵称
    public $integral; //积分
    public $cash; //现金
    public $createtime;
    protected $isdelete; //是否已经删除了

    // 用于软删除的声明
    const DELETED = 0;
    const NOT_DELETED = 1;

    function initialize(){
        $this->setSource("user");
        // 声明软删除行为
        $this->addBehavior(
            new SoftDelete(
                [
                    "field" => "isdelete",
                    "value" => UserModel::DELETED,
                ]
            )
        );
    }

    /**
     * 转化为数组(保护敏感信息)
     *
     */
    public function toArray($columns = NULL){
        $arr = parent::toArray($columns);
        unset($arr['id']);
        // unset($arr['username']);
        unset($arr['salt']);
        unset($arr['password']);
        unset($arr['isdelete']);
        return $arr;
    }

    /**
     * 获取密码方法，密码属性为私有
     */
    public function getPassword(){
        return $this->password;
    }

    public function setPassword($password){
        $this->password = $password;
        return $this;
    }

    /**
     * 生成用户ID
     */
    public static function createUserid(){
        return md5(uniqid(TRUE, MacId).uniqid());
    }

    /**
     * 创建密码加密串
     */
    public static function createSalt(){
        return substr(uniqid(), -4);
    }
}