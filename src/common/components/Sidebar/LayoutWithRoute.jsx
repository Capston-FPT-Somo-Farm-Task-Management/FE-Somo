import { Layout } from 'antd'
import SideMenu from './SideMenu'
import { Header } from 'antd/es/layout/layout'
import HeaderComp from '../Header'

const { Content } = Layout

const LayoutWithRoute = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout className="site-layout">
      <Header
          style={{
            padding: 0,
            background: "#fff",
          }}
        >
          <HeaderComp/>
        </Header>
        <Content style={{ margin: '20px 16px' }}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default LayoutWithRoute
