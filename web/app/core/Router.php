<?php
/**
 * 自定义路由类
 */
class Router extends \Phalcon\Mvc\Router{

    public function __construct(){
        // 继承父类构造函数
        parent::__construct();

        $this->initialize();
    }

    public function initialize(){
        // Not Found
        $this->notFound(Array(
            'controller' => 'Index',
            'action' => 'err404'
        ));
    }
}