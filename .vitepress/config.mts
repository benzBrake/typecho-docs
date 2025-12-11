import { defineConfig } from "vitepress"
import mdItCustomAttrs from "markdown-it-custom-attrs"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  title: "Typecho 文档",
  description: "一份 Typecho 非官方文档",
  srcDir: "src",
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "使用文档", link: "/usage", activeMatch: "/usage.*" },
      { text: "主题开发", link: "/theme-develop/template-quickstart", activeMatch: "/theme-develop.*" },
      { text: "插件开发", link: "/plugin-develop/plugin-quickstart", activeMatch: "/plugin-develop.*"},
      { text: "捐赠支持", link: "/donate", activeMatch: "/donate" }
    ],

    sidebar: {
      '/usage': [{
        base: "/usage/",
        text: "开始",
        items: [
          {
            text: "安装",
            link: "install",
            collapsed: true,
            items: [
              {
                text: "手动",
                link: "install/manual",
              },
              {
                text: "Docker",
                link: "install/docker",
              }
            ]
          },
          {
            text: "常见问题",
            link: "question",
          },
          {
            text: 'Typecho 常量',
            link: 'typecho_constants'
          }
        ],
      }],
      'theme-develop': [
        {
          base: "/theme-develop/",
          text: '模板快速入门',
          link: "template-quickstart",
          items: [
            {
              text: 'index.php',
              link: 'template-quickstart/index_php'
            }, {
              text: 'header.php',
              link: 'template-quickstart/header_php'
            }, {
              text: 'footer.php',
              link: 'template-quickstart/footer_php'
            }, {
              text: 'sidebar.php',
              link: 'template-quickstart/sidebar_php'
            }, {
              text: 'post.php',
              link: 'template-quickstart/post_php'
            }, {
              text: 'comments.php',
              link: 'template-quickstart/comments_php'
            }
          ]
        }, {
          base: "/theme-develop/",
          text: '模板基础开发',
          link: "template-basic",
          items: [
            {
              text: '神奇的 is 语法',
              link: 'template-basic/is_syntax'
            }, {
              text: '文本输出和多语言',
              link: 'template-basic/i18n'
            }, {
              text: '自定义标题 ',
              link: 'template-basic/custom_title'
            }, {
              text: '自定义头部',
              link: 'template-basic/custom_header'
            }, {
              text: '面包屑导航',
              link: 'template-basic/breadcrumbs_nav'
            }, {
              text: '自定义评论',
              link: 'template-basic/custom_comments'
            }, {
              text: '分离文章的评论和引用通告',
              link: 'template-basic/divide_comment_and_pingback'
            }, {
              text: '调用自定义字段',
              link: 'template-basic/custom_fields'
            }, {
              text: '调用相关文章',
              link: 'template-basic/related_posts'
            }, {
              text: '调用分类文章',
              link: 'template-basic/category_posts'
            }, {
              text: '调用标签',
              link: 'template-basic/tags'
            }, {
              text: '自定义分页样式',
              link: 'template-basic/custom_pagination'
            }
          ]
        }, {
          base: "/theme-develop/",
          text: "模板扩展开发",
          items: [
            {
              text: '前台个人资料页',
              link: 'template-extend/frontend_profile'
            }, {
              text: '常用模板函数',
              link: 'template-extend/useful_functions'
            }, {
              text: '常用统计',
              link: 'template-extend/stat_functions'
            }, {
              text: '强制显示 404 页面',
              link: 'template-extend/show_notfound'
            }, {
              text: '主题选项开发',
              link: 'template-extend/theme_options'
            }
          ]
        }
      ],
      'plugin-develop': [
        {
          base: "/plugin-develop/",
          text: '插件快速入门',
          link: 'plugin-quickstart'
        }
      ]
    },

    outline: [2, 3],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/benzbrake/typecho-docs",
      },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: 'Copyright © 2020-present <a href="https://xiamp.net">虾米皮皮乐</a>',
    }
  },
  markdown: {
    config (md) {
      md.use(mdItCustomAttrs, "image", {
        "data-zoomable": "",
      })
    },
  },
})
