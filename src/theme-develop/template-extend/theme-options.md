# 主题选项开发
默认主题的`functions.php`中有如下部分代码
```php
<?php
function themeConfig($form)
{
    $logoUrl = new \Typecho\Widget\Helper\Form\Element\Text(
        'logoUrl',
        null,
        null,
        _t('站点 LOGO 地址'),
        _t('在这里填入一个图片 URL 地址, 以在网站标题前加上一个 LOGO')
    );

    $form->addInput($logoUrl->addRule('url', _t('请填写一个合法的URL地址')));

    $sidebarBlock = new \Typecho\Widget\Helper\Form\Element\Checkbox(
        'sidebarBlock',
        [
            'ShowRecentPosts'    => _t('显示最新文章'),
            'ShowRecentComments' => _t('显示最近回复'),
            'ShowCategory'       => _t('显示分类'),
            'ShowArchive'        => _t('显示归档'),
            'ShowOther'          => _t('显示其它杂项')
        ],
        ['ShowRecentPosts', 'ShowRecentComments', 'ShowCategory', 'ShowArchive', 'ShowOther'],
        _t('侧边栏显示')
    );

    $form->addInput($sidebarBlock->multiMode());
}
```
这部分代码提供了两个主题选项，一个是 LOGO 设置，另一个是侧边栏模块。可见增加选项的格式为

```php
$option_name = new 选项工具类(
	'选项key（可选）',
    '选项属性（可选）',
    '选项默认值（可选）',
    '选项标题（可选）',
    '选项描述（可选）'
);
$form->addInput($option_name);
```

选项工具类有以下几种

| 类       | 功能        | 备注                            |
| -------- | ----------- | ------------------------------- |
| Checkbox | 多选框      | 选项属性（参数2）必须为**数组** |
| Hidden   | 不可见input |                                 |
| Password | 密码框      |                                 |
| Radio    | 单选框      | 选项属性（参数2）必须为**数组** |
| Select   | 下拉选择    | 选项属性（参数2）必须为**数组** |
| Submit   | 提交按钮    |                                 |
| Text     | 单行文本框  | 选项属性（参数2）**无效**       |
| Textarea | 多行文本框  | 选项属性（参数2）**无效**       |

## 选项示例

这里列举从其他主题中摘取的一下示例，方便参考

```php
function themeConfig($form)
{
    // ...
	$edit = new \Typecho\Widget\Helper\Form\Element\Textarea(
        'XCopyright',
        NULL,
        _t('文章出自：<a href="{siteUrl}">{siteName}</a> <a class="text-muted" href="{permalink}">{postTitle}</a>，版权所有。本站文章除注明出处外，皆为作者原创文章，可自由引用，但请注明来源'),
        _t("普通文章版权信息"),
        _t('介绍：这里填写普通文章版权信息的模板，请根据需要进行修改<br />
            格式：仅 HTML。替换关键字有：<code>{siteUrl}</code>，<code>{siteName}</code><br/>，<code>{permalink}</code>，<code>{author}</code>，<code>{postTitle}</code>')
    );
    $form->addInput($edit);
    $edit = new \Typecho\Widget\Helper\Form\Element\Select(
        'XAgreeBtn',
        ['off' => _t('关闭'), 'on' => _t('开启（默认）')],
        'on',
        _t('是否开启点赞功能'),
        _t('介绍：开启后会在文章底部增加一个点赞按钮')
    );
    $form->addInput($edit->multiMode());
    $smtp_password = new \Typecho\Widget\Helper\Form\Element\Password(
        'smtp_password',
        null,
        null,
        _t('SMTP 密码'),
        _t('如果开启了两步验证，请从邮件服务商处获取可用的应用密码')
    );
    $form->addInput($smtp_password);
    $smtp_ssl = new \Typecho\Widget\Helper\Form\Element\Radio(
        'smtp_ssl',
        [
            'ssl' => _t('SSL 加密连接'),
            'tls' => _t('TLS 加密连接'),
            'none' => _t('不使用加密连接')
        ],
        'ssl',
        _t('SMTP 加密方式')
    );
    $form->addInput($smtp_ssl);
    $links = new \Typecho\Widget\Helper\Form\Element\Hidden(
        'links',
        null,
        'true'
    ); // 这个 Links 是配合了第三方 JS 实现了可视化编辑，所以采用 Hidden 来隐藏输入框
    $form->addInput($links);
    // ...
}
```

