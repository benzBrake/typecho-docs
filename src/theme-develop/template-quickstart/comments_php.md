# comments.php

## 评论列表

```php
<?php $this->comments()->to($comments); ?>
<?php if ($comments->have()): ?>
<h3><?php $this->commentsNum(_t('暂无评论'), _t('仅有一条评论'), _t('已有 %d 条评论')); ?></h3>
<?php $comments->listComments(); ?>
<?php $comments->pageNav('&laquo; 前一页', '后一页 &raquo;'); ?>
<?php endif; ?>
```

判断文章是否存在评论，如果存在就输出评论；其中`<?php $comments->listComments(); ?>`是评论列表，`<?php $comments->pageNav('&laquo; 前一页', '后一页 &raquo;'); ?>`是评论翻页按钮。

## 评论输入表单

```html
<!-- 判断设置是否允许对当前文章进行评论 -->
<?php if($this->allow('comment')): ?>
<div id="<?php $this->respondId(); ?>" class="respond">
  <div class="cancel-comment-reply"><?php $comments->cancelReply(); ?></div>

  <h3 id="response"><?php _e('添加新评论'); ?></h3>
  <!-- 输入表单开始 -->
  <form
    method="post"
    action="<?php $this->commentUrl() ?>"
    id="comment-form"
    role="form"
  >
    <!-- 如果当前用户已经登录 -->
    <?php if($this->user->hasLogin()): ?>
    <!-- 显示当前登录用户的用户名以及登出连接 -->
    <p>
      <?php _e('登录身份: '); ?><a href="<?php $this->options->profileUrl(); ?>"
        ><?php $this->user->screenName(); ?></a
      >.
      <a href="<?php $this->options->logoutUrl(); ?>" title="Logout"
        ><?php _e('退出'); ?>
        &raquo;</a
      >
    </p>
    <!-- 若当前用户未登录 -->
    <?php else: ?>
    <!-- 要求输入名字、邮箱、网址 -->
    <p>
      <label for="author" class="required"><?php _e('称呼'); ?></label>
      <input
        type="text"
        name="author"
        id="author"
        class="text"
        value="<?php $this->remember('author'); ?>"
        required
      />
    </p>
    <p>
      <label for="mail" <?php if ($this-
        >options->commentsRequireMail): ?> class="required"<?php endif; ?>><?php _e('Email'); ?></label
      >
      <input
        type="email"
        name="mail"
        id="mail"
        class="text"
        value="<?php $this->remember('mail'); ?>"
        <?php
        if
        ($this-
      />options->commentsRequireMail): ?> required<?php endif; ?>
      />
    </p>
    <p>
      <label for="url" <?php if ($this-
        >options->commentsRequireURL): ?> class="required"<?php endif; ?>><?php _e('网站'); ?></label
      >
      <input
        type="url"
        name="url"
        id="url"
        class="text"
        placeholder="<?php _e('http://'); ?>"
        value="<?php $this->remember('url'); ?>"
        <?php
        if
        ($this-
      />options->commentsRequireURL): ?> required<?php endif; ?>
      />
    </p>
    <?php endif; ?>
    <!-- 输入要回复的内容 -->
    <p>
      <label for="textarea" class="required"><?php _e('内容'); ?></label>
      <textarea
        rows="8"
        cols="50"
        name="text"
        id="textarea"
        class="textarea"
        required
      >
<?php $this->remember('text'); ?></textarea
      >
    </p>
    <p>
      <button type="submit" class="submit"><?php _e('提交评论'); ?></button>
    </p>
  </form>
</div>
<!-- 若当前文章不允许进行评论 -->
<?php else: ?>
<h3><?php _e('评论已关闭'); ?></h3>
<?php endif; ?>
```

具体请对应上述代码中注释自行理解。
