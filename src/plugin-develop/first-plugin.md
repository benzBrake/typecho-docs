# 第一个插件

## 插件目录结构
Typecho插件遵循标准化的目录结构，最简单的插件至少包含一个主文件：
```
usr/plugins/
└── HelloWorld/           # 插件目录（必须与插件名一致）
    └── Plugin.php        # 插件主文件（核心代码）
```

## 开发第一个插件 HelloWorld

下面是一个完整的 "HelloWorld" 插件代码，它实现了所有核心接口，并能在页面底部显示一句可配置的文字。
将以下代码完整复制到 `usr/plugins/HelloWorld/Plugin.php` 文件中：

```php
<?php
namespace TypechoPlugin\HelloWorld;
/**
 * HelloWorld 插件
 * 一个简单的 Typecho 插件，用于在页面底部显示一句自定义文字。
 *
 * @package HelloWorld
 * @author  Your Name
 * @version 1.0.0
 * @link    https://your-website.com

 */
class HelloWorldPlugin implements Typecho\Plugin\PluginInterface
{
    /**
     * 激活插件方法,如果激活失败,直接抛出异常
     *
     * @access public
     * @return void
     * @throws Typecho\Plugin\Exception
     */
    public static function activate()
    {
        // 将我们的 render 方法挂接到页面底部 (footer) 钩子上
        Typecho\Plugin::factory('Widget\Archive')->footer = __CLASS__ . '::render';
    }

    /**
     * 禁用插件方法
     *
     * @access public
     * @return void
     */
    public static function deactivate()
    {
        // 禁用时通常不需要做任何事，因为钩子会自动失效
        // 如果需要清理数据或文件，可以在这里编写代码
    }

    /**
     * 获取插件配置面板
     *
     * @access public
     * @param Typecho\Widget\Helper\Form $form 配置面板
     * @return void
     */
    public static function config(Typecho\Widget\Helper\Form $form)
    {
        /** 创建一个名为 word 的文本输入框 */
        $word = new Typecho\Widget\Helper\Form\Element\Text(
            'word', 
            null, 
            'Hello, World!', 
            _t('显示文字'), 
            _t('在页面底部显示的文字，支持 HTML。')
        );
      
        $form->addInput($word);
    }

    /**
     * 个人用户的配置面板
     *
     * @access public
     * @param Typecho\Widget\Helper\Form $form
     * @return void
     */
    public static function personalConfig(Typecho\Widget\Helper\Form $form)
    {
        // 个人用户配置，本插件中未使用
    }

    /**
     * 插件实现方法
     * 这个方法会被挂载的钩子调用
     *
     * @access public
     * @return void
     */
    public static function render()
    {
        // 从配置中获取用户输入的文字
        $word = Typecho\Helper::options()->plugin('HelloWorld')->word;
      
        // 如果文字不为空，则输出
        if ($word) {
            echo '<p style="text-align:center; padding: 20px; background-color: #f0f0f0; border-top: 1px solid #ddd;">' . $word . '</p>';
        }
    }
}
```

## 代码详解

### 1. 插件信息块

文件顶部的注释块是插件的“身份证”，Typecho 会读取这些信息来识别插件。

```php
/**
 * @package HelloWorld      // 插件名，必须与目录名一致
 * @author  Your Name       // 作者
 * @version 1.0.0           // 版本号
 * @link    https://...     // 链接
 */
```

### 2. 类声明

```php
class HelloWorldPlugin implements Typecho\Plugin\PluginInterface
{
    // ...
}
```

所有插件都必须实现 `Typecho\Plugin\PluginInterface` 接口，并实现其定义的四个方法。类名可以自由命名，但通常建议与插件名保持一致，加上 `Plugin` 后缀。

### 3. `activate()` 方法

```php
public static function activate()
{
    Typecho\Plugin::factory('Widget\Archive')->footer = __CLASS__ . '::render';
}
```

这是插件的核心逻辑所在，我们在这里**注册钩子**。

