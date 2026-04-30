<template>
	<div>
			<van-search
				v-model="value_4"
				show-action
				placeholder="请输入搜索关键词"
				@search="onSearch_4"
			>
			<div slot="action" @click="onSearch_4">搜索</div>
			</van-search>
			<van-tabs v-model="active" class="">
				<van-pull-refresh v-model="refreshing3" @refresh="onRefresh3">
						<van-list v-model="loading3" :finished="finished3" finished-text="没有更多了" @load="onLoad3">
							<div v-for="(item, index2) in list3" :key="index2">
								<van-cell :title="'订单号:'+item.orderno" :value="'￥'+item.price"/>
								<van-cell :title="item.product_tt" is-link :label="'券码上传时间:'+item.build_time +'\n'+'打款时间'+item.pay_time" style="white-space: pre-wrap;">
								</van-cell>
							</div>
						</van-list>
				</van-pull-refresh>
			</van-tabs>
			<tabbra_nav></tabbra_nav>
		</div>
</template>

<script>
import tabbra_nav from "./tabbar_nav"
export default {
	data() {
		return {
			active: 0,
			value_0: '',
			value_1: '',
			value_2: '',
			value_3: '',
			value_4: '',
			list3: [],
			loading3: false,
			finished3: false,
			refreshing3: false
		};
	},
	components:{
			tabbra_nav
		},
	methods:{

		onLoad3() {
				setTimeout(() => {
					if (this.refreshing3) {
						//this.list3 = [];
						this.refreshing3 = false;
					}

					this.loading3 = false;

						this.finished3 = true;
				}, 500);
			},
			onRefresh3() {
				// 清空列表数据
				this.finished3 = false;
				this.list3 = [];
				// 重新加载数据
				// 将 loading 设置为 true，表示处于加载状态
				this.loading3 = true;
				this.onLoad3();
			},
			onSearch_4() {
				this.onRefresh3() ;
				console.log("onsearch val:"+this.value_4);
				this.$http.get('/dbapi/search',{ params:{kw:this.value_4}}).then((res)=>{
					console.log("res.data.length:"+res.data.length );
					for (var i =0; i < res.data.length; i++){
						console.log("res.data.orderno:"+res.data[i].orderno );
						this.list3.push(res.data[i]);
					}

				},(err)=>{
					console.log("search orders error:"+err);
				});
			},
	}
}
</script>

<style>
	.van-cell{
	text-align: left;
	}
</style>
