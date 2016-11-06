<?php
/**
 * 默认控制器
 */
class IndexController extends Controller{
    /**
     * 首页
     */
    public function indexAction(){
        echo UserModel::createUserid();
        $user = UserModel::findFirst(1);
        var_dump($user);
        echo '<h1>Hello!</h1>';
    }

    /**
     * 404错误页面
     */
    public function err404Action(){
        //Setting a raw header
        $this->response->setRawHeader("HTTP/1.1 404 Not Found");
    }
}