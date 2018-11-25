<template>
  <div>
    <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top" v-show="searchOps.from === 'redpacket' || searchOps.from === 'share' || searchOps.from === 'coupon'">
      <span class="search-ops" v-for="(item,index) in searchOps.options" :key="index">
        <span>&nbsp;&nbsp;{{item.title}}&nbsp;&nbsp;</span> <Input @on-change="handleClear" clearable class="search-input" v-model="item.searchKey" />
      </span>
      <!-- <span v-show="searchOps.from === 'redpacket'">
        <span>&nbsp;&nbsp;红包状态&nbsp;&nbsp;</span>
        <Select v-model="redSearchKey" class="search-col">
          <Option v-for="item in redpacketStatus" :value="item.key" :key="item.key">{{ item.value }}</Option>
        </Select>
      </span> -->

      <Button @click="handleSearch" class="search-btn" type="primary">搜索</Button>
    </div>
    <Table ref="tablesMain" :data="insideTableData" :columns="insideColumns" :stripe="stripe" :border="border" :show-header="showHeader" :width="width" :height="height" :loading="loading" :disabled-hover="disabledHover" :highlight-row="highlightRow" :row-class-name="rowClassName" :size="size" :no-data-text="noDataText" :no-filtered-data-text="noFilteredDataText" @on-current-change="onCurrentChange" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-selection-change="onSelectionChange" @on-sort-change="onSortChange" @on-filter-change="onFilterChange" @on-row-click="onRowClick" @on-row-dblclick="onRowDblclick" @on-expand="onExpand">
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <div class="pages">
      <pagination :pages='totalPage' @pageChange="pageItemClick"></pagination>
    </div>

    <div v-if="searchable && searchPlace === 'bottom'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
        <Option v-for="item in redpacketStatus" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
      </Select>
      <Input placeholder="输入关键字搜索" class="search-input" v-model="searchValue" />
      <Button class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索</Button>
    </div>
    <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
  </div>
</template>

<script>
import TablesEdit from './edit.vue'
import handleBtns from './handle-btns'
import Pagination from '@/view/components/pagination/pagination'
import './index.less'
import { getActivityData, getEmployeeData, getShareData, getCouponData, getRedpacketData } from '@/api/data'
export default {
  name: 'Tables',
  props: {
    searchOps: {
      options: { type: Array, default () { return [] } },
      from: 'String'
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    size: String,
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否可搜索
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: 'top'
    }
  },
  components: {
    Pagination
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data () {
    return {
      insideColumns: [],
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      searchValue: '',
      redSearchKey: '',
      redpacketStatus: [
        {
          key: '0',
          value: '全部'
        },
        {
          key: '1',
          value: '红包已发放'
        },
        {
          key: '2',
          value: '红包待领取'
        },
        {
          key: '3',
          value: '红包已领取'
        }
      ],
      currentPage: 1,
      totalPage: 1
    }
  },
  methods: {
    // 处理按不同条件获取到的不同类别的表格数据
    handleData () {
      // 获取并处理当前路由中的参数
      let actid = ''
      if (this.$route.query.acId) {
        actid = this.$route.query.acId
      }
      let staffid = ''
      if (this.$route.query.employeeId) {
        staffid = this.$route.query.employeeId
      }
      let logid = ''
      if (this.$route.query.shareId) {
        logid = this.$route.query.shareId
      }
      let getcardlogid = ''
      if (this.$route.query.couponRecId) {
        getcardlogid = this.$route.query.couponRecId
      }
      // 处理用户输入的筛选信息
      // console.log("***************筛选信息");
      // console.log(this.searchOps);
      const from = this.searchOps.from
      const keys = this.searchOps.options
      // 根据条件处理不同页面需要取得的数据
      if (from === 'activity') {
        getActivityData({ page: this.currentPage }).then(res => {
          this.insideTableData = res.data.data
          this.totalpage = Math.ceil(parseInt(res.data.count) / 20)
        })
      }
      if (from === 'employee') {
        getEmployeeData({ page: this.currentPage }).then(res => {
          this.insideTableData = res.data.data
          this.totalpage = Math.ceil(parseInt(res.data.count) / 20)
        })
      }
      if (from === 'share') {
        getShareData({ page: this.currentPage, actid, actname: keys[0].searchKey, username: keys[1].searchKey, staffid, staffname: keys[2].searchKey }).then(res => {
          this.insideTableData = res.data.data
          this.totalPage = Math.ceil(parseInt(res.data.count) / 20)
        })
      }
      if (from === 'coupon') {
        getCouponData({ page: this.currentPage, actid, actname: keys[0].searchKey, logid, username: keys[1].searchKey }).then(res => {
          this.insideTableData = res.data.data
          this.totalPage = Math.ceil(parseInt(res.data.count) / 20)
        })
      }
      if (from === 'redpacket') {
        getRedpacketData({ page: this.currentPage, actid, actname: keys[0].searchKey, logid, getcardlogid, username: keys[1].searchKey }).then(res => {
          this.insideTableData = res.data.data
          this.totalPage = Math.ceil(parseInt(res.data.count) / 20)
        })
      }
    },
    pageItemClick (page) {
      this.currentPage = page
      this.handleData()
    },
    handleSearch () {
      this.handleData()
      // this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
    },
    suportEdit (item, index) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            'input': val => {
              this.edittingText = val
            },
            'on-start-edit': (params) => {
              this.edittingCellId = `editting-${params.index}-${params.column.key}`
              this.$emit('on-start-edit', params)
            },
            'on-cancel-edit': (params) => {
              this.edittingCellId = ''
              this.$emit('on-cancel-edit', params)
            },
            'on-save-edit': (params) => {
              this.value[params.row.initRowIndex][params.column.key] = this.edittingText
              this.$emit('input', this.value)
              this.$emit('on-save-edit', Object.assign(params, { value: this.edittingText }))
              this.edittingCellId = ''
            }
          }
        })
      }
      return item
    },
    surportHandle (item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    handleColumns (columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item
        if (res.editable) res = this.suportEdit(res, index)
        if (res.key === 'handle') res = this.surportHandle(res)
        return res
      })
    },
    setDefaultSearchKey () {
      this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
    },
    handleClear (e) {
      // if (e.target.value === '') this.insideTableData = this.value
      if (e.target.value === '') {
        this.handleData()
      }
    },
    handleTableData () {
      this.insideTableData = this.value.map((item, index) => {
        let res = item
        res.initRowIndex = index
        return res
      })
    },
    exportCsv (params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    clearCurrentRow () {
      this.$refs.talbesMain.clearCurrentRow()
    },
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick (row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    }
  },
  watch: {
    columns (columns) {
      this.handleColumns(columns)
      this.setDefaultSearchKey()
    },
    value (val) {
      this.handleTableData()
      this.handleSearch()
    },
    $route (to, from) {
      this.handleData()
    }
  },
  mounted () {
    this.handleColumns(this.columns)
    this.setDefaultSearchKey()
    this.handleTableData()
    this.handleData()
  }
}
</script>
<style>
.ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
  display: none !important;
}
.pages {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
