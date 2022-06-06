<template>
	<view class="content">
		<Head/>
		<uni-search-bar
		  v-model="keyword"
			ref="searchBar"
			cancelButton="none"
			disabled
		  placeholder="请输入您要搜索的书名"
			style="width: 20rem;"
			radius="20"
			@confirm="confirm"
		/>
	</view>
</template>

<script>
	import Head from '@/pages/components/Head.vue'
	export default {
		components: { Head },
		data() {
			return {
				keyword: ''
			}
		},
		onLoad() {

		},
		methods: {
			confirm (res) {
				this.search(res.value)
			},
			search (res) {
				uni.navigateTo({
					url: `/pages/result/index?keyword=${this.keyword}`
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
