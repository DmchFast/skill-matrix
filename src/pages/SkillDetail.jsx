import { useParams } from 'react-router-dom';
import { Card, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const placeholderSkills = {
   1: { title: 'React Basics', description: 'Изучите основы React: компоненты, состояние, хуки.' },
   2: { title: 'UI/UX Fundamentals', description: 'Основы проектирования пользовательских интерфейсов.' },
   3: { title: 'TypeScript для начинающих', description: 'Изучите строгую типизацию в JavaScript.' },
};

const SkillDetail = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const skill = placeholderSkills[id];

   if (!skill) {
      return <div>Навык не найден</div>;
   }

   return (
      <div>
         <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
            Назад
         </Button>
         <Card style={{ borderRadius: 16 }}>
            <Title level={2}>{skill.title}</Title>
            <Text>{skill.description}</Text>
            <div style={{ marginTop: 24 }}>
               <Button type="primary" style={{ background: '#45A049', border: 'none' }}>
                  Пройти тест (скоро)
               </Button>
            </div>
         </Card>
      </div>
   );
};

export default SkillDetail;