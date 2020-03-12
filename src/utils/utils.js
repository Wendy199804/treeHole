function setCookie(key, value, t){ //设置cookie  // t 为过期时间，单位是（天）
  var oDate=new Date();
  oDate.setDate(oDate.getDate()+t);
  document.cookie=key+"="+encodeURIComponent(value)+";expires="+oDate.toUTCString();//";path=/; domain=.baidu.com"
  if(getCookie(key)){
      console.log("ok")
  }else{
      console.log("sorry")
  }
}
function getCookie(key){  //获取cookie
  var str=document.cookie.replace(/;\s*/,';');
  var cookieArr=str.split(';');
  var cookieObj={};
  var len=cookieArr.length;
  for(var i=0; i<len; i++){
      var item=cookieArr[i];
      var k=item.split('=')[0];
      var v=item.split('=')[1];
      cookieObj[k]=v;
  }
  if(cookieObj[key]){
      return decodeURIComponent(cookieObj[key]);
  }else{
      return false;
  }
}

function removeCookie(key){  //删除cookie
	document.cookie=key+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	if(!getCookie(key)){
		console.log('删除成功');
	}else{
		console.log('删除失败');
	}
}

export default {
  setCookie,
  getCookie,
  removeCookie
}