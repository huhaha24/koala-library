<template>
	<view class="container">
		<Head styles="margin-top: 1rem"/>
		
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control
			  :current="current"
				:values="items"
				style-type="text"
				active-color="#91796D"
				@clickItem="onClickItem"
			/>
		</view>
		
		<view class="form">
			<uni-forms
			  ref="valiForm"
				:rules="rules"
				:modelValue="valiFormData"
				label-align="center"
			>
				<uni-forms-item label="" required name="account">
					<uni-easyinput v-model="valiFormData.account" placeholder="请输入邮箱" />
				</uni-forms-item>
				<uni-forms-item label="" required name="password">
					<uni-easyinput type="password" v-model="valiFormData.password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
			<button 
			  style="background-color: #91796D;"
				type="primary"
				@click="submit('valiForm')"
			>
			  {{ current === 0 ? '登录' : '注册' }}
			</button>
		</view>
	</view>
</template>

<script>
	import Head from '@/pages/components/Head.vue'
	import { login } from '@/service/user.js'

	export default {
		components: { Head },
		data() {
			return {
				current: 0,
				items: ['登录', '注册'],
				valiFormData: {
					account: '',
					password: ''
				},
				rules: {
					account: {
						rules: [{
							required: true,
							errorMessage: '请输入邮箱'
						}, {
							format: 'email',
							errorMessage: '邮箱格式不正确'
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码'
						}]
					}
				}
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					if (this.current === 0) {
						this.login(res)
					} else {
						this.register(res)
					}
				}).catch(err => {
					console.log('err', err)
				})
			},
			
			register (value) {
				const { account, password } = value
				uni.request({
					url: '/api/user/register',
					method: 'POST',
					data: {
						account,
						password
					},
					success: res => {
						if (res.statusCode === 200) {
							console.log('res', res)
						}
					}
				})
			},
			
			login (value) {
				const { account, password } = value
				uni.request({
					url: '/api/user/login',
					method: 'POST',
					data: {
						account,
						password
					},
					success: res => {
						if (!res.data.code) {
							uni.request({
								url: '/api/user/userInfo',
								success: info => {
									const { email, id, count, total } = info.data.data
									uni.setStorageSync('uId', id)
									uni.setStorageSync('userName', email)
									uni.setStorageSync('downloadInfo', { ...info.data.data })
									uni.showToast({
										title: '登录成功',
										icon: 'none'
									})
									setTimeout(() => {
										this.redirectToPage()
									}, 1000)
								}
							})
						} else {
							uni.showToast({
								title: '账号或密码不正确！',
								icon: 'none'
							})
						}
					}
				})
			},
			
			redirectToPage () {
				const current = getCurrentPages()
				const prePage = current[current.length - 2]
				
				if (prePage && prePage.route !== 'pages/center/index' ) {
					uni.navigateBack()
				} else {
					uni.switchTab({ url: '/pages/index/index' })
				}
			},
			
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			}
		}
	}
</script>

<style lang="less">
	.container {
		.form {
			margin: 1rem 1.6rem;
		}
	}
</style>
