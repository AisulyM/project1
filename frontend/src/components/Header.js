
import React from 'react';
import { Group, Button, Text, Paper } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Header({ user }) {
  return (
    <Paper shadow="sm" p="xs" radius={0} style={{ marginBottom: '1rem' }}>
      <Group position="apart" align="center" style={{ height: '100%' }}>
        <Text weight={700} size="lg">Gift Delivery</Text>
        <Group>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="subtle">Главная</Button>
          </Link>
          {user ? (
            <>
              <Link to="/account" style={{ textDecoration: 'none' }}>
                <Button variant="subtle">Мой кабинет</Button>
              </Link>
              <Text weight={500} size="sm">{user.name}</Text>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="outline">Войти</Button>
            </Link>
          )}
        </Group>
      </Group>
    </Paper>
  );
}
