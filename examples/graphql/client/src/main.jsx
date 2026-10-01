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
const root = createRoot(document.getElementById('root'));
root.render(<Root />);
// The page can switch language (assets/language.js). Rendering the same tree
// again keeps the session and the cache; only the words change.
document.addEventListener('languagechange', () => root.render(<Root />));
