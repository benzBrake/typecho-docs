# 调用相关文章
## 文章页拓展阅读
修改主题的时候一般会在文章页正文下方显示相关文章，拓展阅读，这个功能 Typecho 内置了相关函数，调用即可。
修改 `post.php`, 将以下内容粘贴至你想加入相关文章的位置（例如我放在文章结束的位置），最后保存即可。

```php
<?php $this->related(5)->to($relatedPosts); ?>
    <ul>
    <?php while ($relatedPosts->next()): ?>
    <li><a href="<?php $relatedPosts->permalink(); ?>" title="<?php $relatedPosts->title(); ?>"><?php $relatedPosts->title(); ?></a></li>
    <?php endwhile; ?>
</ul>
```
### 调用方法说明
```
$this->related($limits, $type);
```
这个函数有两个参数：

| 参数名称 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| $limits  | 默认值为 5，表示显示的相关文章数量                           |
| $type    | 默认值为 NULL，表示文章的相关方式，可接受 tags/author。当 $type 为 author 时，根据用户显示相关文章；为其他值时，根据标签显示相关文章。 |

## 独立页面拓展阅读
在 Typecho 中，独立页面是没有标签的，所以只可以调取同作者相关文章。

```
<?php $relatedPosts = \Widget\Contents\Related\Author::alloc(
    ['cid' => $this->cid, 'type' => 'post', 'author' => $this->author->uid, 'limit' => 5]
); ?>
    <ul>
    <?php while ($relatedPosts->next()): ?>
    <li><a href="<?php $relatedPosts->permalink(); ?>" title="<?php $relatedPosts->title(); ?>"><?php $relatedPosts->title(); ?></a></li>
    <?php endwhile; ?>
</ul>
```



