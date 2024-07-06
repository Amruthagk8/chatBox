import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from '../src/pages/Register/Register.jsx'
import Login from '../src/pages/Login/Login.jsx'
import Chat from '../src/pages/Chat/Chat.jsx'
import SetAvatar from './pages/SetAvatar/SetAvatar.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Chat/>}/>
      <Route path='/setAvatar' element={<SetAvatar/>}/>

    </Routes>
    
    </BrowserRouter>
  )
}
