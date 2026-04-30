<template>
	<p @click="gopage">hello code=>{{ code }} </p>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3333/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios;
export default {
  data() {
    return {
		msg: "Welcome to Your Vue.js App",
		code:'',
		access_token:'',
		openid:'',
		headimgurl:'',
		nickname:''
    };
  },
  created() {
	console.log("created");
	// if (!sessionStorage.getItem("code411"))   
	// 		{
 
	// 			window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=yourappid&redirect_uri=https://70c9z95967.imdo.co/login&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
	// 			sessionStorage.setItem("code411", "xxx")
	// 			return;
	// 	}
		//if ("xxx" == sessionStorage.getItem("code411"))
		//this.getCode();
  },
  methods: {//（以vue为例）s

				// 网页应用扫码登录获取acccessToken
			have_try () {
			console.log("methods");
			var url = `/qq/special/g/00251LR5/gptj.html`;
			//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
			console.log("get openid url:"+url);

			this.$http.get(url).then((res) => {
				if (res.status ==200){
					console.log("success /special/g/00251LR5/gptj.html:");
				}
				else{
					console.log("get fail:"+res.data.errmsg);
				}
				
				//return res.data;
			},(err)=>{
				console.log("error:"+err);
			});


		},
		gopage(){
			console.log("gopage=>"+sessionStorage.getItem("code441"));

			// this.setuserinfo_db();
			// //this.getuserinfo();
			// },

			// getuserinfo(){
			// this.getAccessToken(this.code);
			// },

			// // 网页应用扫码登录获取acccessToken
			// getAccessToken (code) {
			// var AppID = "yourappid";
			// var SECRET = " 7319cd3ef9b688b4b13239234e8307d1";

			// var url = `/api/sns/oauth2/access_token?appid=${AppID}&secret=${SECRET}&code=${code}&grant_type=authorization_code`;
			// //https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
			// console.log("get openid url:"+url);

			// this.$http.get(url).then((res) => {
			// 	if (res.status ==200){
			// 		console.log("res.status:"+res.status);
			// 		console.log("res.data:"+res.data);
			// 		this.access_token =res.data.access_token;
			// 		this.openid = res.data.openid;

			// 		console.log("res access_token:"+this.access_token);
			// 		console.log("res openid:"+this.openid);

			// 		sessionStorage.setItem("access_token",JSON.stringify(this.access_token));
			// 		sessionStorage.setItem("openid",JSON.stringify(this.openid));
					
			// 		this.getUserinfo(this.access_token, this.openid);
			// 	}
			// 	else{
			// 		console.log("get fail:"+res.data.errmsg);
			// 	}
				
			// 	//return res.data;
			// },(err)=>{
			// 	console.log("error:"+err);
			// });

		},

			// 获取用户的开放信息
			//console.log("getUserinfo");
			getUserinfo (accessToken, openId){
				console.log("accessToken:"+accessToken +" openId:"+openId);

				const url = `/api/sns/userinfo?access_token=${accessToken}&openid=${openId}`;
				console.log("get user info url:"+url);
				this.$http.get(url).then((res)=>{
					if (res.status==200){
						console.log("headimgurl:"+res.data.headimgurl+" nickname:"+res.data.nickname);
						this.headimgurl =res.data.headimgurl;
						this.nickname = res.data.nickname;
						this.nickname = this.nickname.replace(/"/g, '');
						this.headimgurl = this.headimgurl.replace(/"/g, '');
						console.log("login nickname:"+this.nickname+ "headimgurl:"+this.headimgurl+ "open id:"+this.openid);
						sessionStorage.setItem("headimgurl",this.headimgurl);
						sessionStorage.setItem("nickname",this.nickname);
						//setTimeout(()=>{this.$router.push({path:'/'})}, 3000);
						this.$router.push({path:'/homepage'});
					}
					else{
						console.log("get user info fail:"+res.data.errmsg);
					}
					return res.data;
				},(err)=>{
					console.log("error:"+err);
				});
			} ,


			getCode() { // 非静默授权，第一次有弹框
				console.log("getCode");
				this.code = ''
				var local = window.location.href // 获取页面url
				var appid = 'yourappid'
				this.code = this.getUrlCode().code // 截取code
				sessionStorage.setItem("code411",JSON.stringify(this.code ));
				if (this.code == null || this.code === '') { // 如果没有code，则去请求
					window.location.href =
					`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
				} else {
					this.getuserinfo();
					console.log("go mainpage hello code:"+this.code);

					// 你自己的业务逻辑
				}
			},

			setuserinfo_db(){
				//console.log("user_id:"+userinfo.openid);
				//console.log("nickname:"+userinfo.nickname);


				this.$http.post('dbapi/setuserinfo',{
					user_id:'oHqZF6gM7CkC-kNft29RLTGHInTg',
					user_nickname:'stp',
					user_sex:'xx',
					user_city:'nanj',
					user_province:'jiangsu',
					user_headimgurl:'this.headimgurl',
					user_credit:100
				}).then((res)=>{	
					if (res.status==200){
						if (res.data.status ==1){
							console.log("set userinfo successfully");
						}
						else
							console.log("set userinfo failed :"+res.data.msg);
					}
					else
						console.log("res status !=200");
				},(err)=>{
					console.log(err);
				});
			},

			getUrlCode() { // 截取url中的code方法
				var url = location.search
				this.winUrl = url
				var theRequest = new Object()
				if (url.indexOf("?") != -1) {
					var str = url.substr(1)
					var strs = str.split("&")
					console.log("str:"+str+" strs:"+strs);
					for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
					console.log("str==>:"+(strs[i].split("=")[1]));
					}
				}

				return theRequest
			},
	}
};
</script>

<style>

</style>
