// frontend/src/components/GiftCard.js
import React from 'react';
import { Card, Text, Group, Checkbox } from '@mantine/core';

export default function GiftCard({ gift, selected, onToggle }) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: 250, margin: '1rem' }}>
      <Group position="apart" mb="md">
        <Text weight={500}>{gift.name}</Text>
        <Checkbox checked={selected} onChange={onToggle} />
      </Group>
      <Text size="sm" color="dimmed">
        Категория: {gift.category}<br/>
        Цена: {gift.price}$
      </Text>
      <Text size="sm" mt="xs">{gift.description}</Text>
    </Card>
  );
}
