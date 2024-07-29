# 调用指定分类的文章
根据分类 mid 获取某个分类下的文章列表
```php
<?php \Widget\Archive::allocWithAlias('index', 'pageSize=6&type=category', 'mid=1')->to($new); ?>
<?php while ($new->next()): ?>
<a href="<?php $new->permalink(); ?>"><?php $new->title(); ?></a>
<?php endwhile; ?>
```

以上就是获取分类`mid`等于1的最新6篇文章，`pageSize=6`就是指定调用数量，`mid=1`指定分类mid，也可以用缩略名方式替换如`slug=name`其中`name`就是`mid`等于1的分类的缩略名。

因为 Typecho 中 Widget 默认是是单例的，你重复获取也只是之前的引用(就是你获取两次都会输出一样的数据，所以必须通过 alias 区分)，所以这里需要用`\Widget\Archive::allocWithAlias('index-2')`来获取新的实例，如下：
```php
<?php \Widget\Archive::allocWithAlias('index-1', 'pageSize=6&type=category', 'mid=1')->to($new); ?>
<?php while ($new->next()): ?>
<a href="<?php $new->permalink(); ?>"><?php $new->title(); ?></a>
<?php endwhile; ?>
<?php \Widget\Archive::allocWithAlias('index-2', 'pageSize=6&type=category', 'mid=2')->to($new); ?>
<?php while ($new->next()): ?>
<a href="<?php $new->permalink(); ?>"><?php $new->title(); ?></a>
<?php endwhile; ?>
```
