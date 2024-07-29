# footer.php

页脚文件，推荐大家把一些较大的 js 放在这个文件中最后载入，不会影响阅读。看看我们的 footer 要讲解些什么？

## 版权声明等

```html
&copy; <?php echo date('Y'); ?> <a href="<?php $this->options->siteUrl(); ?>"><?php $this->options->title(); ?></a>.
    <?php _e('由 <a href="http://www.typecho.org">Typecho</a> 强力驱动'); ?>
```

- `<?php echo date('Y'); ?>`是当前年份
- `<?php $this->options->siteUrl(); ?>`是网站地址
- `<?php $this->options->title(); ?>`是网站标题。

## 插件接口

```php
<?php $this->footer(); ?>
```

用于插件向页脚插入 css，js 文件等。
