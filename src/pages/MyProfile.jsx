import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Typography, Button, List, Tag } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const MyProfile = () => {
   const navigate = useNavigate();
   const { users, skills } = useContext(DataContext);
   const { user: authUser } = useContext(AuthContext);
   const profileUser = users.find(u => u.id === authUser?.id);

   if (!profileUser) return <div>Профиль не найден</div>;

   // Пройденные навыки или поытки
   const completedSkills = skills.filter(skill =>
      skill.attempts?.some(attempt => attempt.userId === profileUser.id)
   );

   return (
      <div>
         <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
            Назад
         </Button>
         <Card style={{ borderRadius: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
               <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: '#4D8AF1' }} />
               <div>
                  <Title level={2} style={{ margin: 0 }}>{profileUser.username}</Title>
                  <Text type="secondary">Дата регистрации: {new Date(profileUser.createdAt).toLocaleDateString()}</Text>
                  <div style={{ marginTop: 8 }}>
                     <Text>Подписчиков: {profileUser.followers.length}</Text>
                     <Text style={{ marginLeft: 16 }}>Подписок: {profileUser.following.length}</Text>
                  </div>
                  <div style={{ marginTop: 8 }}>
                     <Text>{profileUser.bio || 'Нет описания'}</Text>
                  </div>
               </div>
            </div>
            <div style={{ marginTop: 24 }}>
               <Button type="primary" onClick={() => navigate('/edit-profile')} style={{ background: '#4D8AF1' }}>
                  Редактировать профиль
               </Button>
            </div>
         </Card>

         <Card title="Мои пройденные компетенции" style={{ marginTop: 24, borderRadius: 16 }}>
            <List
               dataSource={completedSkills}
               renderItem={skill => {
                  const attempt = skill.attempts?.find(a => a.userId === profileUser.id);
                  return (
                     <List.Item>
                        <div>
                           <Text strong>{skill.title}</Text>
                           {attempt && (
                              <div>
                                 <Tag color="green">Пройдено: {attempt.score}/{skill.questions.length}</Tag>
                                 <Text type="secondary" style={{ marginLeft: 8 }}>Дата: {new Date(attempt.date).toLocaleDateString()}</Text>
                              </div>
                           )}
                        </div>
                     </List.Item>
                  );
               }}
               locale={{ emptyText: 'Вы ещё не прошли ни одного теста' }}
            />
         </Card>
      </div>
   );
};

export default MyProfile;