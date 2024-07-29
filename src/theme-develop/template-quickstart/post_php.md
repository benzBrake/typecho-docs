# post.php

post 页和 index 是差不多的，下面解释下 post.php 里面存在的 php 代码。

## 代码与说明

| 代码                                        | 解释                                                         |
| :------------------------------------------ | :----------------------------------------------------------- |
| `<?php $this->permalink() ?>`               | 文章地址                                                     |
| `<?php $this->title() ?>`                   | 文章标题                                                     |
| `<?php $this->author->permalink(); ?>`      | 文章作者主页链接                                             |
| `<?php $this->author(); ?>`                 | 文章作者昵称                                                 |
| `<?php $this->date(); ?>`                   | 文章发布时间                                                 |
| `<?php $this->category(','); ?>`            | 文章分类，多个分类中间用逗号隔开                             |
| `<?php $this->content(); ?>`                | 文章内容                                                     |
| `<?php $this->tags(', ', true, 'none'); ?>` | 文章标签，多个标签间用逗号隔开，标签以带超链接的形式显示，如果不存在标签则显示 none |
| `<?php $this->need('comments.php'); ?>`     | 调用评论页                                                   |
| `<?php $this->thePrev('%s','没有了'); ?>`   | 带有超链接的上一篇文章的标题                                 |
| `<?php $this->theNext('%s','没有了'); ?>`   | 带有超链接的下一篇文章的标题                                 |
| `<?php $this->fields->fieldName(); ?>`      | 自定义字段`fieldName`的值，替换`fieldName`为对应自定义字段名即可 |

## 其他说明

page.php 代码同 post.php，区别就是 post 是用来显示文章的，而 page.php 是用来显示独立页面的。
