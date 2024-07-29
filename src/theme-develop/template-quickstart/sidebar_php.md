# sidebar.php

## 最新文章列表

```php
<ul class="widget-list">
  <?php \Widget\Contents\Post\Recent::alloc()
      ->parse('<li><a href="{permalink}">{title}</a></li>'); ?>
</ul>
```

获取最新的 N 篇文章标题，得到的 html 是

```html
<ul class="widget-list">
  <li>
    <a href="http://example.com/2008/12/31/sample-post-one">文章1的标题</a>
  </li>
  <li>
    <a href="http://example.com/2008/12/31/sample-post-two">文章2的标题</a>
  </li>
  <!-- 省略n个重复 -->
  <li>
    <a href="http://example.com/2008/12/31/sample-post-ten">文章N的标题</a>
  </li>
</ul>
```

N 的值可以在后台 **设置 → 阅读 → 文章列表数目** 设置

## 最新回复列表

```php
<ul class="widget-list">
    <?php \Widget\Comments\Recent::alloc()->to($comments); ?>
    <?php while ($comments->next()): ?>
        <li>
            <a href="<?php $comments->permalink(); ?>"><?php $comments->author(false); ?></a>: <?php $comments->excerpt(35, '...'); ?>
        </li>
    <?php endwhile; ?>
</ul>
```

获取最新的 N 个回复，得到的 html 是

```html
<ul class="widget-list">
  <li>
    回复人名字:
    <a href="http://example.com/2008/12/31/sample-post#comments-12"
      >回复的内容...</a
    >
  </li>
  <li>
    回复人名字:
    <a href="http://example.com/2008/12/31/sample-post#comments-11"
      >回复的内容...</a
    >
  </li>
  <!-- 省略n个重复 -->
</ul>
```

其中`<?php $comments->excerpt(35, '...'); ?>`，“35”代表要回复内容截取的字的个数，“…”代表省略的意思，你可以自行修改。

N 的值可以在后台 **设置 → 评论 → 评论列表数目** 设置

## 文章分类列表

```php
<?php \Widget\Metas\Category\Rows::alloc()->listCategories('wrapClass=widget-list'); ?>
```

效果如下

```html
<ul class="widget-list">
  <li class="category-level-0 category-parent">
    <a href="分类1链接">分类1</a>
  </li>
  <li class="category-level-0 category-parent">
    <a href="分类2链接">分类2</a>
  </li>
  <!-- 省略n个重复 -->
</ul>
```

如果有个分类 3，分类 4 是上述分类 2 的子分类，那么效果如下

```html
<ul class="widget-list">
  <li class="category-level-0 category-parent">
    <a href="分类1链接">分类1</a>
  </li>
  <li class="category-level-0 category-parent">
    <a href="分类2链接">分类2</a>
    <ul class="widget-list">
      <li class="category-level-1 category-child category-level-odd">
        <a href="分类3链接">分类3</a>
      </li>
      <li class="category-level-1 category-child category-level-odd">
        <a href="分类4链接">分类4</a>
      </li>
    </ul>
  </li>
  <!-- 省略n个重复 -->
</ul>
```

## 按月归档

```php
<ul class="widget-list">
    <?php \Widget\Contents\Post\Date::alloc('type=month&format=F Y')
        ->parse('<li><a href="{permalink}">{date}</a></li>'); ?>
</ul>
```

输出：

```html
<ul class="widget-list">
  <li><a href="http://example.com/2018/11">November 2018</a></li>
  <li><a href="http://example.com/2018/10">October 2018</a></li>
</ul>
```

1. `format` 是日期格式，这是 PHP 日期 format。
2. `type` 是归档类型，可选值有：`year`、`month`、`day`

## 登陆登出

```html
<?php if($this->user->hasLogin()): ?>
<li class="last">
  <a href="<?php $this->options->adminUrl(); ?>"
    ><?php _e('进入后台'); ?>
    (<?php $this->user->screenName(); ?>)</a
  >
</li>
<li>
  <a href="<?php $this->options->logoutUrl(); ?>"><?php _e('退出'); ?></a>
</li>
<?php else: ?>
<li class="last">
  <a href="<?php $this->options->adminUrl('login.php'); ?>"
    ><?php _e('登录'); ?></a
  >
</li>
<?php endif; ?>
```

这些是可有可无的，只是为了方便登录登出。
1. `<?php $this->options->adminUrl(); ?>`是后台地址
2. `<?php $this->user->screenName(); ?>`用户昵称
3. `<?php $this->options->logoutUrl(); ?>`登出链接
4. `<?php $this->options->adminUrl('login.php'); ?>`登陆链接。

## RSS 地址

```html
<a href="<?php $this->options->feedUrl(); ?>"><?php _e('文章 RSS'); ?></a>
<!-- 文章的RSS地址连接 -->
<a href="<?php $this->options->commentsFeedUrl(); ?>"
  ><?php _e('评论 RSS'); ?></a
><!-- 评论的RSS地址连接 -->
```
