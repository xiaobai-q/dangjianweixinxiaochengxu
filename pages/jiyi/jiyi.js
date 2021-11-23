Page({

  data: {
    jiyi:[]
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    //调用云函数获取dangshi表数据
    wx.cloud.callFunction({
      name:'getData_jiyi'
    })
    .then(res=>{
      console.log('获取数据成功',res.result)
      this.setData({
        jiyi:res.result.data
      })
      wx.hideLoading({
        success: (res) => {},
      })
    })
    .catch(err=>{
      console.log('获取数据失败',err)
    })
    
    
  },
  click(e){
    console.log(e.currentTarget.dataset.id1)
    wx.navigateTo({
      url: '../jiyi_eassy/jiyi_eassy?id='+e.currentTarget.dataset.id1,
    })
  }
})