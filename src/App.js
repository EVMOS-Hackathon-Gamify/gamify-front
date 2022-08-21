import React from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import Ninja from "./games/a";
import Layout from './Layout';
import LeaderBoard from './pages/LeaderBoard';
import Trade from './pages/Trade';
import Generate from './pages/Generate';
import SingleGame from './pages/Game/SingleGame';
import GamePage from './pages/Game';


function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="trade" element={<Trade />} />
            <Route path="leader-board" element={<LeaderBoard />} />
            <Route path="generate" element={<Generate />} />
            <Route path="games" element={<GamePage />} />
            <Route path="games">
              <Route path=":gameName" element={<SingleGame />} />
              <Route path=":gameName">
                <Route path=":slug" element={<Ninja />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
