<!--
 * @Descripttion:
 * @Version: 1.0
 * @Author: pj
 * @Date: 2023-06-13 11:45:47
 * @LastEditors: pj
 * @LastEditTime: 2023-06-13 15:44:54
-->
<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

export default {
  data () {
    return {
    }
  },
  computed: {
    locale () {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && (setDocumentTitle(`${i18nRender(title)} - ${domTitle}`))

      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'MyFont';  /* 自定义的字体名称 */
  src: url('/public/fonts/BEBAS-1.ttf') format('truetype');  /* 字体文件的路径和格式 */
  font-weight: normal;  /* 字体的粗细 */
  font-style: normal;  /* 字体的风格 */
}
</style>
