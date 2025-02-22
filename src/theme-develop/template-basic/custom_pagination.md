<style>.page-navigator { display: flex; justify-content: center; align-items: center; gap: 8px;} .page-navigator > li { list-style: none; margin: 0; padding: 0; } .page-navigator > li + li { margin-top: 0 }</style>
# 自定义分页

### 自定义分页样式

```php
<?php $this->pageNav('«', '»', 1, '...', array('wrapTag' => 'ol', 'wrapClass' => 'page-navigator', 'itemTag' => 'li', 'textTag' => 'span', 'currentClass' => 'current', 'prevClass' => 'prev', 'nextClass' => 'next',)); ?>
```
渲染出来的效果是这样的

<ol class="page-navigator"><li class="current"><a href="http://example.com/page/1/">1</a></li><li><a href="http://example.com/page/2/">2</a></li><li><span>...</span></li><li><a href="http://example.com/page/5/">5</a></li><li class="next"><a href="http://example.com/page/2/">»</a></li></ol>

### 由此可知

1. **«** 和 **»** 分别对应的是上一页按钮和下一页按钮

2. 数字1是分割范围(分几页)，是当前页码附近可现实的页码数量，举个例子，当前页码为1，一共页码为5，那么上述代码输出的效果就是1,2,...5,如果当前页码为2呢，效果就是1,2,3,...5。

3. **...** 是分割字符，就是2中提到的那个省略页码的东西

4. **wrapTag**外层包裹标签名，默认**ol**，**wrapClass**外层包裹类名，**itemTag**内层标签名， 默认**li**，**textTag**直接输出文字的标签名，**currentClass**当前聚焦类名，**prevClass**上一页类名,**nextClass**下一页类名。

5，**itemClass**可以给其他页码的标签带上class。【注：第5条为补充内容，例子中没有提到】

### 页码

当前页码：`<?php if($this->getCurrentPage()>1) echo $this->getCurrentPage(); else echo 1;?>`
总页码：`<?php echo ceil($this->getTotal() / $this->parameter->pageSize); ?>`