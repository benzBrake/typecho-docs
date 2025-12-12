<script setup>
import DefaultTheme from 'vitepress/theme'

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
          <img src="/images/8eb93608392af3d5fb287682b3de79f7.gif"/>
        </a>
      </div>
    </template>
  </Layout>
</template>