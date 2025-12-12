# Hook 参考手册

这里列出 Typecho 的所有 Hook 点，如果不知道如何使用，详见[Hook 基础使用](hooks-usage)。

## 完整 Hook 列表

### 核心系统 Hook

#### index.php

| Hook 名称 | 类型 | 参数 | 说明           |
| --------- | ---- | ---- | -------------- |
| `begin`   | call | 无   | 系统启动时调用 |
| `end`     | call | 无   | 系统结束时调用 |

这里展示一下 **call** 类型 Hook 到底如何用，后面就省略了。

```php
// ...
\Typecho\Plugin::factory('index.php')->begin = [Plugin::class, 'render']; // [!code ++]
// ...
class Plugin extends PluginInterface {
    public static function render() {// [!code ++]
        echo "<p>这里是begin接口的输出</p>" // [!code ++]
	}// [!code ++]
}
// ...
```

#### admin/common.php

| Hook 名称 | 类型 | 参数 | 说明                 |
| --------- | ---- | ---- | -------------------- |
| `begin`   | call | 无   | 后台公共初始化时调用 |

#### admin/header.php

| Hook 名称 | 类型   | 参数      | 说明             |
| --------- | ------ | --------- | ---------------- |
| `header`  | filter | `$header` | 过滤后台头部 CSS |

#### admin/footer.php

| Hook 名称 | 类型 | 参数 | 说明         |
| --------- | ---- | ---- | ------------ |
| `begin`   | call | 无   | 后台底部开始 |
| `end`     | call | 无   | 后台底部结束 |

#### admin/menu.php

| Hook 名称 | 类型 | 参数 | 说明           |
| --------- | ---- | ---- | -------------- |
| `navBar`  | call | 无   | 后台导航栏扩展 |

### 内容编辑 Hook

#### admin/write-post.php

| Hook 名称       | 类型         | 参数    | 说明             |
| --------------- | ------------ | ------- | ---------------- |
| `content`       | call         | `$post` | 文章内容编辑区域 |
| `option`        | call         | `$post` | 文章选项侧边栏   |
| `advanceOption` | call         | `$post` | 文章高级选项     |
| `richEditor`    | call+trigger | `$post` | 富文本编辑器替换 |
| `bottom`        | call         | `$post` | 页面底部扩展     |

#### admin/write-page.php

| Hook 名称       | 类型         | 参数    | 说明             |
| --------------- | ------------ | ------- | ---------------- |
| `content`       | call         | `$page` | 页面内容编辑区域 |
| `option`        | call         | `$page` | 页面选项侧边栏   |
| `advanceOption` | call         | `$page` | 页面高级选项     |
| `richEditor`    | call+trigger | `$page` | 富文本编辑器替换 |
| `bottom`        | call         | `$page` | 页面底部扩展     |

#### admin/editor-js.php

| Hook 名称        | 类型 | 参数       | 说明                |
| ---------------- | ---- | ---------- | ------------------- |
| `markdownEditor` | call | `$content` | Markdown 编辑器增强 |

#### admin/write-js.php

| Hook 名称 | 类型 | 参数 | 说明             |
| --------- | ---- | ---- | ---------------- |
| `write`   | call | 无   | 编写页面 JS 增强 |

#### admin/theme-editor.php

| Hook 名称 | 类型 | 参数     | 说明           |
| --------- | ---- | -------- | -------------- |
| `bottom`  | call | `$files` | 主题编辑器底部 |

#### admin/profile.php

| Hook 名称 | 类型 | 参数 | 说明             |
| --------- | ---- | ---- | ---------------- |
| `bottom`  | call | 无   | 个人资料页面底部 |

### Widget 内容展示 Hook



#### Widget\Archive

