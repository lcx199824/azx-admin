<template>
    <div class="pagination">
        <span class="item" @click="handleStart">{{buttons.start || "首页"}}</span>
        <span class="item" @click="handlePre">
            <!-- <i class="fa fa-angle-left" aria-hidden="true"></i> -->
            上一页
        </span>
        <span class="item" @click="handlePageClick(page)" v-for="page in pages" :key="page" v-if="page >=leftPage && page <= rightPage" :class="{active:page === currentPage}">{{page}}</span>
        <span class="item" @click="handleNext">
            <!-- <i class="fa fa-angle-right" aria-hidden="true"></i> -->
            下一页
        </span>
        <span class="item" @click="handleEnd">{{buttons.end || "尾页"}}</span>
    </div>
</template>

<script>
export default {
  props: {
    // 总的页数
    pages: { type: Number },
    // 当前显示最大页数, -1 则是全部都显示
    max: { type: Number, default: 7 },
    // 设置当前的页面
    current: { type: Number, default: 1 },
    buttons: { type: Object, default () { return { start: '首页', end: '尾页' } } }
  },
  created () {
    if (!this.pages) {
      throw new Error('pages is require')
    }
    const right = (this.max - 1) / 2 + 1
    const left = (this.max - 1) - right
    let tmp = this.currentPage - left
    this.leftPage = tmp > 0 ? tmp : 1
    if (this.leftPage != tmp) {
      tmp = left + right + 1
    } else {
      tmp = this.currentPage + right
    }
    this.rightPage = tmp
  },
  data () {
    return {
      currentPage: this.current,
      startPage: 0,
      endPage: 0,
      leftPage: 0,
      rightPage: 0
    }
  },
  methods: {
    _tryMove (page, step) {
      const newPage = page + step
      if (newPage > this.pages) {
        return this.pages - this.rightPage
      } else if (newPage <= 0) {
        return this.leftPage - 1
      } else {
        if (step > 0) {
          return newPage - this.rightPage
        } else {
          return this.leftPage - newPage
        }
      }
    },
    _calc (isLeft) {
      const step = Math.floor(this.max / 2)
      if (isLeft) {
        const realStep = this._tryMove(this.leftPage, -step)
        this.leftPage -= realStep
        this.rightPage -= realStep
      } else {
        const realStep = this._tryMove(this.rightPage, step)
        this.leftPage += realStep
        this.rightPage += realStep
      }
    },
    handlePageClick (page) {
      this.currentPage = page
      this.$emit('pageChange', page)
    },
    handleStart () {
      this.currentPage = 1
      this.leftPage = 1
      const rPage = this.leftPage + this.max - 1
      this.rightPage = rPage > this.pages ? this.pages : rPage
      this.$emit('pageChange', this.currentPage)
    },
    handlePre () {
      const prePage = this.currentPage - 1
      this.currentPage = prePage <= 0 ? 1 : prePage
      this.$emit('pageChange', this.currentPage)
    },
    handleNext () {
      const nextPage = this.currentPage + 1
      this.currentPage = nextPage > this.pages ? this.pages : nextPage
      this.$emit('pageChange', this.currentPage)
    },
    handleEnd () {
      this.currentPage = this.pages
      this.rightPage = this.currentPage
      const lPage = this.rightPage - this.max + 1
      this.leftPage = lPage <= 0 ? 1 : lPage
      this.$emit('pageChange', this.currentPage)
    }
  },
  watch: {
    currentPage (newValue) {
      if (this.rightPage == newValue) {
        this._calc(false)
      } else if (this.leftPage == newValue) {
        this._calc(true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  user-select: none;
  display: inline-block;
}
.item {
  display: inline-block;
  height: 35px;
  min-width: 20px;
  padding: 10px;
  color: #808080;
  border: 1px solid #ccc;
  vertical-align: middle;
  line-height: 15px;
  text-align: center;
  margin: 0 6px;
  cursor: pointer;
  &.active {
    background-color: #2d8cf0;
    border: 1px solid #2d8cf0;
    color: #fff;
  }
}

@media only screen and (max-width: 600px) {
  .pagination {
    user-select: none;
  }
  .item {
    display: inline-block;
    height: auto;
    min-width: 0px;
    padding: 5px;
    color: #808080;
    border: 1px solid #ccc;
    vertical-align: middle;
    line-height: 20px;
    text-align: center;
    margin: 0 3px;
    cursor: pointer;
    &.active {
      background-color: #2d8cf0;
      border: 1px solid #2d8cf0;
      color: #fff;
    }
  }
}
</style>
