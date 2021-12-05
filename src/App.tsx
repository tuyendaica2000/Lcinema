import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import routes from './etc/route';
import { Navbar } from './components/Navbar/Navbar'
import { AnimatePresence } from "framer-motion"
import TopBarProgress from "react-topbar-progress-indicator";

 
TopBarProgress.config({
  barColors: {
    "0": "#e50914",
    "1.0": "#fa0a16"
  },
  shadowBlur: 5
});

function App() {
  const location = useLocation();

  return (
    <>
      <Suspense fallback={<TopBarProgress />}>
        <Navbar />
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            {routes.map((route) => {
              return <Route key={route.path} path={route.path} element={<route.components />} />
            })}
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default App;
