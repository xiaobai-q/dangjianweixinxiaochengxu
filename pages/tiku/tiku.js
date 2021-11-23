// pages/tiku/tiku.js
Page({

  goxin(){
    wx.navigateTo({
      url: '../danxuan/danxuan?type=新中国史',
    })
  },
  gogai(){
    wx.navigateTo({
      url: '../danxuan/danxuan?type=改革开放史',
    })
  },
  godang(){
    wx.navigateTo({
      url: '../danxuan/danxuan?type=党史',
    })
  },
  goshe(){
    wx.navigateTo({
      url: '../danxuan/danxuan?type=社会主义发展史',
    })
  }
})