*   `Typecho\Plugin::factory()` 是 Typecho 的钩子工厂。
*   `'Widget\Archive'` 是我们要挂载的组件，它代表了文章、页面等内容的渲染过程。
*   `->footer` 是 `Widget\Archive` 组件提供的一个钩子点，它在渲染页面底部时被触发。
*   `__CLASS__ . '::render'` 表示当 `footer` 钩子被触发时，调用当前类(`HelloWorldPlugin`)的 `render` 静态方法。

简单来说，这行代码的意思是：“每当 Typecho 渲染一个页面的底部时，请调用我们的 `render` 方法。”

### 4. `deactivate()` 方法

```php
public static function deactivate()
{
    // ...
}
```

插件被禁用时调用。在这个简单的例子中，我们不需要做任何清理工作，因为钩子会随着插件的禁用而自动失效。如果你的插件创建了数据表或文件，应该在这里进行删除。

### 5. `config()` 方法

```php
public static function config(Typecho\Widget\Helper\Form $form)
{
    $word = new Typecho\Widget\Helper\Form\Element\Text('word', null, 'Hello, World!', _t('显示文字'), _t('在页面底部显示的文字，支持 HTML。'));
    $form->addInput($word);
}
```

这个方法用于生成插件的后台配置界面。

*   它接收一个 `Form` 对象作为参数。
*   我们创建了一个 `Text` 类型的表单元素。
    *   `'word'`：配置项的名称，用于在数据库中存储和读取。
    *   `null`：选项列表，文本框没有选项，所以为 `null`。
    *   `'Hello, World!'`：默认值。
    *   `_t('显示文字')`：表单项的标题。`_t()` 是 Typecho 的国际化函数。
    *   `_t('在页面底部显示的文字，支持 HTML。')`：表单项的描述。
*   最后，通过 `$form->addInput($word)` 将这个元素添加到配置表单中。

### 6. `render()` 方法

```php
public static function render()
{
    $word = Helper::options()->plugin('HelloWorld')->word;
    if ($word) {
        echo '<p style="...">' . $word . '</p>';
    }
}
```

这是真正执行操作的函数，由 `activate()` 中注册的钩子调用。

*   `Helper::options()` 获取全局配置对象。
*   `->plugin('HelloWorld')` 获取名为 "HelloWorld" 的插件配置。
*   `->word` 获取我们之前在 `config()` 方法定义的名为 `word` 的配置项的值。
*   最后，`echo` 将配置的文字输出到页面上。

## 如何使用

1.  **创建文件**：在你的 Typecho 网站根目录下，依次创建 `usr/plugins/HelloWorld/Plugin.php` 文件。
2.  **粘贴代码**：将上面完整的代码示例复制到 `Plugin.php` 文件中并保存。
3.  **登录后台**：登录你的 Typecho 管理后台。
4.  **启用插件**：进入 **“控制台” -> “插件”** 页面，你应该能在列表中找到 "HelloWorld" 插件。点击其下方的 **“启用”** 按钮。
5.  **配置插件**：启用后，插件名称旁边会出现一个 **“设置”** 按钮。点击它，你可以修改页面底部显示的文字，然后保存设置。
6.  **查看效果**：访问你的博客首页或任意文章页面，拉到底部，你应该能看到你设置的文字。

---

## 总结与进阶

至此，你已经成功创建了第一个 Typecho 插件！这个例子涵盖了插件开发最核心的几个概念：

*   **目录结构**：插件必须放在 `usr/plugins/` 目录下，且主目录名与插件名一致。
*   **信息块**：文件头注释是插件的身份标识。
*   **生命周期**：通过实现 `activate` 和 `deactivate` 方法来管理插件的启用和禁用。
*   **钩子机制**：使用 `Typecho\Plugin::factory()` 将自定义函数挂载到系统的特定执行点。
*   **配置管理**：通过 `config` 方法创建后台配置表单，并通过 `Helper::options()` 读取配置。

如果想要了解更多钩子注册点(Hook)，请查阅[Hook 基础使用](hooks-usage)