| Hook 名称        | 类型   | 参数       | 说明             |
| ---------------- | ------ | ---------- | ---------------- |
| `select`         | filter | `$query`   | 过滤数据库查询   |
| `handleInit`     | call   | `$archive` | 内容初始化后调用 |
| `handle`         | call   | `$archive` | 自定义内容处理   |
| `headerOptions`  | filter | `$options` | 过滤头部选项     |
| `header`         | call   | `$archive` | 头部渲染时调用   |
| `footer`         | call   | `$archive` | 底部渲染时调用   |
| `beforeRender`   | call   | `$archive` | 模板渲染前调用   |
| `afterRender`    | call   | `$archive` | 模板渲染后调用   |
| `indexHandle`    | call   | `$archive` | 首页请求处理     |
| `singleHandle`   | call   | `$archive` | 单篇内容请求处理 |
| `categoryHandle` | call   | `$archive` | 分类归档请求处理 |
| `tagHandle`      | call   | `$archive` | 标签归档请求处理 |
| `authorHandle`   | call   | `$archive` | 作者归档请求处理 |
| `dateHandle`     | call   | `$archive` | 日期归档请求处理 |
| `searchHandle`   | call   | `$archive` | 搜索结果请求处理 |
| `error404Handle` | call   | `$archive` | 404 错误页面处理 |
| `search`         | call   | `$archive` | 搜索操作时调用   |
| `feedItem`       | filter | `$item`    | 过滤RSS/Atom项目 |

### Widget 内容过滤 Hook



#### Widget\Base\Contents

| Hook 名称              | 类型         | 参数                             | 说明                 |
| ---------------------- | ------------ | -------------------------------- | -------------------- |
| `filter`               | filter       | `$row`                           | 过滤内容行数据       |
| `title`                | filter       | `$title`, `$widget`, `$result`   | 过滤内容标题         |
| `excerpt`              | filter       | `$excerpt`, `$widget`, `$result` | 过滤内容摘要         |
| `excerptEx`            | filter       | `$excerpt`, `$widget`, `$result` | 扩展摘要过滤         |
| `markdown`             | filter       | `$text`, `$widget`, `$result`    | 过滤 Markdown 处理   |
| `autoP`                | filter       | `$text`, `$widget`, `$result`    | 过滤自动段落处理     |
| `content`              | filter       | `$content`, `$widget`, `$result` | 过滤内容输出         |
| `contentEx`            | filter       | `$content`, `$widget`, `$result` | 扩展内容过滤         |
| `isFieldReadOnly`      | call+trigger | `$fieldName`                     | 检查字段是否只读     |
| `getDefaultFieldItems` | filter       | `$items`                         | 添加默认自定义字段项 |

#### Widget\Base\Comments

| Hook 名称   | 类型         | 参数                                     | 说明              |
| ----------- | ------------ | ---------------------------------------- | ----------------- |
| `filter`    | filter       | `$row`                                   | 过滤评论行数据    |
| `gravatar`  | call+trigger | `$email`, `$size`, `$rating`, `$default` | 自定义头像处理    |
| `markdown`  | filter       | `$text`, `$widget`, `$result`            | 过滤评论 Markdown |
| `autoP`     | filter       | `$text`, `$widget`, `$result`            | 过滤评论自动段落  |
| `content`   | filter       | `$content`, `$widget`, `$result`         | 过滤评论内容      |
| `contentEx` | filter       | `$content`, `$widget`, `$result`         | 扩展评论内容过滤  |

### 内容管理 Hook



#### Widget\Contents\Post\Edit

| Hook 名称       | 类型   | 参数    | 说明               |
| --------------- | ------ | ------- | ------------------ |
| `write`         | filter | `$post` | 过滤文章写入数据   |
| `finishPublish` | call   | `$post` | 文章发布完成后调用 |
| `finishSave`    | call   | `$post` | 文章保存完成后调用 |
| `mark`          | call   | `$post` | 文章状态标记时调用 |
| `finishMark`    | call   | `$post` | 文章状态标记完成   |
| `delete`        | call   | `$post` | 文章删除时调用     |
| `finishDelete`  | call   | `$post` | 文章删除完成后调用 |

#### Widget\Contents\Page\Edit

| Hook 名称       | 类型   | 参数    | 说明               |
| --------------- | ------ | ------- | ------------------ |
| `write`         | filter | `$page` | 过滤页面写入数据   |
| `finishPublish` | call   | `$page` | 页面发布完成后调用 |
| `finishSave`    | call   | `$page` | 页面保存完成后调用 |
| `mark`          | call   | `$page` | 页面状态标记时调用 |
| `finishMark`    | call   | `$page` | 页面状态标记完成   |
| `delete`        | call   | `$page` | 页面删除时调用     |
| `finishDelete`  | call   | `$page` | 页面删除完成后调用 |

#### Widget\Comments\Edit

