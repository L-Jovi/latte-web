import React from 'react';
import { Card, Button } from './index.js';
export default { title: 'Learning/Card and Button', component: Button };
export const CounterButton = { args: { message: 'Click me' } };
export const InCard = {
  render: () => (
    <Card>
      <Button message="A button in a card" />
    </Card>
  ),
};
