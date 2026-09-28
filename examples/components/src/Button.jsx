import React from 'react';
export default function Button({ message = 'Hello world', ...props }) {
  return (
    <button type="button" {...props}>
      {message}
    </button>
  );
}
