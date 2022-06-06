<template>
	<view class="container">
		<view class="info">
			<view class="user">
				<image
				  class="avatar"
					:src="`/static/avatar/${avatarId}.png`"
				>
				</image>
				<view class="name">
					<view class="large-font">{{ userName || '请先登录' }}</view>
					<uni-tag v-if="userName" text="已登录" type="success" />
					<uni-tag v-else text="未登录" />
				</view>
			</view>
			<view class="grid" v-if="userName">
				<view class="grid-item">
					{{ downloadInfo ? downloadInfo.count : 0 }}<br/>
					今日下载量
				</view>
				<view class="grid-item">
					{{ downloadInfo ? downloadInfo.total - downloadInfo.count : 0 }}<br/>
					剩余下载量
				</view>
			</view>
		</view>
		
		<view class="footer">
			<view v-if="!userName" class="custom-btn" @click="toLogin">去登录</view>
			<view v-else class="custom-btn" style="background-color: #eee;" @click="toLogout">退出登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '请先登录',
				downloadInfo: null
			}
		},
		computed: {
			avatarId () {
				const y = 12
				const x = 1
				return Math.round(Math.random() * (y - x) + x)
			}
		},
		methods: {
			toLogin () {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			
			toLogout () {
				uni.removeStorageSync('uId')
				uni.removeStorageSync('userName')
				uni.removeStorageSync('downloadInfo')
				
				uni.redirectTo({
					url: '/pages/login/index'
				})
			},
		},
		onShow: function () {
			this.userName = uni.getStorageSync('userName')
			this.downloadInfo = uni.getStorageSync('downloadInfo')
		}
	}
</script>

<style lang="less">
	.info {
		box-shadow: 0 0.25rem 1rem #30374226;
		border-radius: 0.4rem;
		background: #F2E9E0;
		padding: 1rem;
		margin-bottom: 1rem;
		
		.user {
			display: flex;
			.avatar {
				width: 4rem;
				height: 4rem;
				border-radius: 50%;
			}
			
			.name {
				color: #3b4144;
				margin-left: 1rem;
				line-height: 2rem;
				
				/deep/ .uni-tag {
					font-weight: 400;
					padding: 2px 4px;
					border-radius: 2px;
				}
			}
		}
	}
	
	.grid {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
		
		&-item {
			text-align: center;
			line-height: 2rem;
			color: #3b4144;
		}
	}
	
	.footer {
		margin-top: 20rem;
	}
</style>
