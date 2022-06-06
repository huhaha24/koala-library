<template>
	<view class="search-result">
		<uni-breadcrumb separator="/">
		  <uni-breadcrumb-item to="/pages/index/index">首页</uni-breadcrumb-item>
			<uni-breadcrumb-item to="">搜索页</uni-breadcrumb-item>
		</uni-breadcrumb>
		<uni-search-bar
		  v-model="keyword"
			ref="searchBar"
			cancelButton="none"
			disabled
		  placeholder="请输入您要搜索的书名"
			style="width: 100%; margin-top: 1rem;"
			radius="20"
			@confirm="confirm"
		/>
		
		<book-list
		  :list="bookList"
			:status="dataLoadStatus"
			:total="total"
			:loading="loading"
			@view="handleViewDetail"
			@load="loadMore"
		/>
	</view>
</template>

<script>
	import BookList from '@/pages/components/BookList.vue'
	
	const STATUS_MAP = {
		MORE: 'more',
		LOADING: 'loading',
		END: 'no-more'
	}
	
	export default {
		name: 'SearchResult',
		components: { BookList },
		data() {
			return {
				keyword: '',
				bookList: [],
				dataLoadStatus: '',
				pageNo: 1,
				pageSize: 18,
				total: 0,
				loading: false
			}
		},
		methods: {
			confirm (res) {
				this.keyword = res.value
				this.reset()
				this.getList()
			},
			getList () {
				if (!this.keyword) {
					this.bookList = []
					return
				}
				this.dataLoadStatus = STATUS_MAP.LOADING
				this.loading = true
				
				uni.request({
					url: '/api/book/getBookList',
					method: 'POST',
					data: {
						keyword: this.keyword,
						pageNum: this.pageNo
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: res => {
						this.bookList = this.bookList.concat(res.data.data.books)
						this.total = res.data.data.count
						if (this.bookList.length === this.total) {
							this.dataLoadStatus = STATUS_MAP.END
						} else {
							this.dataLoadStatus = STATUS_MAP.MORE
						}
					},
					complete: () => {
						this.loading = false
					}
				})
			},
			handleViewDetail (value) {
				uni.navigateTo({
					url: `/pages/details/index?id=${value.id}`
				})
			},
			loadMore () {
				const num = Math.ceil(this.total / this.pageSize)
				if (this.pageNo < num) {
					this.pageNo += 1
					this.getList()
				}
				if (this.bookList.length === this.total) {
					this.dataLoadStatus = STATUS_MAP.END
				}
			},
			reset () {
				this.pageNo = 1
				this.total = 0
				this.bookList = []
			}
		},
		onLoad: function(option) {
			const { keyword } = option
			this.keyword = keyword
			this.getList()
		}
	}
</script>

<style lang="less">
	.uni-searchbar {
		padding: 0;
		
		&__box {
			border-radius: 1.2rem;
			background-color: #fff;
		}
	}
  .search-result {
		min-height: 100vh;
		padding: .8rem;
	}
</style>
