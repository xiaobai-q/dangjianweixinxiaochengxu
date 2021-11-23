//调用全局变量
const app = getApp()

Page({
  
  data:{
    swiperList:[
      { url:'https://636c-cloud2-9g3l5j7l21abb9a1-1307223493.tcb.qcloud.la/swiper/3.jpg',
        name:'图片3'
      },
      {url:'https://636c-cloud2-9g3l5j7l21abb9a1-1307223493.tcb.qcloud.la/swiper/1.jpg',
        name:'图片1'
      },
      {url:'https://636c-cloud2-9g3l5j7l21abb9a1-1307223493.tcb.qcloud.la/swiper/2.jpg',
        name:'图片2'
      },
      {url:'https://636c-cloud2-9g3l5j7l21abb9a1-1307223493.tcb.qcloud.la/swiper/4.jpg',
        name:'图片4'
      }
    ],
    swiperCurrent:"" , //指示点
    xuexi:[],
    fazhi:[]
  },
  onLoad(){
    console.log('页面用户名为：',app.globalData.userName)
    wx.showLoading({
      title: '正在加载',
    })
    //调用云函数从数据库中获取数据（获取xuexi表信息）
    wx.cloud.callFunction({
      name:'getData_xuexi'
      })
      .then(res=>{
        console.log('获取数据成功',res.result.data)
        this.setData({
          xuexi:res.result.data
        })
        wx.hideLoading({
          success: (res) => {},
        })
      })
      .catch(err=>{
        console.log('获取数据失败',err)
      }),
      //获取fazhi表信息
      wx.cloud.callFunction({
        name:'getData_fazhi'
      })
      .then(res=>{
        console.log('获取数据成功',res.result.data)
        this.setData({
          fazhi:res.result.data
        })
      })
      .catch(err=>{
        console.log('获取数据失败',err)
      })
    
  },

  //swiper滑动事件
  swiperChange: function (e) {  //指示图标
    this.setData({
        swiperCurrent:e.detail.current
      })
  },
  //学习路上-更多
  click_0(e){
    wx.navigateTo({
      url: '../more_xuexi/more_xuexi',
    })
  },

  //学习路上-文章点击事件
  click_1(e){
    console.log('数据为：',e.currentTarget.dataset)
    wx.navigateTo({
      url: '../xuexilushang/xuexilushang?id=' +e.currentTarget.dataset.id1,
    })
  },

  //法制园地-更多
  click_2(e){
    wx.navigateTo({
      url: '../more_fazhi/more_fazhi',
    })
  },

  //法制园地-文章点击事件
  click_3(e){
    console.log('数据为：',e.currentTarget.dataset)
    //页面跳转
    wx.navigateTo({
      url: '../fazhiyuandi/fazhiyuandi?id=' +e.currentTarget.dataset.id2,
    })
  },
  //党建通知-点击事件
  click_4(e){
    console.log('数据为：',e.currentTarget.dataset)
    //页面跳转
    wx.navigateTo({
      url: '../dangshi/dangshi?id=' +e.currentTarget.dataset.id2,
    })
  },  click_5(e){
    console.log('数据为：',e.currentTarget.dataset)
    //页面跳转
    wx.navigateTo({
      url: '../jiyi/jiyi?id=' +e.currentTarget.dataset.id2,
    })
  },
  click_6(e){
    console.log('数据为：',e.currentTarget.dataset)
    //页面跳转
    wx.navigateTo({
      url: '../jilu1/jilu1?id=' +e.currentTarget.dataset.id2,
    })
  }
})
