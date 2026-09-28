import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { createFeedClient } from './client.js';
import { App } from './App.jsx';
import './style.css';
function Root() {
  const [session, setSession] = useState(null);
  const transport = useMemo(
    () => createFeedClient(session?.token),
    [session?.token],
  );
  useEffect(
    () => () => {
      transport.close();
      transport.client.stop();
    },
    [transport],
  );
  return (
    <ApolloProvider client={transport.client}>
      <App
        key={session?.token || 'guest'}
        session={session}
        onSession={setSession}
      />
    </ApolloProvider>
  );
}
createRoot(document.getElementById('root')).render(<Root />);
