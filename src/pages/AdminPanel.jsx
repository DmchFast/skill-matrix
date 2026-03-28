import { useContext, useState } from 'react';
import { Tabs, Table, Button, Modal, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';

const AdminPanel = () => {
   const navigate = useNavigate();
   const { skills, users, deleteSkill, deleteUser } = useContext(DataContext);
   const { user: currentUser } = useContext(AuthContext);
   const [selectedSkillId, setSelectedSkillId] = useState(null);
   const [selectedUserId, setSelectedUserId] = useState(null);
   const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
   const [isUserModalOpen, setIsUserModalOpen] = useState(false);

   const skillColumns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Название', dataIndex: 'title', key: 'title' },
      { title: 'Описание', dataIndex: 'description', key: 'description' },
      { title: 'Автор ID', dataIndex: 'authorId', key: 'authorId' },
      {
         title: 'Действие',
         key: 'action',
         render: (_, record) => (
            <Button danger onClick={() => { setSelectedSkillId(record.id); setIsSkillModalOpen(true); }}>
               Удалить
            </Button>
         ),
      },
   ];

   const userColumns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Имя', dataIndex: 'username', key: 'username' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Роль', dataIndex: 'role', key: 'role' },
      {
         title: 'Действие',
         key: 'action',
         render: (_, record) => (
            <Button danger disabled={record.id === currentUser?.id} onClick={() => { setSelectedUserId(record.id); setIsUserModalOpen(true); }}>
               Удалить
            </Button>
         ),
      },
   ];

   const handleDeleteSkill = () => {
      deleteSkill(selectedSkillId);
      message.success('Навык удалён');
      setIsSkillModalOpen(false);
   };

   const handleDeleteUser = () => {
      deleteUser(selectedUserId);
      message.success('Пользователь удалён');
      setIsUserModalOpen(false);
   };

   return (
      <div>
         <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>Назад</Button>
         <h2>Панель администратора</h2>
         <Tabs
            items={[
               {
                  key: 'skills',
                  label: 'Навыки',
                  children: <Table dataSource={skills} columns={skillColumns} rowKey="id" />,
               },
               {
                  key: 'users',
                  label: 'Пользователи',
                  children: <Table dataSource={users} columns={userColumns} rowKey="id" />,
               },
            ]}
         />

         <Modal
            title="Удаление навыка"
            open={isSkillModalOpen}
            onOk={handleDeleteSkill}
            onCancel={() => setIsSkillModalOpen(false)}
            okText="Удалить"
            cancelText="Отмена"
         >
            <p>Вы уверены, что хотите удалить этот навык?</p>
         </Modal>

         <Modal
            title="Удаление пользователя"
            open={isUserModalOpen}
            onOk={handleDeleteUser}
            onCancel={() => setIsUserModalOpen(false)}
            okText="Удалить"
            cancelText="Отмена"
         >
            <p>Вы уверены, что хотите удалить этого пользователя? Это действие необратимо.</p>
         </Modal>
      </div>
   );
};

export default AdminPanel;