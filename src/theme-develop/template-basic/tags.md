# 文章标签

## 文章页调用

### 调用本文标签

在文章页`post.php`通过下面的代码调用本文的标签：

```php
<?php $this->tags(',', true); ?>
```

| 序号 | 参数类型 | 参数     | 默认值 | 说明                     |
| ---- | -------- | -------- | ------ | ------------------------ |
| 1    | string   | $split   | ,      | 分隔符，用于分隔标签     |
| 2    | bool     | $link    | true   | 是否输出带链接的标签     |
| 3    | ?string  | $default | null   | 没有标签的时候的输出内容 |

::: tip 说明
`(',', true, 'none')` 第一个逗号间的逗号代表标签与标签的间隔用逗号隔开，`true`是标签以超链接形式输出，第三个参数没提供，说明没有标签不输出内容。
:::

### 给每个标签套上div

```php
<div><?php $this->tags('</div><div>', true, 'none'); ?></div>
```

### 根据文章是否含有标签输出指定内容

比如给含有**永久VIP**标签的文章输出**永久VIP免费提示**

```php
<?php if(in_array('永久VIP', $this->tags) ): ?>
永久VIP免费
<?php endif; ?>
```

## 输出标签云
```php
<?php \Widget\Metas\Tag\Cloud::alloc('sort=count&desc=1&limit=200')->to($tags); ?>
<?php if($tags->have()): ?>
<ul class="tags-list">
<?php while ($tags->next()): ?>
    <li><a href="<?php $tags->permalink(); ?>" rel="tag" class="size-<?php $tags->split(5, 10, 20, 30); ?>" title="<?php $tags->count(); ?> 个话题"><?php $tags->name(); ?></a></li>
<?php endwhile; ?>
<?php else: ?>
    <li><?php _e('没有任何标签'); ?></li>
<?php endif; ?>
</ul>
```
::: tip 参数说明

- sort：排序方式为 mid；
- ignoreZeroCount：忽略文章数为 0 的；
- desc：是否降序输出；
- limit：输出数目。

:::

