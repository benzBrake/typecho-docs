# header.php

## 编码

打开这个文件，见到的第一个 php 代码就是：

```php
<meta charset="<?php $this->options->charset(); ?>">
```

泽泽原话：~~调用默认的编码，现在最经常用都是 utf-8 吧。所以我通常是直接写成 utf-8，省去 php 处理时间。~~

我的建议是，没必要去掉，博客又不是什么大流量网站，这点性能损失又不算啥。当然，自己玩玩怎么搞都行，不过如果是给被人用，不动最好。

### 页面标题

```php
<?php $this->archiveTitle(array(
            'category'  =>  _t('分类 %s 下的文章'),
            'search'    =>  _t('包含关键字 %s 的文章'),
            'tag'       =>  _t('标签 %s 下的文章'),
            'author'    =>  _t('%s 发布的文章')
        ), '', ' - '); ?><?php $this->options->title(); ?>
```

`<?php $this->archiveTitle(); ?>`是当前页面的标题，`<?php $this->options->title(); ?>`是网站的标题。`archiveTitle()`接收第一个参数用于格式化标题，格式是键值对（PHP 数组就是键值对），键名表示归档页类型，值则是标题模板，Typecho 会自动替换`%s`为归档关键字。

## 导入样式

```php
<link rel="stylesheet" href="<?php $this->options->themeUrl('style.css'); ?>">
```

其中 style.css 是样式表文件相对模板目录的路径和文件名。

## 其它 HTML 头部信息

```php
<?php $this->header(); ?>
```

这是 Typecho 的自有函数，会输出 HTML 头部信息；同时这个也是头部插件接口，有了它插件可以向网站头部插入 css 或者 js 代码。

## 网站名称与 logo

```html
<?php if ($this->options->logoUrl): ?>
<a id="logo" href="<?php $this->options->siteUrl(); ?>">
  <img
    src="<?php $this->options->logoUrl() ?>"
    alt="<?php $this->options->title() ?>"
  />
</a>
<?php else: ?>
<a id="logo" href="<?php $this->options->siteUrl(); ?>"
  ><?php $this->options->title() ?></a
>
<p class="description"><?php $this->options->description() ?></p>
<?php endif; ?>
```

第一句的 if 判断是判断模板是否通过模板设置设置了 logo 的地址，如果设置了就显示 logo 图片，否则就显示博客标题。
`<?php $this->options->siteUrl(); ?>`是网站地址
`<?php $this->options->title() ?>`是网站名字
`<?php $this->options->description() ?>`是网站描述。
Logo 部分的讲解将会在**functions.php**章节中详细讲解。

## 站内搜索

```php
<form id="search" method="post" action="<?php $this->options->siteUrl(); ?>" role="search">
    <label for="s" class="sr-only"><?php _e('搜索关键字'); ?></label>
    <input type="text" id="s" name="s" class="text" placeholder="<?php _e('输入关键字搜索'); ?>"/>
    <button type="submit" class="submit"><?php _e('搜索'); ?></button>
</form>
```

当你的文章很多很多，这个搜索就必不可少。美化搜索框不要动 form action 和  input name，action 和 name 是必须这么写的。

## 页面导航

```html
<nav id="nav-menu" class="clearfix" role="navigation">
    <a<?php if ($this->is('index')): ?> class="current"<?php endif; ?>
        href="<?php $this->options->siteUrl(); ?>"><?php _e('首页'); ?></a>
    <?php \Widget\Contents\Page\Rows::alloc()->to($pages); ?>
    <?php while ($pages->next()): ?>
        <a<?php if ($this->is('page', $pages->slug)): ?> class="current"<?php endif; ?>
            href="<?php $pages->permalink(); ?>"
            title="<?php $pages->title(); ?>"><?php $pages->title(); ?></a>
    <?php endwhile; ?>
</nav>
```
其中`<?php $this->options->siteUrl(); ?>`是网站地址，
`\Widget\Contents\Page\Rows::alloc()`是获取所有页面，然后下面的 while 循环是循环输出独立页面的，其中`<?php $pages->permalink(); ?>`是独立页面的超链接，`<?php $pages->title(); ?>`是独立页面的标题。