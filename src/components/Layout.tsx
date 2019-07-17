import * as React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import Route from '../router'
const { Header, Content, Footer } = Layout

class Layouts extends React.PureComponent {
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">短网址服务</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>短网址服务</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <Route/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Url Server ©{new Date().getFullYear()} Created by zhou94</Footer>
      </Layout>
    )
  }
}

export default Layouts
