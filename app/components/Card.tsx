import React from 'react';
import { useColorScheme } from 'react-native';
import { Card } from '@rneui/themed';

export const CustomCard = ({ title, children }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      {children}
    </Card>
  );
};
