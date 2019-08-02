//index.js
//获取应用实例
const app = getApp()
// const fadeData = require("../../utils/fadeData.js").fadeData
const request = require('../../utils/request.js')

Page({
  data: {
    //日历组件相关配置
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    startDate: "2010-01",
    endDate: "2099-12",
    showMoreDays: true,
    weeksType: "cn",
    cellSize: 90,
    activeType: "square",
    showLunar: true,
    style:[],
    bottom: true,
    tempData: [], // 用来中转临时存放数据的
  },
  onLoad: function () {

  },
  // 点击选择成人/儿童时，点击月份+/-时，点击年月然后在面板里选择完年月再点击确定时 都需要执行以下buildData方法
  buildData(e){
    // 点击月份+/-后以及点击年月然后在面板里选择完年月再点击确定后，e.detail.currentYear和e.detail.currentMonth就是调接口时需要的year和month
    
    // 当点击成人/儿童后，此时的e.detailz中没有currentYear和currentMonth，就需要单独写一个year:new Date().getFullYear()  month:new Date().getMonth() + 1
    console.log(e.detail);
    if(e.detail.currentMonth){
      var year = e.detail.currentYear
      var month = e.detail.currentMonth
    }else{
      var year = new Date().getFullYear()
      var month = new Date().getMonth() + 1
    }
    /**
     * 这里需要调用接口获取对应月份的每一天的数据
     */
    request.request('POST', app.data.api_x + '/byk/getitemrepertoryByskuid?skuid=' + 'CN0003501' + '&year=' + year + '&month=' + month).then((sres) => {
      let fadeData = sres.data.data

      // 数据加工的过程
      let newArr = []
      fadeData.forEach((item) => {
        let res = item.date.match(/\d+$/g, function ($m) {
          return $m;
        });
        if (res[0][0] === '0') {
          res = Number(res[0][1]);
        } else {
          res = Number(res[0])
        }
        let save = '库存:' + item.number;// 库存
        newArr.push({
          month: 'current',
          day: res,
          color: 'white',
          background: '#099FDE',
          bottomText: save,
          fontSize: '22rpx'
        })
      })
      // 加工完数据，把加工以后的数据赋给tempData
      this.setData({
        tempData: newArr
      });
      // 调用初始化style的函数
      this.initStyle();
      
    }).catch((fres) => { })

  },
  initStyle(){
    if (this.data.style.length === 0) {
      this.setData({
        style: this.data.tempData
      });
    }
  }
})
