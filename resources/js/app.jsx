import './bootstrap';
import 'flowbite';

import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './AppRoutes';
createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx')
    return pages[`./Pages/${name}.jsx`]()
  },
  setup({ el, App, props }) {
    createRoot(el).render(
        <App {...props} />
    )
  },
  title: title => `ParkIT - ${title}`,
})

