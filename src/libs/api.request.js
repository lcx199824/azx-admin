import HttpRequest from '@/libs/axios'
// import config from '@/config'
// const baseUrl = 'http://localhost:3000/api/app/index.php?i=168&a=phoneapp&m=skywen_zxplatform&c=entry&do='
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://wx.skywen.cn/app/'
  : '/api/app'
const axios = new HttpRequest(baseUrl)
export default axios
