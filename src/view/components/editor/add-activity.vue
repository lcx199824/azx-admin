<template>
  <div id="add-ac">
    <div class="left">
      <div class="item">
        <div class="title"><span class="required">* </span>活动名称</div>
        <Input v-model="acDetail.name" placeholder="" style="width: 600px" />
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>卡券id</div>
        <Input v-model="acDetail.cardid" placeholder="" style="width: 600px" />
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>卡券张数</div>
        <Input v-model="acDetail.cardnum" placeholder="" style="width: 600px" />
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>红包总金额(元)</div>
        <Input v-model="acDetail.money" placeholder="" style="width: 600px" />
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>红包个数</div>
        <Input v-model="acDetail.num" placeholder="" style="width: 600px" />
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>最大金额(单位分)</div>
        <Input v-model="acDetail.max" placeholder="" style="width: 600px" />
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>最小金额(单位分)</div>
        <Input v-model="acDetail.min" placeholder="" style="width: 600px" />
      </div>
      <div class="wrap">
        <div class="item">
          <div class="title"><span class="required">* </span>活动分享海报背景图片</div>
          <div>
            <Input v-model="acDetail.img" placeholder="" style="width: 520px" /> <Button @click="fileClick">选择图片</Button>
            <div v-if="!acDetail.id" class="holder">
              <img :src="ImgHolder" alt="" style="display:block;width:128px;heigth:128px;margin-top:10px">
              <div class="close-btn" @click="closeImg1">
                <Icon type="ios-close" />
              </div>
            </div>
            <div class="img" :style="bgImg(`http://wxoss.skywen.cn/${acDetail.img}`)" v-else></div>
            <input @change="fileChange($event)" type="file" id="upload_photo" multiple style="display: none" />
          </div>
        </div>
        <div class="item">
          <div class="title"><span class="required">* </span>活动二维码宽/高(px)</div>
          <Input v-model="acDetail.codepx1" placeholder="" style="width: 600px" />
        </div>
        <div class="item">
          <div class="title"><span class="required">* </span>活动二维码距左上角X轴(px)</div>
          <Input v-model="acDetail.xpx1" placeholder="" style="width: 600px" />
        </div>
        <div class="item">
          <div class="title"><span class="required">* </span>活动二维码距左上角Y轴(px)</div>
          <Input v-model="acDetail.ypx1" placeholder="" style="width: 600px" />
        </div>
        <div class="btn" v-if="acDetail.img"><Button type="default" @click="modal1 = true">预览活动分享海报</Button></div>
        <Modal v-model="modal1" width='375px'>
          <p slot="header" style="color:#2db7f5;text-align:center">
            <span>预览活动分享海报</span>
          </p>
          <div style="height:600px;position:relative" :style="bgImg(`http://wxoss.skywen.cn/${acDetail.img}`)">
            <div style="position:absolute;" :style="setCode(acDetail.codepx1,acDetail.xpx1,acDetail.ypx1)">
            </div>
          </div>
          <div slot="footer">
            <Button type="info" size="large" long @click="modal1=false">确认</Button>
          </div>
        </Modal>
      </div>
      <div class="wrap">
        <div class="item">
          <div class="title"><span class="required">* </span>员工分享海报背景图片</div>
          <div>
            <Input v-model="acDetail.img2" placeholder="" style="width: 520px" /> <Button @click="fileClick2">选择图片</Button>
            <div v-if="!acDetail.id" class="holder">
              <img :src="ImgHolder2" alt="" style="display:block;width:128px;heigth:128px;margin-top:10px">
              <div class="close-btn" @click="closeImg2">
                <Icon type="ios-close" />
              </div>
            </div>
            <div class="img" :style="bgImg(`http://wxoss.skywen.cn/${acDetail.img2}`)" v-else></div>
            <input @change="fileChange2($event)" type="file" id="upload_photo2" multiple style="display: none" />
          </div>
        </div>
        <div class="item">
          <div class="title"><span class="required">* </span>员工二维码宽/高(px)</div>
          <Input v-model="acDetail.codepx2" placeholder="" style="width: 600px" />
        </div>
        <div class="item">
          <div class="title"><span class="required">* </span>员工二维码距左上角X轴(px)</div>
          <Input v-model="acDetail.xpx2" placeholder="" style="width: 600px" />
        </div>
        <div class="item">
          <div class="title"><span class="required">* </span>员工二维码距左上角Y轴(px)</div>
          <Input v-model="acDetail.ypx2" placeholder="" style="width: 600px" />
        </div>
        <div class="btn" v-if="acDetail.img2"><Button type="default" @click="modal2 = true">预览员工分享海报</Button></div>
        <Modal v-model="modal2" width='375px'>
          <p slot="header" style="color:#2db7f5;text-align:center">
            <span>预览员工分享海报</span>
          </p>
          <div style="height:600px;position:relative" :style="bgImg(`http://wxoss.skywen.cn/${acDetail.img2}`)">
            <div style="position:absolute;" :style="setCode(acDetail.codepx2,acDetail.xpx2,acDetail.ypx2)">
            </div>
          </div>
          <div slot="footer">
            <Button type="info" size="large" long @click="modal2=false">确认</Button>
          </div>
        </Modal>
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>活动开始时间</div>
        <Row>
          <Col span="12">
          <DatePicker style="width:600px" :options="options3" type="datetime" format="yyyy-MM-dd HH:mm:ss" v-model="acDetail.startDate" @on-change="acDetail.startDate=$event"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>活动结束时间</div>
        <Row>
          <Col span="12">
          <DatePicker type="datetime" :options="options4" format="yyyy-MM-dd HH:mm:ss" style="width: 600px" v-model="acDetail.endDate" @on-change="acDetail.endDate=$event"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>活动说明</div>
        <div class="text">
          <Input v-model="acDetail.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="" />
        </div>
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>是否公开活动</div>
        <Select v-model="acDetail.is_show" style="width:90px">
          <Option v-for="item in publicOps" :value="item.id" :key="item.id">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>是否显示分享海报用户信息</div>
        <Select v-model="acDetail.is_showuser" style="width:90px">
          <Option v-for="item in shareOps" :value="item.id" :key="item.id">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="item">
        <div class="title"><span class="required">* </span>活动文章详情</div>
        <div>
          <editor ref="editor" :value="acDetail.detail" @on-change="handleChange" />
        </div>
      </div>
      <div class="btn" v-if="!acDetail.id"><Button type="info" @click="handleSubmit()">确认添加</Button></div>
      <div class="btn" v-else><Button type="info" @click="handleSave(acDetail.id)">保存修改</Button></div>
    </div>
    <div class="right" v-html="instruction"></div>
  </div>
