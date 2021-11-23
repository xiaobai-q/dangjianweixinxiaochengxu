// pages/errorOptions/errorOptions.js
const app=getApp()
let titles = []
let arr=[]
let l=0
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    total: 0,
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.time)
    wx.cloud.database().collection('error')
    .where({
      name:app.globalData.userName,
      time:options.time
    })
    .get()
    .then(res=>{
      if(res.data==''){
        wx.showToast({
          icon: 'error',
          title: '您还没有错题',
        })
      }else{
        titles=res.data
        l=titles.length-1
        arr= titles[l].errorOptions
        this.setData({
          subject:arr[0],
          total: arr.length
        })
        console.log(arr)   
      }
    })/*
    let arr = wx.getStorageSync('errorOptions')
    if (arr && arr.length > 0) {
      titles = arr
    }
    this.setData({
      subject: titles[0],
      total: titles.length
    })*/
  },
  pre() {
    if (this.data.current - 1 <0) {
      wx.showToast({
        icon: 'error',
        title: '已经是第一个啦',
      })
    } else {
      this.setData({
        subject: arr[this.data.current-1],
        current: this.data.current -1, 
      })
    }
  },
  next() {
    if (this.data.current + 1 >=this.data.total ) {
      wx.showToast({
        icon: 'error',
        title: '已经是最后一个啦',
      })
    } else {
      this.setData({
        subject: arr[this.data.current+1],
        current: this.data.current + 1,
      })
      console.log(arr[this.data.current+1])
    
    }

  }
})