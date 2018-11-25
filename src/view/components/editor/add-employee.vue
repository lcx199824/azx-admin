<template>
  <div id="add-employee">
    <div class="item">
      <div class="title">姓名</div>
      <Input v-model="employee.name" placeholder="" style="width: 280px" />
      <div class="btn" v-show="!employee.id"><Button type="info" @click="addEmployee">确认添加</Button></div>
      <div class="btn" v-show="employee.id"><Button type="info" @click="saveChange">保存修改</Button></div>
    </div>
    <div class="item" v-if="employee.id">
      <div class="title">活动</div>
      <Select v-model="selectedAcid" class="search-col" @on-change="selectActivity(selectedAcid)" style="width: 280px">
        <Option v-for="item in activities" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </Select>
      <div class="hint">选择后生成员工活动二维码</div>
    </div>
    <!-- 生成二维码 -->
    <div id="qrcode"></div>
    <canvas id="myCanvas" width="260" height="400"></canvas>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { getEmployeeDetail, editEmployee, getShopActivities, getActivityImg } from '@/api/data'
export default {
  created () {
    this.employeeDetail()
    getShopActivities().then(res => {
      if (res.data) {
        this.activities = res.data
      }
    })
    // this.qrcode();
  },
  watch: {
    $route (to, from) {
      this.employeeDetail()
    }
  },
  data () {
    return {
      employee: {
        // shopid: '',
        id: '',
        name: ''
      },
      selectedAcid: '',
      activities: [],
      actImg: {}
    }
  },
  methods: {
    employeeDetail () {
      const employeeId = this.$route.query.employeeId
      if (employeeId) {
        getEmployeeDetail({ id: employeeId }).then(res => {
          if (res) {
            this.employee = res.data
          }
        })
      }
    },
    saveChange () {
      const employeeId = this.$route.query.employeeId
      editEmployee({ id: employeeId, name: this.employee.name }).then(res => {
        this.$toasted.show(res.msg)
      })
    },
    addEmployee () {
      editEmployee({ name: this.employee.name }).then(res => {
        this.$toasted.show(res.msg)
      })
    },
    // 选择活动后生成对应二维码链接
    selectActivity (actid) {
      const canvas = document.getElementById('myCanvas')
      let context = canvas.getContext('2d')
      let img1 = new Image()
      let img2 = new Image()
      getActivityImg({ id: actid }).then(res => {
        img1.src = 'http://wxoss.skywen.cn/' + res.data.img2
        img1.onload = function () {
          context.drawImage(img1, 0, 0, 260, 400)
        }
      })
      const employeeId = this.$route.query.employeeId
      // 清空遗留的二维码记录
      var code = document.getElementById('qrcode')
      code.innerHTML = '<span></span>'
      // 拼接二维码的text
      const qrText = 'https://wx.skywen.cn/app/index.php?i=168&a=phoneapp&do=index&m=skywen_zxplatform&c=entry&staffid=' + employeeId + '&actid=' + actid
      let qrcode = new QRCode('qrcode', {
        width: 150,
        height: 150, // 高度
        text: qrText// 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      })
      const codeImg = document.getElementById('qrcode').getElementsByTagName('img')
      img2.src = codeImg[0].src
    }
  }
}
</script>

<style lang="scss" scoped>
#add-employee {
  font-size: 14px;
  width: 1000px;
  .item {
    // border: 1px solid black;
    display: flex;
    align-items: center;
    margin: 20px 0;
    .title {
      width: 175px;
      text-align: right;
      margin-right: 20px;
    }
  }
  #qrcode {
    // border: 1px solid black;
    padding-left: 195px;
    margin-bottom: 15px;
  }
  #myCanvas {
    padding-left: 195px;
  }
  .btn {
    margin-left: 20px;
    button {
      width: 100px;
      font-size: 14px;
    }
  }
  .hint {
    margin-left: 15px;
    color: #ccc;
  }
}
</style>
