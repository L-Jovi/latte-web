import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Card, Button } from './index.js';
function Demo() {
  const [count, setCount] = useState(0);
  return (
    <Card>
      <h1>One small component library</h1>
      <Button message={`Count: ${count}`} onClick={() => setCount(count + 1)} />
    </Card>
  );
}
createRoot(document.querySelector('#root')).render(<Demo />);
