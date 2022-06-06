<template>
	<view class="content">
		<view class="book-list" v-if="list.length">
			<view v-if="!!total" class="total">
				搜索结果：
				<view class="text">
					共<text style="color: #937B6F;">{{ total }}</text>本
				</view>
			</view>
			<uni-row>
				<uni-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" v-for="(item, index) in list" :key="`${item.id}${index}`">
					<view class="book-card">
						<view class="book-cover" @click="handleClick(item)">
							<img
							  class="book-card-img"
								:src="item.cover_url ? `/api/static/image?path=${item.cover_url}` : '/static/empty.jpg'"
								:alt="item.title"
							>
						</view>
						<text class="book-card-title ellipsis-1">{{ item.title }}</text>
					</view>
				</uni-col>
			</uni-row>
			<uni-load-more v-if="status" :status="status" @clickLoadMore="handleLoadMore"/>
		</view>
		<view class="empty" v-else-if="!loading">
			<empty/>
		</view>
	</view>
</template>

<script>
	import Empty from './Empty.vue'
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			status: {
				type: String,
				default: ''
			},
			total: {
				type: Number,
				default: 0
			},
			loading: {
				type: Boolean,
				default: false
			}
		},
		components: { Empty },
		data() {
			return {
				
			}
		},
		watch: {
			'loading': function(loading) {
				if (loading && !this.total) {
					uni.showLoading({
						title: '加载中...'
					})
				} else {
					uni.hideLoading()
				}
			}
		},
		methods: {
			handleClick (value) {
				this.$emit('view', value)
			},
			
			handleLoadMore () {
				this.$emit('load')
			}
		}
	}
</script>

<style lang="less">
  .content {
  	margin-left: auto;
  	margin-right: auto;
  	padding-left: 0rem;
  	padding-right: 0rem;
  	width: 100%;
  	.book-list {
			.total {
				margin: 1rem 0 0 .4rem;
				
				.text {
					display: inline-block;
				}
			}
  		.book-card {
  			padding-bottom: 0.2rem;
  			margin: 1rem 0.4rem 0;
  			padding: 0;
  			text-align: center;
  			
  			.book-cover {
  				position: relative;
  				background: #ffffff60;
  				width: 100%;
  				box-shadow: 0 0.25rem 1rem #30374226;
  				border-radius: 0.4rem;
					cursor: pointer;
  				
  				&:before {
  					content: "";
  					display: block;
  					padding-bottom: 143%;
  				}
  			}
  			&-img {
  				width: 100%;
  				height: 100%;
  				object-fit: contain;
  				border-radius: 0.4rem;
  				position: absolute;
  				top: 0;
  				left: 0;
  			}
  			&-title {
  				font-size: .8rem;
  				height: 1rem;
  				padding: 4px;
  			}
  		}
  	}
  }
</style>
