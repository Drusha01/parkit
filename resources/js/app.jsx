import './bootstrap';
import 'flowbite';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <BrowserRouter>
        <App {...props} />
      </BrowserRouter>
    )
  },
})

