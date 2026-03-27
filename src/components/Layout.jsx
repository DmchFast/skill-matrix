import { Layout as AntLayout, Menu, Typography } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = AntLayout;
const { Title } = Typography;

const Layout = () => {
   return (
      <AntLayout style={{ height: '100vh' }}>
         <Sider width={240} style={{ background: '#2B3743' }}>
            <div style={{ padding: '24px 20px', textAlign: 'center' }}>
               <Title level={3} style={{ color: '#fff', margin: 0 }}>SkillMatrix</Title>
            </div>
            <Menu
               theme="dark"
               mode="inline"
               defaultSelectedKeys={['1']}
               items={[
                  { key: '1', icon: <HomeOutlined />, label: 'Главная' },
                  { key: '2', icon: <UserOutlined />, label: 'Профиль' },
               ]}
            />
         </Sider>
         <AntLayout>
            <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
               <div>Шапка</div>
            </Header>
            <Content style={{ padding: '24px', background: '#F1F2F6', overflow: 'auto' }}>
               <div>Контент</div>
            </Content>
         </AntLayout>
      </AntLayout>
   );
};

export default Layout;