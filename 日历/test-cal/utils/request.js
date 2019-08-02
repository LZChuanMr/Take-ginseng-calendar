const request = function request(methods, urls, datas) {
  let that = this;
  let method = methods;//请求方法名
  let url = urls;//请求地址
  let data = datas;//请求数据
  var promise = new Promise(function (success, fail) {
    wx.request({
      header: {
        'content-type': 'application/json;'
      },
      url: url,
      data: data,
      method: method,
      success: function (sres) {
        //处理公共部分业务逻辑
        success(sres);
      },
      fail: (fres) => {
        fail(fres);
      }
    })
  })
  return promise;
}
module.exports = {
  request: request
}