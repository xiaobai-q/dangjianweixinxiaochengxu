// pages/dangshi/dangshi.js
Page({

  data: {
    dangshi:[]
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    //调用云函数获取dangshi表数据
    wx.cloud.callFunction({
      name:'getData_dangshi'
    })
    .then(res=>{
      console.log('获取党史数据成功',res)
      this.setData({
        dangshi:res.result.data
      })
      wx.hideLoading({
        success: (res) => {},
      })
    })
    .catch(err=>{
      console.log('获取当党史数据失败',err)
    })
  },
  click(e){
    console.log(e.currentTarget.dataset.id1)
    wx.navigateTo({
      url: '../dangshi_eassy/dangshi_eassy?id='+e.currentTarget.dataset.id1,
    })
  }
})
