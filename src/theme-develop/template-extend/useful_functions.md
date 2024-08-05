# 常用模板函数

这些函数都可以放在`functions.php`方便调用

## 获取模板版本号

```php
function get_theme_version()
{
     $info = Typecho_Plugin::parseInfo(__DIR__ . '/index.php');
     return $info['version'];
}
```

## 全局替换正文内容

`themeInit`函数必须放在`functions.php`或者`functions.php`引用的php文件里

```php
function themeInit($archive) {
    ... // 其他语句
	if ($archive->is('index') || $archive->is('content')) {
    	$archive->content = replace_text($archive->content);
    }
    ... // 其他语句
}

function replace_text($content) {
      $content = preg_replace('#<a(.*?) href="([^"]*/)?(([^"/]*)\.[^"]*)"(.*?)>#',
        '<a$1 href="$2$3"$5 target="_blank">', $content); // 强制文章中的链接为新标签打开
      return $content;
}
```

## 文章阅读次数统计

### 使用 `views` 字段存储数据

放在`functions.php`中

```php
function themeInit($archive) {
    ... // 其他语句
    $db = \Typecho\Db::get();
    $_prefix = $db->getPrefix();
    try {
        if (!array_key_exists('views', $db->fetchRow($db->select()->from('table.contents')->page(1, 1)))) {
            $db->query('ALTER TABLE `' . $_prefix . 'contents` ADD `views` INT DEFAULT 0;');
        }
    } catch (Exception $e) {}
	if ($archive->is('content')) {
        increase_views($archive);
    }
    ... // 其他语句
}

/**
 * 增加浏览次数
 */
function increase_Views($archive) {
    $cookie = trim(\Typecho\Cookie::get('__typecho_views') ?? "", " \t\n\r\0\x0B,");
    $viewedIds = !empty($cookie) ? explode(',', $cookie) : [];
    $cid = $archive->cid;
    if (!in_array($cid, $cookie)) {
        $db = \Typecho\Db::get();
        $db->query($db->update('table.contents')
            ->expression('views', 'views + 1')
            ->where('cid = ?', $cid));
        $viewedIds[] = $cid;
        $cookie = implode(',', $viewedIds);
        \Typecho\Cookie::set('__typecho_views', $cookie);
    } 
}

/**
 * 获取浏览次数，调用方式 get_views($archive, "0 times", "1 time", "%d times")
 */
function get_Views() {
    $args = func_get_args();
    if (count($args) === 0) {
        throw new \InvalidArgumentException(_t("Parameter#1 \$archive cannot be null"));
    }
    $archive = array_shift($args);
    $row = $db->fetchRow($db->select('views')->from('table.contents')->where('cid = ?', $archive->cid));
    $num = (isset($row) && isset($row['views']))  ? $row['views'] : 0;
    if (empty($args)) {
        $args[] = '%d';
    }
    return sprintf(array_key_exists($num, $args) ? $args[$num] : array_pop($args), $num);
}
```

调用举例，在`post.php`中

```php
<li class="meta-item">
    <?php echo get_views($this, _t("无人问津"), _t("1 次浏览"), _t("%d 次浏览")); ?>
</li>
```

### 使用自定义字段存储数据

这个方法无需给`contents`表增加一个字段`views`，放在`functions.php`中

```php
function themeInit($archive) {
    ... // 其他语句
	if ($archive->is('content')) {
        increase_views($archive);
    }
    ... // 其他语句
}

/**
 * 增加浏览次数
 */
function increase_Views($archive) {
    $cookie = trim(\Typecho\Cookie::get('__typecho_views') ?? "", " \t\n\r\0\x0B,");
    $viewedIds = !empty($cookie) ? explode(',', $cookie) : [];
    $cid = $archive->cid;
    if (!in_array($cid, $cookie)) {
        if (!isset($archive->fields->views)) {
        	$archive->setField('views', 'int', 1, $cid);
        } else {
            $archive->setField('views', 'int', intval($archive->fields->views) + 1, $cid);
        }
        $viewedIds[] = $cid;
        $cookie = implode(',', $viewedIds);
        \Typecho\Cookie::set('__typecho_views', $cookie);
    } 
}

/**
 * 获取浏览次数，调用方式 get_views($archive, "0 times", "1 time", "%d times")
 */
function get_Views() {
    $args = func_get_args();
    if (count($args) === 0) {
        throw new \InvalidArgumentException(_t("Parameter#1 \$archive cannot be null"));
    }
    $archive = array_shift($args);
    $num = intval($archive->fields->views ?? 0);
    if (empty($args)) {
        $args[] = '%d';
    }
    return sprintf(array_key_exists($num, $args) ? $args[$num] : array_pop($args), $num);
}
```

