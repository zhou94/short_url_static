import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/Layout'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
import './style/index.scss'
ReactDOM.render(<LocaleProvider locale={zhCN}><Layout /></LocaleProvider>, document.getElementById('root'))
