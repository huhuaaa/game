CREATE TABLE `user` (
  `id` varchar(32) CHARACTER SET utf8 NOT NULL COMMENT '用户ID',
  `username` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '用户名',
  `password` varchar(32) CHARACTER SET utf8 NOT NULL COMMENT '密码',
  `salt` varchar(4) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码混淆加密串',
  `nickname` varchar(10) COLLATE utf8_unicode_ci NOT NULL COMMENT '昵称',
  `integral` bigint(20) NOT NULL COMMENT '积分',
  `cash` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '现金',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '用户创建时间',
  `isdelete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否已经删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`),
  UNIQUE KEY `userid_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表';
