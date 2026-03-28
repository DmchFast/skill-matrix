import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Space, message, Radio, Divider, InputNumber } from 'antd';
import { PlusOutlined, MinusCircleOutlined, RobotOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';

const { TextArea } = Input;

const CreateSkill = () => {
   const navigate = useNavigate();
   const { addSkill } = useContext(DataContext);
   const { user } = useContext(AuthContext);
   const [form] = Form.useForm();
   const [mode, setMode] = useState('manual');

   const handleManualSubmit = (values) => {
      // Валидация индексов правильных ответов
      let valid = true;
      values.questions.forEach((q, idx) => {
         const correct = parseInt(q.correct, 10);
         if (isNaN(correct) || correct < 0 || correct >= q.options.length) {
            valid = false;
            message.error(`Вопрос ${idx + 1}: индекс правильного ответа должен быть от 0 до ${q.options.length - 1}`);
         }
      });
      if (!valid) return;

      const newSkill = {
         id: Date.now(),
         title: values.title,
         description: values.description,
         authorId: user.id,
         createdAt: new Date().toISOString(),
         views: 0,
         maxAttempts: values.maxAttempts || 1,
         questions: values.questions.map((q, idx) => ({
            id: idx + 1,
            text: q.text,
            options: q.options,
            correct: parseInt(q.correct, 10),
         })),
         attempts: [],
      };
      addSkill(newSkill);
      message.success('Навык успешно создан!');
      navigate('/');
   };

   const handleAISubmit = (values) => {

      message.info('Режим ИИ будет добавлен позже');
   };

   const onFinish = (values) => {
      if (mode === 'manual') {
         handleManualSubmit(values);
      } else {
         handleAISubmit(values);
      }
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

               <Form.Item label="Режим создания" required>
                  <Radio.Group value={mode} onChange={e => setMode(e.target.value)}>
                     <Radio.Button value="manual">Ручной</Radio.Button>
                     <Radio.Button value="ai">
                        <RobotOutlined /> С помощью ИИ
                     </Radio.Button>
                  </Radio.Group>
               </Form.Item>

               {mode === 'manual' && (
                  <>
                     <Divider>Вопросы и ответы</Divider>
                     <Form.List name="questions">
                        {(fields, { add, remove }) => (
                           <>
                              {fields.map(({ key, name, ...restField }) => (
                                 <Card
                                    key={key}
                                    style={{ marginBottom: 16 }}
                                    size="small"
                                    title={`Вопрос ${name + 1}`}
                                    extra={
                                       <Button type="link" danger onClick={() => remove(name)} icon={<MinusCircleOutlined />}>
                                          Удалить
                                       </Button>
                                    }
                                 >
                                    <Form.Item
                                       {...restField}
                                       name={[name, 'text']}
                                       label="Текст вопроса"
                                       rules={[{ required: true, message: 'Введите текст вопроса' }]}
                                    >
                                       <Input />
                                    </Form.Item>

                                    <Form.List name={[name, 'options']}>
                                       {(optFields, { add: addOpt, remove: removeOpt }) => (
                                          <>
                                             {optFields.map(({ key: optKey, name: optName, ...optRest }) => (
                                                <Space key={optKey} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                   <Form.Item
                                                      {...optRest}
                                                      name={[optName]}
                                                      rules={[{ required: true, message: 'Введите вариант ответа' }]}
                                                   >
                                                      <Input placeholder={`Вариант ${optName + 1}`} />
                                                   </Form.Item>
                                                   <Button type="link" danger onClick={() => removeOpt(optName)} icon={<MinusCircleOutlined />} />
                                                </Space>
                                             ))}
                                             <Button type="dashed" onClick={() => addOpt()} icon={<PlusOutlined />} block>
                                                Добавить вариант ответа
                                             </Button>
                                          </>
                                       )}
                                    </Form.List>

                                    <Form.Item
                                       {...restField}
                                       name={[name, 'correct']}
                                       label="Правильный вариант (индекс, начиная с 0)"
                                       rules={[
                                          { required: true, message: 'Введите индекс правильного ответа' },
                                          { pattern: /^\d+$/, message: 'Введите число' }
                                       ]}
                                       extra="Индекс должен быть от 0 до (количество вариантов - 1)"
                                    >
                                       <Input />
                                    </Form.Item>
                                 </Card>
                              ))}
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                 Добавить вопрос
                              </Button>
                           </>
                        )}
                     </Form.List>
                  </>
               )}

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