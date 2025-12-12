<script setup>
import DefaultTheme from 'vitepress/theme'
import { withBase } from 'vitepress'
const { Layout } = DefaultTheme
</script>
<style scoped>
.mb-4 {
  margin-bottom: 1em;
}
.mt-4 {
  margin-top: 1em;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ai-list {
  list-style: disc;
}
.ai-list li {
  margin-top: 0.5em;
  padding-left: 1.25rem;
}
.ai-list li a {
  text-decoration: underline;
  color: var(--vp-c-brand-1);
}
.ai-list li a:hover {
  color: var(--vp-c-brand-2);
}
</style>
<template>
  <Layout>
    <template #doc-before>
      <div class="tip custom-block mb-4">
        <p class="custom-block-title">TIP</p>
        <p>本文档适配 Typecho 版本为：<strong>1.2.1</strong></p>
      </div>
    </template>
    <template #doc-after>
      <div class="mt-4">
        <a class="flex-center" href="https://xiamp.net" target="_blank">
          <img :src="withBase('/images/8eb93608392af3d5fb287682b3de79f7.gif')"/>
        </a>
      </div>
      <div class="mt-4">
        <p>如果你没接触过开发，建议使用 AI。下面是站长用过的 AI，都还可以:</p>
        <ul class="ai-list">
          <li>
            <a href="https://www.bigmodel.cn/claude-code?ic=9BIDUPHO8M" target="_blank" rel="noreferrer">🚀 速来拼好模，智谱 GLM Coding 超值订阅，邀你一起薅羊毛！Claude Code、Cline 等 10+ 大编程工具无缝支持，“码力”全开，越拼越爽！立即开拼，享限时惊喜价！</a>
          </li>
          <li>
            <a href="https://www.sophnet.com/#?code=NWIYH5" target="_blank" rel="noreferrer">使用邀请码<strong>NWIYH5</strong>注册登录 SophNet 即可获得20元免费奖励金，后续充值额外赠送5%奖励</a>
          </li>
          <li>
            <a href="https://cloud.siliconflow.cn/i/YaoAd8F5" target="_blank" rel="noreferrer">SiliconFlow 邀请奖励持续进行中，2000 万 Tokens 送不停！</a>
          </li>
        </ul>
      </div>
    </template>
  </Layout>
</template>