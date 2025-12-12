# 制作面包屑导航

## 什么是面包屑导航
面包屑导航是一种网站导航方式，通常在网站顶部显示，用于显示用户当前位置。
面包屑导航通常由导航元素组成，每个元素代表一个网站导航项，通常由链接组成。

::: tip 面包屑导航示例
<u>首页</u> » 最新文章\
<u>首页</u> » <u>分类名称</u> » 文章标题\
<u>首页</u> » 归档年份 » 归档月份\
<u>首页</u> » 页面名称\
<u>首页</u> » 分类名称\
<u>首页</u> » 标签名称\
<u>首页</u> » 搜索关键词或其他信息
:::

实际上 title 中的内容可以直接移植到我们的面包屑中，在看下面的代码之前，也许你需要先温习[神奇的is语法](is-syntax.md)
```php
<div class="crumbs_patch">
    <a href="<?php $this->options->siteUrl(); ?>">Home</a> &raquo;</li>
    <?php if ($this->is('index')): ?><!-- 页面为首页时 -->
        Latest Post
    <?php elseif ($this->is('post')): ?><!-- 页面为文章单页时 -->
        <?php $this->category(); ?> &raquo; <?php $this->title() ?>
    <?php else: ?><!-- 页面为其他页时 -->
        <?php $this->archiveTitle(' &raquo; ','',''); ?>
    <?php endif; ?>
</div>
```
将上面的代码放在需要显示的页面，例如`index.php`、`post.php`，抑或是`header.php`页面，保存后就可以查看结果，当然别忘了自定义样式哦。
