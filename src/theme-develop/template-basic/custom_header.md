# 自定义头部信息输出
## 默认输出
在默认的模板中，头部信息的输出的结果是这样的
```html
<meta name="description" content="Just So So ..." />
<meta name="keywords" content="typecho,php,blog" />
<meta name="generator" content="Typecho 0.8/10.8.15" />
<meta name="template" content="default" />
<link rel="pingback" href=".../action/xmlrpc" />
<link rel="EditURI" type="application/rsd+xml" title="RSD" href=".../action/xmlrpc?rsd" />
<link rel="wlwmanifest" type="application/wlwmanifest+xml" href=".../action/xmlrpc?wlw" />
<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href=".../feed/" />
<link rel="alternate" type="application/rdf+xml" title="RSS 1.0" href=".../feed/rss/" />
<link rel="alternate" type="application/atom+xml" title="ATOM 1.0" href=".../feed/atom/" />
```
## 操作函数
打开模板中的 header.php 文件，找到下面这句
```php
<?php $this->header(); ?>
```
加上你要设置的参数即可，比如：
```php
<?php $this->header('keywords=&generator=&template=&pingback=&xmlrpc=&wlw='); ?>
```
以上代码即可过滤关键词、程序、模板名称、文章引用、离线写作等信息的输出，具体效果如下。