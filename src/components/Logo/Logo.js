import style from './logo.module.css';
import logo from '../../assets/img/logo.svg';
const Logo = () => {
    return (<>
        <div className={style.header__link__logo} >
                    <img className={style.header__link__img} src={logo} alt="Логотип" width={38} height={38} />
                </div>
    </>)
}
export default Logo;