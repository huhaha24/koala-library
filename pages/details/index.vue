<template>
	<view class="container">
		<view class="boxInfo">
			<view class="boxInfo_left">
				<img :src="detail.cover_url ? `/api/static/image?path=${detail.cover_url}` : '/static/empty.jpg'" alt="书籍">
			</view>
			<view class="boxInfo_right">
				<view class="ellipsis-1">{{ detail.title }}</view>
				<view class="small-font ellipsis-1">{{ detail.authors }}</view>
				<view class="small-font ellipsis-1">{{ detail.publisher }}</view>
				
				<view class="tags ellipsis-1" v-if="detail.tags">
					<text class="tags-item min-font" v-for="item in detail.tags">{{ item }}</text>
				</view>
			</view>
		</view>
		
		<uni-collapse ref="collapse">
			<uni-collapse-item title="更多内容">
				<view class="content" style="padding: .2rem .8rem;">
					<text class="text">
						<b>书名：</b>{{ detail.title || '-' }}<br/>
						<b>作者：</b>{{ detail.authors || '-' }}<br/>
						<b>出版社：</b>{{ detail.publisher || '-' }}<br/>
						<b>出版时间：</b>{{ detail.publish_date ? $moment(detail.publish_date).format('YYYY-MM-DD') : '-' }}<br/>
						<b>ISBN：</b> {{ detail.isbn || '-' }}
					</text>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		
		<view class="boxContent">
			<view class="head large-font">
				书籍简介
			</view>
			<rich-text v-if="detail.overview" class="overview" :nodes="detail.overview"></rich-text>
			<view class="empty" v-else-if="!loading">
				<empty/>
			</view>
		</view>
		
		<view class="custom-btn" @click="handleDownload">下载</view>
		
		<uni-popup ref="downLoadPopup" background-color="#fff">
			<view class="popup-content">
				<view class="head">
					<view>下载列表</view>
					<view class="close-icon">
						<uni-icons
						  color="#8f8f94"
							type="closeempty"
							size="18"
							@click="close()"
						>
						</uni-icons>
					</view>
				</view>
				<uni-list border-full>
					<uni-list-item
						@click="downloadFile(item.id, item.name, item.flag)"
						clickable
					  v-for="(item, index) in fileList"
						:key="item.id"
						:title="item.name"
						:note="byteFormat(item.size)"
						ellipsis="3"
					>
						<template v-slot:footer>
							<image class="downImg" src="/static/download.png" mode="aspectFit"></image>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</uni-popup>
		
		<captcha ref="captchaModal"/>
	</view>
</template>

<script>
	import Captcha from '@/pages/components/Captcha.vue'
	import Empty from '@/pages/components/Empty.vue'
	import { byteFormat, downloadBlob } from '@/utils/file.js'
	export default {
		components: { Captcha, Empty },
		data() {
			return {
				detail: {},
				fileList: [],
				captcha: null,
				
				byteFormat,
				loading: false
			}
		},
		watch: {
			'loading': function(loading) {
				if (loading) {
					uni.showLoading({
						title: '加载中...'
					})
				} else {
					uni.hideLoading()
				}
			}
		},
		methods: {
			// 获取书籍详情
			getDetail (id) {
				if (!id) {
					// 没有书籍
					return
				}
				this.loading = true
				
				uni.request({
					url: `/api/book/getBookDetail/${id}`,
					success: res => {
						this.detail = res.data.data
						this.fileList = res.data.data.files
					},
					complete: () => {
						this.loading = false
					}
				})
			},
			
			// 获取可下载资源
			getFiles (id) {
				uni.request({
					url: `/api/book/${id}/files`,
					header: {
						'X-Uid': uni.getStorageSync('uId')
					},
					success: res => {
						if (res.statusCode === 200) {
							this.fileList = res.data
						}
					}
				})
			},
			
			handleDownload () {
				this.$refs.downLoadPopup.open()
				// if (!uni.getStorageSync('uId')) {
				// 	uni.navigateTo({
				// 		url: '/pages/login/index'
				// 	})
				// } else {
				// 	this.$refs.downLoadPopup.open()
				// }
			},
			
			downloadFile (id, name, flag) {
				if (!uni.getStorageSync('uId')) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/index'
						})
					}, 500)
				} else {
					this.$refs.captchaModal.open(id, name, flag)
				}
			},
			
			close () {
				this.$refs.downLoadPopup.close()
			}
		},
		onLoad: function(option) {
			const { id } = option
			this.getDetail(id)
			// this.getFiles(id)
		}
	}
</script>

<style lang="less">
	.container {
		.boxInfo {
			display: flex;
			background: #F2E9E0;
			border-radius: 1rem;
			height: 126px;
			margin-top: 48px;
			position: relative;
			&_left {
				flex: 1;
				
				img {
					width: 7rem;
					position: absolute;
					bottom: 1rem;
					left: 1rem;
					border-radius: 0.4rem;
					box-shadow: 0 0.25rem 1rem #30374226;
				}
			}
			
			&_right {
				flex: 2;
				padding: 1rem 1rem 1rem 3.2rem;
				
				.tags {
					position: absolute;
					bottom: 1rem;
					&-item {
						display: inline-block;
						margin: .1rem;
						background-color: #FFE180;
						color: #966200;
						padding: .2rem .4rem;
					}
				}
			}
		}
		
		.boxContent {
			.title {
				background-color: #F5F5F5;
			}
			.head {
				color: #1B1B21;
				text-align: center;
				margin-top: 2rem;
				font-weight: 500;
			}
			.overview {
				color: #1b1b21c2;
				border-radius: 1rem;
				padding: 1rem;
				margin: 1rem 0;
			}
		}
		
		.popup-content {
			padding: 1rem;
			width: 80vw;
			max-width: 400px;
			
			.head {
				display: flex;
				justify-content: space-between;
				margin-bottom: .6rem;
			}
		}
		
		.downImg {
			width: 1rem;
			height: 1rem;
		}
		
		/deep/ .uni-popup .uni-popup__wrapper {
			border-radius: .8rem;
		}
	}
</style>
