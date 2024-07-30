import { useEffect, useState } from 'react'

import './App.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/mainPage';
import Header from './components/particals/header/header';
import ProductsPage from './pages/ProductsPage/productsPage';
import SellPage from './pages/SellPage/sellPage';
import DetailedProductInfoPage from './pages/DetailedProductInfoPage/DetailedProductInfoPage';
import ProductsList from './components/products/ProductsList/productsList';
import UserEntryPage from './pages/UserEntryPage/userEntryPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getTokenFromLocalStorage } from './helper/localstorage.helper';
import { AuthService } from './services/auth.service';
import { login, logout } from './store/user/user.slice';


function App() {
  const dispatch = useDispatch()

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage()

    try {
      if (token) {
        const data = await AuthService.getProfile()
        if (data) {
          dispatch(login(data))
        }
        else {
          dispatch(logout())
        }
      }

    } catch (error) {
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  




  return (
    <>

      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/sell" element={<SellPage />} />

          <Route path="/entry" element={<UserEntryPage />} />



          <Route path="/catalog/*" element={
            <Routes>
              <Route index element={
                <>
                  <ProductsPage />
                </>
              } />

              <Route path='/detailed/:productId'
                element={<DetailedProductInfoPage />}
              />

              <Route path="*" element={<h1>Товары не найдены</h1>} />
            </Routes>
          } />


        </Routes>
      </Router>


      <ToastContainer position='bottom-left' autoClose={2000} />
    </>
  )
}

export default App
