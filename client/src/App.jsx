import React from 'react'
import { BrowserRouter ,Routes , Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
