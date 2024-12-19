import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { Container, Paper, TextInput, Button, Title, Stack } from '@mantine/core';
import Header from '../components/Header';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({name:'', email:'', password:''});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isRegister) {
        res = await registerUser(form);
      } else {
        res = await loginUser({email: form.email, password: form.password});
      }
      onLogin(res.data);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.response?.data?.error);
    }
  }

  return (
    <>
      <Header user={null}/>
      <Container size="xs" mt="xl">
        <Paper withBorder shadow="md" p="lg" radius="md">
          <Title order={2} mb="md">
            {isRegister ? 'Регистрация' : 'Вход'}
          </Title>
          <form onSubmit={handleSubmit}>
            <Stack spacing="md">
              {isRegister && (
                <TextInput 
                  label="Имя" 
                  value={form.name} 
                  onChange={e=>setForm({...form,name:e.target.value})} 
                  required
                />
              )}
              <TextInput 
                label="Email" 
                value={form.email} 
                onChange={e=>setForm({...form,email:e.target.value})} 
                type="email"
                required
              />
              <TextInput 
                label="Пароль" 
                type="password" 
                value={form.password} 
                onChange={e=>setForm({...form,password:e.target.value})} 
                required
              />
              <Button type="submit">
                {isRegister?'Зарегистрироваться':'Войти'}
              </Button>
            </Stack>
          </form>
          <Button variant="subtle" mt="md" onClick={()=>setIsRegister(!isRegister)}>
            {isRegister?'У меня есть аккаунт':'У меня нет аккаунта'}
          </Button>
        </Paper>
      </Container>
    </>
  );
}
