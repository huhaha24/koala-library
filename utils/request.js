import env from '../utils/env';

function service(options = {}) {
	// options.url = `${env.baseUrl}${options.url}`;
	return new Promise((resolved, rejected) => {
		options.success = (res) => {
			console.log('res', res)
			// 如果请求回来的状态码不是200则执行以下操作
			if (res.data.code !== 200) {
				// 非成功状态码弹窗
				uni.showToast({
					icon: 'none',
					duration: 3000,
					title: `${res.data.msg}`
				});
				// 登陆失效
				if (res.data.code === 403) {
					// 清除本地token
					removeToken()
					// 关闭所有页面返回到登录页
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
				// 返回错误信息
				rejected(res)
			} else {
				// 请求回来的状态码为200则返回内容
				resolved(res.data.data)
			}
		};
		options.fail = (err) => {
			// 请求失败弹窗
			uni.showToast({
				icon: 'none',
				duration: 3000,
				title: '服务器错误,请稍后再试'
			});
			rejected(err);
		};
		uni.request(options);
	});
}

export default service;
