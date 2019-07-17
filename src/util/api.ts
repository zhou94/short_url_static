import { get, post } from './http'
import { ITransformUrlReqBean } from './Req'
import { IQueryShortUrlRespBean } from './Resp'

export const generate = (data:ITransformUrlReqBean) => post('/shortUrl/generate.json', data).then(res => res as IQueryShortUrlRespBean) // 短链生成
