import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout as AntLayout, Menu, Button, Typography, ConfigProvider } from 'antd';
import {
   HomeOutlined,
   SearchOutlined,
   UserOutlined,
   LogoutOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Header, Sider, Content } = AntLayout;
const { Title, Text } = Typography;

const Layout = () => {
   const navigate = useNavigate();
   const location = useLocation();

   // Пункты меню (пока без авторизации)
   const menuItems = [
      { key: '/', icon: <HomeOutlined />, label: 'Главная' },
      { key: '/profiles', icon: <SearchOutlined />, label: 'Пользователи' },
   ];

   return (
      <AntLayout style={{ height: '100vh', overflow: 'hidden' }}>
         <Sider width={240} style={{ background: '#2B3743' }}>
            <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <HomeOutlined style={{ color: '#fff', fontSize: '24px' }} />
               <Text style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>SkillsMatrix</Text>
            </div>

            <Menu
               theme="dark"
               mode="inline"
               selectedKeys={[location.pathname]}
               items={menuItems}
               onClick={({ key }) => navigate(key)}
               style={{ borderRight: 0 }}
            />
         </Sider>

         <AntLayout>
            <Header
               style={{
                  background: '#2B3743',
                  height: 'auto',
                  padding: '30px 40px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #3A4755',
                  flexWrap: 'wrap',
                  gap: '16px',
               }}
            >
               <div>
                  <Title level={1} style={{ color: '#FFFFFF', margin: 0, fontSize: '32px' }}>
                     Зарегистрируйся
                  </Title>
                  <Title level={2} style={{ color: '#FFFFFF', margin: 0, fontSize: '20px', fontWeight: 'normal' }}>
                     раскрой свой потенциал
                  </Title>
               </div>

               <div style={{ display: 'flex', gap: '12px' }}>
                  <Button
                     style={{ background: '#4D8AF1', color: '#fff', border: 'none', borderRadius: '8px', width: '140px', fontWeight: 'bold' }}
                  >
                     Вход
                  </Button>
                  <Button
                     style={{ background: '#599996', color: '#fff', border: 'none', borderRadius: '8px', width: '140px', fontWeight: 'bold' }}
                  >
                     Регистрация
                  </Button>
               </div>
            </Header>

            <Content
               style={{
                  background: '#F1F2F6',
                  padding: '30px 40px',
                  overflowY: 'auto',
                  height: '100%',
               }}
               className="custom-scroll"
            >
               <Outlet />
            </Content>
         </AntLayout>
      </AntLayout>
   );
};

export default Layout;