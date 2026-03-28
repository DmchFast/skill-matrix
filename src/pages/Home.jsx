import { useContext } from 'react';
import { Row, Col, Card, Button, Typography, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';

const { Title, Text } = Typography;

const Home = () => {
   const { skills } = useContext(DataContext);

   return (
      <>
         <Title level={3} style={{ color: '#2B3743', marginTop: 0, marginBottom: '24px' }}>
            Библиотека навыков
         </Title>
         {skills.length === 0 ? (
            <Card style={{ borderRadius: 16, textAlign: 'center' }}>
               <Text>Навыков нет</Text>
            </Card>
         ) : (
            <Row gutter={[24, 24]}>
               {skills.map(skill => (
                  <Col xs={24} sm={12} md={8} xl={8} key={skill.id}>
                     <Card
                        hoverable
                        bordered={false}
                        className="skill-card"
                        style={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                     >
                        <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                           {skill.title}
                        </div>
                        <div className="skill-description" style={{ color: '#595959', fontSize: '13px', margin: '8px 0 12px 0' }}>
                           {skill.description}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <Tag color="blue">Просмотров: {skill.views}</Tag>
                           <Link to={`/skills/${skill.id}`}>
                              <Button
                                 size="small"
                                 style={{
                                    background: '#45A049',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '0 16px',
                                    fontWeight: '500',
                                 }}
                              >
                                 Подробнее
                              </Button>
                           </Link>
                        </div>
                     </Card>
                  </Col>
               ))}
            </Row>
         )}
      </>
   );
};

export default Home;