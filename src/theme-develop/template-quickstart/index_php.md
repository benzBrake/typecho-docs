# index.php

## 模板信息

我们先从主文件说起，打开这个文件，首先看到的是注释：

```php
/**
 * 这是typecho系统的一套默认皮肤。你可以在<a href="http://typecho.org">typecho的官方网站</a>获得更多关于此皮肤的信息
 * @package Typecho Default Theme
 * @author typecho
 * @version 1.0.0
 * @link http://typecho.org
 */
```

这是模板信息存放的地方，格式是[PHP 注释](https://www.php.net/manual/en/language.basic-syntax.comments.php)，这个备注会被显示在主题切换页面。前两行是简短的介绍，每个“\*”表示一个段落开始。

- **@package** 表示模板名
- **@author**表示作者名
- **@version**是模板的版本号
- **@link**是作者的网站连接

你会看到这个文件里有三个调用`$this->need()`方法的地方

```php
<?php
    ...
    $this->need('header.php');
    ...
    $this->need('sidebar.php');
    ...
    $this->need('footer.php');
```

这些语句用来调用模板的其它 PHP 文件，语法是`need(PHP文件相对路径)`，相对于主题的路径。这个方法实际调用的是`require`方法，意味着模块是可以重复调用的。

## 显示文章列表

```php
 <?php while ($this->next()): ?>
        <article class="post" itemscope itemtype="http://schema.org/BlogPosting">
            <h2 class="post-title" itemprop="name headline">
                <a itemprop="url"
                   href="<?php $this->permalink() ?>"><?php $this->title() ?></a>
            </h2>
            <ul class="post-meta">
                <li itemprop="author" itemscope itemtype="http://schema.org/Person"><?php _e('作者: '); ?><a
                        itemprop="name" href="<?php $this->author->permalink(); ?>"
                        rel="author"><?php $this->author(); ?></a></li>
                <li><?php _e('时间: '); ?>
                    <time datetime="<?php $this->date('c'); ?>" itemprop="datePublished"><?php $this->date(); ?></time>
                </li>
                <li><?php _e('分类: '); ?><?php $this->category(','); ?></li>
                <li itemprop="interactionCount">
                    <a itemprop="discussionUrl"
                       href="<?php $this->permalink() ?>#comments"><?php $this->commentsNum('评论', '1 条评论', '%d 条评论'); ?></a>
                </li>
            </ul>
            <div class="post-content" itemprop="articleBody">
                <?php $this->content('- 阅读剩余部分 -'); ?>
            </div>
        </article>
    <?php endwhile; ?>
```

实际上在文章数据在`$this`对象里是以数组存起来的，所以必须用循环语句遍历才可以输出所有文章。

| 代码                                                            | 解释                                                                                                                                                        |
| :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<?php if ($this->have()): ?>`                                  | 判断是否有文章                                                                                                                                              |
| `<?php while($this->next()): ?>`                                | while 循环语句，PHP 语法，必须与`<?php endwhile; ?>`对应，$this->next()是判断有没有下篇文章，有返回`true`，并且让数据下标+1，没有返回`false`                |
| `<?php $this->permalink() ?>`当前                               | 文章所在的连接                                                                                                                                              |
| `<?php $this->title() ?>`                                       | 文章标题                                                                                                                                                    |
| `<?php $this->author(); ?>`                                     | 文章作者                                                                                                                                                    |
| `<?php $this->author->permalink(); ?>`                          | 文章作者地址                                                                                                                                                |
| `<?php $this->date(); ?>`                                       | 文章的发布日期，日期格式可在 Typecho 后台**设置->阅读**中设置，或者使用参数 1 强制指定日期格式`<?php $this->date('Y-m-d'); ?>`                              |
| `<?php $this->category(','); ?>`                                | 文章所在分类，参数 1 是分隔符                                                                                                                               |
| `<?php $this->tags(','); ?>`                                    | 文章标签，参数 1 是分隔符                                                                                                                                   |
| `<?php $this->commentsNum('评论', '1 条评论', '%d 条评论'); ?>` | 文章评论数及连接，参数可以指定多个，不指定直接输出数字，指定三个主要是某些语言 0，单数，复数的后缀不一样，有的可能甚至更复杂                                |
| `<?php $this->content('- 阅读剩余部分 -'); ?>`                  | 文章内容，其中的“- 阅读剩余部分 -”是显示摘要时隐藏部分的邀请链接，也可使用`<?php $this->excerpt(140, '...'); ?>`来进行自动截取文字内容，“140”是截取字符数量 |

## 文章分页

```php
<?php $this->pageNav('«前一页', '后一页»'); ?>
```

也可以这样分开写

```php
<?php $this->pageLink('下一页','next'); ?>
<?php $this->pageLink('上一页'); ?>
```

## 其他说明

`archive.php`代码码类似`index.php`，区别就是`index.php`是显示首页的，而`archive.php`是用于显示归档页面（分类，标签，搜索，作者），如果主题中没有没有`archive.php`则会自动调用`index.php`作为归档页。
