import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { AuthContext } from '../contexts/AuthContext';

const { TextArea } = Input;

const EditProfile = () => {
   const navigate = useNavigate();
   const { user, updateCurrentUser } = useContext(AuthContext);
   const [form] = Form.useForm();

   const onFinish = (values) => {
      updateCurrentUser({ username: values.username, bio: values.bio });
      message.success('Профиль обновлён');
      navigate('/my-profile');
   };

   if (!user) return <div>Не авторизован</div>;

   return (
      <div>
         <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
            Назад
         </Button>
         <Card title="Редактирование профиля" style={{ borderRadius: 16 }}>
            <Form
               form={form}
               layout="vertical"
               initialValues={{ username: user.username, bio: user.bio }}
               onFinish={onFinish}
            >
               <Form.Item name="username" label="Имя пользователя" rules={[{ required: true }]}>
                  <Input />
               </Form.Item>
               <Form.Item name="bio" label="О себе">
                  <TextArea rows={4} />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ background: '#4D8AF1' }}>
                     Сохранить изменения
                  </Button>
               </Form.Item>
            </Form>
         </Card>
      </div>
   );
};

export default EditProfile;