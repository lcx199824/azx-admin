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
import { getRedpacketData, sendRedpacket, checkRedpacket, resendRedpacket } from '@/api/data'
export default {
  //   name: 'tables_page',
  name: 'redpacket_list',
  components: {
    Tables
  },
  data () {
    return {
      searchOps: {
        from: 'redpacket',
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
          }
        ]
      },
      columns: [
        { title: '商店名称', key: 'shopname' },
        { title: '活动名称', key: 'actname' },
        { title: '卡券号码', key: 'cardid' },

        {
          title: '领取人头像',
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
        { title: '领取人名称', key: 'name' },
        { title: '领取金额(分)', key: 'money' },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            if (params.row.status == 0) {
              return h('div', {
                style: {
                  width: '60px',
                  background: '#ed4014', // 红
                  textAlign: 'center',
                  borderRadius: '5px',
                  padding: '3px 0',
                  color: '#fff'
                }
              }, '发送失败')
            } else if (params.row.status == 1) {
              return h('div', {
                style: {
                  width: '60px',
                  background: '#2db7f5', // 蓝
                  textAlign: 'center',
                  borderRadius: '5px',
                  padding: '3px 0',
                  color: '#fff'
                }
              }, '发送成功')
            } else if (params.row.status == 2) {
              return h('div', {
                style: {
                  width: '60px',
                  background: '#ff9900', // 黄
                  textAlign: 'center',
                  borderRadius: '5px',
                  padding: '3px 0',
                  color: '#fff'
                }
              }, '红包退回')
            }
            return h('div', {
              style: {
                width: '60px',
                background: '#19be6b', // 绿
                textAlign: 'center',
                borderRadius: '5px',
                padding: '3px 0',
                color: '#fff'
              }
            }, '已领取')
          }
        },
        { title: '失败原因', key: 'reason' },
        { title: '时间', key: 'create' },
        {
          title: '操作',
          key: 'records',
          align: 'center',
          render: (h, params, vm) => {
            if (params.row.status == 0) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index)
                      sendRedpacket({ id: params.row.id }).then(res => {
                        // 刷新表格数据
                        this.getRedpacketByOrder()
                        // console.log(res);
                        if (!res.msg) {
                          // 提示
                          this.$toasted.show('红包发送成功!')
                        } else {
                          this.$toasted.show(msg)
                        }
                      })
                    }
                  }
                }, '发送红包')
              ])
            } else if (params.row.status == 1) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      checkRedpacket({ id: params.row.id }).then(res => {
                        // 刷新表格数据
                        console.log(res)
                        this.getRedpacketByOrder()
                        this.$toasted.show(msg)
                      })
                    }
                  }
                }, '查询红包')
              ])
            } else if (params.row.status == 2) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // console.log(params.row.id);
                      resendRedpacket({ id: params.row.id }).then(res => {
                        // 刷新表格数据
                        this.getRedpacketByOrder()
                        if (!res.msg) {
                          // 提示
                          this.$toasted.show('红包已重新发送!')
                        } else {
                          this.$toasted.show(msg)
                        }
                      })
                    }
                  }
                }, '重新发送')
              ])
            }
            return h('div', {}, '')
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
    getRedpacketByOrder () {
      const activityId = this.$route.query.acId
      const shareId = this.$route.query.shareId
      const couponRecId = this.$route.query.couponRecId
      getRedpacketData({ page: 1, actid: activityId, actname: '', logid: shareId, gecardlogid: couponRecId, username: '' }).then(res => {
        console.log(res)
        this.tableData = res.data.data
      })
    }
  },

  mounted () {
    // this.getRedpacketByOrder();
  },
  watch: {
    $route (to, from) {
      // this.getRedpacketByOrder();
    }
  }
}
</script>

<style>
</style>
