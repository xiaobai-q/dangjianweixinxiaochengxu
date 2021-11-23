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
  textinput(e){
    //将用户输入的数据 存入data中的detail变量中
    this.data.detail = e.detail.value
  },
  //新建笔记
  send(e){
    //获取当前时间
    var currentTime= util.formatTime(new Date());
    console.log('页面用户名为：',app.globalData.userName)

    if(this.data.detail!=''){
    wx.cloud.database().collection('jilu')
    .add({
      data:{
        name :app.globalData.userName,
        content:this.data.detail,
        time:currentTime
      }
    })
    .then(res=>{
      console.log('添加学习记录成功',res)
      wx.cloud.database().collection('jilu')
      .where({name:app.globalData.userName})
      .get()
      .then(res=>{
        console.log('数据刷新成功')
        this.setData({
          text:res.data,
          show:false
        })
      })
    })
    .catch(err=>{
      console.log('添加学习记录失败',err)
    })
    wx.showToast({
      title: '添加成功！',
      icon: 'success',
      duration: 1000
    })
    }else{
      wx.showToast({
        title: '请输入文字',
        icon: 'none',
        duration: 1000
      })
    }   
  },
  click(e){
    wx.navigateTo({
      url: '../jilu2/jilu2?id='+e.currentTarget.dataset.id1,
    })
  }
})