<!--
 * @Descripttion:
 * @Version: 1.0
 * @Author: pj
 * @Date: 2023-06-13 11:57:16
 * @LastEditors: pj
 * @LastEditTime: 2023-06-20 16:30:30
-->
<template>
  <div class="reserve">
    <a-row type="flex">
      <!--利用Grid做的响应式-->
      <a-col :flex="4">
        <!--左侧预定叫号-->
        <div class="reserve_left flex fdirc">
          <div class="reserve_left_title">{{ name }}</div>
          <a-row type="flex">
            <a-col flex="615px">
              <div class="reserve_left_tabList flex jcsr">
                <div v-for="item in tabList" :key="item.tableId" @click="switchTab(item.tableId)">
                  <div
                    class="reserve_left_tabList_tab position-r"
                    :class="{ reserve_left_tabList_activeTab: currentTab === item.tableId }"
                  >
                    <div
                      class="reserve_left_tabList_tab_waitTitle flex jcc position-a"
                      :class="{ reserve_left_tabList_activeTab: currentTab !== item.tableId }"
                    >
                      {{ item.seatNumberStart }}~ {{ item.seatNumberEnd }} {{ item.tableName }}
                    </div>
                    <div class="flex jcc aic" style="margin: 0 20px 0 20px">
                      <div class="reserve_left_tabList_tab_waitText">{{ $t('reserve.title.QueueLength') }}:</div>
                      <div class="reserve_left_tabList_tab_waitNumber">{{ item.waitNumber }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </a-col>
            <a-divider
              type="vertical"
              style="height: 75px; background-color: #d8d8d8; margin-right: 20px; margin-top: 45px"
            />
            <a-col flex="185px">
              <div v-for="item in tabList2" :key="item.tableId" @click="switchTab(item.tableId)">
                <div
                  class="reserve_left_tabList_tab position-r"
                  :class="{ reserve_left_tabList_activeTab: currentTab === item.tableId }"
                >
                  <div
                    class="reserve_left_tabList_tab_waitTitle flex jcc position-a"
                    :class="{ reserve_left_tabList_activeTab: currentTab !== item.tableId }"
                  >
                    {{ item.tableName }}
                  </div>
                  <div class="flex jcc aic">
                    <div class="reserve_left_tabList_tab_waitText">{{ $t('reserve.title.QueueLength') }}:</div>
                    <div class="reserve_left_tabList_tab_waitNumber">{{ item.waitNumber }}</div>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
          <div class="cancel">
            <div ref="mescroll" class="mescroll">
              <div class="example flex aic jcc" v-if="loading">
                <a-spin />
              </div>
              <div v-for="item in dataList" :key="item.lineUpId" v-if="!loading">
                <div class="reserve_left_contentList_content flex aic jcsb">
                  <div class="reserve_left_contentList_content_num">{{ item.lineUpCode }}</div>
                  <div class="reserve_left_contentList_content_people">
                    {{ item.numberOfPeople ? item.numberOfPeople : '0' }}人
                  </div>
                  <div class="reserve_left_contentList_content_text flex aic jcc">
                    <icon-svg icon-class="yidengdaitubiao" icon-style="icon-yidengdaitubiao" />
                    {{ getQueueStatus(item.lineUpType, item.waitTime) }}
                  </div>
                  <icon-svg icon-class="laba" icon-style="icon-laba" />
                  <div class="reserve_left_contentList_content_button flex">
                    <div class="reserve_left_contentList_content_button_confirm flex aic jcc">就餐</div>
                    <div class="reserve_left_contentList_content_button_cancel flex aic jcc">过号</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :flex="1">
        <!--右侧日期和显示区-->
        <div class="reserve_right">
          <div class="reserve_right_tv">
            <div class="reserve_right_tv_top flex jcsr aic">
              <div class="reserve_right_tv_top_QRcode">
                <div class="reserve_right_tv_top_QRcode_logo"></div>
                <div class="reserve_right_tv_top_QRcode_logo"></div>
              </div>
              <div class="reserve_right_tv_top_slogan">
                <div class="reserve_right_tv_top_slogan_top">
                  <div><span class="special">掃碼</span>排隊更EASY</div>
                  <div>線上<span class="special">訂檯</span>好容易</div>
                </div>
                <div class="reserve_right_tv_top_slogan_bottom flex aic jcsr">
                  <div v-for="(item, index) in largeScreenList" :key="index">
                    <div class="reserve_right_tv_top_slogan_bottom_list flex jcc aic fdirc">
                      <div class="reserve_right_tv_top_slogan_bottom_list_title">
                        {{ item.tableName }}{{ item.seatNumberStart }}~{{ item.seatNumberStart }}人
                      </div>
                      <div class="reserve_right_tv_top_slogan_bottom_list_content">{{ item.lineUpCode }}</div>
                      <div class="reserve_right_tv_top_slogan_bottom_list_number flex jcc aic">
                        {{ item.numberOfPeople }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="reserve_right_tv_bottom flex fdirrr aic">
              <icon-svg icon-class="fangda" icon-style="icon-fangda" />
            </div>
          </div>
          <div class="reserve_right_contentList">
            <div class="reserve_right_contentList_title">过号记录</div>
            <div ref="mescroll2" class="mescroll2">
              <div class="example flex aic jcc" v-if="loading2">
                <a-spin />
              </div>
              <div v-for="item in dataList2" :key="item.lineUpId" v-if="!loading2">
                <div class="reserve_right_contentList_content flex jcsr aic">
                  <div class="reserve_right_contentList_content_num flex aic jcc">
                    <div class="reserve_right_contentList_content_num_icon"></div>
                    {{ item.lineUpCode }}
                  </div>
                  <div class="reserve_right_contentList_content_num">
                    {{ item.numberOfPeople ? item.numberOfPeople : '0' }}人
                  </div>
                  <div class="reserve_right_contentList_content_text">
                    {{ getQueueStatus(item.lineUpType, item.waitTime) }}
                  </div>
                </div>
                <a-divider style="height: 1px; background-color: #d5d9df" />
              </div>
            </div>
          </div></div
        ></a-col>
    </a-row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { mapState } from 'vuex'
import { getWaitNumber, getLineUpList, getLargeScreen } from '@/api/reserve'

// 引入mescroll的vue组件
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data () {
    // 这里存放数据
    return {
      tabList: [
        // { name: '选项1', id: 0, value: '1' },
        // { name: '选项2', id: 1, value: '2' },
        // { name: '选项3', id: 2, value: '3' }
      ],
      tabList2: [{ tableName: '预约订台', tableId: 3, waitNumber: '4' }],
      currentTab: null,
      loading: false,
      loading2: false,
      mescroll: null, // mescroll实例对象
      mescroll2: null,
      dataList: [], // 列表数据
      dataList2: [], // 列表数据
      mescrollUp: {
        callback: this.upCallback,
        dataList: [] // 列表数据
      },
      isEdit: false, // 是否获取编辑的列表数据
      largeScreenList: []
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
    getQueueStatus (lineUpType, waitTime) {
      let resultTime = 0
      if (waitTime > 30) {
        resultTime = '30+'
      } else {
        resultTime = waitTime
      }
      switch (lineUpType) {
        case 1:
          return '已等待' + resultTime + '分钟'
        case 2:
          return '入座'
        case 3:
          return '已过号' + resultTime + '分钟'
        case 4:
          return '已取消'
      }
    },
    getList (params, type) {
      if (type === '1') {
        getLineUpList(params)
          .then((res) => {
            const arr = res.data.records
            // 如果是第一页需手动置空列表
            if (params.page === 1) this.dataList = []
            // 把请求到的数据添加到列表

            this.dataList = this.dataList.concat(arr)
            this.loading = false
            this.$nextTick(() => {
              this.mescroll.endSuccess(arr.length)
            })
            // 数据渲染成功后,隐藏下拉刷新的状态
          })
          .catch((err) => {
            console.log(err)
            this.mescroll.endErr()
          })
      } else {
        getLineUpList(params)
          .then((res) => {
            const arr = res.data.records
            // 如果是第一页需手动置空列表
            if (params.page === 1) this.dataList2 = []
            // 把请求到的数据添加到列表
            this.dataList2 = this.dataList2.concat(arr)
            this.loading2 = false
            this.$nextTick(() => {
              this.mescroll2.endSuccess(arr.length)
            })
            // 数据渲染成功后,隐藏下拉刷新的状态
          })
          .catch((err) => {
            console.log(err)
            this.mescroll2.endErr()
          })
      }
    },
    switchTab (tabId) {
      this.currentTab = tabId
      this.upCallback({ num: 1, size: 10, type: '1' })
      this.upCallback({ num: 1, size: 10, type: '2' })
      this.loading = true
      this.loading2 = true
      console.log(tabId)
    },
    upCallback (page, mescroll) {
      const pages = page.num // 页码, 默认从1开始 如何修改从0开始 ?
      const type = page.type
      const limit = page.size // 页长, 默认每页10条
      const tableId = this.currentTab
      if (type === '1') {
        const lineUpType = 1
        const params = {
          page: pages,
          limit,
          lineUpType,
          tableId
        }
        console.log(params, 'params')
        this.getList(params, type)
      } else {
        const lineUpType = 3
        const params = {
          page: pages,
          limit,
          lineUpType,
          tableId
        }
        console.log(params, 'params')
        this.getList(params, type)
      }
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    getLargeScreenList () {
      getLargeScreen()
        .then((res) => {
          this.largeScreenList = res.data
          console.log(this.largeScreenList, 'largeScreenList')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getWait () {
      getWaitNumber()
        .then((res) => {
          this.tabList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getLargeScreenList()
    this.getWait()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.mescroll = new MeScroll(this.$refs.mescroll, {
      // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
      up: {
        callback: this.upCallback,
        isLock: true,
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10, // 每页数据的数量
          type: '1'
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          // 配置回到顶部按钮
          src: './static/mescroll/mescroll-totop.png'
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      }
    })
    this.mescroll2 = new MeScroll(this.$refs.mescroll2, {
      // 在vue的mounted生命周期初始化mescroll,确保此处配置的ref有值
      up: {
        callback: this.upCallback,
        isLock: true,
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10, // 每页数据的数量
          type: '2'
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          // 配置回到顶部按钮
          src: './static/mescroll/mescroll-totop.png'
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        },
        type: '2'
      }
    })
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
.mescroll {
  width: 975px;
  height: 600px;
  margin-top: 40px;
}

.mescroll2 {
  width: 100%;
  height: 350px;
  margin-top: 40px;
}
.icon-laba {
  width: 36px;
  height: 36px;
  // 鼠标悬停手指
  cursor: pointer;
}
.icon-yidengdaitubiao {
  width: 21px;
  height: 21px;
  margin-right: 7px;
}
.icon-fangda {
  width: 20px;
  height: 20px;
  margin-right: 13px;
  cursor: pointer;
}
.reserve {
  &_left {
    width: 1000px;
    height: auto;
    background-color: #fff;
    &_title {
      font-size: 42px;
      font-weight: normal;
      line-height: 42px;
      letter-spacing: 0em;
      color: #3d3d3d;
      background-color: #fff;
      margin-top: 20px;
      margin-left: 20px;
    }
    &_tabList {
      &_tab {
        width: auto;
        height: 75px;
        border-radius: 10px;
        margin-right: 20px;
        background: #f5f6f8;
        margin-top: 45px;
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
    &_contentList {
      &_content {
        width: 1000x;
        height: 65px;
        border-radius: 10px;
        background: #ffffff;
        box-sizing: border-box;
        border: 1px solid #d5d9df;
        padding: 15px 50px 15px 50px;
        margin-bottom: 15px;
        margin-left: 20px;
        &_num {
          font-family: 'MyFont', sans-serif;
          font-size: 36px;
          line-height: 36px;
          color: #3d3d3d;
        }
        &_people {
          font-size: 24px;
          line-height: 24px;
          color: #3d3d3d;
        }
        &_text {
          font-size: 18px;
          line-height: 24px;
          color: #666666;
        }
        &_button {
          &_confirm {
            width: 90px;
            height: 35px;
            border-radius: 100px;
            background: linear-gradient(270deg, #eacda6 0%, #d5a574 100%);
            margin-right: 15px;
            font-size: 20px;
            line-height: 24px;
            color: #3d3d3d;
            cursor: pointer;
          }
          &_cancel {
            width: 90px;
            height: 35px;
            border-radius: 100px;
            box-sizing: border-box;
            border: 1px solid #eacda6;
            border-image-slice: 1;
            font-size: 20px;
            line-height: 24px;
            color: #3d3d3d;
            cursor: pointer;
          }
        }
      }
    }
  }
  &_right {
    &_tv {
      width: 467px;
      height: 360px;
      border-radius: 10px;
      background: #111111;
      &_top {
        background-image: url('../../assets/images/reserve/tvtop.jpg');
        border-radius: 10px 10px 0 0;
        height: 320px;
        &_QRcode {
          &_logo {
            width: 97px;
            height: 97px;
            opacity: 1;
            border-radius: 50%;
            background: #d8d8d8;
            margin-top: 24px;
          }
        }
        &_slogan {
          width: 267px;
          height: auto;
          box-sizing: border-box;
          padding-top: 17px;
          &_top {
            font-size: 34px;
            font-weight: bold;
            line-height: 39px;
            color: #fff;
            .special {
              color: #e7b786;
            }
          }
          &_bottom {
            margin-top: 30px;
            &_list {
              &_title {
                font-size: 12px;
                line-height: 12px;
                color: #ffffff;
                margin-bottom: 10px;
              }
              &_content {
                font-size: 34px;
                font-family: 'MyFont', sans-serif;
                line-height: 34px;
                color: #ffffff;
                margin: 0 10px 0px 10px;
              }
              &_number {
                margin-top: 15px;
                width: 60px;
                height: 20px;
                border-radius: 100px;
                font-size: 10px;
                line-height: 10px;
                color: #3d3d3d;
                text-align: center;
                background: #e7b786;
              }
            }
          }
        }
      }
      &_bottom {
        height: 40px;
      }
    }
    &_contentList {
      background-color: #fff;
      width: 467px;
      height: 450px;
      margin-top: 15px;
      border-radius: 10px;
      padding: 20px;
      // 超出则滚动
      overflow-y: auto;
      &_title {
        font-size: 20px;
        line-height: 20px;
        color: #3d3d3d;
        font-weight: bold;
      }
      &_content {
        margin-bottom: 20px;
        &_num {
          font-size: 26px;
          line-height: 26px;
          color: #3d3d3d;
          font-family: 'MyFont', sans-serif;
          &_icon {
            width: 6px;
            height: 6px;
            background: #e7b786;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        &_text {
          font-size: 22px;
          line-height: 22px;
          color: #9598a2;
        }
      }
    }
  }
}
</style>
