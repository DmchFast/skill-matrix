import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const Home = () => {
   return (
      <>
         <Title level={3} style={{ color: '#2B3743', marginTop: 0, marginBottom: '24px' }}>
            Библиотека навыков
         </Title>
         <Card style={{ borderRadius: 16 }}>
            <Text>...</Text>
         </Card>
      </>
   );
};

export default Home;