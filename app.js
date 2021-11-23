App({
  globalData:{
    userName:''
  },
//小程序一启动就会执行
  onLaunch: function () {
    console.log("小程序启动啦！");
    wx.cloud.init({
      env:'cloud2-9g3l5j7l21abb9a1'//这里输入云开发id
    })
    
  }
  })
