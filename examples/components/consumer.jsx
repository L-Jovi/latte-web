import React from 'react';
import { createRoot } from 'react-dom/client';
import { Card, Button } from './dist/babel/index.js';
createRoot(document.querySelector('#root')).render(
  <Card>
    <h1>Built Babel consumer</h1>
    <Button message="Babel package loaded" />
  </Card>,
);
