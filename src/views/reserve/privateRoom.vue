<!--
 * @Descripttion:
 * @Version: 1.0
 * @Author: pj
 * @Date: 2023-06-20 16:42:41
 * @LastEditors: pj
 * @LastEditTime: 2023-06-27 10:07:51
-->
<template>
  <div class="privateRoom">
    <a-row type="flex">
      <a-col :flex="4">
        <div class="privateRoom_left flex fdirc">
          <div class="privateRoom_left_title">{{ name }}</div>
          <div class="privateRoom_left_content">
            <div class="privateRoom_left_content_title">
              <div>{{ $t('reserve.title.bookTitle') }}</div>
            </div>
            <div class="privateRoom_left_content_table">
              <div>
                <a-table
                  :columns="[
                    {
                      title: this.$t('reserve.title.bookName'),
                      dataIndex: 'name',
                      width: 100,
                      align: 'center',
                    },
                    {
                      title: this.$t('reserve.title.bookTime'),
                      dataIndex: 'preBookTime',
                      width: 200,
                      align: 'center',
                    },
                    {
                      title: this.$t('reserve.title.bookPhone'),
                      dataIndex: 'phone',
                      align: 'center',
                    },
                    {
                      title: this.$t('reserve.title.bookNumber'),
                      dataIndex: 'numberOfPeople',
                      width: 100,
                      align: 'center',
                    },
                    {
                      title: this.$t('reserve.title.control'),
                      key: 'action',
                      dataIndex: 'action',
                      scopedSlots: { customRender: 'action' },
                      align: 'center',
                    },
                  ]"
                  :data-source="dataList"
                  :pagination="pagination"
                  :scroll="{ y: 690 }"
                  @change="handleTableChange"
                  :loading="loading"
                >
                  <span slot="action" class="flex jcc aic">
                    <div class="button_type flex jcc aic">{{ this.$t('reserve.title.reminder') }}</div>
                    <div class="button_type button_type_2 flex jcc aic">{{ this.$t('reserve.title.arrived') }}</div>
                    <div class="button_type button_type_2 flex jcc aic">{{ this.$t('reserve.title.cancel') }}</div>
                  </span>
                </a-table>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :flex="1">
        <div class="privateRoom_right">
          <div class="privateRoom_right_top"></div>

          <div class="privateRoom_right_bottom">
            <div :style="{ width: '450px', height: '395px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
              <a-calendar :fullscreen="false" @panelChange="onPanelChange" @select="onSelect" :value="value" />
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { mapState } from 'vuex'
// import MeScroll from 'mescroll.js'
// import 'mescroll.js/mescroll.min.css'
import { getPreBookList } from '@/api/reserve'
import moment from 'moment'

// const tit =

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data () {
    // 这里存放数据
    // const vm = window.vm
    return {
      // vm: vm,
      mescroll1: null,
      dataList: [], // 列表数据
      loading: false,
      value: moment(),
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 0
      }
    }
  },
  // 计算属性类似于data概念
  computed: {
    ...mapState({
      name: (state) => state.user.name,
      token: (state) => state.user.token,
      welcome: (state) => state.user.welcome
    })
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onSelect (value) {
      this.value = value
      this.upCallback({ num: 1, size: 10, date: value })
      this.loading = true
    },
    onPanelChange (value) {
      this.value = value
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination, filters, sorter, 'test')
      this.upCallback({ num: pagination.current, size: 10, date: this.value })
      this.loading = true
    },
    getList (params) {
      getPreBookList(params)
        .then((res) => {
          const arr = res.data.records
          this.pagination.total = res.data.total
          this.pagination.current = res.data.current
          // this.pagination.pageSize = res.data.size
          // 如果是第一页需手动置空列表
          if (params.page === 1) this.dataList = []
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr)
          this.loading = false
          // this.$nextTick(() => {
          //   this.mescroll.endSuccess(arr.length)
          // })
          // 数据渲染成功后,隐藏下拉刷新的状态
        })
        .catch((err) => {
          console.log(err)
          // this.mescroll.endErr()
        })
    },
    upCallback (page) {
      const pages = page.num // 页码, 默认从1开始 如何修改从0开始 ?
      const date = page.date
      const limit = page.size // 页长, 默认每页10条
      const preBookType = 1
      const preBookDate = moment(date).format('YYYY-MM-DD')
      const params = {
        page: pages,
        limit,
        preBookDate,
        preBookType
      }
      console.log(params, 'params')
      this.getList(params)
    }
    // mescrollInit (mescroll) {
    //   this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    // }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.upCallback({ num: 1, size: 10, date: this.value })
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // this.mescroll = new MeScroll(this.$refs.mescroll, {
    //   // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
    //   up: {
    //     callback: this.upCallback,
    //     isLock: true,
    //     page: {
    //       num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
    //       size: 10, // 每页数据的数量
    //       date: this.value
    //     },
    //     noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    //     toTop: {
    //       // 配置回到顶部按钮
    //       src: './static/mescroll/mescroll-totop.png'
    //     },
    //     lazyLoad: {
    //       use: true // 是否开启懒加载,默认false
    //     }
    //   }
    // })
  },
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
.button_type {
  width: 90px;
  height: 35px;
  border-radius: 100px;
  opacity: 1;
  box-sizing: border-box;
  border: 2px solid #E9CAA2;
  text-align: center;
  font-size: 18px;
  line-height: 16px;
  color: #3D3D3D;
  margin-right: 10px;
  cursor: pointer;
}
.button_type_2 {
  background: linear-gradient(270deg, #EACDA6 0%, #D5A574 100%);
}

.privateRoom {
  &_left {
    width: 1000px;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    padding-left: 20px;
    padding-right: 20px;
    &_title {
      font-size: 42px;
      font-weight: normal;
      line-height: 42px;
      letter-spacing: 0em;
      color: #3d3d3d;
      margin-top: 20px;
    }
    &_content {
      margin-top: 50px;
      &_title {
        font-size: 18px;
        line-height: 24px;
        color: #3d3d3d;
        margin-bottom: 25px;
      }
      &_table {
        height: 692px;
      }
    }
  }
  &_right {
    &_top {
      width: 450px;
      margin-bottom: 20px;
      height: 424px;
      border-radius: 10px;
      background: #ffffff;
    }
    &_bottom {
      width: 450px;
      height: auto;
      background-color: #fff;
    }
  }
}
</style>
