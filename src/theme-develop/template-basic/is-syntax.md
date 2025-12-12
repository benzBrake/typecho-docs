# 神奇的 is 语法

在前端页面可通过`$this-is('xxx')`的方式来判定所在页面，比如

```php
$this->is('index');  // 判断首页
$this->is('archive'); //判断 archive
$this->is('single'); // 判断正文页面 page/post
$this->is('page'); // 判断独立页面 page
$this->is('post'); // 判断文章页面 post
$this->is('category'); // 判断分类页面
$this->is('tag'); // 判断标签页面
$this->is('front'); // 判断文章列表页面
$this->is('attachment'); //判断附件页面
```

以后如果有新增的，可以查看源码自行获取：<https://github.com/typecho/typecho/blob/master/var/Widget/Archive.php>（搜索$handles）。

::: warning 注意
当你在Typecho后台**设置→阅读**中设置将某个独立页面作为首页后，那么原来的首页(文章列表页)就不能用`$this->is('index');`去判断了，而是使用`$this->is('front');`进行判断。
:::

## 分类，页面，文章还可以这样判断

```php
$this->is('category', 'default'); // 判断分类缩略名等于 default
$this->is('page', 'start'); // 判断独立页面缩略名等于 start
$this->is('post', 1); // 判断文章cid等于1
```

需要注意的是，后面的参数是分类、页面的缩略名或者 id

## 完整使用实例

```php
<?php if ($this->is('post')) : ?>
如果是文章页面就会显示这里的文字
<?php endif; ?>
```



