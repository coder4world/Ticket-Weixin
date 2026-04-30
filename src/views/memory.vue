<template>
	<van-swipe :autoplay="3000" :loop="true">
		<van-swipe-item v-for="(image, index) in images" :key="index">
			<img v-lazy="image" />
		</van-swipe-item>
	</van-swipe>
</template>

<script>
	export default {
		data() {
			return {
				images: [
					'https://img.yzcdn.cn/vant/apple-2.jpg',
					'https://img.yzcdn.cn/vant/apple-3.jpg',
					'https://img.yzcdn.cn/vant/apple-4.jpg',
					'https://cdn9-banquan.ituchong.com/weili/image/l/919019123321470978.jpeg',
					'https://cdn6-banquan.ituchong.com/weili/image/l/994785911243800637.jpeg',
					'https://cdn6-banquan.ituchong.com/weili/image/l/976362391328915487.jpeg',
					'https://cdn3-banquan.ituchong.com/weili/image/l/1018679149427425343.jpeg',
					'https://cdn3-banquan.ituchong.com/weili/image/l/930943266794111020.jpeg',
					'https://cdn3-banquan.ituchong.com/weili/image/l/1159735229763289109.jpeg',
					'https://cdn3-banquan.ituchong.com/weili/image/l/1001089686382575716.jpeg',
				],
				current_2: 0
			}
		},
		methods: {
			onChange(index) {
				this.$toast('当前 Swipe 索引：' + index);
			},
			onChange_2(index) {
				this.current = index;
			}
		}
	}
</script>

<style>
	.my-swipe .van-swipe-item {
		color: #fff;
		font-size: 20px;
		line-height: 150px;
		text-align: center;
		background-color: #39a9ed;
	}

	.demo-swipe .van-swipe-item {
		color: #fff;
		font-size: 20px;
		line-height: 150px;
		text-align: center;
	}

	.demo-swipe .van-swipe-item:nth-child(odd) {
		background-color: #66c6f2;
	}

	.demo-swipe .van-swipe-item:nth-child(even) {
		background-color: #39a9ed;
	}

	.demo-swipe .van-swipe img {
		display: block;
		box-sizing: border-box;
		width: 100%;
		height: 240px;
		padding: 30px 60px;
		background-color: #fff;
		pointer-events: none;
	}

	.demo-swipe .custom-indicator {
		position: absolute;
		right: 5px;
		bottom: 5px;
		padding: 2px 5px;
		color: #fff;
		font-size: 12px;
		background: rgba(0, 0, 0, 0.1);
	}
</style>
