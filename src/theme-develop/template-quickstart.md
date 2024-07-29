# 模板快速上手

这里会基于 Typecho 的默认主题 default 进行模板的快速上手讲解，讲解如何简单修改模板。

::: tip
本文档适配 Typecho 版本为：**1.2.1**
:::

你需要会：

1. Typecho 的基本使用
2. HTML/CSS/JS/PHP 的基本语法

如果都不会，那么我建议你先去 W3C 或者 B 站学习一番。

## 文件结构说明

| 文件名         | 作用                                         | 必须 |
| :------------- | :------------------------------------------- | :--- |
| style.css      | 主题样式文件                                 | 否   |
| screenshot.png | 主题缩略图,图片后缀支持 jpg,png,gif,bmp,jpeg | 否   |
| index.php      | 首页以及说明文件                             | 是   |
| 404.php        | 404 页面文件                                 | 否   |
| archive.php    | 通用（分类、搜索、标签、作者）页面文件       | 否   |
| category.php   | 分类页面文件                                 | 否   |
| search.php     | 搜索页面文件                                 | 否   |
| tag.php        | 标签页面文件                                 | 否   |
| author.php     | 作者页面文件                                 | 否   |
| comments.php   | 评论页面文件                                 | 否   |
| footer.php     | 底部页面文件                                 | 否   |
| functions.php  | 主题函数文件                                 | 否   |
| header.php     | 头部页面文件                                 | 否   |
| page.php       | 独立页面文件                                 | 否   |
| post.php       | 日志页面文件                                 | 否   |
| sidebar.php    | 侧边栏页面文件                               | 否   |
