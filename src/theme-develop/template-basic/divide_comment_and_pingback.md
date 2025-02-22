# 分离文章的评论和引用通告

打开模板的`comments.php`文件，找到通篇的核心语句：

```php
<?php $this->comments()->to($comments); ?>
```

这条语句控制着评论的类型，他的参数如下：

| 语句                                                     | 注释             |
| -------------------------------------------------------- | ---------------- |
| `<?php $this→comments()→to($comments); ?> `              | 显示全部（默认） |
| `<?php $this→comments('comment')→to($comments); ?> `     | 只显示 comment   |
| `<?php $this→comments('trackback')→to($trackbacks); ?> ` | 只显示 trackback |
| `<?php $this→comments('pingback')→to($pingbacks); ?>`    | 只显示 pingback  |

为了分开，我们开始对`comments.php`做如下修改，首先只显示评论：

```php
<?php $this->comments('comment')->to($comments); ?><!-- 关键 -->
<?php if ($comments->have()) : ?>
	<ol>
	<?php while ($comments->next()) : ?>
	<li id="<?php $comments->theId() ?>">
		<div class="comment_data">
			<?php $comments->gravatar(32, '', '', 'avatar'); ?>
			<span><?php $comments->author() ?></span> Says:<br />
			<?php $comments->date('F jS, Y'); ?> at <?php $comments->date('h:i a'); ?>
		</div>
		<div class="comment_text"><?php $comments->content() ?></div>
	</li>
	<?php endwhile; ?>
	</ol>
<?php endif; ?>
```

然后输出 pingback，pingback 并不需要那么多的展示内容，假设只展示标题和日期：

```php
<?php $this->comments('pingback')->to($pingbacks); ?><!-- 关键 -->
<?php if ($pingbacks->have()) : ?>
	<h3>Pingbacks</h3>
	<ol>
	<?php while ($pingbacks->next()) : ?>
		<li id="<?php $pingbacks->theId() ?>">
			<?php $pingbacks->author() ?> <?php $pingbacks->date('F jS, Y'); ?>
		</li>
	<?php endwhile; ?>
	</ol>
<?php endif; ?>
```

如果你要显示 trackback，也可以按如上的修改。typecho 模板语法很多是通用的，所以当你遇到不清楚的问题时，可以自己试着拼凑一下，就会有惊喜哦。