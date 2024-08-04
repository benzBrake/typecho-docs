# 前台个人资料页

Typecho 中形如`/author/1` 这样的链接会显示 UID 为 1 的用户的所有文章。

加入你的 UID 是 666 则 `/author/666`是你的用户页。我们可以自定义`author.php`在这个页面增加个人资料修改的功能。

```php
<div id="profile">
    <h3><?php _e('个人资料'); ?></h3>
    <section class="card">
        <div class="card-title"><?php _e("用户名"); ?></div>
        <div class="card-body">
            <?php \Widget\Users\Profile::alloc()->profileForm()->render(); ?>
        </div>
    </section>
    <section id="change-password" class="card">
        <div class="card-title"><?php _e('密码修改'); ?></div>
        <div class="card-body">
            <?php \Widget\Users\Profile::alloc()->passwordForm()->render(); ?>
        </div>
    </section>
    <?php \Widget\Users\Profile::alloc()->personalFormList(); ?>
</div>
```

但是这样有一个问题，所有人点进`/author/666`都能看见个人资料页面，可以加个判断处理只有当前用户访问所属用户页才显示。

```php
<?php if($this->user->uid==$this->author->uid && $this->user->hasLogin()): ?>
    这里填入上边的代码
<?php endif; ?>
```

