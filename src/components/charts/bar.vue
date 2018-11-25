<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    draw (value) {
      let xAxisData = Object.keys(value)
      let seriesData = Object.values(value)
      let option = {
        tooltip: {
          show: true
        },
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'bar'
        }]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  watch: {
    value (newVal, oldVal) {
      console.log('*********new')
      console.log(newVal)
      this.draw(newVal)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.draw(this.value)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
