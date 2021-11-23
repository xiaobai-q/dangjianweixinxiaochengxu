// pages/enroll/enroll.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',

  },
  enroll: function (e) {
    wx.navigateTo({
      url: '../enroll/enroll',
    })
  },
  
  login: function (e) {
  
    var that = this
    if (that.data.username == '') {
      wx.showModal({
        title: '提示',
        content: '请输入用户名！',
        showCancel: false,
        success(res) {}
      })
    } else if (that.data.password == '') {
      wx.showModal({
        title: '提示',
        content: '请输入密码！',
        showCancel: false,
        success(res) {}
      })
    } else {
      
      wx.cloud.database().collection('user')
        .where({
          name: this.data.username,
          pwd: this.data.password
        })
        .get()
        .then(res => {
          if (res.data =='' ) {
            wx.showModal({
              title: '提示',
              content: '用户名或密码错误',
              showCancel: false,
              success(res) {}
            })
          } else {
            app.globalData.userName=this.data.username
            wx.reLaunch({
              url: '../home/home',
            })
            
          }
        })
    }
  },
  usernameInput: function (e) {
    this.data.username = e.detail.value;
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value;
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})
