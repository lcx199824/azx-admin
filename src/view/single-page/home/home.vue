<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="10" :lg="8" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="50">
          <!-- <count-to :end="infor.count" count-class="count-style" /> -->

          <div class="info">{{infor.count}}</div>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20">
      <i-col :xs="36" :md="30" :lg="24" style="margin: 20px 0;font-size:14px">
        <Table stripe size="large" :columns="columns" :data="activities"></Table>
        <div class="pages">
          <pagination :pages='totalPage' @pageChange="pageItemClick"></pagination>
        </div>
      </i-col>
    </Row>
    <!-- <Row> -->
    <!-- <Card shadow>
        <example style="height: 310px;" />
      </Card> -->
    <!-- </Row> -->
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
import { statistics, getAcData } from '@/api/data'
import Pagination from '@/view/components/pagination/pagination'

export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example,
    Pagination
  },
  data () {
    // _statistics md-person-add
    return {
      inforCardData: [
        { title: '活动数量', icon: '_activities', count: '', color: '#2d8cf0' },
        { title: '卡券记录', icon: '_coupon', count: '', color: '#19be6b' },
        { title: '分享数量', icon: 'md-share', count: '', color: '#ed3f14' },
        { title: '红包总金额', icon: '_redpacket', count: '', color: '#E46CBB' },
        { title: '已使用金额', icon: '_redpacket', count: '', color: '#ff9900' },
        { title: '有效期剩余', icon: 'md-clock', count: '', color: '#9A66E4' }

      ],
      pieData: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ],
      activities: [],
      columns: [
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '卡券记录',
          key: 'cardcount',
          align: 'center'
        },
        {
          title: '分享数量',
          key: 'sharecount',
          align: 'center'
        },
        {
          title: '红包总金额/元',
          key: 'money',
          align: 'center'
        },
        {
          title: '已使用金额/元',
          key: 'usedmoney',
          align: 'center'
        }
      ],
      totalPage: 1,
      currentPage: 1
    }
  },
  methods: {
    pageItemClick (page) {
      this.currentPage = page
      this.getAcData()
    },
    getAcData () {
      getAcData({ page: this.currentPage }).then(res => {
        if (res) {
          this.activities = res.data.data
          this.totalPage = Math.ceil(parseInt(res.data.count) / 10)
        }
      })
    }
  },
  mounted () {
    // 获取并显示所有活动的统计数据
    statistics().then(res => {
      this.inforCardData[0].count = res.data.actcount
      this.inforCardData[1].count = res.data.cardcount
      this.inforCardData[2].count = res.data.sharecount
      this.inforCardData[3].count = res.data.money
      this.inforCardData[4].count = res.data.usedmoney
      this.inforCardData[5].count = res.data.endtime
    })
    this.getAcData()
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
.pages {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.info {
  font-size: 28px;
  // border: 1px solid black;
  margin-bottom: 10px;
}
</style>
