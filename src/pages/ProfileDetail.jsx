import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProfileDetail = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   return (
      <div>
         <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
            Назад
         </Button>
         <Card style={{ borderRadius: 16 }}>
            <Title level={2}>Профиль пользователя ID: {id}</Title>
            <div>...</div>
         </Card>
      </div>
   );
};

export default ProfileDetail;