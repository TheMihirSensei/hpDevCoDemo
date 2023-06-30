
import { Breadcrumb, Layout, Menu, theme, Button, Dropdown } from 'antd';
import { useState } from 'react';
import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;


export default ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem("user"))
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate("/signin")
  }

  const profileClickMenu = [
    {
      key: '1',
      label: <a onClick={handleLogout}>
        Logout
      </a>

    },
  ]
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: "100vh" }}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Desire',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between"

          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div >
            <Dropdown
              menu={{
                items: profileClickMenu,
              }}
              placement="bottomLeft"
              arrow
            >
              <Button>{userInfo.userName}</Button>
            </Dropdown>

          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};