import { Link, NavLink } from "react-router-dom";
import "./header.scss"
import { useAuth } from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/user/user.slice";
import { removeTokenFromLocalStorage } from "../../../helper/localstorage.helper";
import { toast } from "react-toastify";

export default function Header() {
    const isAuth = useAuth()
    // console.log(isAuth)

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success(`Successfully logged out`)
    }

    // const getUserProductsHandler = async () => {

    //     try {
    //         const data = await GetDataService.getUserProducts()
    //         console.log(data)
    //         if (data) {
    //             toast.success('Product got successfully')
    //         }

    //     } catch (err) {
    //         toast.error(err.response.data.message)
    //     }

    // }





    return (
        <header className="header-container">
            <nav className="nav-links">
                <NavLink to={'/'} className="nav-link" >
                    Главная
                </NavLink>

                <NavLink to={'/catalog'} className="nav-link" >
                    Каталог
                </NavLink>

                <NavLink to={'/sell'} className="nav-link" >
                    Продать
                </NavLink>

                <NavLink to={'/entry'} className="nav-link" >
                    Войти
                </NavLink>
            </nav>

            <div className="auth-container">
                {isAuth ? (
                    <div className="info-auth-container">
                        <h1>Вы вошли!</h1>
                        <Link to={'/profile'} className="profile-link">
                            перейти в профиль
                        </Link>
                        <p className="logout" onClick={logoutHandler}>выйти</p>
                    </div>
                ) : (
                    <h1 className="auth-status">Вы не вошли</h1>
                )}
            </div>
        </header>
    );



}