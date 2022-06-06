<template>
	<view>
		<uni-popup ref="captchaDialog" background-color="#fff">
			<view class="popup-content">
				<view class="head">
					<view>请输入验证码</view>
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
				<image class="captcha" :src="imgSrc" mode="aspectFit"></image>
				<uni-forms ref="captchaForm" :rules="rules" :modelValue="captchaFormData">
					<uni-forms-item label="" required name="captcha">
						<uni-easyinput v-model="captchaFormData.captcha" placeholder="请输入计算结果" />
					</uni-forms-item>
				</uni-forms>
				
				<view class="footer">
					<view class="refresh" @click="handleRefresh">
						刷新
					</view>
					<view
						class="custom-btn"
						style="width: 60px; margin: 0;"
						type="primary"
						@click="submit('captchaForm')"
					>提交</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { getBase64, downloadURL } from '@/utils/file.js'
	import { CODE_MAP } from '@/const.js'
	export default {
		data() {
			return {
				imgSrc: '',
				fileId: '', // 当前下载的文件id
				fileName: '',
				flag: false,
				captchaFormData: {
					captcha: ''
				},
				rules: {
					captcha: {
						rules: [{
							required: true,
							errorMessage: '请先输入计算结果'
						}, {
							format: 'number',
							errorMessage: '计算结果应为数字'
						}]
					}
				}
			}
		},
		methods: {
			open (id, name, flag) {
				this.flag = flag
				this.fileId = id
				this.fileName = name
				this.$refs.captchaDialog.open()
				this.getCaptcha()
				this.captchaFormData.captcha = ''
			},
			close () {
				this.$refs.captchaDialog.close()
				this.captchaFormData.captcha = ''
				this.flag = false
			},
			submit (ref) {
				this.$refs[ref].validate().then(res => {
					const { captcha } = res
					uni.request({
						url: '/api/book/download',
						method: 'POST',
						// responseType: 'arraybuffer',
						data: {
							code: this.flag ? 0 : captcha,
							fileId: this.fileId,
							fileName: this.fileName
						},
						success: res => {
							if (!res.statusCode === 200) {
								uni.showToast({
									title: '服务出现问题，请稍后重试！',
									icon: 'none'
								})
								this.close()
								return
							}
							const { code, data, message } = res.data
							if (code === CODE_MAP.ACCOUNT_TODAY_LIMIT_ERROR) {
								this.close()
							}
							if (code === CODE_MAP.CAPTA_CODE_ERROR) {
								this.handleRefresh()
							}
							if (code === 0) {
								this.close()
								const url = `http://192.168.31.60:8081/api/static/file/${data.downloadId}?fileName=${this.fileName}`
								downloadURL(this.fileName, url)
							} else {
								uni.showToast({
									title: message,
									icon: 'none'
								})
							}
						}
					})
					// 提交结果
				}).catch(err => {
					console.log('err', err)
				})
			},
			getCaptcha () {
				uni.request({
					url: `/api/book/getCapatCode?r=${Math.random()}`,
					method: 'POST',
					responseType: 'arraybuffer',
					header: {
						'X-Uid': uni.getStorageSync('uId')
					},
					success: res => {
						if (!res.statusCode === 200) {
							uni.showToast({
								title: '服务出现问题，请稍后重试！',
								icon: 'none'
							})
							this.close()
							return
						}
						if (res.header['content-type'].indexOf('application/json') < 0) {
							this.imgSrc = 'data:image/png;base64,' + uni.arrayBufferToBase64(res.data)
						} else {
							const enc = new TextDecoder("utf-8")
							const data = JSON.parse(enc.decode(res.data))
							if (data.code === CODE_MAP.NEED_LOGIN) {
								uni.showToast({
									title: data.message,
									icon: 'none'
								})
								uni.reLaunch({
									url: '/pages/login/index'
								})
								this.close()
							}
						}
					}
				})
			},
			handleRefresh () {
				this.getCaptcha()
				this.captchaFormData.captcha = ''
			}
		}
	}
</script>

<style lang="less">
  .popup-content {
  	padding: 1rem;
  	width: 80vw;
		max-width: 400px;
		
		.head {
			display: flex;
			justify-content: space-between;
		}
		
		.captcha {
			height: 80px;
			margin: 1rem 0;
			width: 100%;
			border: 1px solid #eeeeeea8;
			border-radius: .2rem;
		}
		
		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.refresh {
				color: #927a6e;
				cursor: pointer;
			}
		}
  }
</style>
