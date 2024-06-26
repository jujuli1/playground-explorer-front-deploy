// import components
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SiteRoutes from '../Routes/Routes';

function App() {
  return (
    <div className="app">
      <Header />

      <SiteRoutes />
      <Footer />
    </div>
  );
}

export default App;
