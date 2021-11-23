// mine.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    firco:"#979797",
    secco:'#000000',
    userInfo:'',
    upsrcfile:'https://636c-cloud2-9g3l5j7l21abb9a1-1307223493.tcb.qcloud.la/upvideo/1630399090000.png'
  },
  loginOut(){
    wx.reLaunch({
      url: '../login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       userInfo:wx.getStorageSync('user'),
       userName:app.globalData.userName
     })
    
  },
  
   
  chooseImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中...',
          mask: true
        })
        //返回临时路径
        const filePath = res.tempFilePaths[0]
        var timestamp = Date.parse(new Date());
        //生成时间戳
        const cloudPath = "upvideo/" + timestamp + filePath.match(/\.[^.]+?$/)[0]
        //设置云开发存储图片地址
        //使用wx.cloud 调用云开发上传图片api 参数文件存放地址，图片路径
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: function (res) {
          console.log(res)
          wx.hideLoading();
          that.setData({
            upsrcfile: res.fileID
            })
          }
        })
      }
    })
  },

  error(){
    wx.navigateTo({
      url: '../mine_error/mine_error'
    })
  },
  biji(){
    wx.navigateTo({
      url: '../mine_biji/mine_biji'
    })
  },
  paihangbang(){
    wx.navigateTo({
      url: '../paihang/paihang',
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  third_select(){

  },
  first_select(){
    wx.redirectTo({
      url: '../index/index',
    })
  }
 
})
