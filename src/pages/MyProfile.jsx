import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { AuthContext } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const MyProfile = () => {
   const navigate = useNavigate();
   const { user } = useContext(AuthContext);

   if (!user) return <div>Профиль не найден</div>;

   return (
      <div>
         <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
            Назад
         </Button>
         <Card style={{ borderRadius: 16 }}>
            <Title level={2}>{user.username}</Title>
            <Text>Дата регистрации: {new Date(user.createdAt).toLocaleDateString()}</Text>
            <div style={{ marginTop: 8 }}>
               <Text>{user.bio || 'Нет описания'}</Text>
            </div>
            <div style={{ marginTop: 24 }}>
               <Button type="primary" onClick={() => navigate('/edit-profile')} style={{ background: '#4D8AF1' }}>
                  Редактировать профиль
               </Button>
            </div>
         </Card>
      </div>
   );
};

export default MyProfile;