# Hook 基础使用
Typecho 提供了完整的 Hook 系统，支持在系统各个环节进行功能扩展。 

## 基础语法
```php
// 动作型 Hook
\Typecho\Plugin::factory('Hook点')->Hook名称 = [类名::class, '方法名'];
 
// 过滤器型 Hook，需要在方法中返回已变更的参数
\Typecho\Plugin::factory('Hook点')->Hook名称 = [类名::class, '方法名'];
 
// 带权重的 Hook（数字越小优先级越高）
\Typecho\Plugin::factory('Hook点')->Hook名称_10 = [类名::class, '方法名'];
```

::: tip 特别说明
`\Typecho\Plugin::factory('Hook点')->Hook名称 = [类名::class, '方法名'];`与
`\Typecho\Plugin::factory('Hook点')->Hook名称 = 类名::class . '::方法名';`是等价的。
:::

## 基础 Hook 注册
基础 Hook 注册只能注册到 Typecho 中存在的 Hook 点，可用 Hook 点详见[Hook 参考手册](hooks-reference)。
```php
<?php
namespace TypechoPlugin\HelloWorld;
use Typecho\Plugin\PluginInterface;
class HelloWorldPlugin implements PluginInterface
    public static function activate() {
        // ...
        // 注册钩子
        \Typecho\Plugin::factory('Widget\Archive')->footer = __CLASS__ . '::render'; // [!code ++]
        // ...
    }
    // 处理函数
    public static function render() {  // [!code ++]
        echo `<p>这是第一个插件</p>`;  // [!code ++]
    }  // [!code ++]
```
## 动态属性扩展
在 Typecho 中只要这个类是继承自`\Typecho\Widget`基类，它就默认具备了这个功能。

```php
// 这里先给出相对完整的参考，后面只会保留关键代码
<?php
// 注册动态属性
\Typecho\Plugin::factory('Widget\Archive')->___charactersNum = __CLASS__ . '::charactersNum';

// 模板中使用
public static function charactersNum($archive) {
    return mb_strlen($archive->text, 'UTF-8');
}
```
那么这个方法就已经植入到`Widget\Archive`中去了，你在模版(index.php, archive.php, post.php, page.php 等前端页面)中可以直接调用如下代码输出它
```php
<?php echo $this->charactersNum; ?>
```
或者直接输出
```php
<?php echo $this->charactersNum(); ?>
```

## 动态方法扩展
为任何 Widget 添加自定义方法，使用 call 前缀加首字母大写的方法名： 
```php
// 注册动态方法
\Typecho\Plugin::factory('Widget\Archive')->callCustomMethod = [Plugin::class, 'handleCustomMethod'];
 
public static function handleCustomMethod($archive, $args)
{
    echo '<div class="custom-output">' . $archive->title . '</div>';
}
// 模板中调用
<?php $this->customMethod(); ?>
```