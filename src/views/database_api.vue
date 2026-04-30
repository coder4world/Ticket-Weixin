<script>
import axios from 'axios'
	export default {
		data() {
			//<span>打款时间:{{item.payt}}</span>
			return {
				titles:['信用值','绑定收款账户','打款记录','交易查询'],
				content:[
				],
				show:0,
				mtrd:0,
				mpayed:0,
				margue:0,
				orders1:[],
				active: 2,
				activeName: 'a',
				active1: 2,
				active2: 2,
				active3: 2,
				active4: 2,
				init:0,
				headimgurl:"1334",
				nickname:"st",
				openid:'123321',
				defaultdburl:' https://seven-parents-rush-183-209-157-141.loca.lt',
				credit:0,
				value:0,
				user_id:'',
				userinfo: {init:0, openid:'',nickname:'',sex:'',province:'',city:'', headimgurl:'./132.jpg', credit:''},
			};
		},
		created(){
			console.log("mine created");
			this.user_id =sessionStorage.getItem("openid");
			this.user_id =this.user_id.replace(/"/g,'');
			this.nickname =sessionStorage.getItem("nickname");
			this.nickname =this.nickname.replace(/"/g,'');
			this.headimgurl = sessionStorage.getItem("headimgurl");
			this.headimgurl =this.headimgurl.replace(/"/g,'');
			if (!this.user_id){
				console.log("mine need to get userinfo");
				this.userinfo.openid = "123321";
				this.user_id = "123321";	
				localStorage.setItem("useropenid", this.userinfo.openid);
				this.nickname  = this.userinfo.nickname;
				this.userinfo.sex = "男";
				this.userinfo.province = "江苏";
				this.userinfo.city = "南京";
				this.userinfo.headimgurl = "../assets/images/132.jpg";
				this.credit = this.userinfo.credit = 100;
				this.getorder_db();
				this.setuserinfo_db();
				console.log("this.userinfo.headimgurl "+this.userinfo.headimgurl );
				this.init =1;
			}
			else{
				console.log("nickname:"+this.nickname+" user_id:"+this.user_id+" headimgurl:"+this.headimgurl);
			}
		},
		methods: {
			confirmn() {
				this.show=0;
				localStorage.getItem("xxx");
			},
			trdquery(){
				this.$router.push({path:"/trdsch"});
			},
			payshow(){
				console.log("openid:"+this.openid);
				this.$router.push({path:"/paylist", query:{user_openid:this.openid}});
			},
			zfb(){
				this.$router.push({path:"/zhifubao"});
			},
			xyzhi(){
				this.show=1;
			},
			getuserinfo_db(){
				axios.defaults.baseURL = this.defaultdburl;
				this.$http.get('/getuserinfo').then((res)=>{	
					this.user_nickname = res.data.nickname;
					this.user_headimgurl = res.data.user_headimgurl;
					this.user_credit = res.data.user_credit;
					console.log("res.data.nickname: "+res.data.nickname);
				},(err)=>{
					console.log(err);
				});
			},

			setuserinfo_db(userinfo){
				console.log("nickname:"+userinfo.nickname);
				console.log("user_id:"+userinfo.openid);
				axios.defaults.baseURL = this.defaultdburl;
				this.$http.post('dbapi/setuserinfo',{
					user_id:userinfo.openid,
					user_nickname:userinfo.nickname,
					user_sex:userinfo.sex,
					user_city:userinfo.city,
					user_province:userinfo.province,
					user_headimgurl:userinfo.headimgurl,
					user_credit:userinfo.credit
				}).then((res)=>{	
					if (res.status==200){
						if (res.data.status ==1){
							console.log("set userinfo successfully");
						}
						else
							console.log("set userinfo successfully"+res.data.msg);
					}
					else
						console.log("res status !=200");
				},(err)=>{
					console.log(err);
				});
			},
			
			setpayinfo_db(){

				this.$http.post('dbapi/setpayinfo',{
					payinfo_name:this.payinfo_name,
					payinfo_zfb:this.payinfo_zfb,
					payinfo_phone:this.payinfo_phone,
					payinfo_wxno:this.payinfo_wxno
				}).then((res)=>{	
					if (res.status==200){
						if (res.data.status ==1){
							console.log("set payinfo successfully");
						}
						else
							console.log("set payinfo failed");
					}
					else
						console.log("res status !=200 ");
				},(err)=>{
					console.log(err);
				});
			},


			getorder_db(){
			console.log("getorder_db user_id:"+this.user_id);		
			this.$http.get('/dbapi/orders',{params:{user_id:this.user_id}}).then((res)=>{
				console.log("getorder_db res.data.length:"+res.data.length);
					for (var i = 0; i< res.data.length; i++){
						switch (JSON.parse(res.data[i].status)){
							case 0:
							case 1:
								console.log("mtrd:"+res.data[i].total_price);
								this.mtrd+=res.data[i].total_price;
							break;
							case 2:
								console.log("margue:"+res.data[i].total_price);
								this.margue+=res.data[i].total_price;
							break;
							case 4:	
								console.log("mpayed:"+res.data[i].total_price);
								this.mpayed+=res.data[i].total_price;
							break;
							default:
								console.log("unkown case status:" + res.data[i].status);
							break;
						}
					}	
		
					console.log("get orders this.mtrd "+this.mtrd+ "this.margue"+this.margue + "this.mpayed"+this.mpayed);
				},(err)=>{
					console.log(err);
				});
			},
		},
	}
</script>
