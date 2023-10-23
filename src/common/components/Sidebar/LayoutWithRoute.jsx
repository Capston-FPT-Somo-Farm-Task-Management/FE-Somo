import { Layout } from 'antd'
import SideMenu from './SideMenu'

const { Content } = Layout

const LayoutWithRoute = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout className="site-layout">
        <Content style={{ margin: '20px 16px' }}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default LayoutWithRoute
