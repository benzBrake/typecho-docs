# 手动安装

当前 Typecho 的最新稳定版为 1.2.1，点此[下载正式版](https://github.com/typecho/typecho/releases/download/v1.2.1/typecho.zip)

## 必备条件 ⚠️

1. [PHP 7.2](http://www.php.net/)以上
2. [MySQL](http://mysql.com/)、[PostgreSQL](http://www.postgresql.org/) 或 [SQLite](http://sqlite.org/) 任意一种数据库支持，并在 PHP 中安装了相关扩展
3. cURL 或者 Socket 扩展支持
4. mbstring 或者 iconv 扩展支持

安装 Typecho 的过程和大多数博客程序没有什么不同，整个安装过程只需要你根据安装向导依次完成即可。安装中若遇到问题，可以随时到 Typecho 的[社区](http://forum.typecho.org/)寻求帮助

## 安装向导

### 解压缩安装包

解压缩后你会看到如下的目录结构

```
/admin/
/install/
/usr/
/var/
/license.txt
/index.php
/install.php
```

### 上传至服务器 WEB 目录

将上面列出的所有文件和目录上传到服务器上的指定目录，如 DocumentRoot 目录或者任何你希望安装 typecho 的目录。

### 访问你的 blog 地址

访问你的 blog 地址，会看到 Typecho 的安装向导，按照向导提示依次完成即可。

### 填写配置信息

按照程序安装向导的要求填写相关服务器参数和初始化设置信息，完成后点击下一步。

### 完成安装

在安装成功界面中会显示自动生成的初始登录密码，请务必牢记或马上进入后台按提示更改。已经大功告成，祝您 Typecho 使用愉快！:)

**万一不慎丢失初始密码可以删除安装目录下生成的 config.inc.php 文件，然后重新安装选择保留原有数据库即可。**
