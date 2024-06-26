import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage/HomePage';
import PlaygroundDetails from '../Pages/PlaygroundDetailsPage/PlaygroundDetailspage';
import Contact from '../Pages/ContactPage/ContactPage';
import NotFound from '../Pages/NotFound/NotFound';
import Register from '../Pages/RegisterPage/RegisterPage';
import Cgu from '../Pages/CguPage/CguPage';
import SiteMap from '../Pages/SiteMapPage/SiteMapPage';
import PolitiqueDeConf from '../Pages/PolitiqueConfPage/PolitiqueConfPage';
import MentionsLegales from '../Pages/MentionsLegalesPage/MentionsLegalesPage';
import MyAccount from '../Pages/MyAccountPage/MyAccountPage';

// This component is used to define the routes of the application
function SiteRoutes() {
  return (
    <main className="app h-full bg-background pt-16">
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/playgrounds/:id" Component={PlaygroundDetails} />
        <Route path="/contact" Component={Contact} />
        <Route path="/myAccount/" Component={MyAccount} />
        <Route path="/signup" Component={Register} />
        <Route path="/cgu" Component={Cgu} />
        <Route path="/plan-du-site" Component={SiteMap} />
        <Route
          path="politique-de-confidentialite"
          Component={PolitiqueDeConf}
        />
        <Route path="/mentions-legales" Component={MentionsLegales} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </main>
  );
}

export default SiteRoutes;