## 自定义 HTML

当上面的工具类满足不了我们，需要插入自定义 HTML 该怎么办？

你可能会想到使用`echo`输出HTML：

```php
<?php
function themeConfig($form)
{
    // ...
	echo `<p>xxxx</p>` // [!code ++]
    // ...
}
```

但是这会导致前端也有可能会意外输出这部分HTML，所以可以判断是不是在后台：

```php
<?php
function themeConfig($form)
{
    // ...
    // 增加判定在后台的逻辑 // [!code ++]
    $request = \Typecho\Request::getInstance(); // [!code ++]
    $requestUri = parse_url($request->getRequestUrl())['path']; // [!code ++]
    if (strpos($requestUri, 'admin/') !== false) { // [!code ++]
		echo `<p>xxxx</p>`
    }  // [!code ++]
    // ...
}
```

## 增加主题选项备份功能

增加以下代码即可实现

```php
<?php
function themeConfig($form) {
	// ...
    $db = \Typecho\Db::get();
    $notice = \Widget\Notice::alloc();
    $request = \Typecho\Request::getInstance();
    $response = \Typecho\Response::getInstance();
    $theme = Helper::options()->theme;
    // 查询主题数据
    $themeDataRow = $db->fetchRow($db->select()->from('table.options')->where('name = ?', "theme:{$theme}"));
    $themeData_backupRow = $db->fetchRow($db->select()->from('table.options')->where('name = ?', "theme:{$theme}_backup"));
    $themeData = empty($themeDataRow) ? null : $themeDataRow['value'];
    $themeData_backup = empty($themeData_backupRow) ? null : $themeData_backupRow['value'];
    if (isset($request->type)) {
        if ($request->type == 'backup') {
            if ($db->fetchRow($db->select()->from('table.options')->where('name = ?', "theme:{$theme}_backup"))) {
                $updateQuery = $db->update('table.options')->rows(['value' => $themeData])->where('name = ?', "theme:{$theme}_backup");
                $db->query($updateQuery);
                $notice->set(_t('备份已更新!'), 'success');
                $response->goBack();
            } else {
                if ($themeData) {
                    $insertQuery = $db->insert('table.options')->rows(['name' => "theme:{$theme}_backup", 'user' => '0', 'value' => $themeData]);
                    $db->query($insertQuery);
                    $notice->set(_t('备份完成!'), 'success');
                    $response->goBack();
                }
            }
        } elseif ($request->type == 'restore') {
            if ($themeData_backup) {
                // 反序列化
                $current = @unserialize($themeData);
                $backup  = @unserialize($themeData_backup);

                // 防止异常数据
                if (!is_array($current)) $current = [];
                if (!is_array($backup))  $backup  = [];

                // 只恢复：backup 中有的 key
                foreach ($backup as $key => $val) {
                    $current[$key] = $val;
                }

                // 再序列化
                $merged = serialize($current);

                // 更新数据库
                $updateQuery = $db->update('table.options')
                    ->rows(['value' => $merged])
                    ->where('name = ?', "theme:{$theme}");
                $db->query($updateQuery);

                $notice->set(_t('检测到模板备份数据，已按差异恢复完成（保持新版新增项）'), 'success');

            } else {
                $notice->set(_t('没有模板备份数据，恢复不了哦！'), 'error');
            }

            $response->goBack();
        } elseif ($request->type == 'delete') {
            if ($themeData_backup) {
                $deleteQuery = $db->delete('table.options')->where('name = ?', "theme:{$theme}_backup");
                $db->query($deleteQuery);
                $notice->set(_t('删除成功！！！'), 'success');
            } else {
                $notice->set(_t('不用删了！备份不存在！！！'), 'error');
            }
            $response->goBack();
        }
    }
    // ...
}
```

