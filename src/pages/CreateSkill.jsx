import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, InputNumber, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const CreateSkill = () => {
   const navigate = useNavigate();
   const [form] = Form.useForm();

   const onFinish = (values) => {
      // Отчёт об выполнении
      console.log('Создание навыка:', values);
      message.info('Функция создания будет добавлена позже');
   };

   return (
      <div>
         <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
            Назад
         </Button>
         <Card title="Создание нового навыка" style={{ borderRadius: 16 }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
               <Form.Item name="title" label="Название навыка" rules={[{ required: true, message: 'Введите название навыка' }]}>
                  <Input />
               </Form.Item>
               <Form.Item name="description" label="Описание" rules={[{ required: true, message: 'Введите описание навыка' }]}>
                  <TextArea rows={3} />
               </Form.Item>

               <Form.Item name="maxAttempts" label="Максимум попыток" initialValue={1}>
                  <InputNumber min={1} max={10} style={{ width: '100%' }} />
               </Form.Item>

               <Form.Item style={{ marginTop: 24 }}>
                  <Button type="primary" htmlType="submit" style={{ background: '#45A049', border: 'none' }}>
                     Создать навык
                  </Button>
               </Form.Item>
            </Form>
         </Card>
      </div>
   );
};

export default CreateSkill;