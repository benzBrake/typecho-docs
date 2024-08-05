# 强制显示 404 页面

有的页面比如【个人资料】页面，在用户没登录的时候一般显示为404，那么怎么强制不登录时显示404呢？

修改`profile.php`(假设`profile.php`是个人资料独立页面的模板)，在最上方加入

```php
if (!$this->user->hasLogin()) {
    throw new Typecho\Router\Exception("Path '{$this->request->getPathInfo()}' not found", 404);
}
```