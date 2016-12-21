var debug = {
    version: '1.0.0',
    domain: 'http://local.game.com'
}

//commonjs模块化支持
fis.hook('commonjs', {
    baseUrl: '.',
    extList: ['.js', '.jsx', '.es6', '.ts', '.tsx', '.vue']
});

/**
 * 业务逻辑目录{desktop,mobile}
 * node_modules目录开启模块化支持和同名依赖
 */
fis.match('**.{js,jsx,vue}', {
    isMod: true,
    useSameNameRequire: true
});

/**
 * node_modules下面的包资源id支持简写
 */
fis.match('/node_modules/(**.js)', {
    id : '$1',
    isMod: true,
    useSameNameRequire: true
});

// 禁用components
fis.unhook('components')
fis.hook('node_modules', {
    useDev: true
})

/**
 * babel es6=>es5
 */
fis.match('(**).{js,jsx}', {
    rExt: 'js',
    isMod: true,
    useSameNameRequire: true,
    parser: [
    	fis.plugin('babel-5.x',{
	    	compact: false
	    }, 'append')
	]
});

/**
 * less解析
 */
fis.match('**.less', {
	parser: fis.plugin('less'),
	// 自动追加css浏览器特性前缀
	postprocessor: fis.plugin('autoprefixer', {
		"browsers": "> 1%, last 2 versions, Firefox ESR",
		"cascade": true
	}),
	isCssLike: true,
	rExt: '.css'
});

/**
 * 添加css和image模块化加载支持
 * import 'font-awesome.css' 或 require('font-awesome.css')
 */
fis.match('*.{js,ts,es6,vue,jsx}', {
    preprocessor: [
      fis.plugin('js-require-css'),
      fis.plugin('js-require-file', {
        useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
      })
    ]
});

/**
 * jsx模块解析
 */
// fis.match(/\/(.*)\.jsx$/, {
// 	parser: [fis.plugin('react')],
// 	id: '$1',
// 	rExt: '.js',
// 	isJsLike: true,
// 	isMod: true,
// 	useSameNameRequire: true
// });

//mod.js放到最前面
fis.match('/common/mod.js', {
	isMod: false,
	isJsLike: true,
	packOrder: -100
});

//设置顺序，让flexible在最前面避免样式覆盖的问题
fis.match('/common/flexible.{js,css,less}', {
	packOrder: -100
});

/**
 * loader分析依赖并自动引入资源。
 */
fis.match('::package', {
    postpackager: fis.plugin('loader',{
        // allInOne: false
    }),
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
});


/**
 * debug
 */
fis.media('debug').match('*', {
    release: '/static/' + debug.version + '$0',
    domain: debug.domain,
    deploy: fis.plugin('local-deliver', {
		to: '../public/'
	})
}).match('**.html', {
    release: '/$0'
}).match('**.{js,jsx,html,php}', {
    parser: fis.plugin('config', {file: 'config/debug.json', keys: {version: debug.version}}, 'append')
})

