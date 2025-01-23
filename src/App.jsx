import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import ProductPage from './pages/ProductPage'
import AddProduct from './pages/AddProduct'
import Home from './pages/Home'
import { login } from './redux/app/features/loginSlice'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(login(storedUser));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path='/products' element={isLoggedIn ? <ProductPage /> : <Navigate to="/login" />} />
        <Route path='/addproduct' element={isLoggedIn ? <AddProduct /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
