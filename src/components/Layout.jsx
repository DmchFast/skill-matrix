import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Layout as AntLayout, Menu, Button, Typography, ConfigProvider, Modal, Form, Input, message, Avatar } from 'antd';
import {
   HomeOutlined,
   SearchOutlined,
   RadarChartOutlined,
   UserOutlined,
   PlusOutlined,
   LogoutOutlined,
} from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import RegisterModal from './modals/RegisterModal';

const { Header, Sider, Content } = AntLayout;
const { Title, Text } = Typography;

const Layout = () => {
   const { user, login, register, logout } = useContext(AuthContext);
   const navigate = useNavigate();
   const location = useLocation();
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
   const [loginForm] = Form.useForm();


   const getMenuItems = () => {
      const items = [
         { key: '/', icon: <HomeOutlined />, label: 'Главная' },
      ];
      if (user) {
         items.push({ key: '/my-profile', icon: <UserOutlined />, label: 'Мой профиль' });
      }
      items.push({ key: '/profiles', icon: <SearchOutlined />, label: 'Пользователи' });
      if (user) {
         items.push({ key: '/create-skill', icon: <PlusOutlined />, label: 'Создать навык' });
      }
      if (user?.role === 'admin') {
         items.push({ key: '/admin', icon: <RadarChartOutlined />, label: 'Админка' });
      }
      return items;
   };

   const handleLogin = async (values) => {
      const success = await login(values.email, values.password);
      if (success) {
         setIsLoginModalOpen(false);
         loginForm.resetFields();
         message.success('Вход выполнен');
      } else {
         message.error('Неверный email или пароль');
      }
   };

   const handleRegister = async (username, email, password) => {
      const success = await register(username, email, password);
      if (success) {
         message.success('Регистрация успешна');
         setIsRegisterModalOpen(false);
      } else {
         message.error('Пользователь с таким email уже существует');
      }
      return success;
   };

   const handleLogout = () => {
      logout();
      navigate('/');
      message.info('Вы вышли');
   };

   return (
      <AntLayout style={{ height: '100vh', overflow: 'hidden' }}>
         <Sider width={240} style={{ background: '#2B3743' }}>
            <div style={{ padding: '52px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <HomeOutlined style={{ color: '#fff', fontSize: '24px' }} />
               <Text style={{ color: '#fff', fontSize: '28px', fontWeight: 'bold' }}>SkillsMatrix</Text>
            </div>

            <ConfigProvider
               theme={{
                  components: {
                     Menu: {
                        darkItemBg: '#2B3743',
                        darkItemSelectedBg: '#445161',
                        darkItemHoverBg: '#3A4755',
                     },
                  },
               }}
            >
               <Menu
                  theme="dark"
                  mode="inline"
                  selectedKeys={[location.pathname]}
                  items={getMenuItems()}
                  onClick={({ key }) => navigate(key)}
                  style={{ borderRight: 0 }}
               />
            </ConfigProvider>
         </Sider>

         <AntLayout>
            <Header
               style={{
                  background: '#384858',
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
                  <Title level={1} style={{ 
                     margin: '4px 0 0', 
                     fontSize: '48px', 
                     fontWeight: 800,
                     color: '#E0E8FF',
                     letterSpacing: '1px'
                  }}>
                     {user ? `Добро пожаловать, ${user.username}!` : 'Зарегистрируйся'}
                  </Title>
                  <Title level={2} style={{ 
                     margin: '4px 0 0', 
                     fontSize: '24px', 
                     fontWeight: 400, 
                     color: '#E0E8FF',
                     letterSpacing: '1px'
                  }}>
                     раскрой свой потенциал
                  </Title>
               </div>

               <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {!user ? (
                     <>
                        <Button
                           className="header-auth-btn"
                           style={{ background: '#45a049', color: '#fff', border: 'none', borderRadius: '8px', width: '140px', fontWeight: 'bold' }}
                           onClick={() => setIsLoginModalOpen(true)}
                        >
                           Вход
                        </Button>
                        <Button
                           className="header-reg-btn"
                           style={{ background: '#599996', color: '#fff', border: 'none', borderRadius: '8px', width: '140px', fontWeight: 'bold' }}
                           onClick={() => setIsRegisterModalOpen(true)}
                        >
                           Регистрация
                        </Button>
                     </>
                  ) : (
                     <>
                        <Link to="/my-profile">
                           <Avatar 
                              icon={<UserOutlined />} 
                              style={{ 
                                 backgroundColor: '#3D8086',
                                 cursor: 'pointer',
                                 transition: 'opacity 0.2s',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                           />
                        </Link>
                        <Button 
                           icon={<LogoutOutlined />} 
                           onClick={handleLogout} 
                           type="text" 
                           style={{ color: '#fff', fontSize: '20px' }}
                        />
                     </>
                  )}
               </div>
            </Header>

            <Content
               className="custom-scroll"
               style={{
                  background: '#F1F2F6',
                  padding: '30px 40px',
                  overflowY: 'auto',
                  height: '100%',
               }}
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
               <Form.Item 
                  name="email" 
                  label="Email" 
                  rules={[{ required: true, message: 'Введите email' }, { type: 'email', message: 'Введите корректный email' }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item 
                  name="password" 
                  label="Пароль" 
                  rules={[{ required: true, message: 'Введите пароль' }]}
               >
                  <Input.Password />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" block style={{ background: '#4D8AF1' }}>
                     Войти
                  </Button>
               </Form.Item>
            </Form>
         </Modal>

         <RegisterModal
            open={isRegisterModalOpen}
            onCancel={() => setIsRegisterModalOpen(false)}
            onRegister={handleRegister}
         />
      </AntLayout>
   );
};

export default Layout;