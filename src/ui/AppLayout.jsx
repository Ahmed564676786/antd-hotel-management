// AppLayout.jsx
import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // to highlight active menu

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
        <div style={{ height: '32px', margin: '16px', background: 'rgba(255,255,255,0.3)' }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/dashboard" icon={<UserOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/cabins" icon={<VideoCameraOutlined />}>
            <Link to="/cabins">Cabins</Link>
          </Menu.Item>
          <Menu.Item key="/uploads" icon={<UploadOutlined />}>
            <Link to="/uploads">Uploads</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: '0 16px',
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button type="primary" onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <h2>Admin Dashboard</h2>
        </Header>

        {/* Content */}
        <Content style={{ margin: '16px', padding: '24px', background: '#fff', minHeight: 280 }}>
          <Outlet /> {/* This renders the child routes */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
