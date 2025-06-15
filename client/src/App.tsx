import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'

import { Home } from './pages/Home.page';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
