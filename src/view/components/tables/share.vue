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
import { getShareData } from '@/api/data'
export default {
  name: 'share_list',
  components: {
    Tables
  },
  data () {
    return {
      searchOps: {
        from: 'share',
        options: [
          {
            id: 1,
            title: '活动名称',
            searchKey: ''
          },
          {
            id: 2,
            title: '用户名称',
            searchKey: ''
          },
          {
            id: 3,
            title: '员工名称',
            searchKey: ''
          }
        ]
      },
      columns: [
        { title: '用户昵称', key: 'name' },
        {
          title: '头像',
          key: 'img',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.img
              },
              style: {
                width: '50px',
                heigth: '50px'
              }
            })
          }
        },
        { title: '活动名称', key: 'actname' },
        { title: '商店名称', key: 'shopname' },
        { title: '卡券号码', key: 'skywen_openid' },
        { title: '员工名称', key: 'staffname' },
        { title: '时间', key: 'create' },
        {
          title: '相关记录',
          key: 'records',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/azx/coupon/coupon_list', query: { shareId: params.row.id } })
                  }
                }
              }, '领券记录'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/azx/redpacket/redpacket_list', query: { shareId: params.row.id } })
                  }
                }
              }, '红包记录')
            ])
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
    getDataByOrder () {
      const activityId = this.$route.query.acId
      const employeeId = this.$route.query.employeeId
      getShareData({ page: 1, actid: activityId, actname: '', username: '', staffid: employeeId, staffname: '' }).then(res => {
        // console.log(res);
        // console.log("***********shareData");
        this.tableData = res.data.data
      })
    }
  },
  mounted () {
    // this.getDataByOrder();
  },
  watch: {
    $route (to, from) {
      // this.getDataByOrder();
    }
  }
}
</script>

<style>
</style>
