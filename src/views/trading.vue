<template>
	<div>
		<van-tabs v-model="active4" swipeable>
			<van-tab v-for="(item,index) in titles" :key="index" :title="item">
				<div v-for="(item1, index2) in orders1[index]" :key="index2">
					<van-cell :title="'订单号:'+orders1[index][index2].order_id" :value="'￥'+orders1[index][index2].price"/>
					<van-cell :title="orders1[index][index2].product_tt" is-link 
							:label="'券码'+orders1[index][index2].coupon +'\n'+'上传时间:'+orders1[index][index2].build_time +'\n'+'打款时间:'+orders1[index][index2].pay_time" style="white-space: pre-wrap;">
					</van-cell>
				</div>
			</van-tab>
		</van-tabs>
		<tabbra_nav></tabbra_nav>
	</div>
</template>

<script>
import tabbra_nav from "./tabbar_nav"
	export default {
		data() {
			//<span>打款时间:{{item.payt}}</span>
			return {
				titles:['待审核','交易中','纠纷中','已关闭','已完成'],
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
			};
		},
		components:{
			tabbra_nav
		},
		methods: {
	
			gopage(index) {
				console.log("onChange index:"+index);
				this.$router.push({path:"/dbapi/trading", query:{mpid:1}});
			},
			getOrderDatas(){
				var orders = new Array();
				var orders_0 = new Array();
				var orders_1 = new Array();
				var orders_2 = new Array();			
				var orders_3 = new Array();
				var orders_4 = new Array();	
				var uid = localStorage.getItem("openid");
				console.log("user_id:"+uid);		
				this.$http.get('/dbapi/orders',{params:{user_id:uid}}).then((res)=>{
					for (var i = 0; i< res.data.length; i++){
						switch (res.data[i].status){
							case 0:
								orders_0.push(res.data[i]);
							break;
							case 1:
								orders_1.push(res.data[i]);
							break;
							case 2:
								orders_2.push(res.data[i]);
							break;
							case 3:
								orders_3.push(res.data[i]);								
							break;
							case 4:
								orders_4.push(res.data[i]);								
							break;
							default:
								console.log("unkown case status:" + res.data[i].sttus);
							break;
						}
					}	
				orders.push(orders_0);				
				orders.push(orders_1);		
				orders.push(orders_2);		
				orders.push(orders_3);		
				orders.push(orders_4);	
				this.orders1 = orders;			
					console.log("send orders content db request<cartMain.js> product_tt: "+orders[0].product_tt);
				},(err)=>{
					console.log(err);
				});
		
				/*for (var i = 0; i < 4; i++){
					_$http.get('/orders', 
					{
						params: {
							id: i
						}
					}).then((res)=>{
						orders[i] = res.data[0];
						console.log("send orders content db request<cartMain.js> product_tt: "+orders[i].product_tt);
					},(err)=>{
						console.log(err);
					});
				}*/
			},
		},
		mounted() {
			this.getOrderDatas()
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
