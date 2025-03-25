import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Product from './pages/Product';
import Success from './pages/Success';
import Failed from './pages/Failed';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Product}></Route>
        <Route path='/success' Component={Success}></Route>
        <Route path='/failed' Component={Failed}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
