import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import GlobalDotGrid from './components/animations/GlobalDotGrid';

export default function App() {
  return (
    <ThemeProvider>
      {/* Global Interactive 2D Canvas Dot Grid Animation */}
      <GlobalDotGrid />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
