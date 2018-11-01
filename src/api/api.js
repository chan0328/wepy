import Request from './request';
//默认登录
export const wxLogin=(params)=>Request.request('/login/'+params);