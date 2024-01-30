import { Link } from 'react-router-dom';
import style from './nav.module.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { onClickFalse, onClickToggle } from '../../store/dataSlice';

const Nav = (parent) => {
    const isMain = parent.parent == 'main';
    const clickedToggle = useSelector(state => state.datas.datas.clickedToggle);
    const dispatch = useDispatch();
    let toggleColor = '';
    if (!clickedToggle) {
        toggleColor = isMain ? style.toggle__white__color : style.toggle__black__color
    } else {
        toggleColor = ''
    }
    const userPageBC = isMain ? style.user__page__background : null;
    const navItemColor = isMain ? style.nav__list__Item__white : null;


    return (
        <nav className={`${clickedToggle ? style.header__nav__toggle : style.header__nav}`}>
            <button className={`${clickedToggle ? style.button__close : style.button__open} ${toggleColor} `}
                onClick={() => dispatch(onClickToggle())} >
                <span className={style.visually__hidden}>Закрыть меню</span>
            </button>
            <ul className={clickedToggle ? style.header__nav__list : style.header__nav__list__descktop}>
                <li className={style.header__nav__list__item}>
                    <Link onClick={() => dispatch(onClickFalse())} to={'/home'}>Главная</Link>
                </li>
                <li className={`${style.header__nav__list__item} ${navItemColor}`}>
                    <Link onClick={() => dispatch(onClickFalse())} to={"/movies"}> Фильмы</Link>
                </li>
                <li className={`${style.header__nav__list__item} ${navItemColor}`}>
                    <Link onClick={() => dispatch(onClickFalse())} to={"/saved-movies"}> Сохраненные фильмы</Link>
                </li>

            </ul>
            <div className={`${style.header__nav__user__page} ${userPageBC}`}>
                <Link onClick={() => dispatch(onClickFalse())} to={"/account"} >Аккаунт</Link>
            </div>

        </nav>
    )
}

export default Nav