let common = {
    //上传图片
    uploadImg(token,fun){
      var that=this;
      wx.chooseImage({
        count: 1,//图片数量
        success: function (res) {
          var tempFilePaths = res.tempFilePaths;
          that.showLoading('图片上传中...');
          wx.uploadFile({
            url: '', //七牛云接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              'token': token
            },
            success: function (res) {
              that.hideLoading();
              var img_key = JSON.parse(res.data).key;
              fun(tempFilePaths,img_key);
            },
            fail:function(res){
              that.tips(1,'上传失败，请稍后重试');
            }
          })
        }
      })
    },
    //预览图片
    previewImg(src,list){
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: list // 需要预览的图片http链接列表
      })
    },
    //拼接图片
    spliceImg(name){
      return 'https://xxx.cn/'+name;
    },
    //字段的验证
    testVal(value,type){
        var value = $.trim(value); 
        //非空验证
        if ('require' === type) {
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1(3|4|5|7|8)\d{9}$/.test(value);
        }
        //邮箱验证
        if ('email' === type) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
        }
        //名字检测
        if('name' === type){
            return /^[\u4e00-\u9fa50-9a-zA-Z]{1,20}$/.test(value);
        }
        //验证密码
        if('pwd'===type){
            return /^([a-zA-Z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,16}$/.test(value)''
        }
        //身份证验证15和18位
        if('idCard'===type){
            return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
        }
    },
    // 跳转
    routeTo(router,type,nums){
      let that = this;
      if(type=='redirectTo'){
          if(wx.getStorageSync('click')==''){
            wx.redirectTo({
              url: router
            })
            wx.setStorageSync('click','yes');
            setTimeout(()=>{wx.setStorageSync('click','')},800)
          }
      }else if(type=='reLaunch'){
        if(wx.getStorageSync('click')==''){
          wx.reLaunch({
            url: router
          })
          wx.setStorageSync('click','yes');
          setTimeout(()=>{wx.setStorageSync('click','')},800)
        }
      }else if(type=='back'){
        if(wx.getStorageSync('click')==''){
          wx.switchTab({
            url: router
          })
          wx.setStorageSync('click','yes');
          setTimeout(()=>{wx.setStorageSync('click','')},800)
        }
      }else{
        if(wx.getStorageSync('click')==''){
          wx.navigateTo({
            url: router
          })
          wx.setStorageSync('click','yes');
          setTimeout(()=>{wx.setStorageSync('click','')},800)
        }
      }
    },
    // 开始loading
    showLoading(title){
       wx.showLoading({
        title:title,
        mask:'true'
      })
    },
    // 结束loading
    hideLoading(){
      wx.hideLoading();
    },
    //Modal提示
    showModal(tips,cancel){
      wx.showModal({
        title: '提示',
        content: tips,
        showCancel:cancel
      })
    },
    //Toast提示
    showToast(tips){
      wx.showToast({
        title: tips,
        icon: 'none',
        mask:true,
        duration: 1800
      })
    }
    // 将一个一维数组转化成二位数组，且子数组长度可以自定义
    // num 为子数组长度
    handle(num,arr){
      var Arr = new Array(Math.ceil(arr.length/num));
      for(var i = 0; i<Arr.length;i++){
          Arr[i] = new Array();
      }
      for(var i = 0; i<arr.length;i++){
          Arr[parseInt(i/num)][i%num] = arr[i]; 
      }
      return Arr;
    }
}
export default common;