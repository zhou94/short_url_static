/**
 * @description 转为数字
 * @param val
 * @returns {number}
 */
export function parseToNumber(val: any) {
  const number = Number(val)
  return isNaN(number) ? 0 : number
}

/**
 * @description 限制数字输入最多只允许一个小数点
 * @param val {string}
 * @returns {string}
 */
export function limitOneDecimalPoint(val: string) {
  let newVal = val
  // 只允许小数点后2位
  if (val.indexOf('.') > -1) {
    const valueList = val.split('.')
    newVal = `${valueList[0]}.${valueList[1].substr(0, 2)}`
  }
  return newVal
}

/**
 * @description 限制纯数字
 */
export function limitInteger(val: string) {
  return val.replace(/\D+/g, '')
}

/**
 * @description 格式化成“983,701.03”。NOTICE: 由于我司产品借款上限是20万，所以只考虑了千位后面的逗号
 * @param num {number} 需要格式化的金额数值
 * @returns {string} 返回格式化后的数值字符串
 */
export function formatMoney(num: number) {
  if (!num || typeof num !== 'number') {
    return '0.00'
  }
  let numStr = String(num)
  if (/[^\d\.]+/g.test(numStr)) {
    return '0.00'
  }
  // 只允许有一个小数点
  numStr = limitOneDecimalPoint(numStr)
  const dotPosition = numStr.indexOf('.')
  let integerPart = numStr
  let decimalPart = '00'
  if (dotPosition > -1) {
    integerPart = numStr.substring(0, dotPosition)
    decimalPart = numStr.substring(dotPosition + 1, numStr.length)
  }
  const integerPartLength = integerPart.length
  if (integerPartLength > 3) {
    const commaPosition = integerPartLength - 3
    integerPart = `${integerPart.substring(0, commaPosition)},${integerPart.substring(commaPosition, integerPartLength)}`
  }
  if (!decimalPart) decimalPart = '00'
  if (decimalPart.length < 2) decimalPart += '0'
  return `${integerPart}.${decimalPart}`
}

/**
 * @description 按key取特定的value值
 * @param url {string} "?a=1&b=2"类型的字符串
 * @param item {string} 参数key
 * @returns null 或者 string
 */
export function queryString(url: string, item: string) {
  if (typeof url !== 'string' || typeof item !== 'string') {
    return null
  }
  const sValue = url.match(new RegExp(`[?&]${item}=([^&]*)(&?)`, 'i'))
  return sValue ? sValue[1] : sValue
}

/**
 * @description 判断是否是手机号
 * @param phone
 */
export function checkIsPhone(phone: string) {
  return /^1(3|4|5|6|7|8|9)\d{9}$/g.test(phone)
}

/**
 * @description 判断是否是短信
 * @param sms
 */
export function checkIsSms(sms: string) {
  return /^\d{6}$/g.test(sms)
}

/**
 * @description 判断是否是密码
 * @param pwd
 */
export function checkIsPwd(pwd: string) {
  const len = pwd.trim().length
  return len >= 6 && len <= 16
}

/**
 * @description 判断是否是登录密码
 * @param pwd
 */
export function checkIsLoginPwd(pwd: string) {
  const len = pwd.trim().length
  return len >= 6 && len <= 16 && !/[^0-9a-zA-Z]+/g.test(pwd) && /\d/g.test(pwd) && /[a-zA-Z]/g.test(pwd)
}

const weekList = ['日', '一', '二', '三', '四', '五', '六']

/**
 * @description 得到年、月、日、时、分、秒、周几
 *
 * @export
 * @param {(number | Date | undefined)} datetime
 * @returns { year, month, date, hour, minute, second, day }
 */
export function dateDetail(datetime?: number | Date | string) {
  const dateObject = datetime ? new Date(datetime) : new Date()
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth() + 1
  const date = dateObject.getDate()
  const hour = dateObject.getHours()
  const minute = dateObject.getMinutes()
  const second = dateObject.getSeconds()
  const dayOfweek = dateObject.getDay()
  return ({
    year,
    month: !String(month)[1] ? `0${month}` : month,
    date: !String(date)[1] ? `0${date}` : date,
    hour: !String(hour)[1] ? `0${hour}` : hour,
    minute: !String(minute)[1] ? `0${minute}` : minute,
    second: !String(second)[1] ? `0${second}` : second,
    day: `周${weekList[dayOfweek]}`,
  })
}

/**
 * @description Object2String方法
 * @export {Function} object2string
 */
export const object2string = Object.prototype.toString

interface IGeoPositionOptions {
  enableHighAccuracy: boolean // 是否使用其最高精度来表示结果
  timeout: number // 获取到一个位置之后,多长时间（单位毫秒）内返回一个位置。默认值是 Infinity
  maximumAge: number // 缓存位置多长时间。默认值：0
}

/**
 * @description 调用浏览器navigator.geolocation对象接口获取用户地理位置
 *
 * @export {Function} getCurrentPosition
 * @param {IGeoPositionOptions} [options={ enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 }]
 * @returns {Promise} [{ latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed }]
 */
export function getCurrentPosition(options: IGeoPositionOptions = { enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 }) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('浏览器不支持获取当前位置'))
    }
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(new Error(error.message || '获取当前位置出错')),
      options
    )
  })
}


/**
 * @description 数据掩码
 * @export {Function} plusXing
 * @param str {string} //需掩码的字符串
 * @param frontLen {number} 字符串前几位需处理
 * @param endLen {number} 字符串后几位需处理
 * @returns {string}
 */

export function plusXing(str:string, frontLen:number, endLen:number) { // 掩码处理
  const len = str.length - frontLen - endLen
  let xing = ''
// tslint:disable-next-line: no-increment-decrement
  for (let i = 0; i < len; i++) {
    xing += '*'
  }
  return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
}
