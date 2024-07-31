import { useEffect, useState } from 'react'

import './App.css'

import { Route, BrowserRouter as Router, Routes, useLocation, useParams } from 'react-router-dom';
import MainPage from './pages/MainPage/mainPage';
import Header from './components/particals/header/header';
import ProductsPage from './pages/ProductsPage/productsPage';
import SellPage from './pages/SellPage/sellPage';
import DetailedProductInfoPage from './pages/DetailedProductInfoPage/DetailedProductInfoPage';
import ProductsList from './components/products/ProductsList/productsList';
import UserEntryPage from './pages/UserEntryPage/userEntryPage';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getTokenFromLocalStorage } from './helper/localstorage.helper';
import { AuthService } from './services/auth.service';
import { login, logout } from './store/user/user.slice';
import UserProfilePage from './pages/UserProfilePage/userProfilePage';
import UserProducts from './pages/UserProfilePage/subpages/UserProducts/userProducts';




const App = () => {
  let dispatch = useDispatch()


  const checkAuth = async () => {
    console.log('Checking Auth Service...');
    const token = getTokenFromLocalStorage()


    try {
      if (token) {
        const data = await AuthService.getProfile()

        console.log(data)

        if (data) {
          dispatch(login(data))
          console.log('dispatch login')
        }
        else {
          dispatch(logout())
        }


      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    checkAuth()


    

  }, [])








  return (
    <>


      <Header />
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/sell" element={<SellPage />} />

        <Route path="/entry" element={<UserEntryPage />} />

        <Route path="/profile/*" element={
          <Routes>
            <Route index element={
              <>
                <UserProfilePage />
              </>
            } />


            <Route exact path='/products' element={<UserProducts />} />


          </Routes>


        } />





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



    </>
  )
}

export default App
