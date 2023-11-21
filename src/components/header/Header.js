import style from './header.module.css'
import {BrowserRouter as Link} from 'react-router-dom';
import Logo from '../Logo/Logo';
import { useState } from 'react'
const Header = () => {
    let authorizedUser = true;
    const [clickedToggle, setClickedToggle] = useState(false);
    const onClickToggle = () => setClickedToggle(prev => !prev)
    return (
        <>
            <div className={clickedToggle ? style.header__authorized : style.header}>
               <Link to={"/"}> <Logo /> </Link>
                {
                    authorizedUser ?
                        <nav className={clickedToggle ? style.header__nav__toggle : style.header__nav}>
                            <button className={clickedToggle ? style.header__nav__toggle__button__close : style.header__nav__toggle__button__open} onClick={onClickToggle} >
                                <span className={style.visually__hidden}>Закрыть меню</span>
                            </button>
                               <ul className={clickedToggle ? style.header__nav__list : style.header__nav__list__descktop}>
                                <li className={style.header__nav__list__item}>
                                    <Link to={"/Main"}>Главная</Link>
                                </li>
                                <li className={style.header__nav__list__item}>
                                    <Link to={"/Movies"}> Фильмы</Link>
                                </li>
                                <li className={style.header__nav__list__item}>
                                    <Link to={"/SavedMovies"}> Сохраненные фильмы</Link>
                                </li>
                                <div className={style.header__nav__user__page}>
                                    <Link to={"/Account"}>Аккаунт</Link>
                                </div>
                            </ul>   
                            
                        </nav>
                        : <div className={style.header__user}>
                            <Link to={"/"} className={style.header__user__registration} > Регистрация</Link>
                            <Link to={"/Enter"} className={style.header__user__enter}> Войти</Link> 
                        </div>
                }
            </div >
        </>
    )
}
export default Header;