# 常用统计函数

## 一些例子

```php
<?php Typecho_Widget::widget('Widget_Stat')->to($stat); ?>
文章总数：<?php $stat->publishedPostsNum() ?>篇
分类总数：<?php $stat->categoriesNum() ?>个
评论总数：<?php $stat->publishedCommentsNum() ?>条
页面总数：<?php $stat->publishedPagesNum() ?>个
当前作者的文章总数：<?php $stat->myPublishedPostsNum() ?>篇
```

### 其他可用函数

描述来自源码注释，不是特别清晰，有空我会重新梳理下

| 说明                         | 函数名                        |
| ---------------------------- | ----------------------------- |
| 获取已发布的文章数目         | `publishedPostsNum`           |
| 获取待审核的文章数目         | `waitingPostsNum`             |
| 获取草稿文章数目             | `draftPostsNum`               |
| 获取当前用户已发布的文章数目 | `myPublishedPostsNum`         |
| 获取当前用户待审核文章数目   | `myWaitingPostsNum`           |
| 获取当前用户草稿文章数目     | `myDraftPostsNum`             |
| 获取当前用户已发布的文章数目 | `currentPublishedPostsNum`    |
| 获取当前用户待审核文章数目   | `currentWaitingPostsNum`      |
| 获取当前用户草稿文章数目     | `currentDraftPostsNum`        |
| 获取已发布页面数目           | `publishedPagesNum`           |
| 获取草稿页面数目             | `draftPagesNum`               |
| 获取当前显示的评论数目       | `publishedCommentsNum`        |
| 获取当前待审核的评论数目     | `waitingCommentsNum`          |
| 获取当前垃圾评论数目         | `spamCommentsNum`             |
| 获取当前用户显示的评论数目   | `myPublishedCommentsNum`      |
| 获取当前用户显示的评论数目   | `myWaitingCommentsNum`        |
| 获取当前用户显示的评论数目   | `mySpamCommentsNum`           |
| 获取当前文章的评论数目       | `currentCommentsNum`          |
| 获取当前文章显示的评论数目   | `currentPublishedCommentsNum` |
| 获取当前文章显示的评论数目   | `currentWaitingCommentsNum`   |
| 获取当前文章显示的评论数目   | `currentSpamCommentsNum`      |
| 获取分类数目                 | `categoriesNum`               |

该统计函数来自源码`var/Widget/Stat.php`中

## 获取建站天数

有可能不准确，因为有人会删掉第一篇文章

```php
<?php
class XStat extends Widget_Stat {
    /**
     * 建站天数（可能不准确，因为有的人把第一篇文章删掉了)
     *
     * @return int
     */
    public static function ___sitePublishedDaysNum(): int
    {
        $db = Typecho_Db::get();
        $count = $db->fetchRow($db->select('MIN(created) as created')->from('table.contents'));
        $diff = time() - $count['created'];
        return intval($diff / 86400);
    }
}
```

调用方式

```php
<?php Typecho_Widget::widget('XStat')->to($stat); ?>
<?php _t("建站天数：%s天", $stat->sitePublishedDaysNum); ?>
```

