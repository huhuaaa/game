<?php
date_default_timezone_set('Asia/Shanghai');
// 标识机器号，用于多台机器分布识别。也用于生成唯一串，此编号不可重复。
define('MacId', 'Web-N1');
//Register an autoloader
$loader = new \Phalcon\Loader();
$loader->registerDirs(array(
    '../app/core',
    '../app/controllers/',
    '../app/models/'
))->register();

//Create a DI
$di = new Phalcon\DI\FactoryDefault();

//Setup the view component
$di->set('view', function(){
    $view = new \Phalcon\Mvc\View();
    $view->setViewsDir('../app/views/');
    return $view;
});

//Setup a base URI so that all generated URIs include the "tutorial" folder
// $di->set('url', function(){
//     $url = new \Phalcon\Mvc\Url();
//     $url->setBaseUri('/tutorial/');
//     return $url;
// });

//Setup the router component
$di->set('router', function(){
    $router = new Router();
    return $router;
});

//Set up the database service
$di->set('db', function(){
    return new \Phalcon\Db\Adapter\Pdo\Mysql(array(
        "host" => "localhost",
        "username" => "root",
        "password" => "",
        "dbname" => "game"
    ));
});


//Isolating the session data
$di->set('session', function(){

    //All variables created will prefixed with "my-game-web"
    $session = new Phalcon\Session\Adapter\Files(
        Array(
            'uniqueId' => 'my-game-web'
        )
    );

    $session->start();

    return $session;
});

try {
    //Handle the request
    $application = new \Phalcon\Mvc\Application($di);
    $application->response->setHeader('MacId', MacId);
    echo $application->handle()->getContent();

} catch(\Phalcon\Exception $e) {
    //  echo "PhalconException: ", $e->getMessage(););
    // put error to log, and redirect to 404
    $response = new Phalcon\Http\Response();
    $response->redirect('/404.html');
    $response->send();
}