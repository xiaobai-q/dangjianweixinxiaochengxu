//获取当前系统日期和时间
var util = require('../../utils/util.js');
let titles = []
let errorOptions = []
let type = type
const app = getApp()
Page({
  data: {
    fenshu:'',
    id:'',
    percent: 0,
    total: 0,
    isSelect: false,
    subject: null,
    userSelect: '',
    score: 0, //用户答对题数
    totalScore: -1, //总得分
    totalError: 0,
    current: 1, //第一道题

  },
  onLoad(e) {


    wx.cloud.database().collection('tiku')
      .limit(10)
      .where({
        type: e.type
      }).get()

      .then(res => {
        titles = res.data
        let subject = titles[0]
        this.setData({
          subject,
          total: titles.length
        })
      })

  },
  radioChange(e) {
    this.setData({
      userSelect: e.detail.value
    })
  },
  submit() {
    //1.获取用户选择，判空
    let userSelect = this.data.userSelect
    if (!userSelect) {
      wx.showToast({
        icon: 'none',
        title: '请做选择',
      })
      return
    }
    //2.更新进度
    let currentNum = this.data.current
    this.setData({
      percent: ((currentNum) / titles.length * 100).toFixed(2)
    })
    //3.判断用户是否答对
    if (this.data.subject.answer.indexOf(userSelect) > -1) {
      this.setData({
        score: this.data.score + 1
      })
    } else { //错题集
      let subjectNow = this.data.subject
      subjectNow.userSelect = userSelect
      errorOptions.push(subjectNow)
    }
    //4.在答完最后一道题的时候，对用户进行打分
    if (currentNum + 1 > titles.length) {
      let totalScore = (this.data.score / titles.length * 100).toFixed(0)
      this.setData({
        totalScore,
        totalError: this.data.total-this.data.score
      })
      
      //错题上传数据库
    var currentTime = util.formatTime(new Date());
    wx.setStorageSync('errorOptions', errorOptions)
    wx.cloud.database().collection('error')
      .add({
        data: {
          name: app.globalData.userName,
          time: currentTime,
          errorOptions: errorOptions
        }
      })
      //清空数组
      errorOptions.splice(0)

     //获取排行榜数据
     wx.cloud.database().collection('paihangbang')
     .where({
       name: app.globalData.userName
     })
     .get()
     .then(res => {
       if (res.data == '') {
         wx.cloud.database().collection('paihangbang').add({
             data: {
               name:app.globalData.userName ,
               score: parseInt(totalScore)
             }
           })
       }else{
            wx.cloud.database().collection('paihangbang')
              .where({
                name: app.globalData.userName
              })
              .get()
              .then(res=>{
                console.log(res.data[0].score)
                this.setData({
                fenshu:res.data[0].score,
                id:res.data[0]._id
                })
                console.log(this.data.id)
                console.log(this.data.fenshu)
                  if(totalScore>parseInt(res.data[0].score)){
                  wx.cloud.database().collection('paihangbang')
                  .doc(this.data.id)
                  .update({
                    data:{
                      score:parseInt(totalScore)
                    }
                  })
                  .then(res=>{
                    console.log('update成功')
                  })
                }
              })
            }
          })        
    }
    let subject = titles[currentNum]
    this.setData({
      userSelect: '',
      subject,
      current: currentNum + 1,
      isSelect: false,  
    })
  },
  seeError() {
    wx.navigateTo({
      url: '../errorOptions/errorOptions',
    })
  },
  hui() {
    wx.navigateTo({
      url: '../tiku/tiku',
    })
  },
  hui1() {
    wx.switchTab({
      url: '../test/test',
    })
  }
})
