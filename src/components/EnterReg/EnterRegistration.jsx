import { Link } from 'react-router-dom'
import style from './enterRegistration.module.css'
import { useDispatch } from 'react-redux'
import { onClickEnter, onClickRegistration } from '../../store/dataSlice'
const EnterRegistration = () => {

    const dispatch=useDispatch();
    return (
        <div className={style.header__user}>
            <Link onClick={()=>dispatch(onClickRegistration())} 
            to={"/signup"}
             className={style.header__user__registration} > Регистрация</Link>
            <Link onClick={()=>dispatch(onClickEnter())}
             to={"/signin"}
             className={style.header__user__enter}> Войти</Link>
        </div>
    )
}

export default EnterRegistration