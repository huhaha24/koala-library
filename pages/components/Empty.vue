<template>
	<view class="empty">
		<img src="/static/empty.png" alt="无数据">
		<!-- <text class="small-font">暂无内容</text> -->
	</view>
</template>

<script>
	export default {
		name: 'Empty',
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.empty {
		margin: 8rem;
		color: #bfbfbf;
		text-align: center;
		
		img {
			width: 6rem;
		}
	}
</style>
