/**
 * 对字节转换成有单位的值
 * @param {*} byte 需要转换的字节
 * @returns 转换后的值
 */
export function byteFormat(byte) {
	let size = ''
	if (byte < 0.1 * 1024) { //小于0.1KB，则转化成B
		size = byte.toFixed(2) + 'B'
	} else if (byte < 0.1 * 1024 * 1024) { //小于0.1MB，则转化成KB
		size = (byte / 1024).toFixed(2) + 'KB'
	} else if (byte < 0.1 * 1024 * 1024 * 1024) { //小于0.1GB，则转化成MB
		size = (byte / (1024 * 1024)).toFixed(2) + 'MB'
	} else { //其他转化成GB
		size = (byte / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
	}

	const sizeStr = size + '' //转成字符串
	const index = sizeStr.indexOf('.') //获取小数点处的索引
	const decimal = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
	if (decimal === '00') { //判断后两位是否为00，如果是则删除00               
		return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
	}
	return size
}

/**
 * 下载文件
 * @param {*} fileName 文件名
 * @param {*} blob 二进制流
 */
export function downloadBlob (fileName, blob) {
	if ('msSaveOrOpenBlob' in window.navigator) {
		window.navigator.msSaveOrOpenBlob(blob, fileName) //IE导出
	} else {
		let url = window.URL.createObjectURL(new Blob([blob]))
		let link = document.createElement('a')
		link.style.display = 'none'
		link.href = url
		link.setAttribute('download', fileName)
		link.click()
	}
}

/**
 * 下载URL
 * @param {*} fileName 文件名
 * @param {*} URL 文件地址
 */
export function downloadURL (fileName, url) {
	const link = document.createElement('a')
	link.style.display = 'none'
	link.href = url
	link.setAttribute('download', fileName)
	link.click()
}
