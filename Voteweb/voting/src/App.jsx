//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//  import './App.css'
import {  Navigate, Route, Routes } from 'react-router'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Vote } from './pages/Vote'
import { CandidateList } from './pages/CandidateList'
import { Admin } from './pages/Admin'
import ProtectedRoute from './Components/ProtectedRoutes'
import { AdminRoute } from './Components/AdminRoute'
import { Profile } from './pages/Profile'
import { VoteResult } from './pages/VoteResult'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { NavBar } from './Components/NavBar'
import { Footer } from './Components/Footer'


function App() {
  return(
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route element={<NavBar/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/candidates' element={<ProtectedRoute><CandidateList/></ProtectedRoute>}/>
            <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        </Route>
        
        <Route path='/vote/:id' element={<ProtectedRoute><Vote/></ProtectedRoute>}/>
        <Route path='/admin' element={<AdminRoute><Admin/></AdminRoute>}/>
        <Route path='/result' element={<ProtectedRoute><VoteResult/></ProtectedRoute>}/>
        <Route path='/*' element={<Navigate to="/"/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
