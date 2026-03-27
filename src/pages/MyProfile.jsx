import { Typography } from 'antd';

const { Title } = Typography;

const MyProfile = () => {
   return (
      <>
         <Title level={3} style={{ color: '#2B3743', marginBottom: 24 }}>
            Мой профиль
         </Title>
         <div>...</div>
      </>
   );
};

export default MyProfile;