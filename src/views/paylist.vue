<template>
	<div>
		<van-pull-refresh v-model="refreshing3" @refresh="onRefresh3">
					<van-list v-model="loading3" :finished="finished3" finished-text="没有更多了" @load="onLoad3">
						<div >
							<van-cell v-for="(item, index2) in list3" :key="index2" :title="'收款x'" :label="item.pay_time" :value="'￥'+item.pay_amoney"
							:icon="'cash-back-record'" style="white-space: pre-wrap;"/>
						</div>
					</van-list>
			</van-pull-refresh>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3333/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios;
	export default {
		data() {
			//<span>打款时间:{{item.payt}}</span>
			return {
				content:[
				],
				orders1:[],
				active: 2,
				activeName: 'a',
				active1: 2,
				active2: 2,
				active3: 2,
				active4: 2,
				active5: 2,
				value_0: '',
				value_1: '',
				value_2: '',
				value_3: '',
				value_4: '',
				list3: [],
				loading3: false,
				finished3: false,
				refreshing3: false,
				user_id:this.$route.query.user_openid
			};
		},
		methods: {
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
			getpaylist_db(){		
				var list = [];	
				console.log("this.user_openid:"+this.user_openid);
				this.$http.get('/dbapi/paylist',{params:{user_id:this.user_openid}}).then((res)=>{
					console.log("res.status:"+res.status);
					if (res.stat!==500){
						console.log("res.data.length:"+res.data.length);
						for (var i = 0; i< res.data.length; i++){
							console.log("res.data pay_time:"+res.data[i].pay_time);
							this.list3.push(res.data[i]);
							list.push(res.data[i]);
						}	
						console.log("list length:"+list.length);
					}

				},(err)=>{
					console.log(err);
				});
	
			},
		},
		mounted() {
			this.getpaylist_db()
		}
	}
</script>

<style>
	.demo-tab .van-tab__pane {
		padding: 25px 20px;
		background-color: #fff;
	}
	.van-tab{
		white-space: pre-wrap;
	}
	.van-cell{
	text-align: left;
}
</style>
