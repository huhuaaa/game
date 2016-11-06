<?php
namespace ajax;
class RegisterController extends \Controller {

    /**
     * 注册接口
     */
    public function postAction(){
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('password');
        $nickname = $this->request->getPost('nickname');
        $auth = $this->request->getPost('auth');
        $success = FALSE;
        if($auth == $this->session->get('registerAuth')){
            if(preg_match_all('/^[a-z]([0-9a-z_]{3,19})$/', $username)){
                if(strlen($password) > 6){
                    $user = new UserModel();
                    $user->username = $username;
                    $salt = UserModel::createSalt();
                    $user->setPassword(md5($salt.$password.$salt));
                    $user->salt = $salt;
                    $user->nickname = $nickname;
                    if($user->save()){
                        $success = TRUE;
                    }
                }
            }
        }
        $this->ajaxOutput(NULL, !$success ? \AjaxCode::FAILED: \AjaxCode::SUCCESS);
    }

    /**
     * 注册用户名检验接口
     */
    public function checkUsernameAction(){
        $username = $this->request->get('username');
        $success = FALSE;
        if(preg_match_all('/^[a-z]([0-9a-z_]{3,19})$/', $username)){
            $user = \UserModel::findFirst(Array(
                'conditions' => 'username = ?1',
                'bind' => Array('1'=>$username)
                ));
            $success = empty($user);
        }
        $this->ajaxOutput(NULL, !$success ? \AjaxCode::FAILED: \AjaxCode::SUCCESS);
    }
    
    /**
     * 注册用户昵称检验接口
     */
    public function checkNicknameAction(){
        $nickname = $this->request->get('nickname');
        $success = false;
        if(mb_strlen($nickname) <= 10){
            $user = \UserModel::findFirst(Array(
                'conditions' => 'nickname = ?1',
                'bind' => Array('1'=>$nickname)
            ));
            $success = empty($user);
        }
        $this->ajaxOutput(NULL, !$success ? \AjaxCode::FAILED: \AjaxCode::SUCCESS);
    }

    /**
     * 获取注册权限码
     */
    public function authAction(){
        $auth = strtoupper(substr(uniqid(), -4));
        $this->session->set('registerAuth', $auth);
        $this->response->setHeader('Content-Type', 'Image/PNG');
        $this->response->setHeader('Expires', '-1');
        $this->response->setHeader('Cache-Control', 'no-store, private, post-check=0, pre-check=0, max-age=0');
        $width = 70;
        $height = 30;
        $img = imagecreate($width, $height);
        $black = imagecolorallocate($img, 0, 0, 0);
        $gray = imagecolorallocate($img, 200, 200, 200);
        // 灰色背景
        imagefill($img, 0, 0, $gray);
        // 随机绘制几条虚线，起干扰作用
        $style = Array (
            $black, $black, $black, $black, $black,
            $gray, $gray, $gray, $gray, $gray
        );
        imagesetstyle($img, $style);
        $lineCount = 6;
        while($lineCount > 0){
            $y1 = rand(1, $height);
            $y2 = rand(1, $height);
            imageline($img, 0, $y1, $width, $y2, IMG_COLOR_STYLED);
            $lineCount--;
        }
        // 在画布上随机生成大量黑点，起干扰作用;
        for ($i = 0; $i < 80; $i++) {
            imagesetpixel($img, rand(0, $width), rand(0, $height), $black);
        }
        // 输出文字
        $strx = rand(10, 20);
        for ($i = 0; $i < strlen($auth); $i++) {
            $strpos = rand(1, 15);
            imagechar($img, 10, $strx, $strpos, $auth[$i], $black);
            $strx += rand(8, 12);
        }
        // 输出图片
        imagepng($img);
        // 销毁图片
        imagedestroy($img);
    }
}