<template>
<div>
	<van-sticky>
		<van-tabs type="card" swipe-threshold="5" @change="onChange">
			<van-tab title="今日" >
					<van-grid :column-num="3" >
						<van-grid-item v-for="(item,index) in titltes" :key="item" :text="item+':'+tdata[index]" />
					</van-grid>
					</van-tab>
			<van-tab title="昨日">
					<van-grid :column-num="3" >
						<van-grid-item v-for="(item,index) in titltes" :key="item" :text="item+':'+'\n'+tdata[index]" />
					</van-grid>
					</van-tab>
			<van-tab title="本周">
					<van-grid :column-num="3" >
						<van-grid-item v-for="(item,index) in titltes" :key="item" :text="item+':'+'\n'+tdata[index]" />
					</van-grid>
					</van-tab>
			<van-tab title="本月">
					<van-grid :column-num="3" >
						<van-grid-item v-for="(item,index) in titltes" :key="item" :text="item+':'+'\n'+tdata[index]" />
					</van-grid>
					</van-tab>
			<van-tab title="自定义">	
						<van-field
							readonly
							clickable
							label="开始时间"
							:value="startTime"
							placeholder="请选择"
							@click="showPicker_6 = true"
							is-link 
							required
						/>
						<van-popup v-model="showPicker_6" position="bottom">
							<van-datetime-picker
								v-model="startDate"
								type="date"
								:min-date="minDate"
								:max-date="currentDate"	
								@cancel="showPicker_6 = false"
								@confirm="onConfirm_6"
							/>
						</van-popup>
		
						<van-field
							type="textarea"
							readonly
							clickable
							label="结束时间"
							:value="endTime"
							placeholder="请选择"
							@click="showPicker_7 = true"
							is-link 
							required
						/>
						<van-popup v-model="showPicker_7" position="bottom">
							<van-datetime-picker
							v-model="endDate"
							type="date"
							:min-date="minDate"
							:max-date="currentDate"
							@cancel="showPicker_7 = false"
							@confirm="onConfirm_7"
						/>
						</van-popup>	
						<van-button type="info" text="搜索" block size="small" @click="query"></van-button>
					<van-grid :column-num="3" >
						<van-grid-item v-for="(item,index) in titltes" :key="item" :text="item+':'+'\n'+tdata[index]" />
					</van-grid>	
			</van-tab>						
		</van-tabs>

		<table width="100%" style="font-size:14px;">
			<thead>
				<tr style="font-size:10px; text-align: center; width=100%">
					<th >票券名称</th>
					<th >票券数  </th>
					<th >审核中  </th>
					<th >交易中  </th>
				</tr>
			</thead>
			<tbody >
				<tr v-for="(item) in orders" :key=item.index>
					<td data-v-0d6f6e21="">{{item.product_tt}}</td>
					<td data-v-0d6f6e21="">{{item.ocount}}</td>
					<td data-v-0d6f6e21="">0</td>
					<td data-v-0d6f6e21="">0</td>
                </tr>
				<tr v-if="orders.length==0" >
					<td  colspan="4" class="color-gray" style="text-align: center;">暂无内容</td>
				</tr>
			</tbody>
		</table>

	</van-sticky>

	</div>


</template>

<script>

	export default {
		data() {
			return {
				show:1,
				titltes:["票券总数","审核中","交易中","纠纷中","已关闭","已结算"],
				tdata:[0,0,0,0,0,0],
				refreshing3:0,
				loading3:0,
				value:'',
				valueend:'',
				minDate: new Date(2020, 0, 1),
				maxDate: new Date(),
				startDate: '',
				endDate: '',
				startTime:'',
				endTime:'',
				currentDate: new Date(),
				currentTime: '12:00',
				columns_5: [],
				loading_5: true,
				showstime: '',
				showetime: '',
				showPicker_6: false,
				showPicker_7: false,
				orders: [],
				user_id:'',
				idx:0,
			};
		},
		create(){
			this.user_id = sessionStorage.getItem("openid");		
		},
		methods: {
			clear_all(){
				this.orders=[];
				for (var i = 0; i <this.tdata.length; i++)
					this.tdata[i] = 0;
			},
			onChange(index) {
				console.log("index:"+index);
				this.clear_all();
				this.idx = index;
				if (index <4){
					this.$http.get('/dbapi/dbapi/orders_time', {params:{user_id:this.user_id, idx:this.idx,st:'',et:'endime'}}).then((res)=>{
					if (res.status!=500){
						for (var i = 0; i< res.data.length; i++){
							this.orders.push(res.data[i]);
							this.tdata[0]++;
							this.tdata[res.data[i].status]++;
						}	
					}
					console.log("orders length: "+this.orders.length);
				},(err)=>{
					console.log(err);
				});
				}
			},
			query(){
				this.clear_all();
				console.log("idx"+this.idx+"startTime:"+this.startTime+" endTime:"+this.endTime);
				this.$http.get('/dbapi/orders_time', {params:{user_id:this.user_id,idx:this.idx,st:this.startTime,et:this.endTime}}).then((res)=>{
					if (res.status!=500){
						for (var i = 0; i< res.data.length; i++){
							this.orders.push(res.data[i]);
							this.tdata[0]++;
							this.tdata[res.data[i].status]++;
						}	
					}
					console.log("orders length: "+this.orders.length);
				},(err)=>{
					console.log(err);
				});
			},
			onConfirm_6(value) {

				this.startTime = this.startDate.toLocaleDateString().replace(/\//g, '-');
				console.log("start value:"+value+ " startDate:"+this.startDate+ " startTime:"+this.startTime);
				this.showPicker_6 = false;
			},


			onConfirm_7(value) {
				this.endTime = this.endDate.toLocaleDateString().replace(/\//g, '-');
				console.log("start value:"+value+ " endTime:"+this.endTime+ " endDate:"+this.endTime);
				this.showPicker_7= false;
			}
		}
	}

</script>

<style>
.van-tab{
    position: relative;
}

.justify {
    display: inline-block;
    vertical-align: top;
    width:100%;
    text-align: justify;
  }
  .justify::after{
    content:"";
    display: inline-block;
    width:100%;
    overflow:hidden;
    height:0;
  }


.table{
text-align:left;
width:100%;
border-collapse: collapse;
border-spacing: 0
}

</style>
