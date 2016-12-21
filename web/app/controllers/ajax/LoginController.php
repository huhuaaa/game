<?php
namespace ajax;
class LoginController extends \Controller{

    /**
     * 获取密码加密组合串
     */
    public function getSaltAction()
    {
        $username = $this->request->get('username');
        $user = \UserModel::findFirst(Array('conditions'=>'username = ?1', 'bind'=>Array(1 => $username)));
        if(!empty($user)){
            $this->ajaxOutput(Array('salt'=> !empty($user) ? $user->salt : ''), \AjaxCode::SUCCESS);
        }else{
            $this->ajaxOutput(Array('username'=>$username), \AjaxCode::FAILED, '用户不存在！');
        }
    }

    /**
     * 获取当前登录状态接口
     */
    public function getAction()
    {
        if($this->isLogin()){
            $this->ajaxOutput($this->getLoginUser(), \AjaxCode::SUCCESS);
        }else{
            $this->ajaxOutput(NULL, \AjaxCode::FAILED, '未登录');
        }
    }

    /**
     * 登陆接口
     */
    public function postAction(){
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('password');
        $auth = $this->request->getPost('auth');
        $user = \UserModel::findFirst(Array('conditions'=>'username = ?1', 'bind'=>Array(1 => $username)));
        $pwd = md5($auth.$user->password.$auth);
        $success = !empty($user) && $pwd == $password;
        if($success){
            // $data = $user->toArray(Array('nickname', 'integral', 'cash'));
            $this->setLoginUser($user);
            $this->ajaxOutput($data, \AjaxCode::SUCCESS);
        }else{
            $this->ajaxOutput(NULL, \AjaxCode::FAILED, '账号或密码错误！');
        }
    }

    /**
     * 退出登录
     */
    public function outAction(){
        $this->setLoginUser()->ajaxOutput(NULL, \AjaxCode::SUCCESS);
    }
}