</template>

<script>
import Editor from '_c/editor'
import Img from '@/assets/images/picture.png'
import CodeHolder from '@/assets/images/codeHolder.png'
import { getActivityDetail, addActivity, uploadPhoto, instruct } from '@/api/data'
export default {
  // 获取路由传来的活动id
  created () {
    this.activityDetail()
    instruct().then(res => {
      this.instruction = res.data
    })
  },
  mounted () {
    this.changeContent()
  },
  watch: {
    $route (to, from) {
      this.activityDetail()
    }
  },
  components: {
    Editor
  },
  data () {
    return {
      instruction: '',
      ImgHolder: Img,
      ImgHolder2: Img,
      modal1: false,
      modal2: false,
      acDetail: {
        id: '',
        name: '',
        cardid: '',
        cardnum: '',
        money: '',
        num: '',
        max: '',
        min: '',
        img: '',
        codepx1: '150',
        xpx1: '188',
        ypx1: '445',
        img2: '',
        codepx2: '150',
        xpx2: '188',
        ypx2: '445',
        startDate: '',
        endDate: '',
        desc: '',
        is_show: '',
        is_showuser: '',
        detail: ''
      },
      publicOps: [
        {
          id: '0',
          label: '不公开'
        },
        {
          id: '1',
          label: '公开'
        }
      ],
      shareOps: [
        {
          id: '0',
          label: '不显示'
        },
        {
          id: '1',
          label: '显示'
        }
      ],
      options3: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      options4: {
        disabledDate: function (date) {
          // return date < new Date(this.acDetail.startDate.getTime() + 60000)
          return date && date.valueOf() < new Date(this.acDetail.startDate)
        }.bind(this)
      }
    }
  },
  methods: {
    bgImg (image) {
      return {
        'background-image': `url(${image})`,
        'background-position': 'center',
        'background-size': 'cover',
        'background-repeat': 'no-repeat'
      }
    },
    setCode (size, x, y) {
      return {
        'background-position': 'center',
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-image': `url(${CodeHolder})`,
        'width': `${size}px`,
        'height': `${size}px`,
        'left': `${x}px`,
        'top': `${y}px`
      }
    },
    // 时间戳转带格式的时间
    formatDate (value) {
      let date = new Date(parseInt(value) * 1000)
      let y = date.getFullYear()
      console.log(date)

      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    // 路由传来actid时,获取活动详情
    activityDetail () {
      const acid = this.$route.query.acid
      if (acid) {
        getActivityDetail({ id: acid }).then(res => {
          if (res) {
            this.acDetail = res.data
            this.acDetail.endDate = this.formatDate(parseInt(res.data.endtime))
            this.acDetail.startDate = this.formatDate(parseInt(res.data.starttime))
            // this.$refs.editor.setHtml(this.htmlDecodeByRegExp(res.data.detail))
            this.$refs.editor.setHtml(res.data.detail)
          }
        })
      }
    },
    // DatePicker获取活动开始时间
    handleBegin (date) {
      this.starttime = date
    },
    // DatePicker获取活动结束时间
    handleEnd (date) {
      this.endtime = date
    },
    // 内容改变时，获取编辑器内的详情
    handleChange (html, text) {
      // console.log(html, text)
      this.acDetail.detail = html
    },
    // 字符串转义为html
    htmlDecodeByRegExp (str) {
      var s = ''
      if (str.length == 0) return ''
      s = str.replace(/&amp;/g, '&')
      s = s.replace(/&lt;/g, '<')
      s = s.replace(/&gt;/g, '>')
      s = s.replace(/&nbsp;/g, ' ')
      s = s.replace(/&#39;/g, "\'")
      s = s.replace(/&quot;/g, '"')
      return s
    },
    // 初始化富文本编辑器的内容
    changeContent () {
      this.$refs.editor.setHtml('<p></p>')
    },
    // 上传图片1到服务器
    fileClick () {
      document.getElementById('upload_photo').click()
    },
    fileChange (el) {
      if (!el.target.files[0].size) return
      const _this = this
      const file = el.target.files[0]
      const reader = new FileReader()
      // const image = new Image();
      reader.onload = function (event) {
        file.src = event.target.result
        _this.ImgHolder = file.src
        _this.acDetail.img = file.src

        // 上传图片到服务器
        uploadPhoto({ imgData: file.src }).then(result => {
          _this.acDetail.img = result.data
        })
        el.target.value = ''
      }
      reader.readAsDataURL(file)
    },
    // 上传图片2到服务器
    fileClick2 () {
      document.getElementById('upload_photo2').click()
    },
    fileChange2 (el) {
      if (!el.target.files[0].size) return
      const _this = this
      const file = el.target.files[0]
      const reader = new FileReader()
      // const image = new Image();
      reader.onload = function (event) {
        file.src = event.target.result
        _this.ImgHolder2 = file.src
        _this.acDetail.img2 = file.src

        // 上传图片到服务器
        uploadPhoto({ imgData: file.src }).then(result => {
          _this.acDetail.img2 = result.data
        })
        el.target.value = ''
      }
      reader.readAsDataURL(file)
    },
    // 删除已选择的图片
    closeImg1 () {
      this.acDetail.img = ''
      this.ImgHolder = Img
    },
    closeImg2 () {
      this.acDetail.img2 = ''
      this.ImgHolder2 = Img
    },
    // 编辑活动信息
    handleSave (id) {
      this.acDetail.id = id
      addActivity({ ac: this.acDetail }).then(res => {
        this.$toasted.show(res.msg)
      })
    },
    // 创建新活动
    handleSubmit () {
      addActivity({ ac: this.acDetail }).then(res => {
        this.$toasted.show(res.msg)
      })
    }

  }
}
</script>
<style lang="scss" scoped>
#add-ac {
  font-size: 14px;

  display: flex;
  justify-content: space-between;
  .left {
    flex: 1;
    width: 900px;
    .wrap {
      border: 1px solid #dcdee2;
      width: 820px;
      margin: 10px 0;
      padding-bottom: 15px;
    }
    .item {
      // border: 1px solid black;
      display: flex;
      margin: 20px 0;
      .title {
        width: 185px;
        text-align: right;
        margin-right: 20px;
        .required {
          color: red;
          font-size: 14px;
        }
      }
      .text {
        width: 600px;
      }
      .img {
        // display: block;
        margin-top: 10px;
        width: 128px;
        height: 128px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .holder {
        position: relative;
        .close-btn {
          position: absolute;
          top: -5px;
          left: 125px;
          font-size: 29px;
          &:hover {
            cursor: pointer;
            color: #2d8cf0;
          }
        }
      }
    }
    .btn {
      margin-left: 205px;
      button {
        width: 150px;
        font-size: 14px;
      }
    }
  }
  .right {
    flex: 1;
    height: 300px;
    width: 300px;
  }
}
</style>
