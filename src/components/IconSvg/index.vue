<!--
 * @Descripttion:
 * @Version: 1.0
 * @Author: pj
 * @Date: 2023-06-19 14:27:46
 * @LastEditors: pj
 * @LastEditTime: 2023-06-19 14:54:47
-->
<template>
  <svg :class="iconStyle" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
export default {
  name: 'IconSvg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconStyle: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>
<style>
/* .svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
} */
</style>
