import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Radio, Typography, message, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const TakeTest = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { skills, updateSkill } = useContext(DataContext);
   const { user } = useContext(AuthContext);
   const skill = skills.find(s => s.id === parseInt(id));

   const [answers, setAnswers] = useState({});
   const [submitted, setSubmitted] = useState(false);
   const [score, setScore] = useState(0);

   if (!skill) return <div>Навык не найден</div>;

   // Проверка лимита попыток
   const userAttempts = skill.attempts.filter(a => a.userId === user?.id).length;
   const maxAttempts = skill.maxAttempts || 1;
   if (userAttempts >= maxAttempts && !submitted) {
      return (
         <div>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>Назад</Button>
            <Card style={{ borderRadius: 16, textAlign: 'center' }}>
               <Title level={3}>Лимит попыток исчерпан</Title>
               <Text>Вы использовали все {maxAttempts} попыток для этого теста.</Text>
               <div style={{ marginTop: 24 }}>
                  <Button type="primary" onClick={() => navigate(`/skills/${skill.id}`)}>
                     Вернуться к навыку
                  </Button>
               </div>
            </Card>
         </div>
      );
   }

   const handleAnswerChange = (questionId, value) => {
      setAnswers({ ...answers, [questionId]: value });
   };

   const handleSubmit = () => {
      const unanswered = skill.questions.filter((_, idx) => answers[idx] === undefined);
      if (unanswered.length > 0) {
         message.warning(`Ответьте на все вопросы (осталось ${unanswered.length})`);
         return;
      }

      let correct = 0;
      skill.questions.forEach((q, idx) => {
         if (answers[idx] === q.correct) correct++;
      });
      setScore(correct);
      setSubmitted(true);
      const newAttempt = {
         userId: user.id,
         score: correct,
         date: new Date().toISOString(),
      };
      updateSkill(skill.id, { attempts: [...skill.attempts, newAttempt] });
      message.success(`Тест завершён! Ваш результат: ${correct} из ${skill.questions.length}`);
   };

   if (submitted) {
      return (
         <div>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>Назад</Button>
            <Card style={{ borderRadius: 16, textAlign: 'center' }}>
               <Title level={3}>Результат теста</Title>
               <Text>Вы ответили правильно на {score} из {skill.questions.length} вопросов.</Text>
               <div style={{ marginTop: 24 }}>
                  <Button type="primary" onClick={() => navigate('/')}>
                     На главную
                  </Button>
               </div>
            </Card>
         </div>
      );
   }

   return (
      <div>
         <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>Назад</Button>
         <Title level={2}>Тест: {skill.title}</Title>
         <Card style={{ borderRadius: 16 }}>
            {skill.questions.map((q, idx) => (
               <div key={idx} style={{ marginBottom: 24 }}>
                  <Text strong>{idx + 1}. {q.text}</Text>
                  <Radio.Group
                     onChange={e => handleAnswerChange(idx, e.target.value)}
                     style={{ display: 'block', marginTop: 8 }}
                  >
                     <Space direction="vertical">
                        {q.options.map((opt, optIdx) => (
                           <Radio key={optIdx} value={optIdx}>{opt}</Radio>
                        ))}
                     </Space>
                  </Radio.Group>
               </div>
            ))}
            <Button type="primary" onClick={handleSubmit} style={{ background: '#45A049', border: 'none' }}>
               Завершить тест
            </Button>
         </Card>
      </div>
   );
};

export default TakeTest;