| Hook 名称      | 类型   | 参数       | 说明               |
| -------------- | ------ | ---------- | ------------------ |
| `mark`         | call   | `$comment` | 评论状态标记时调用 |
| `delete`       | call   | `$comment` | 评论删除时调用     |
| `finishDelete` | call   | `$comment` | 评论删除完成后调用 |
| `edit`         | filter | `$comment` | 过滤评论编辑数据   |
| `finishEdit`   | call   | `$comment` | 评论编辑完成后调用 |
| `listComments` | filter | `$options` | 过滤评论列表选项   |

### 用户系统 Hook



#### Widget\User

| Hook 名称        | 类型   | 参数    | 说明               |
| ---------------- | ------ | ------- | ------------------ |
| `register`       | filter | `$user` | 过滤用户注册数据   |
| `finishRegister` | call   | `$user` | 用户注册完成后调用 |
| `logout`         | call   | 无      | 用户登出时调用     |

#### Widget\Login

| Hook 名称            | 类型         | 参数                              | 说明           |
| -------------------- | ------------ | --------------------------------- | -------------- |
| `login`              | call         | `$name`, `$password`, `$remember` | 登录尝试时调用 |
| `hashValidate`       | call+trigger | `$password`, `$hash`              | 自定义密码验证 |
| `loginSucceed`       | call         | `$user`                           | 登录成功后调用 |
| `loginFail`          | call         | `$user`                           | 登录失败后调用 |
| `simpleLoginSucceed` | call         | `$user`                           | 简单登录成功   |
| `simpleLoginFail`    | call         | `$name`                           | 简单登录失败   |

### 文件上传 Hook



#### Widget\Upload

| Hook 名称              | 类型         | 参数          | 说明               |
| ---------------------- | ------------ | ------------- | ------------------ |
| `deleteHandle`         | call+trigger | `$content`    | 自定义文件删除处理 |
| `attachmentHandle`     | call+trigger | `$attachment` | 自定义附件URL处理  |
| `attachmentDataHandle` | call+trigger | `$content`    | 自定义附件数据处理 |
| `beforeModify`         | call         | `$file`       | 文件修改前调用     |
| `modify`               | call         | `$file`       | 文件修改时调用     |
| `modifyHandle`         | call+trigger | `$file`       | 自定义文件修改处理 |
| `beforeUpload`         | call         | `$file`       | 文件上传前调用     |
| `upload`               | call         | `$file`       | 文件上传时调用     |
| `uploadHandle`         | call+trigger | `$file`       | 自定义文件上传处理 |

### 评论反馈 Hook



#### Widget\Feedback

| Hook 名称         | 类型   | 参数                  | 说明               |
| ----------------- | ------ | --------------------- | ------------------ |
| `comment`         | filter | `$comment`            | 过滤评论数据       |
| `finishComment`   | call   | `$comment`            | 评论提交完成后调用 |
| `reply`           | call   | `$comment`, `$parent` | 评论回复时调用     |
| `cancelReply`     | call   | 无                    | 取消回复时调用     |
| `trackback`       | filter | `$trackback`          | 过滤引用数据       |
| `finishTrackback` | call   | `$trackback`          | 引用完成后调用     |
| `pingback`        | filter | `$pingback`           | 过滤Pingback数据   |
| `finishPingback`  | call   | `$pingback`           | Pingback完成后调用 |

### 其他系统 Hook



#### Widget\Backup

| Hook 名称 | 类型 | 参数      | 说明           |
| --------- | ---- | --------- | -------------- |
| `export`  | call | `$backup` | 备份导出时调用 |

#### Widget\XmlRpc

| Hook 名称    | 类型   | 参数    | 说明                |
| ------------ | ------ | ------- | ------------------- |
| `textFilter` | filter | `$text` | 过滤XML-RPC文本内容 |

#### Widget\Metas\Category\Rows

| Hook 名称        | 类型   | 参数       | 说明             |
| ---------------- | ------ | ---------- | ---------------- |
| `listCategories` | filter | `$options` | 过滤分类列表选项 |

#### Widget\Contents\Page\Rows

| Hook 名称   | 类型   | 参数       | 说明             |
| ----------- | ------ | ---------- | ---------------- |
| `listPages` | filter | `$options` | 过滤页面列表选项 |
