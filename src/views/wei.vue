<template>
	<div>
        <van-tabbar v-model="active2" active-color="#ff4c7f">
            <van-tabbar-item :to="(item.name)" @click="tabIndex(index)" v-for="(item,index) in tabbars" :key="'tabbar' + index" :icon="item.icn">
                    <span>{{item.title}}</span>
		</van-tabbar-item>
		</van-tabbar>

		<div class="HomePage">
			<form action="/">
				<van-search
					v-model="value_3"
					shape="round"
					background="#4fc08d"
					placeholder="请输入搜索关键词"
				>
					<div data-v-2f01e79d="" data-v-e4b194ee="">
						<p data-v-2f01e79d="" >上传须知</p>
					</div>
				</van-search>
			</form>
			<div class="HomeSidebar" style="margin-top: 0px;">
					<van-sidebar v-model="activeKey" @change="onChange">
						<div v-for ="item in sites" :key="item.index">
							<van-sidebar-item :title="item.mptitle" />
						</div>
					</van-sidebar>

					<div  id="goodsContent" class="goods-content" >
						<div v-for ="item in sites" :key="item.index" :id="'goodsmap'+item.mpid">
							<p>{{item.mptitle}}</p>
							<van-card v-for = "(card, index) in item.card" :key="card.index"
								:price="card.price"
								:title="card.title"
								:thumb="card.thumb"
							>
							<template #footer >
								<span @click="submit(item.mpid, index)" style="margin-left: 5px; font-size: 14px; color: rgba(40, 115, 255, 0.81); text-decoration: underline;">上传</span>
							</template>
							</van-card>
						</div>
					</div>	
			</div>
		</div>
	</div>
</template>

<script>
import goods from "../assets/data/mao.js"
	export default {
		data() {
			return {
				tabbars:[{icn:'home-o', title:'首页'},{icn:'search',  title:'公告'},{   icn:'friends-o',title:'交易'},{icn:"setting-o",title:'我的'}],
			sites: goods,
			activeKey: 0,
			active2: 0,
			tabindex: 0,
			value_3: '',
			value_4: ''
			};
		},

			methods: {
			onChange(index) {
				var VueScrollTo = require('vue-scrollto');
				console.log("onChange index:"+index);
				VueScrollTo.scrollTo("#goodsmap"+index, 500, {
                            container: "#goodsContent",
                            offset: 0,
							x: !1
                        });
			},
			tabIndex(index) {
				index = Number(index)
				this.active = index;
				// 记录当前tab页
				//sessionStorage.setItem('tabIndex',index)
				this.$router.push("/trading");
			},


			gopage(index) {
				console.log("onChange index:"+index);
				this.$router.push({path:"/trading", query:{mpid:1}});
			},
			submit(mpid, index) {
				console.log("sumbit index:" + index + " mpid "+mpid);
				this.$router.push({path:"/update", query:{mid:mpid, gid:index}});
			},
			onSearch_4(val) {
			this.$toast(val);
		}
		}
	};
</script>

<style>
.HomeSidebar {
    position: relative;
    padding-left: 25%
}
.van-sidebar{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 25%
}

.van-sidebar {
    width: 80px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch
}

.van-tabbar{
    position: fixed;
    bottom: 0;
    left: 0
}

.goods-content{
    height: calc(100vh - 104px);
    overflow-x: hidden;
    overflow-y: auto
}
</style>
