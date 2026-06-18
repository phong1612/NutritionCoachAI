import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './components/router'
import { AuthContextProvider } from './context/AuthContext'

import App from './App';

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>

    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>

  </StrictMode>,
);
