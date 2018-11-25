<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :searchOps="searchOps" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Excel文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getCouponData, getShareData } from '@/api/data'
export default {
  //   name: 'tables_page',
  name: 'coupon_list',
  components: {
    Tables
  },
  data () {
    return {
      searchOps: {
        from: 'coupon',
        options: [
          {
            id: 1,
            title: '活动名称',
            searchKey: ''
          },
          {
            id: 2,
            title: '分享人名称',
            searchKey: ''
          }

        ]
      },
      columns: [
        { title: '商店名称', key: 'shopname' },
        { title: '活动名称', key: 'actname' },
        { title: '分享人名称', key: 'fromname' },
        {
          title: '分享人头像',
          key: 'fromimg',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.fromimg
              },
              style: {
                width: '50px',
                heigth: '50px'
              }
            })
          }
        },
        { title: '领券人名称', key: 'toname' },
        {
          title: '领券人头像',
          key: 'toimg',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.toimg
              },
              style: {
                width: '50px',
                heigth: '50px'
              }
            })
          }
        },
        { title: '领券人openid', key: 'cardid' },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            if (params.row.status == 0) {
              if (params.row.codestatus == 0) {
                return h('div',
                  [
                    h('div', { style: { width: '60px', background: '#ed4014', textAlign: 'center', borderRadius: '5px', padding: '3px 0', margin: '1px', color: '#fff' } }, '未领取'),
                    h('div', { style: { width: '60px', background: '#ed4014', textAlign: 'center', borderRadius: '5px', padding: '3px 0', margin: '1px', color: '#fff' } }, '未核销')
                  ])
              } else {
                return h('div',
                  [
                    h('div', { style: { width: '60px', background: '#19be6b', textAlign: 'center', borderRadius: '5px', padding: '3px 0', margin: '1px', color: '#fff' } }, '已领取'),
                    h('div', { style: { width: '60px', background: '#ed4014', textAlign: 'center', borderRadius: '5px', padding: '3px 0', margin: '1px', color: '#fff' } }, '未核销')
                  ])
              }
            } else if (params.row.status == 1) {
              if (params.row.codestatus == 0) {
                return h('div',
                  [
                    h('div', { style: { width: '60px', background: '#ed4014', textAlign: 'center', borderRadius: '5px', padding: '3px 0', margin: '1px', color: '#fff' } }, '未领取'),
                    h('div', { style: { width: '60px', background: '#19be6b', textAlign: 'center', borderRadius: '5px', padding: '3px 0', margin: '1px', color: '#fff' } }, '已核销')
                  ])
              } else {
                return h('div',
                  [
                    h('div', { style: { width: '60px', background: '#19be6b', textAlign: 'center', borderRadius: '5px', padding: '3px 0', margin: '1px', color: '#fff' } }, '已领取'),
                    h('div', { style: { width: '60px', background: '#19be6b', textAlign: 'center', borderRadius: '5px', padding: '3px 0', margin: '1px', color: '#fff' } }, '已核销')
                  ])
              }
            }
          }
        },
        // { title: '时间', key: 'create' },
        {
          title: '相关记录',
          key: 'records',
          align: 'center',
          render: (h, params) => {
            if (params.row.status == 1) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ path: '/azx/redpacket/redpacket_list', query: { couponRecId: params.row.id } })
                    }
                  }
                }, '红包记录')
              ])
            }
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    getCouponByOrder () {
      const activityId = this.$route.query.acId
      const shareId = this.$route.query.shareId
      getCouponData({ page: 1, actid: activityId, actname: '', logid: shareId, username: '' }).then(res => {
        console.log('************coupondata:')
        console.log(res)

        this.tableData = res.data.data
        this.totalpages = Math.ceil(parseInt(res.data.count) / 20)
      })
    }

  },
  mounted () {
    // this.getCouponByOrder();
  }
  // watch: {
  //   $route(to, from) {
  //     this.getCouponByOrder();
  //   }
  // },
}
</script>

<style>
</style>
