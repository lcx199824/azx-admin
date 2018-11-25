<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :searchOps="searchOps" :columns="columns" @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Excel文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getActivityData, deleteActivity } from '@/api/data'
export default {
  name: 'activity_list',
  components: {
    Tables
  },
  data() {
    return {
      searchOps: {
        from: 'activity',
        options: [
          {
            id: 1,
            title: '活动名称',
            searchKey: ''
          }
        ]
      },
      columns: [
        { title: '活动名称', key: 'name' },
        { title: '商店名称', key: 'shopname' },
        { title: '红包金额', key: 'money' },
        {
          title: '红包个数',
          key: 'redcount',
          render: (h, params, vm) => {
            return h('div', {
              style: {
                width: '50px',
                textAlign: 'center'
              }
            }, params.row.redcount + '/' + params.row.num)
          }
        },
        {
          title: '相关记录',
          key: 'records',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/azx/share/share_list', query: { acId: params.row.id } })
                  }
                }
              }, '分享记录'),
              h('Button', {
                props: {
                  type: 'default',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/azx/coupon/coupon_list', query: { acId: params.row.id } })
                  }
                }
              }, '领券记录'),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/azx/redpacket/redpacket_list', query: { acId: params.row.id } })
                  }
                }
              }, '红包记录')
            ])
          }
        },
        {
          title: '操作',
          key: 'handle',
          align: 'center',
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: '/azx/activity/add_activity', query: { acid: params.row.id } })
                  }
                }
              }, '编辑')
            },
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    }
                  }, '删除')
                ])
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params.row.id)
      if (params.row.id) {
        deleteActivity({ id: params.row.id }).then(res => {
          if (!res.msg) {
            this.$toasted.show('活动删除成功!')
          } else {
            this.$toasted.show(res.msg)
          }
        })
      }
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    getActivityData() {
      getActivityData({ page: this.current }).then(res => {
        this.tableData = res.data.data
        // this.totalpage = Math.ceil(parseInt(res.data.count) / 20);
      })
    }
  }
  // mounted() {
  // this.getActivityData();
  // }
}
</script>

<style>
</style>
