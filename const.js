export const CODE_MAP = {
	SUCCESS: 0, // 请求成功
	NEED_LOGIN: 601, // 请登录
	PARAM_NOT_EMPTY: 501, // 不为空
	PARAM_ERROR: 502, // 不合法
	CAPTA_CODE_EXPIRE: 900, // 验证码过期
	CAPTA_CODE_ERROR: 901, // 验证码不正确
	TODAY_LIMIT_ERROR: 902, // 次数超出限制
	ACCOUNT_TODAY_LIMIT_ERROR: 521 // 今日可下载次数达到上限
}
