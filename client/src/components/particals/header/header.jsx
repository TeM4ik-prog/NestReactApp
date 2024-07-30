import { NavLink } from "react-router-dom";
import "./header.scss"
import { useAuth } from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/user/user.slice";
import { removeTokenFromLocalStorage } from "../../../helper/localstorage.helper";
import { toast } from "react-toastify";

export default function Header() {
    const isAuth = useAuth()

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())

        removeTokenFromLocalStorage('token')

        toast.success(`Successfully logged out`)
    }


    return (
        <div className="header-container">

            <NavLink to={'/'}>
                <p>Главная</p>
            </NavLink>

            <NavLink to={'/catalog'}>
                <p>Каталог</p>
            </NavLink>

            <NavLink to={'/sell'}>
                <p>Продать</p>
            </NavLink>

            <NavLink to={'/entry'}>
                <p>Войти</p>
            </NavLink>

            {isAuth ? (
                <div className="info-auth-container">
                    <h1>Вы вошли!</h1>

                    <p className="logout" onClick={logoutHandler}>выйти</p>

                </div>
            ) : <h1>Вы не вошли</h1>}
        </div >
    )
}