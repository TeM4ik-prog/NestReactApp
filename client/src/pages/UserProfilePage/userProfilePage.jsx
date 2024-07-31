import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import UserProducts from './subpages/UserProducts/userProducts';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectUser } from '../../store/user/user.slice';
import { useUserData } from '../../hooks/useAuth';


export default function UserProfilePage() {
    const { user } = useUserData();


    return (
        <>
            <h1>User Profile Page</h1>

            <h2>{user?.email}</h2>


            <Link to={'/profile/products'}>
                My Products
            </Link>





        </>


    )
}