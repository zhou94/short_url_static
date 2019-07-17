interface IRespBase {
  status: number // 返回状态码
  msg:string|null // 返回提示信息
}

/**
 * @description data为空的请求响应类型
 */
export interface IRespNullData extends IRespBase {
  data: null
}

/**
 * @description 通用请求响应类型
 */
export interface IRespData extends IRespBase {
  data: null | object
}

/**
 * @description 长链接转换
 */
export interface IQueryShortUrlRespBean extends IRespBase {
  data: { short_url: string }
}
