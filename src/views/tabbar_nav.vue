<template>
	<div>
        <van-tabbar v-model="active" active-color="#ff4c7f">
            <van-tabbar-item :to="(item.name)" v-for="(item,index) in tabbars " :key="'tabbar' + index" :icon="item.icn" @click="tabIndex(index)">
                    <span>{{item.title}}</span>
		</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		data () {
			let routeName = this.$route.name
			console.log("tabbar router name "+ routeName);
			routeName = ['homepage', 'trading'].includes(routeName) ? routeName : 'homepage'
			return {
				routeName,
				tabbars:[{icn:'wap-home-o', title:'首页', push:"/homepage"},
				{icn:'notes-o',  title:'公告', push:"/notice"},
				{   icn:'shopping-cart-o',title:'交易', push:"/trading"},
				{   icn:'search',title:'查询', push:"/search"},
				{icn:"manager-o",title:'我的', push:"/mine"}],
					router_name:["/homepage", "/notice", "/trading", "/search", "/mine"],
					activeKey: 0,
					active: -1,
					tabindex: 0,
					value_3: '',
					value_4: '',
			}
		},

		methods: {
			show_alert(){
				alert('this tabbar nav');
			},
			tabIndex(index) {
				// 记录当前tab页
				let tid = sessionStorage.getItem('tabIndex');
				console.log("index:"+index+ " tid "+tid);
				if (tid != index){
					this.$router.push(this.router_name[index]);
					sessionStorage.setItem('tabIndex',index);
				}
			},
		},
	};


</script>

<style>

</style>