## 显示新帖子图标

放在`functions.php`中

```php
function isNewPost($archive){
	$now = new \Typecho\Date(T\Typecho\Date::time());
	return $now->timeStamp - $archive->date->timeStamp < 24*60*60 ? true : false;
}
```

调用举例，在列表循环里或者`post.php`里调用

```php
<?php if (isNewPost($this)): ?>
<li class="meta-item">
    新帖子
</li>
<?php endif; ?>
```

## 获取文章缩略图

放在`functions.php`中

```php
/**
 * 输出缩略图
 *
 * @param Typecho\Widget|\Widget\Base\Contents|\Widget\Archive $archive 文章对象
 * @param int $quantity 图片数量
 * @param bool $return 是否返回
 * @param bool $parse 是否转换
 * @param string $template 转换模板
 * @return mixed
 */
public static function thumbs($archive, int $quantity = 3, bool $return = false, bool $parse = false, string $template = '<img alt="" src="%s" />')
{
    $thumbs = [];

    // 首先使用自定义字段 thumb
    if (self::fieldExists($archive, 'thumb') && $quantity > 0) {
        $f_thumb = $archive->fields->thumb;
        if (!in_array($f_thumb, $thumbs)) {
            $fieldThumbs = explode("\n", $f_thumb);
            foreach ($fieldThumbs as $thumb) {
                if ($quantity > 0 && !empty(trim($thumb))) {
                    $thumbs[] = $thumb;
                    $quantity -= 1;
                }
            }
        }
    }

    // 然后是正文匹配
    preg_match_all("/<img(?<images>[^>]*?)>/i", $archive->content, $matches);
    foreach ($matches['images'] as $value) {
        if ($quantity <= 0) {
            break;
        }
        $match = '';
        // 2021.09.07 修复下标 src 不存在
        if (XCore::configStr('XLazyLoad', 'on') === 'on') {
            preg_match('/data-src="(?<src>.*?)"/i', $value, $dataSrcMatch);
            if (array_key_exists('src', $dataSrcMatch)) {
                $match = $dataSrcMatch['src'];
            }
        }

        if (empty($match)) {
            preg_match('/src="(?<src>.*?)"/i', $value, $srcMatch);
            if (array_key_exists('src', $srcMatch)) {
                $match = $srcMatch['src'];
            }
        }
        if (!empty($match)) {
            // 2020.03.29 修正输出插件图标的BUG
            if (strpos($match, __TYPECHO_PLUGIN_DIR__ . "/TePass") !== false) {
                continue;
            }
            if (strpos($match, "//") === false) {
                continue;
            }
            if (!in_array($match, $thumbs)) {
                $thumbs[] = $match;
                $quantity -= 1;
            }
        }
    }

    // 接着是附件匹配
    /** @var \Widget\Contents\Attachment\Related $attachments */
    \Widget\Contents\Attachment\Related::allocWithAlias('@content-' . $archive->cid, 'parentId=' . $archive->cid)->to($attachments);
    while ($attachments->next()) {
        if ($quantity <= 0) {
            break;
        }
        if (isset($attachments->isImage) && $attachments->isImage == 1) {
            if (!in_array($attachments->url, $thumbs)) {
                $thumbs[] = $attachments->url;
                $quantity -= 1;
            }
        }
    }

    // 最后是随机
    while ($quantity-- > 0) {
        $thumbs[] = getRandomCover();
    }

    // 转换
    if ($parse && (!empty($template))) {
        for ($i = 0; $i < count($thumbs); $i++) {
            $thumbs[$i] = str_replace("%s", $thumbs[$i], $template);
        }
    }

    // 输出或返回
    if ($return) {
        if (count($thumbs) == 1) {
            return $thumbs[0];
        }
        return $thumbs;
    } else {
        foreach ($thumbs as $thumb) {
            echo $thumb;
        }
        return true;
    }
}

function getRandomCover() {
    // 定义图片路径数组，请根据实际修改
    $images = [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg',
        'path/to/image4.jpg',
        'path/to/image5.jpg',
    ];

    // 从数组中随机选择一张图片
    $randomIndex = array_rand($images);

    // 返回随机选择的图片路径
    return $images[$randomIndex];
}
```

调用举例，在列表循环里或者`post.php`里调用

```php
<div class="post-cover">
<?php thumbs($this, 1, false, true); ?>
</div>
```

