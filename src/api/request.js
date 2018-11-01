import common from '../common/common'
const baseUrl="";//线上url
let Request={
	request(url,data,method){
		if(data){
			if(wx.getStorageSync('openid')){
				data.open_id=wx.getStorageSync('openid');
			}
		}
		return new Promise((resolve,reject)=>{
			wx.request({
				url:baseUrl+url,
				method:method,
				data:data,
				header:{
					// authorization:wx.getStorageSync('token');//请求头统一添加token
				},
				success(res){
					resolve(res);
				},
				fail(err){
					// if(err.statusCode===401){
					// 	wx.clearStorageSync();
					// 	common.routeTo('');//跳转到登录
					// }else{
						reject(err);
						common.showToast('出错了，请稍后重试');
					// }
				}
			})	
		});
	}
}

export default Request