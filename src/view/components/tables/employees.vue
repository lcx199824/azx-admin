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
import { getEmployeeData, deleteEmployee } from '@/api/data'
export default {
  name: 'employee_list',
  components: {
    Tables
  },
  data () {
    return {
      searchOps: {
        from: 'employee',
        options: [
          {
            id: 1,
            title: '员工名称',
            searchKey: ''
          },
          {
            id: 2,
            title: '商店名称',
            searchKey: ''
          }
        ]
      },
      columns: [
        { title: '姓名', key: 'name' },
        { title: '商店名称', key: 'shopname' },
        { title: '时间', key: 'create' },
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
                    this.$router.push({ path: '/azx/share/share_list', query: { employeeId: params.row.id } })
                  }
                }
              }, '推广记录')

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
                    this.$router.push({ path: '/azx/employee/add_employee', query: { employeeId: params.row.id } })
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
    handleDelete (params) {
      console.log(params.row.id)
      deleteEmployee({ id: params.row.id }).then(res => {
        if (!res.msg) {
          this.$toasted.show('删除员工成功!')
        } else {
          this.$toasted.show(res.msg)
        }
      })
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  }
  // mounted() {
  //   getEmployeeData({ page: 1 }).then(res => {
  //     this.tableData = res.data.data
  //     // console.log(res);
  //   })
  // }
}
</script>

<style>
</style>
