import React, { useEffect, useState } from 'react';
import { getGifts, createOrder } from '../services/api';
import GiftCard from '../components/GiftCard';
import Header from '../components/Header';
import { Container, Button, Title, Group, SimpleGrid } from '@mantine/core';

export default function HomePage({ user }) {
  const [gifts, setGifts] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(()=>{
    getGifts().then(res=>setGifts(res.data));
  },[]);

  const toggleGift = (giftId) => {
    if (selected.includes(giftId)) {
      setSelected(selected.filter(id => id!==giftId));
    } else {
      setSelected([...selected, giftId]);
    }
  }

  const order = async () => {
    if (!user) {
      alert('Сначала авторизуйтесь');
      return;
    }
    try {
      const res = await createOrder({userId: user.id, giftIds: selected});
      alert('Заказ создан! ID: ' + res.data.orderId + ' Итоговая цена: ' + res.data.totalPrice);
      setSelected([]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Header user={user}/>
      <Container mt="xl">
        <Title order={1} mb="xl">Персонализированная доставка подарков</Title>
        <Title order={3} mb="md">Выберите подарки:</Title>
        <SimpleGrid cols={3}>
          {gifts.map(g=>
            <GiftCard 
              key={g.id} 
              gift={g} 
              selected={selected.includes(g.id)} 
              onToggle={()=>toggleGift(g.id)} 
            />
          )}
        </SimpleGrid>
        <Group position="right" mt="xl">
          <Button onClick={order} disabled={selected.length===0}>Оформить заказ</Button>
        </Group>
      </Container>
    </>
  )
}
