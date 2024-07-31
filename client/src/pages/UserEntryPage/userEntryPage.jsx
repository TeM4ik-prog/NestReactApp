import axios from "axios";
import { useState } from "react";
import "./userEntryPage.scss";
import { AuthService } from "../../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../../helper/localstorage.helper";
import { useDispatch } from "react-redux";
import { login } from "../../store/user/user.slice";
import { useNavigate } from "react-router-dom";


export default function UserEntryPage() {
    const [isLogin, setIsLogin] = useState(false)
    const [isRegisterMode, setIsRegisterMode] = useState(true)
    const [name, setName] = useState('artenpro')
    const [email, setEmail] = useState('vashilo.artem7@gmail.com')
    const [password, setPassword] = useState('1111')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const registrationHandler = async (e) => {
        try {
            const data = await AuthService.registration({ email, password, name })
            if (data) {
                toast.success('Account has been registered')
                setIsLogin(true)
            }

        } catch (err) {

            toast.error(err.response.data.message)
        }


    }

    const loginHandler = async (e) => {
        try {
            const data = await AuthService.login({ email, password })

            if (data) {
                dispatch(login(data))

                setTokenToLocalStorage('token', data.token)

                toast.success('You are logged in')
                navigate('/')

            }


        } catch (err) {

            toast.error(err.response.data.message)
        }


    }


    let IsValidForm = () => {
        if (name != '' && password != '') {
            return true
        }
        return false
    }

    let UserEntry = () => {
        if (isRegisterMode) {
            registrationHandler()
            return
        }

        loginHandler()
    }




    return (

        <div className="container">
            <div className="info-container">
                <h1 className="title-entry">
                    {isRegisterMode ? 'Регистрация' : 'Авторизация'}
                </h1>


                <div className="block">
                    <input className="input-in-after" type="text" placeholder="Ваше имя"
                        onChange={(e) => setName(e.target.value)} value={name} />
                </div>

                <div className="block" style={{ flexDirection: "row" }}>
                    <input className="input-in-after" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                </div>

                <div className="block">
                    <input className="input-in-after" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} type='password' value={password}></input>
                </div>



                <button className={`button-submit-entry ${IsValidForm() ? 'CanUserSubmit' : ''}`} onClick={() => {
                    if (IsValidForm()) {
                        UserEntry()
                    }
                }
                }>{isRegisterMode ? 'Зарегистрироваться' : 'Авторизироваться'}</button>

                <div className="bottom-change-entry">
                    {isRegisterMode ? (
                        <>
                            <p>Уже есть аккаунт?</p>
                            <p className="change-text" onClick={() => setIsRegisterMode(false)}>Войти</p>
                        </>
                    ) :
                        <>
                            <p>Еще нет аккаунта?</p>
                            <p className="change-text" onClick={() => setIsRegisterMode(true)}>Регистрация</p>
                        </>

                    }
                </div>

            </div>
        </div >



    )
}

