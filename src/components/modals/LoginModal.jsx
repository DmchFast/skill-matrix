import { Modal, Form, Input, Button, Divider, Typography, message } from 'antd';
import GoogleIcon from '../../assets/Google.svg';
import YandexIcon from '../../assets/Yandex.svg';
import GithubIcon from '../../assets/Github.svg';

const { Title, Text } = Typography;

const LoginModal = ({ open, onCancel, onLogin }) => {
   const [form] = Form.useForm();

   const handleFinish = async (values) => {
      const success = await onLogin(values.email, values.password);
      if (success) {
         form.resetFields();
         onCancel();
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
            Вход в учетную запись
         </Title>

         <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            requiredMark={false}
         >
            <Form.Item
               name="email"
               label="Введите свою электронную почту для входа"
               rules={[
                  { required: true, message: 'Введите email' },
                  { type: 'email', message: 'Введите корректный email' },
               ]}
            >
               <Input placeholder="email@mail.ru" />
            </Form.Item>

            <Form.Item
               name="password"
               label="Введите свой пароль для входа"
               rules={[{ required: true, message: 'Введите пароль' }]}
            >
               <Input.Password placeholder="••••••" />
            </Form.Item>

            <Button
               type="primary"
               htmlType="submit"
               block
               style={{
                  background: '#417e84',
                  borderColor: '#417e84',
                  borderRadius: 8,
                  fontWeight: 500,
                  marginBottom: 16,
               }}
            >
               Войти
            </Button>
         </Form>

         <Divider style={{ margin: '16px 0', color: '#8c8c8c' }}>или продолжить с</Divider>

         <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            <Button
               className='img-icon'
               shape="circle"
               size="large"
               style={{ backgroundColor: '#f5f5f5', border: 'none', padding: 0 }}
               onClick={() => message.info('Регистрация через Google временно не доступна')}
            >
               <img src={GoogleIcon} alt="Google" style={{ width: 20, height: 20 }} />
            </Button>
            <Button
               className='img-icon'
               shape="circle"
               size="large"
               style={{ backgroundColor: '#f5f5f5', border: 'none', padding: 0 }}
               onClick={() => message.info('Регистрация через Яндекс временно не доступна')}
            >
               <img src={YandexIcon} alt="Яндекс" style={{ width: 20, height: 20 }} />
            </Button>
            <Button
               className='img-icon'
               shape="circle"
               size="large"
               style={{ backgroundColor: '#f5f5f5', border: 'none', padding: 0 }}
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
            <a href="#" style={{ textDecoration: 'underline', color: '#417e84' }}>
               Условиями предоставления услуг
            </a>{' '}
            и{' '}
            <a href="#" style={{ textDecoration: 'underline', color: '#417e84' }}>
               Политикой конфиденциальности
            </a>.
         </Text>
      </Modal>
   );
};

export default LoginModal;