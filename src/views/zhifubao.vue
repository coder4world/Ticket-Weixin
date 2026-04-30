<template>
	<div>
		<van-notice-bar wrapable :scrollable="false" left-icon="volume-o">
					请如实填写收款信息，因错误信息导致打款异常，由本人承担损失
		</van-notice-bar>
			<van-form @submit="onSubmit" style="text-align:left;">
				<van-cell-group title="收款信息设置">
				<van-cell
					title="收款方式"
					value="支付宝"
				/>	
				<van-cell
					title="真实姓名"
					value="姓名"
				/>
				<van-cell
					type="textarea"
					title="收款账号"
					value="账号"
				/>
				</van-cell-group>
				<van-cell-group>
					<van-cell
						type="textarea"
						title="手机号码"
						value="号码"
					/>

					<van-cell
						title="微信号"
						value="wx号码"
					/>
				</van-cell-group>

				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">
					点击这里修改收款信息
					</van-button>
				</div>
			</van-form>
			</div>
</template>

<script>
	export default {
		methods: {
			onSubmit() {
				console.log("edit pay info");
				this.$router.push({path:'/payinfoedit'});
			},

		},
	};
</script>

<style>
</style>
