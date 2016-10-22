<?php
class Controller extends \Phalcon\Mvc\Controller{

    /**
     * 初始化函数
     */
    protected function initialize(){
        // echo 1;
    }
    /**
     * 获取当前登陆用户，SESSION
     */
    protected function getLoginUser(){
        return $this->session->get('loginUser');
    }

    /**
     * 设置当前登陆用户，SESSION
     */
    protected function setLoginUser($user = NULL){
        if($user){
            $this->session->set('loginUser', $user);
        }else{
            $this->session->remove('loginUser');
        }
        return $this;
    }

    /**
     * 检验登陆，未登陆则跳转到登陆页面
     */
    protected function checkLogin(){
        if(!$this->session->has('loginUser')){
            $this->response->redirect('/login');
        }
        return $this;
    }

    /**
     * 检验登陆，用于ajax请求，未登陆则返回未登录的状态信息
     */
    protected function ajaxCheckLogin(){
        if(!$this->session->has('loginUser')){
            $this->ajaxOutput(Array(), -200, 'need login!');
        }
    }

    /**
     * 获取当前登陆用户的完整信息，数据库读取
     */
    protected function getLoginUserFull(){
        
    }

    /**
     * ajax结果输出，返回json数据
     * @param Array  $data 返回的数据数组
     * @param Int    $code 返回的信息代码，1表示成功、0表示失败，－200表示未登陆
     * @param String $msg  返回的提示信息
     * @return $this
     */
    protected function ajaxOutput($data = Array(), $code = 0, $msg = ''){
        $this->response->setJsonContent(Array(
            'data' => $data,
            'code' => $code,
            'msg'  => $msg
        ));
        $this->response->send();
    }
}