import axios from '@/libs/api.request'
const front = 'index.php?i=168&a=phoneapp&m=skywen_zxplatform&c=entry&do='
// 登陆接口
export const login = ({userName, password}) => {
  return axios.request({
    // url:'weblogin',
    url: `${front}weblogin`,
    data: {
      name: userName,
      password
    },
    method: 'post'
  })
}
// 员工详情页获取活动海报信息
export const getActivityImg = ({id}) => {
  return axios.request({
    url: `${front}webactimg`,
    data: {
      id
    },
    method: 'post'
  })
}
// 获取新增活动的填写指南
export const instruct = () => {
  return axios.request({
    url: `${front}websystem`,
    method: 'get'
  })
}
// 上传图片
export const uploadPhoto = ({imgData}) => {
  return axios.request({
    url: `${front}upload`,
    data: {
      imgData
    },
    method: 'post'
  })
}

// 获取统计数据
export const statistics = () => {
  return axios.request({
    url: `${front}webdata`,
    method: 'get'
  })
}

// 首页获取商家所有活动信息
export const getShopActivities = () => {
  return axios.request({
    url: `${front}webshopacts`,
    method: 'get'
  })
}

// 首页获取商家某一活动的统计数据
export const getAcData = ({page}) => {
  return axios.request({
    url: `${front}webactdata`,
    data: {page},
    method: 'post'
  })
}

// 获取活动列表数据
export const getActivityData = ({page}) => {
  return axios.request({
    url: `${front}webacts`,
    data: {page},
    method: 'post'
  })
}

// 删除活动
export const deleteActivity = ({id}) => {
  return axios.request({
    url: `${front}webdelact`,
    data: {id},
    method: 'post'
  })
}

// 新增活动
export const addActivity = ({ac}) => {
  return axios.request({
    url: `${front}webchangeact`,
    data: {
      id: ac.id,
      name: ac.name,
      cardid: ac.cardid,
      cardnum: ac.cardnum,
      money: ac.money,
      num: ac.num,
      max: ac.max,
      min: ac.min,

      img: ac.img,
      codepx1: ac.codepx1,
      xpx1: ac.xpx1,
      ypx1: ac.ypx1,

      img2: ac.img2,
      codepx2: ac.codepx2,
      xpx2: ac.xpx2,
      ypx2: ac.ypx2,

      desc: ac.desc,
      starttime: ac.startDate,
      endtime: ac.endDate,
      is_show: ac.is_show,
      is_showuser: ac.is_showuser,
      detail: ac.detail
    },
    method: 'post'
  })
}

// 获取员工列表
export const getEmployeeData = ({page}) => {
  return axios.request({
    url: `${front}webstaffs`,
    data: {page},
    method: 'post'
  })
}

// 获取员工详情
export const getEmployeeDetail = ({id}) => {
  return axios.request({
    url: `${front}webstaffdetail`,
    data: {id},
    method: 'post'
  })
}

// 新增或编辑员工信息
export const editEmployee = ({id, name}) => {
  return axios.request({
    url: `${front}webchangestaff `,
    data: {id, name},
    method: 'post'
  })
}

// 删除员工
export const deleteEmployee = ({id}) => {
  return axios.request({
    url: `${front}webdelstaff`,
    data: {id},
    method: 'post'
  })
}

// 获取分享记录
export const getShareData = ({page, actid, actname, username, staffid, staffname}) => {
  return axios.request({
    url: `${front}websharelog`,
    data: {page, actid, actname, username, staffid, staffname},
    method: 'post'
  })
}

// 获取领券记录
export const getCouponData = ({page, actid, actname, logid, username}) => {
  return axios.request({
    url: `${front}webgetcardlog`,
    data: {page, actid, actname, logid, username},
    method: 'post'
  })
}

// 获取红包记录
export const getRedpacketData = ({page, actid, actname, logid, getcardlogid, username}) => {
  return axios.request({
    url: `${front}webredlog`,
    data: {page, actid, actname, logid, getcardlogid, username},
    method: 'post'
  })
}

// 获取活动详情
export const getActivityDetail = ({id}) => {
  return axios.request({
    url: `${front}webactdetail`,
    data: {id},
    method: 'post'
  })
}

// 发送红包
export const sendRedpacket = ({id}) => {
  return axios.request({
    url: `${front}websendred`,
    data: {id},
    method: 'post'
  })
}

// 查询红包
export const checkRedpacket = ({id}) => {
  return axios.request({
    url: `${front}webcheckred`,
    data: {id},
    method: 'post'
  })
}

// 重新发送红包
export const resendRedpacket = ({id}) => {
  return axios.request({
    url: `${front}webresend`,
    data: {id},
    method: 'post'
  })
}

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  console.log(info)
  console.log('info====')
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}
