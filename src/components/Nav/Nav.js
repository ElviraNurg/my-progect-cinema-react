import { Link } from 'react-router-dom';
import style from './nav.module.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { onClickFalse, onClickToggle } from '../../store/dataSlice';

const Nav = (parent) => {
    
    const datas= useSelector(state=>state.datas.datas);
    const dispatch=useDispatch();
    let toggleColor='';
    if(datas.clickedToggle!==true){
        toggleColor=parent.parent == 'main'?style.toggle__white__color:style.toggle__black__color
    }else{
        toggleColor=''
    }
   // let toggleColor =datas.clickedToggle!==true && parent.parent == 'user' ? style.toggle__black__color:style.toggle__white__color;
    
    
    let userPageBC = parent.parent == 'main' ? style.user__page__background:null;
    let navItemColor = parent.parent == 'main' ? style.nav__list__Item__white:null;


    return (
        <nav className={`${datas.clickedToggle ? style.header__nav__toggle : style.header__nav}`}>
            <button className={`${datas.clickedToggle ? style.button__close : style.button__open} ${toggleColor} `} onClick={()=>dispatch(onClickToggle())} >
                <span className={style.visually__hidden}>Закрыть меню</span>
            </button>
            <ul className={datas.clickedToggle ? style.header__nav__list : style.header__nav__list__descktop}>
                <li className={style.header__nav__list__item}>
                    <Link onClick={()=>dispatch(onClickFalse())} to={'/home'}>Главная</Link>
                </li>
                <li className={`${style.header__nav__list__item} ${navItemColor}`}>
                    <Link onClick={()=>dispatch(onClickFalse())} to={"/movies"}> Фильмы</Link>
                </li>
                <li className={`${style.header__nav__list__item} ${navItemColor}`}>
                    <Link onClick={()=>dispatch(onClickFalse())} to={"/saved-movies"}> Сохраненные фильмы</Link>
                </li>

            </ul>
            <div className={`${style.header__nav__user__page} ${userPageBC}`}>
                <Link onClick={()=>dispatch(onClickFalse())} to={"/account"} >Аккаунт</Link>
            </div>

        </nav>
    )
}

export default Nav