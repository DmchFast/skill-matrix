import { Modal, Form, Input, Button, Divider, Typography, message } from 'antd';
import GoogleIcon from '../../assets/Google.svg';
import YandexIcon from '../../assets/Yandex.svg';
import GithubIcon from '../../assets/Github.svg';

const { Title, Text } = Typography;

const RegisterModal = ({ open, onCancel, onRegister }) => {
   const [form] = Form.useForm();

   const handleFinish = async (values) => {
      const success = await onRegister(values.username, values.email, values.password);
      if (success) {
         form.resetFields();
         onCancel(); // закрыть модалку
      }
   };

   return (
      <Modal
         open={open}
         onCancel={onCancel}
         footer={null}
         centered
         width={440}
         bodyStyle={{ padding: '24px' }}
      >
         <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
            Создать учетную запись
         </Title>

         <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            requiredMark={false}
         >
            <Form.Item
               name="username"
               label="Введите своё имя для регистрации"
               rules={[{ required: true, message: 'Введите имя' }]}
            >
               <Input placeholder="User" />
            </Form.Item>

            <Form.Item
               name="email"
               label="Введите свою электронную почту для регистрации"
               rules={[
                  { required: true, message: 'Введите email' },
                  { type: 'email', message: 'Введите корректный email' },
               ]}
            >
               <Input placeholder="email@mail.ru" />
            </Form.Item>

            <Form.Item
               name="password"
               label="Введите свой пароль для регистрации"
               rules={[
                  { required: true, message: 'Введите пароль' },
                  { min: 6, message: 'Пароль должен содержать не менее 6 символов' },
               ]}
            >
               <Input.Password placeholder="••••••" />
            </Form.Item>

            <Button
               type="primary"
               htmlType="submit"
               block
               style={{
                  background: '#4A8084',
                  borderColor: '#4A8084',
                  borderRadius: 8,
                  fontWeight: 500,
                  marginBottom: 16,
               }}
            >
               Регистрация по электронной почте
            </Button>
         </Form>

         <Divider style={{ margin: '16px 0', color: '#8c8c8c' }}>или продолжить с</Divider>

         <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <Button
               className='img-icon'
               shape="circle"
               size="large"
               style={{ backgroundColor: '#f5f5f5', border: 'none' }}
               onClick={() => message.info('Регистрация через Google временно не доступна')}
            >
               <img src={GoogleIcon} alt="Google" style={{ width: 20, height: 20 }} />
            </Button>

            <Button
               className='img-icon'
               shape="circle"
               size="large"
               style={{ backgroundColor: '#f5f5f5', border: 'none', fontSize: 18 }}
               onClick={() => message.info('Регистрация через Яндекс временно не доступна')}
            >
               <img src={YandexIcon} alt="Яндекс" style={{ width: 20, height: 20 }} />
            </Button>
            <Button
               className='img-icon'
               shape="circle"
               size="large"
               style={{ backgroundColor: '#f5f5f5', border: 'none' }}
               onClick={() => message.info('Регистрация через GitHub временно не доступна')}
            >
               <img src={GithubIcon} alt="GitHub" style={{ width: 20, height: 20 }} />
            </Button>
         </div>

         <Text
            style={{
               display: 'block',
               textAlign: 'center',
               fontSize: 12,
               color: '#8c8c8c',
            }}
         >
            Нажав продолжить, вы соглашаетесь с нашими{' '}
            <a href="#" style={{ textDecoration: 'underline', color: '#4A8084' }}>
               Условиями предоставления услуг
            </a>{' '}
            и{' '}
            <a href="#" style={{ textDecoration: 'underline', color: '#4A8084' }}>
               Политикой конфиденциальности
            </a>.
         </Text>
      </Modal>
   );
};

export default RegisterModal;