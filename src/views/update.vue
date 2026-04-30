<template>
	<div>
		<van-card
				:price="pinfo.price"
				:title="pinfo.title"
				:thumb="pinfo.thumb"
		/>	
		<van-cell-group>
			<van-cell title="注意事项" />
			<div data-v-881f75d4="" style="padding: 0px 0px 10px 15px; font-size: 16px;">
				<div data-v-881f75d4="" style="width: 100%; font-weight: bold;">复制券码提交，一行一条，多单换行</div>
				<div data-v-881f75d4="" style="width: 100%; margin-top: 10px; font-weight: bold;">不要包含任何非券码相关的【标点符号或者文字】</div>
				<div data-v-881f75d4="" style="width: 100%; margin-top: 10px; font-weight: bold;">美食优惠券只收当天买的券，不是今天的不收</div>
				<div data-v-881f75d4="" style="background-color: red; width: 100%; margin-top: 10px; font-weight: bold;">
					<span data-v-881f75d4="" style="color: rgb(255, 255, 255);">没在群里的，加客服微信拉你进群，活动多多，客服微信请看公告</span>
				</div>
			</div>


			<van-tabs v-model="active4" swipeable>
				<van-tab v-for="(item,index) in titles" :key="item.index" :title="item.title">
					<div v-if="index==0">
						<van-panel title=""/>
						<van-field
						v-model="coupon"
						rows="5"
						autosize
						label=""
						type="textarea"
						placeholder="每条一行多条请换行"
						/>
					</div>
					<div v-if="index==1">
						<van-uploader  icon="photo" multiple></van-uploader>
					</div>
				</van-tab>
			</van-tabs>
		</van-cell-group>
		<van-button type="info" @click="submit_data">上传</van-button>
		<van-dialog
			v-model="show"
			show-button
			confirmButtonText
			cancel-button-text
			:title="show_content"
			>
			<p class="dialogshow">
			</p>
		</van-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				titles:[{title:'文字上传'},{title:'图片上传'}],
				pinfo:{price: this.$route.query.price, title:this.$route.query.title, thumb:this.$route.query.thumb},
				contents:[],
				active4:'',
				fileList3: [],
				order_id:'',
				product_tt:'',
				coupon:'',
				price:'',
				ocount:'',
				total_price:'',
				user_id:'',
				status:'',
				build_time:'',
				pay_time:'',
				show:false,
				show_content:'init',
			}
		},
		mounted(){
			this.user_id = localStorage.getItem("openid");
		},
		methods: {
			getOrderDatas(){
				this.$http.get('/dbapi/cart').then((res)=>{
					console.log("send cart content db request<cartMain.js> data: "+res.data);
					this.cartDatas = res.data;
				},(err)=>{
					console.log(err);
				})
			},
			getpageinf(){
				console.log("page info");
			},


			submit_data(){
				console.log("coupon:", this.coupon);

				var d = new Date();
				/*var str = d.toJSON().replace(/-/g, '');
				str = str.replace(/:/g, '');
				str = str.replace(/T/g, '');
				str = str.replace(/Z/g, '');
				str = str.replace(/\./g, '');*/

				var str = d.getTime();

				this.order_id =str;
				this.product_tt=this.pinfo.title;
				this.price= parseInt(this.pinfo.price);
				this.ocount =1;
				this.total_price=  this.pinfo.price;
				this.status =0;
				this.build_time=d.toLocaleString();
	

				console.log("@coupon:", this.coupon);
				console.log("order_id:", this.order_id);
				console.log("user_id:", this.user_id);
				this.$http.post('dbapi/submit_code',{
					order_id:this.order_id,
					product_tt:this.product_tt,
					coupon:this.coupon,
					price:this.price,
					ocount:this.ocount,
					total_price:500,
					user_id:this.user_id,
					status:this.status,
					build_time:this.build_time,
					pay_time:this.pay_time
				}).then((res)=>{
					if(res.status == 200){
						this.regInfo = res.data;
						if(this.regInfo.status == 1){
							//reg success, go to this login page
							//window.history.go(-1);
							console.log("successful");
							this.show_content='上传成功';
						}else{
							//alert('上传失败');
							this.show_content='上传失败:'+this.regInfo.msg;
						}
					}else{
						alert('出现错误');
						this.show_content='上传失败';
					}
					this.show =true;
					console.log(res);
				},(err)=>{
					console.log(err);
					this.show_content=err;
				});
				this.coupon='';
				
				//var ccc = JSON.parse(localStorage.getItem("sitename_approving"));
				//console.log("sitename_approving after pushing :", ccc);
			},
		}
	};
</script>

<style>
</style>
