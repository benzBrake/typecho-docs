# Typecho 常量

 这些常量一般都在`config.inc.php`里定义

| 序号 | 常量名                      | 常量值类型 | 功能                |
| ---- | --------------------------- | ---------- | ------------------- |
| 1    | \__TYPECHO_DEBUG__          | bool       | 开启 DEBUG 模式     |
| 2    | \__TYPECHO_ADMIN_DIR__      | string     | 定义后台路径        |
| 3    | \__TYPECHO_SECUER__         | bool       | 强制 HTTPS          |
| 4    | \__TYPECHO_GRAVATR_PREFIX__ | string     | Gravatar 服务器前缀 |
| 5    | \__TYPECHO_UPLOAD_DIR__     | string     | 附件上传路径        |

## \__TYPECHO_DEBUG__

做第三方开发必须打开的，报错信息会更加详细，方便找到开发错误点，然后在`config.inc.php`添加这一行：

```php
define('__TYPECHO_DEBUG__', true);
```

##   \__TYPECHO_ADMIN_DIR__

后台路径字定义，用于修改程序后台地址，提高安全性。 **typecho**默认后台地址是**admin**，如果我们想改成**typecho-admin**，那么首先登陆服务器把**admin**文件夹名字改成**typecho-admin**。然后在`config.inc.php`修改一下对应行即可
```php
...
define('__TYPECHO_ADMIN_DIR__', '/admin/'); // [!code --]
define('__TYPECHO_ADMIN_DIR__', '/admin/typecho-admin'); // [!code ++]
...
```

## \__TYPECHO_SECUER__

默认情况下，当你用**https**的时候**typecho**会自动识别的，但是因为大家的环境千差万别，会有识别错误的情况，比如你**https**都布置好了，但是程序依旧只会加载**http**的，所以该常量的作用就是强制程序使用**https**，解决识别错误的情况。在`config.inc.php`添加这一行：

```php
define('__TYPECHO_SECUER__', true);
```

##   \__TYPECHO_GRAVATR_PREFIX__

**Typecho** 用的 **Gravatar** 的公共头像地址，**Gravatar** 的服务器在美国，虽然它在全世界做镜像，但是在国内依旧很慢。所以建议修改为国内的镜像地址，比如使用<https://cravatar.cn/avatar/>，在`config.inc.php`添加这一行：

```php
define('__TYPECHO_GRAVATR_PREFIX__', 'https://cravatar.cn/avatar');
```

### 常用的 Gravatar 镜像

| 序号 | 镜像                              | 备注                           |
| ---- | --------------------------------- | ------------------------------ |
| 1    | https://cravatar.cn/avatar        | 支持显示 QQ 头像               |
| 2    | https://gravatar.webp.se/avatar/  | 此源会把头像转换为 Webp        |
| 3    | https://cdn.v2ex.com/gravatar/    |                                |
| 4    | https://gravatar.loli.net/avatar/ |                                |
| 5    | https://weavatar.com/avatar/      | 支持显示 QQ 头像，支持上传头像 |

## \__TYPECHO_UPLOAD_DIR__

定义附件上传路径。比如从 WordPress 转过来后想沿用原来的上传你路径。

```php
define('__TYPECHO_UPLOAD_DIR__', '/wp-content/uploads/');
```

## \__TYPECHO_UPLOAD_URL__

如果你使用了外部的附件服务器或者CDN，可以使用该常量来定义附件网址前缀。

```php
define('__TYPECHO_UPLOAD_URL__', 'https://xxxxx.upyun.com');
```



