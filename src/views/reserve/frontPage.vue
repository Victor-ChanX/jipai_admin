<!--
 * @Descripttion:
 * @Version: 1.0
 * @Author: pj
 * @Date: 2023-06-13 11:57:16
 * @LastEditors: pj
 * @LastEditTime: 2023-06-14 14:08:50
-->
<template>
  <div class="reserve">
    <div class="reserve_title">测试标题</div>
    <a-row type="flex">
      <!--利用Grid做的响应式-->
      <a-col :flex="4">
        <!--左侧预定叫号-->
        <div class="reserve_left flex fdirc">
          <a-row type="flex">
            <a-col flex="615px">
              <div class="reserve_left_tabList flex jcsr">
                <div v-for="item in tabList" :key="item.id" @click="switchTab(item.id)">
                  <div
                    class="reserve_left_tabList_tab position-r"
                    :class="{ reserve_left_tabList_activeTab: currentTab === item.id }"
                  >
                    <div
                      class="reserve_left_tabList_tab_waitTitle flex jcc position-a"
                      :class="{ reserve_left_tabList_activeTab: currentTab !== item.id }"
                    >
                      {{ item.name }}
                    </div>
                    <div class="flex jcc aic" style="margin: 0 20px 0 20px">
                      <div class="reserve_left_tabList_tab_waitText">{{ $t('reserve.title.QueueLength') }}:</div>
                      <div class="reserve_left_tabList_tab_waitNumber">{{ item.value }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
            <a-divider type="vertical" style="height: 75px; background-color: #d8d8d8; margin-right: 20px" />
            <a-col flex="185px">
              <div v-for="item in tabList2" :key="item.id" @click="switchTab(item.id)">
                <div
                  class="reserve_left_tabList_tab position-r"
                  :class="{ reserve_left_tabList_activeTab: currentTab === item.id }"
                >
                  <div
                    class="reserve_left_tabList_tab_waitTitle flex jcc position-a"
                    :class="{ reserve_left_tabList_activeTab: currentTab !== item.id }"
                  >
                    {{ item.name }}
                  </div>
                  <div class="flex jcc aic">
                    <div class="reserve_left_tabList_tab_waitText">{{ $t('reserve.title.QueueLength') }}:</div>
                    <div class="reserve_left_tabList_tab_waitNumber">{{ item.value }}</div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
          <div class="reserve_left_contentList">

          </div>
        </div>
      </a-col>
      <a-col :flex="1">
        <!--右侧日期和显示区-->
        <div div class="reserve_right">
          <div></div>
          <div></div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {

  },
  props: {},
  data () {
    // 这里存放数据
    return {
      tabList: [
        { name: '选项1', id: 0, value: '1' },
        { name: '选项2', id: 1, value: '2' },
        { name: '选项3', id: 2, value: '3' }
      ],
      tabList2: [{ name: '选项4', id: 3, value: '4' }],
      currentTab: 0,
      loading: false
    }
  },
  // 计算属性类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    switchTab (tabId) {
      this.currentTab = tabId
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.reserve {
  &_title {
    font-size: 42px;
    font-weight: normal;
    line-height: 42px;
    letter-spacing: 0em;
    color: #3d3d3d;
  }
  &_left {
    width: 975px;
    height: auto;
    margin-top: 45px;
    &_tabList {
      &_tab {
        width: auto;
        height: 75px;
        border-radius: 10px;
        margin-right: 20px;
        background: #f5f6f8;
        &_waitTitle {
          width: 75px;
          height: 20px;
          border-radius: 40px 100px 100px 0;
          background: #ffffff;
          font-size: 12px;
          color: #3d3d3d;
        }
        &_waitText {
          font-size: 18px;
          line-height: 18px;
          color: #3d3d3d;
          margin-top: 30px;
          margin-right: 6px;
          font-weight: bold;
          width: auto;
          white-space: nowrap;
        }
        &_waitNumber {
          font-family: 'MyFont', sans-serif;
          font-size: 38px;
          line-height: 38px;
          color: #3d3d3d;
          margin-top: 13px;
        }
      }
      &_activeTab {
        background: linear-gradient(90deg, #d7a978 0%, #f5e1c2 50%, #eacca5 100%);
      }
    }
  }
}
</style>
