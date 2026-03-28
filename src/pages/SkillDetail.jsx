import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Tag, List, Modal, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const SkillDetail = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { skills, users, deleteSkill } = useContext(DataContext);
   const { user } = useContext(AuthContext);
   const skill = skills.find(s => s.id === parseInt(id));
   const author = users.find(u => u.id === skill?.authorId);

   const [isModalOpen, setIsModalOpen] = useState(false);

   if (!skill) return <div>Навык не найден</div>;

   const handleDelete = () => {
      deleteSkill(skill.id);
      message.success('Навык удалён');
      navigate('/');
   };

   const handleStartTest = () => {
      const userAttempts = skill.attempts.filter(a => a.userId === user?.id).length;
      const maxAttempts = skill.maxAttempts || 1;
      if (userAttempts >= maxAttempts) {
         message.warning(`Вы уже использовали все ${maxAttempts} попыток для этого теста`);
         return;
      }
      navigate(`/skills/${skill.id}/test`);
   };

   const isAdmin = user?.role === 'admin';
   const userAttempts = skill.attempts.filter(a => a.userId === user?.id).length;
   const maxAttempts = skill.maxAttempts || 1;
   const remainingAttempts = maxAttempts - userAttempts;

   return (
      <div>
         <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>Назад</Button>
         <Card style={{ borderRadius: 16, marginBottom: 24 }}>
            <Title level={2}>{skill.title}</Title>
            <Text type="secondary">
               Автор: {author ? author.username : `ID ${skill.authorId}`}
            </Text>
            <div style={{ marginTop: 16 }}>
               <Text>{skill.description}</Text>
            </div>
            <div style={{ marginTop: 16 }}>
               <Tag color="blue">Просмотров: {skill.views}</Tag>
               <Tag color="green">Дата создания: {new Date(skill.createdAt).toLocaleDateString()}</Tag>
               <Tag color="orange">Максимум попыток: {maxAttempts}</Tag>
            </div>
            {user && (
               <div style={{ marginTop: 8 }}>
                  <Tag color={remainingAttempts > 0 ? 'green' : 'red'}>
                     Осталось попыток: {remainingAttempts}
                  </Tag>
               </div>
            )}
            <div style={{ marginTop: 24 }}>
               {user && (
                  <Button 
                     type="primary" 
                     onClick={handleStartTest} 
                     style={{ background: '#45A049', border: 'none' }}
                     disabled={remainingAttempts <= 0}
                  >
                     Пройти тест
                  </Button>
               )}
               {isAdmin && (
                  <Button danger onClick={() => setIsModalOpen(true)} style={{ marginLeft: 16 }}>
                     Удалить навык
                  </Button>
               )}
            </div>
         </Card>

         <Card title="Попытки прохождения" style={{ borderRadius: 16 }}>
            <List
               dataSource={skill.attempts}
               renderItem={attempt => {
                  const attemptUser = users.find(u => u.id === attempt.userId);
                  return (
                     <List.Item>
                        <Text>Пользователь: {attemptUser ? attemptUser.username : `ID ${attempt.userId}`}</Text>
                        <Text style={{ marginLeft: 16 }}>Результат: {attempt.score} / {skill.questions.length}</Text>
                        <Text style={{ marginLeft: 16 }}>Дата: {new Date(attempt.date).toLocaleDateString()}</Text>
                     </List.Item>
                  );
               }}
               locale={{ emptyText: 'Пока никто не проходил этот тест' }}
            />
         </Card>

         <Modal
            title="Подтверждение удаления"
            open={isModalOpen}
            onOk={handleDelete}
            onCancel={() => setIsModalOpen(false)}
            okText="Удалить"
            cancelText="Отмена"
         >
            <p>Вы уверены, что хотите удалить навык "{skill.title}"? Это действие необратимо.</p>
         </Modal>
      </div>
   );
};

export default SkillDetail;