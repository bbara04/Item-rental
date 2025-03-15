// App.tsx
import React from 'react';
import router from './router';
import { RouterProvider } from 'react-router-dom';

const App: React.FC = () => (
  <>
    <RouterProvider router={router} />
  </>
);

export default App;
