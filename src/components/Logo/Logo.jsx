import style from './logo.module.css';
import logo from '../../assets/img/logo.svg';
import { Link } from 'react-router-dom';
const Logo = (props) => {
    const { parent } = props
    return (<>
        <Link to={'/'} className={style[parent]} >
            <img className={style.header__link__img}
                src={logo}
                alt="Логотип"
                width={38}
                height={38} />
        </Link>
    </>)
}
export default Logo;