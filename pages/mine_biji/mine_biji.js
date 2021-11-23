//调用全局变量，获取用户名称
const app = getApp()

//获取当前系统日期和时间
var util = require('../../utils/util.js'); 

Page({
  data:{
    detail:'',
    show:true,
    text:[{
     
    }]
  },
  onLoad(){
    wx.cloud.database().collection('jilu')
    .where({name:app.globalData.userName})
    .orderBy('time','asc')
    .get()
    .then(res=>{
      console.log('用户获取数据成功',res.data.length)
      if(res.data.length!=0){
        console.log('用户数据已获取且不为空',res)
        this.setData({
          text:res.data,
          show:false
        })
      }else{
          show:true
      }
    })
    .catch(err=>{
      console.log("用户数据获取失败",err)
    })
  },
  click(e){
    wx.navigateTo({
      url: '../mine_biji2/mine_biji2?id='+e.currentTarget.dataset.id1,
    })
  }
})