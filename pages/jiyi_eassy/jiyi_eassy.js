Page({
  data:{
  jiyi:{}
  },
  onLoad: function (options) {
    console.log(options.id)
    var id = options.id
    wx.cloud.database().collection('jiyi')
    //doc()中直接放入局部变量id
    .doc(id)
    .get()
    .then(res=>{
      console.log('查询单条数据成功',res.data)
      this.setData({
        jiyi:res.data
      })
    })
  }

})