<template>
	<view class="head">
		<image class="logo" :style="styles" src="/static/koala.jpg"></image>
		<view class="text-area">
			<text class="title">考拉搜书</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			styles: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
  .head {
		text-align: center;
		margin-bottom: .8rem;
		.logo {
			height: 200rpx;
			width: 200rpx;
			margin-top: 6rem;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: -8rpx;
		}
		
		.title {
			font-size: 36rpx;
			color: #8f8f94;
		}
		
		.text-area {
			display: flex;
			justify-content: center;
		}
	}
</style>
