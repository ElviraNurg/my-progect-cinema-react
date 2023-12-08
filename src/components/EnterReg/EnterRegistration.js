import { Link } from 'react-router-dom'
import style from './enterRegistration.module.css'
import { useDispatch } from 'react-redux'
import { onClickEnter, onClickRegistration } from '../../store/dataSlice'
const EnterRegistration = () => {

    const dispatch=useDispatch();
    //console.log(dispatch(onClickEnter()));
    return (
        <div className={style.header__user}>
            <Link onClick={()=>dispatch(onClickRegistration())} to={"/singup"} className={style.header__user__registration} > Регистрация</Link>
            <Link onClick={()=>dispatch(onClickEnter())} to={"/singin"} className={style.header__user__enter}> Войти</Link>
        </div>
    )
}

export default EnterRegistration