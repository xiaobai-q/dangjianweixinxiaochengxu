//调用全局变量，获取用户名称
const app = getApp()
Page({
  data:{
  text:{}
  },
  onLoad: function (options) {

    var id = options.id
    wx.cloud.database().collection('jilu')
    //doc()中直接放入局部变量id
    .doc(id)
    .get()
    .then(res=>{
      console.log('查询单条数据成功',res.data)
      this.setData({
        text:res.data
      })
    })
  },
  delete(e){
    console.log('删除参数：',this.options.id)
    var id = this.options.id
    wx.showModal({
      title: '提示',
      content: '此条笔记将从列表中删除',
      showCancel:'true',
      success(res){
        if (res.confirm) {
          console.log('用户点击确定')
          wx.cloud.database().collection('jilu')
          .doc(id)
          .remove()
          .then(res=>{
            console.log('删除数据成功',res)
            wx.navigateTo({
              url: '../mine_biji/mine_biji',
            })
            //提示删除成功
            wx.showToast({
              title: '删除成功',
              duration: 1000
            })     
          })
         
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
 

})