import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Avatar, Typography, Button, List, Tag, Modal, message } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const ProfileDetail = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { users, skills, followUser, unfollowUser, deleteUser } = useContext(DataContext);
   const { user: currentUser, updateCurrentUser } = useContext(AuthContext);
   const profileUser = users.find(u => u.id === parseInt(id));

   const [isFollowed, setIsFollowed] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);

   useEffect(() => {
      if (currentUser && profileUser) {
         setIsFollowed(currentUser.following.includes(profileUser.id));
      }
   }, [currentUser, profileUser]);

   if (!profileUser) return <div>Пользователь не найден</div>;

   const handleFollow = () => {
      followUser(currentUser.id, profileUser.id);
      const updatedFollowing = [...currentUser.following, profileUser.id];
      updateCurrentUser({ following: updatedFollowing });
      setIsFollowed(true);
      message.success(`Вы подписались на ${profileUser.username}`);
   };

   const handleUnfollow = () => {
      unfollowUser(currentUser.id, profileUser.id);
      const updatedFollowing = currentUser.following.filter(id => id !== profileUser.id);
      updateCurrentUser({ following: updatedFollowing });
      setIsFollowed(false);
      message.info(`Вы отписались от ${profileUser.username}`);
   };

   const handleDeleteUser = () => {
      deleteUser(profileUser.id);
      message.success('Пользователь удалён');
      navigate('/profiles');
   };

   const handleTakeTest = (skill) => {
      const userAttempts = skill.attempts?.filter(a => a.userId === currentUser?.id).length || 0;
      const maxAttempts = skill.maxAttempts || 1;
      if (userAttempts >= maxAttempts) {
         message.warning(`Вы уже использовали все ${maxAttempts} попыток для этого теста`);
         return;
      }
      navigate(`/skills/${skill.id}/test`);
   };

   const isCurrentUser = currentUser?.id === profileUser.id;
   const isAdmin = currentUser?.role === 'admin';

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
               {!isCurrentUser && currentUser && (
                  isFollowed ? (
                     <Button  className="unfollow-btn" onClick={handleUnfollow}>Отписаться</Button>
                  ) : (
                     <Button type="primary" onClick={handleFollow} style={{ background: '#13A810' }}>
                        Подписаться
                     </Button>
                  )
               )}
               {isCurrentUser && (
                  <Button onClick={() => navigate('/edit-profile')}>Редактировать профиль</Button>
               )}
               {isAdmin && !isCurrentUser && (
                  <Button danger onClick={() => setIsModalOpen(true)} style={{ marginLeft: 16 }}>
                     Удалить пользователя
                  </Button>
               )}
            </div>
         </Card>

         <Card title="Пройденные компетенции" style={{ marginTop: 24, borderRadius: 16 }}>
            <List
               dataSource={completedSkills}
               renderItem={skill => {
                  const attempt = skill.attempts?.find(a => a.userId === profileUser.id);
                  return (
                     <List.Item
                        actions={[
                           currentUser && (
                              <Button type="link" onClick={() => handleTakeTest(skill)}>
                                 Пройти тест
                              </Button>
                           )
                        ]}
                     >
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
               locale={{ emptyText: 'Пользователь ещё не прошёл ни одного теста' }}
            />
         </Card>

         <Modal
            title="Подтверждение удаления"
            open={isModalOpen}
            onOk={handleDeleteUser}
            onCancel={() => setIsModalOpen(false)}
            okText="Удалить"
            cancelText="Отмена"
         >
            <p>Вы уверены, что хотите удалить пользователя "{profileUser.username}"? Это действие необратимо.</p>
         </Modal>
      </div>
   );
};

export default ProfileDetail;