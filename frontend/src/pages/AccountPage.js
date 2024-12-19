import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Container, Title, Table, Text } from '@mantine/core';

export default function AccountPage({ user }) {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate('/login');
      return;
    }
    getUserOrders(user.id).then(res=>setOrders(res.data));
  },[user, navigate]);

  if (!user) return null;

  return (
    <>
      <Header user={user}/>
      <Container mt="xl">
        <Title order={2}>Личный кабинет: {user.name}</Title>
        <Link to="/">На главную</Link>
        <Title order={3} mt="xl">Мои заказы:</Title>
        {orders.length === 0 ? (
          <Text>Заказов нет</Text>
        ) : (
          <Table highlightOnHover withBorder mt="md">
            <thead>
              <tr>
                <th>ID</th>
                <th>Цена</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o=>
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.totalPrice}</td>
                  <td>{o.status}</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
