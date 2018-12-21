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
    //省市区正则
    region(address){
      if(address){
         let reg=/.+?(省|市|自治区|自治州|县|区)/g;
        return address.match(reg);
      }else{
        return false;
      }
    },
    //字段的验证
    verify(value,type){
        var value = value.trim(); 
        //非空验证
        if ('require' === type) {
            return !!value;
        }
        //金额验证
        if ('money' === type) {
            return /^[0-9]*(\.[0-9]{1,2})?$/.test(value);
        }
        //手机号验证
        if ('phone' === type) {
            return /^1(3|4|5|7|8)\d{9}$/.test(value);
        }
        //邮箱验证
        if ('email' === type) {
            return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
        }
        //名字验证
        if('name' === type){
            return /^[\u4e00-\u9fa50-9a-zA-Z]{1,20}$/.test(value);
        }
        //性别验证
        if('sex' === type){
          return /^(男|女)$/.test(value);
        }
        //年龄验证
        if('age' === type){
          return /^((1[01]|[1-9])?\d|120)$/.test(value);
        }
        //密码验证
        if('pwd'===type){
            return /^([a-zA-Z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,16}$/.test(value);
        }
        //身份证验证15和18位
        if('idCard'===type){
            return /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(value);
        }
    },
    // 跳转
    routeTo(router,type){
      if(type=='redirectTo'){
          if(wx.getStorageSync('click')==''){
            wx.redirectTo({
              url: router
            })
            wx.setStorageSync('click','yes');
            setTimeout(()=>{wx.setStorageSync('click','')},800);
          }
      }else if(type=='reLaunch'){
        if(wx.getStorageSync('click')==''){
          wx.reLaunch({
            url: router
          })
          wx.setStorageSync('click','yes');
          setTimeout(()=>{wx.setStorageSync('click','')},800);
        }
      }else if(type=='switchTab'){
        if(wx.getStorageSync('click')==''){
          wx.switchTab({
            url: router
          })
          wx.setStorageSync('click','yes');
          setTimeout(()=>{wx.setStorageSync('click','')},800);
        }
      }else{
        if(wx.getStorageSync('click')==''){
          wx.navigateTo({
            url: router
          })
          wx.setStorageSync('click','yes');
          setTimeout(()=>{wx.setStorageSync('click','')},800);
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
        duration: 1500
      })
    },
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
    },
    //计算滑动角度
    angle(start, end) {
      var _X = end.X - start.X,
      _Y = end.Y - start.Y
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    }
}
export default common;