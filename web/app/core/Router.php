<?php
/**
 * 自定义路由类
 */
class Router extends \Phalcon\Mvc\Router{

    public function __construct(){
        // 继承父类构造函数
        parent::__construct(false);

        $this->initialize();
    }
    /**
     * 初始化路由，注册路由
     */
    public function initialize(){

        // default（首页）
        $this->add('/', Array(
            'controller' => 'index',
            'action' => 'index'
        ));
        
        // Not Found
        $this->notFound(Array(
            'controller' => 'Index',
            'action' => 'err404'
        ));

        // ajax
        // /ajax/Login [post] 自动匹配 \ajax\LoginController\postAction 依此类推，此类接口主要用于提交信息
        $this->addPost('/ajax/:controller',
            Array(
                'controller' => 1,
                'action' => 'post',
                'namespace' => 'ajax'
            )
        );
        // /ajax/Login [get] 自动匹配 \ajax\LoginController\getAction 依此类推，此类接口主要用于获取单个信息
        $this->addGet('/ajax/:controller',
            Array(
                'controller' => 1,
                'action' => 'get',
                'namespace' => 'ajax'
            )
        );
        // /ajax/Login [put] 自动匹配 \ajax\LoginController\putAction 依此类推，此类接口主要用于修改信息
        $this->addPut('/ajax/:controller',
            Array(
                'controller' => 1,
                'action' => 'put',
                'namespace' => 'ajax'
            )
        );
        // /ajax/Login [delete] 自动匹配 \ajax\LoginController\deleteAction 依此类推，此类接口主要用于删除
        $this->addDelete('/ajax/:controller',
            Array(
                'controller' => 1,
                'action' => 'delete',
                'namespace' => 'ajax'
            )
        );
        // /ajax/Login/list [get] 自动匹配 \ajax\LoginController\listAction 依此类推，此类接口主要用于获取列表
        $this->addGet('/ajax/:controller/list',
            Array(
                'controller' => 1,
                'action' => 'list',
                'namespace' => 'ajax'
            )
        );
    }
}