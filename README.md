# game
棋牌游戏项目

## 目录结构

websocket --> websocket通信系统

web --> 网站系统

## web系统

采用phalcon框架搭建，运行系统得安装phalcon扩展库。

### 配置站点

`web/public/index.php`为网站的统一入口，public文件夹作为站点对外开放访问的根目录。根据`phalcon`框架配置访问重写到`index.php`，访问路径转变为`_url`参数。`nginx`配置样例如下：

```

server{
	root /data/github/game/web/public/;
	listen 80;
	server_name local.game.com;
	index index.html index.htm index.php;
	location / {
		if (!-e $request_filename){
			rewrite ^/(.*)$ /index.php?_url=/$1 last;
			break;
		}
		expires -1;
	}

	location ~* ^.+\.(jpg|png|gif|js|css|xml|json|swf|ico)$ {
		expires max;
	}

	location ~ \.php$ {
    	fastcgi_pass   127.0.0.1:9000;
	    fastcgi_intercept_errors on;
	    fastcgi_index  index.php;
	    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
	    include        /usr/local/etc/nginx/fastcgi_params;
    }
}

```

### 站点核心

>核心基类文件都放在`web/app/core/`目录下，主要有控制器基类`controller`、路由声明类`Router`...

#### Controller

>`Controller`基类，作为所有控制器的基类。内部统一了公共方法，用于获取登陆用户、返回数据等。具体方法请参考文件内部代码。

#### Router

>`Router`类，作为所有访问的路有声明类。在其`initialize`方法中，声明允许访问的路由规则。详情请参考`Router`内部代码。

## websocket系统

采用swoole框架搭建，运行系统得安装swoole扩展库。