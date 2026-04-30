<template>
			<div >
			<van-notice-bar wrapable :scrollable="false" left-icon="volume-o" style="text-align:left;">
					请如实填写收款信息，因错误信息导致打款异常，由本人承担损失
			</van-notice-bar>
			
			<van-form @submit="onSubmit"  style="text-align:left;">
				<van-cell-group  title="请完善收款信息">
				<van-field
					v-model="userzfb"
					clearable
					name="收款支付宝账号"
					label="收款支付宝账号"
					placeholder="请输入支付宝账号"
					required
					:rules="[{ required: true, message: '请填写收款支付宝账号' }]"
				/>	
				<van-field
					v-model="username"
					type="textarea"
					name="真实姓名"
					label="真实姓名"
					placeholder="请输入真实姓名"
					required
					:rules="[{ required: true, message: '请填写真实姓名' }]"
				/>

				<van-field
				v-model="userphn"
				type ="tel"
				name="手机号"
				label="手机号"
				placeholder="请输入手机号"
				required
				:rules="[{ required: true, message: '请填写手机号' }]"
				/>

				<van-field
				v-model="userwx"
				name="微信号"
				label="微信号"
				placeholder="请输入微信号"
				required
				:rules="[{ required: true, message: '请填写微信号' }]"
				/>
				<van-checkbox v-model="checked" checked-color="#07c160" style="font-size:16px;">我承诺：如实填写收款信息，因错误信息导致打款异常等情况，由本人承担一切责任！  </van-checkbox>
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">
					确认修改
					</van-button>
				</div>
			</van-cell-group>
			</van-form>
			<van-dialog 
			v-model="show"
			title="修改收款信息成功!"
			>
		</van-dialog>
		</div>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				userzfb: '',
				username: '',
				userphn: '',
				userwx: '',
				checked: true,
				pattern: /\d{6}/,
			};
		},
		methods: {
			onSubmit(values) {
				console.log('submit', values);
				console.log('submit==>'+ this.userzfb);
				console.log('submit==>'+ this.username);
				console.log('submit==>'+ this.userphn);
				console.log('submit==>'+ this.userwx);	
				var userzfb = this.userzfb;		
				var username = this.username;		
				var userphn = this.userphn;		
				var userwx = this.userwx;		
				var user_id= localStorage.getItem("openid");
				console.log('user_id==>'+ user_id);	
				this.$http.post('dbapi/setpayinfo',
				{payinfo_name:username,
					payinfo_zfb:userzfb,
					payinfo_phone:userphn,
					payinfo_wxno:userwx,
					payinfo_userid:user_id
				}).then(
					(res)=>{
						if (res.status==200){
							if (res.data.status==0)
								console.log("insert payinfo to db failed");
							else{
								this.show = true;
								setTimeout(()=>{
									this.show = false;
								},1000);
								//this.userzfb = this.username = this.userphn = this.userwx ='';
							}
						}
						else{
							console.log("status !=200");


						}
					
				},(error)=>{
					console.log(error);	
				});
			},
			// 校验函数返回 true 表示校验通过，false 表示不通过
			validator(val) {
				return /1\d{10}/.test(val);
			},
			// 异步校验函数返回 Promise
			asyncValidator(val) {
				return new Promise(resolve => {
					this.$toast.loading('验证中...');
					setTimeout(() => {
						this.$toast.clear();
						resolve(/\d{6}/.test(val));
					}, 1000);
				});
			},
			onFailed(errorInfo) {
				console.log('failed', errorInfo);
			},
		},
	};
</script>

<style>
	.van-checkbox{
		margin-bottom: 8px;
	}
</style>
