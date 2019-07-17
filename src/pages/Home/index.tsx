import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Input, Form, message, Typography } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { generate } from '../../util/api'
const { Search } = Input
const { Paragraph } = Typography

interface IProps extends RouteComponentProps, FormComponentProps{}

const Home = (props:IProps) => {
  const [short_url, setUrl] = useState<string>('')
  useEffect(() => {
  }, [])
  const { getFieldDecorator, validateFields, getFieldError } = props.form
  const searchVal = (val:string) => {
    validateFields(['longUrl'], (err:Error, value) => {
      if (!err) {
        generate(value).then(({ status, msg, data }) => {
          if (status) {
            message.success(msg, 1.5)
            setUrl(data.short_url)
          }
        })
      }
    })
  }
  return (
   <div>{
    getFieldDecorator('longUrl', {
      rules: [
        {
          required: true,
          message: '请输入长网址',
        },
        {
          pattern: /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
          message: '请输入正确的长网址',
        },
      ],
    })(<Search
      placeholder="请输入长网址"
      enterButton="转换"
      size="large"
      onSearch={val => searchVal(val)}
    />)
   }
   {
    getFieldError('longUrl') &&
     <div>
      <p className="c-red p-y-8">{getFieldError('longUrl')}</p>
     </div>
   }
  <div className="fs-18 text-c m-t-32">
    {
      short_url && <Paragraph copyable={true}>{short_url}</Paragraph>
    }
  </div>
   </div>
  )
}

export default Form.create()(Home)
