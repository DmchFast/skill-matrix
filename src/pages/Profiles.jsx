import { useContext, useState } from 'react';
import { Row, Col, Card, Input, Typography, Avatar, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Title, Text } = Typography;

const Profiles = () => {
   const navigate = useNavigate();
   const { users } = useContext(DataContext);
   const { user: currentUser } = useContext(AuthContext);
   const [searchTerm, setSearchTerm] = useState('');

   // Исключение текущего пользователя из списка
   const filteredUsers = users
      .filter(u => u.id !== currentUser?.id)
      .filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()));

   return (
      <>
         <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>Назад</Button>
            <Title level={3} style={{ color: '#2B3743', margin: 0 }}>Пользователи</Title>
         </div>
         <Search
            placeholder="Поиск по имени"
            onChange={e => setSearchTerm(e.target.value)}
            style={{ marginBottom: 24, maxWidth: 400 }}
         />
         <Row gutter={[24, 24]}>
            {filteredUsers.map(u => (
               <Col xs={24} sm={12} md={8} lg={6} key={u.id}>
                  <Card
                     hoverable
                     className="user-card"
                     style={{ borderRadius: 16 }}
                     cover={
                        <Avatar
                           size={80}
                           icon={<UserOutlined />}
                           style={{
                              margin: '24px auto 0',
                              backgroundColor: '#4D8AF1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                           }}
                        />
                     }
                  >
                     <div style={{ textAlign: 'center' }}>
                        <Title level={4} style={{ margin: '12px 0 0' }}>{u.username}</Title>
                        <Text type="secondary" className="user-bio">{u.bio || 'Нет описания'}</Text>
                        <div style={{ marginTop: 12 }}>
                           <Text>Подписчиков: {u.followers.length}</Text>
                        </div>
                        <Link to={`/profiles/${u.id}`}>
                           <Button style={{ marginTop: 16 }}>Посмотреть профиль</Button>
                        </Link>
                     </div>
                  </Card>
               </Col>
            ))}
         </Row>
      </>
   );
};

export default Profiles;