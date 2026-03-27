import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout as AntLayout, Menu, Button, Typography, Modal, Form, Input } from 'antd';
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
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
   const [loginForm] = Form.useForm();
   const [registerForm] = Form.useForm();

   const handleLogin = (values) => {
      console.log('Login attempt:', values);
      setIsLoginModalOpen(false);
      loginForm.resetFields();
   };

   const handleRegister = (values) => {
      console.log('Register attempt:', values);
      setIsRegisterModalOpen(false);
      registerForm.resetFields();
   };

   const menuItems = [
      { key: '/', icon: <HomeOutlined />, label: 'Главная' },
      { key: '/profiles', icon: <SearchOutlined />, label: 'Пользователи' },
   ];

   return (
      <AntLayout style={{ height: '100vh', overflow: 'hidden' }}>
         <Sider width={240} style={{ background: '#2B3743' }}>
            <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <HomeOutlined style={{ color: '#fff', fontSize: '24px' }} />
               <Text style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>SkillMatrix</Text>
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
                     onClick={() => setIsLoginModalOpen(true)}
                  >
                     Вход
                  </Button>
                  <Button
                     style={{ background: '#599996', color: '#fff', border: 'none', borderRadius: '8px', width: '140px', fontWeight: 'bold' }}
                     onClick={() => setIsRegisterModalOpen(true)}
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

         <Modal
            title="Вход"
            open={isLoginModalOpen}
            onCancel={() => setIsLoginModalOpen(false)}
            footer={null}
            centered
         >
            <Form form={loginForm} onFinish={handleLogin} layout="vertical">
               <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                  <Input />
               </Form.Item>
               <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
                  <Input.Password />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" block style={{ background: '#4D8AF1' }}>
                     Войти
                  </Button>
               </Form.Item>
            </Form>
         </Modal>

         <Modal
            title="Регистрация"
            open={isRegisterModalOpen}
            onCancel={() => setIsRegisterModalOpen(false)}
            footer={null}
            centered
         >
            <Form form={registerForm} onFinish={handleRegister} layout="vertical">
               <Form.Item name="username" label="Имя пользователя" rules={[{ required: true }]}>
                  <Input />
               </Form.Item>
               <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                  <Input />
               </Form.Item>
               <Form.Item name="password" label="Пароль" rules={[{ required: true, min: 6 }]}>
                  <Input.Password />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" block style={{ background: '#599996' }}>
                     Зарегистрироваться
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </AntLayout>
   );
};

export default Layout;